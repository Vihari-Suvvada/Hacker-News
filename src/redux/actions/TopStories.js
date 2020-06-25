import axios from 'axios';
import  {TOP_STORIES_DATA} from '../actionconstants';
//Api calling using axios
export const getTopStoriesData = () =>{
  return async (dispatch, getState) =>{
    axios.get('https://hn.algolia.com/api/v1/search?page=0').then(function(response) {
        // handle success
        console.log('response is :', response.data)
        const {hits} = response.data;
        dispatch({
          type: TOP_STORIES_DATA,
          payload: hits,
        });
      }).catch(function(error) {
        // handle error
        console.log(error);
      }).finally(function() {
        // always executed
      });
            

  }


}