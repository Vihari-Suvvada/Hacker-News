import axios from 'axios';
import  { 
  TOP_STORIES_DATA,
  CURRENT_PAGE_STORY_DATA,
  NEXT_PREV_PAGE_STORY_DATA,
  STORY_DATA_WITH_PAGE_NUMBER,
  STORY_HIDE_STATUS,
  STORY_VOTES,
} from '../actionconstants';

//Api calling using axios
export const getTopStoriesData = (type) =>{
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;
    // 0, {0[1,2,.....20],1[1,2,...]}
    console.log('starting storyData value is:',storyData);
    console.log('starting pageNumber value is:',pageNumber);
    const getPageNumber = type === undefined ?
        0 :
        type === 'next' ? pageNumber + 1 : pageNumber - 1;


        console.log('Changing pageNumber value is:',getPageNumber);
    if (storyData.hasOwnProperty(getPageNumber)) {
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
        },
      });
    } else {
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
           //
            if (type === undefined) {
              dispatch({
                type: TOP_STORIES_DATA,
                payload: {
                  //pageNumber: getPageNumber,
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                },
              });
            } else {
              dispatch({
                type: STORY_DATA_WITH_PAGE_NUMBER,
                payload: {
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                  pageNumber: getPageNumber,
                },
              });
            }

          }).catch(function(error) {
        console.log(error);
        dispatch({
          type: '',
          payload: '',
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
