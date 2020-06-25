import {
  TOP_STORIES_DATA,
  CURRENT_PAGE_STORY_DATA,
  NEXT_PREV_PAGE_STORY_DATA,
  STORY_DATA_WITH_PAGE_NUMBER,
  STORY_HIDE_STATUS,
  STORY_VOTES} from '../../actionconstants/HackerNewsConstants';

const initialState = {
  pageNumber: 0,
  storyData: {},
  currentPageStoryData: [],
};
export const hackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_STORIES_DATA:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
      };
    case STORY_DATA_WITH_PAGE_NUMBER:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
      };
    case CURRENT_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload,
      };
    case NEXT_PREV_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
      };
    case STORY_HIDE_STATUS:
    case STORY_VOTES:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
      };
    default:
      return state;
  }
}


