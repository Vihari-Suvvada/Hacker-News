import React from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getTopStoriesData} from '../../redux/actions/TopStories';
import {StoryCard} from '../../pages/story-card/StoryCard';

class TopStories extends React.Component {
  componentDidMount() {
    this.props.getTopStoriesData();
  }

  render() {
    const {storyData} = this.props;
    const buildStoryHml = storyData.map(story => <StoryCard data={story} key={story.objectID}/>);

    return (
        <Container>
          <Row>
            {buildStoryHml}
          </Row>
        </Container>
    );
  }
}

const mapStateToProps = state => {
  //return state.stories;
  return state.hackerReducer;
};

const postStories = connect(mapStateToProps, {getTopStoriesData})(TopStories);

export default postStories;

