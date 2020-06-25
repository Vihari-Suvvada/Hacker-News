import {TOP_STORIES_DATA} from '../../actionconstants/HackerNewsConstants';

const initialState = {
  storyData: [],
};
export const hackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_STORIES_DATA:
      return {
        ...state,
        storyData: action.payload,
      };
    default:
      return state;
  }
}
/*export default hackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_STORIES_DATA:
      return {
        ...state,
        hackerNewsFeed: action.payload,
      };
    default:
      return state;
  }
}*/

