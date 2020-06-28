import {
  TOP_STORIES_DATA,
  CURRENT_PAGE_STORY_DATA,
  NEXT_PREV_PAGE_STORY_DATA,
  STORY_DATA_WITH_PAGE_NUMBER,
  STORY_HIDE_STATUS,
  STORY_VOTES,
  LOADING_STATUS} from '../../actionconstants/HackerNewsConstants';

const initialState = {
  //loading: true,
  pageNumber: 0,
  storyData: {},
  /*
  {0[],1[],2[],...........49[]}
  
  */
  currentPageStoryData: [],
  loading:false,
};
export const hackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_STORIES_DATA:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
        loading: false,
      };
    case STORY_DATA_WITH_PAGE_NUMBER:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
        loading: false,
      };
    case CURRENT_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload,
        loading: false,
      };
    case NEXT_PREV_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
        loading: false,
      };
    case STORY_HIDE_STATUS:
    case STORY_VOTES:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
      };
      case LOADING_STATUS: {
        return {
          ...state,
          loading: action.payload
        }
      }
    default:
      return state;
  }
}


