import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavigationBar from './pages/NavigationBar/NavigationBar';
import postStories from './components/TopStories-Module/TopStories';
import PostComment from './components/StoryComment/StoryComment';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"



const App = () => {
  return (
      <div className="App">
        <NavigationBar/> 
        <div className="main-content">
          <Switch>
            <Route
                path="/"
                exact
                component={postStories}
            />
            <Route
               path="/TopStories/id=:storyId"
                component={PostComment}
            />
            
          </Switch>
        </div>
      </div>
  );
};

export default withRouter(App);
