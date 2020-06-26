import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import {hideStory, voteStory} from '../../redux/actions/TopStories';
import likeIcon from '../../assets/images/like.png';
import hideIcon from '../../assets/images/blind.png';
import './StoryCard.css';

const StoryCardData = (props) => {
  const {data: {title, author,objectID, url, num_comments}, points, index, hideStory, voteStory} = props;

  return (
    <Col xs={12}>
        <div className="story-card">
          <div className={'story-card-left'}>
            <Link to={`/TopStories/id=${objectID}`}>
              <p className="story-title">{title === null ?
                  'Sample Title' :
                  title}</p>
              <p className="story-author">{author === null ?
                  'Hacker News' :
                  author}</p>
              <p className="story-url">{url === null ? 'Hacker News' : url}</p>
            </Link>
            <div className="story-icons-block">
              <img
                  src={hideIcon}
                  alt={'hide'}
                  width={30}
                  height={30}
                  onClick={() => hideStory(index)}
              />
              <img
                  src={likeIcon}
                  alt={'Like'}
                  width={30}
                  height={30}
                  onClick={() => voteStory(index)}
              />
            </div>
          </div>
          <div className={'story-card-right'}>
          <Link to={`/TopStories/id=${objectID}`}>
            <div className="story-points-circle">
            
              <p>{points}</p>
            
            </div>
            <div className="story-comments-block">
            
              <p className="story-comments-count">{num_comments}</p>
            
            </div>
           </Link>
          </div>
        </div>
        <hr className={{padding: 0, margin: 0}}/>
      </Col>
  );
};

const StoryCard = connect(null, {hideStory, voteStory})(StoryCardData);

export default StoryCard;

