import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {changeLoading,getTopStoriesData} from '../../redux/actions/TopStories';
import StoryCard from '../../pages/story-card/StoryCard';
import ReactLoading from 'react-loading';

const TopStories = (props) => {
  const {loading, pageNumber, changeLoading, getTopStoriesData, currentPageStoryData} = props;

  useEffect(() => {
    changeLoading();
    getTopStoriesData();
    console.log('Working');
  }, []);

  const handleNext = () => {
    changeLoading();
    getTopStoriesData('next');
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    changeLoading();
    getTopStoriesData('prev');
    window.scrollTo(0, 0);
  };

  if (loading) return <>
    <ReactLoading
        type={'spin'}
        color={'red'}
        height={40}
        width={40}
        className="comment-detailed-circle"
    />
    <p className="text-center">Loading...</p>
  </>;

  const buildStoryHml = currentPageStoryData.map((story, index) => {
    if (story.title !== null && story.title !== '' && story.isVisible) {
      return <StoryCard
          data={story}
          points={story.points}
          index={index}
          key={story.objectID}
      />;
    } else return null;
  });

  return (
      <Container>
        <Row>
          {buildStoryHml}
        </Row>
        <Row>
          <Col xs={12} className="text-right">
            {
              pageNumber >= 1 ?
                  <Button
                      variant="primary"
                      onClick={handlePrev}
                  >Previous</Button> :
                  null
            }
            {
              pageNumber <= 49 ?
                  <Button
                      variant="primary"
                      onClick={handleNext}
                  >Next</Button> :
                  null
            }
          </Col>
        </Row>
        <br/>
      </Container>
  );

};

/*class TopStories extends React.Component{
  componentDidMount() {
    this.props.getTopStoriesData();
  }

  handleNext = () => {
    this.props.getTopStoriesData('next');
  };

  handlePrev = () => {
    this.props.getTopStoriesData('prev');
  };

  render() {
    const {pageNumber, currentPageStoryData} = this.props;
    const buildStoryHml = currentPageStoryData.map((story, index) => {
      if (story.isVisible) {
        return <StoryCard
            data={story}
            points={story.points}
            index={index}
            key={story.objectID}
        />;
      } else return null;
    });

    return (
        <Container>
          <Row>
            {buildStoryHml}
          </Row>
          <Row>
            <Col xs={12} className="text-right">
              {
                pageNumber >= 1 ?
                    <Button
                        variant="primary"
                        onClick={this.handlePrev}
                    >Previous</Button> :
                    null
              }
              {
                pageNumber <= 49 ?
                    <Button
                        variant="primary"
                        onClick={this.handleNext}
                    >Next</Button> :
                    null
              }
            </Col>
          </Row>
          <br/>
        </Container>
    );
  }
}*/

const mapStateToProps = state => {
  //return state.stories;
  return state.stories;
};

const postStories = connect(mapStateToProps, {changeLoading,getTopStoriesData})(TopStories);

export default postStories;

