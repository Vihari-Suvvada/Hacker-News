import React from 'react';
import axios from 'axios';
import  { 
  TOP_STORIES_DATA,
  CURRENT_PAGE_STORY_DATA,
  NEXT_PREV_PAGE_STORY_DATA,
  STORY_DATA_WITH_PAGE_NUMBER,
  STORY_HIDE_STATUS,
  STORY_VOTES,
  LOADING_STATUS
} from '../actionconstants';
import ReactLoading from 'react-loading';


export const changeLoading = () => {
  return {
    type: LOADING_STATUS,
    payload: true,
  };
};
//Api calling using axios
export const getTopStoriesData = (type) =>{
  return async (dispatch, getState) => {
    const {pageNumber, storyData, loading} = getState().stories;
    // 0, {0[1,2,.....20],1[1,2,...]}
    console.log('starting storyData value is:',storyData);
    console.log('starting pageNumber value is:',pageNumber);
    const getPageNumber = type === undefined ?
          pageNumber : type === 'next' ? pageNumber + 1 : pageNumber - 1;


        console.log('Changing pageNumber value is:',getPageNumber);
        //let loader = loading
    if (storyData.hasOwnProperty(getPageNumber)) {
     // loader = false;
      if (type === undefined) {
        dispatch({
          type: CURRENT_PAGE_STORY_DATA,
          payload: storyData[getPageNumber],
        });
      } else dispatch({
        type: NEXT_PREV_PAGE_STORY_DATA,
        payload: {
          currentPageStoryData: storyData[getPageNumber],
          pageNumber: getPageNumber,
         // loading: loader,
        },
      });
    } else {
     /* if (loading) return <>
      <ReactLoading
          type={'spin'}
          color={'blue'}
          height={40}
          width={40}
          className="TopStories-loading-circle"
      />
      <p className="text-center">Loading...</p>
    </>;*/
      axios.get(`https://hn.algolia.com/api/v1/search?page=${getPageNumber}`).
          then(function(response) {
            const {hits} = response.data;
          
            const updatedHits = hits.map(data => {
              data.isVisible = true;
              return data;
            });
            console.log('updated hits is:',updatedHits)
            console.log('storyData is:',storyData)
 
            let arr = storyData;//{0[],1[]}
            console.log('storyData copy is:',arr)

            arr[getPageNumber] = updatedHits;
            //arr o/p: {0[1,...], 1[1,2.....],2[]}
            console.log('storyData pagenumber is:',arr[getPageNumber])
            console.log('pagenumber is:',pageNumber)
            console.log('getpagenumber is:',getPageNumber)

            
            //loader = false
           //
            if (type === undefined) {
              dispatch({
                type: TOP_STORIES_DATA,
                payload: {
                  //pageNumber: getPageNumber,
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                 // loading: loader,
                },
              });
            } else {
              dispatch({
                type: STORY_DATA_WITH_PAGE_NUMBER,
                payload: {
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                  pageNumber: getPageNumber,
                  //loading: loader,
                },
              });
            }

          }).catch(function(error) {
        console.log(error);
        
        dispatch({
          type: LOADING_STATUS,
          payload: {
            loading: false,
          },
        });
      });
    }
  };
};
export const hideStory = (index) => {
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;

    let tempStoryData = {...storyData};
    tempStoryData[pageNumber][index].isVisible = false;

    dispatch({
      type: STORY_HIDE_STATUS,
      payload: {
        storyData: tempStoryData,
        currentPageStoryData: tempStoryData[pageNumber],
      },
    });
  };
};

export const voteStory = (index) => {
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;

    let tempStoryData = {...storyData};
    tempStoryData[pageNumber][index].points += 1;

    dispatch({
      type: STORY_VOTES,
      payload: {
        storyData: tempStoryData,
        currentPageStoryData: tempStoryData[pageNumber],
      },
    });
  };
};
