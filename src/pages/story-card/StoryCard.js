import React from 'react';
import Col from 'react-bootstrap/Col';
import './StoryCard.css';

export const StoryCard = (props) => {
  const {title, author, url, num_comments, points} = props.data;
  return (
      <Col xs={12}>
        <div className="story-card">
          <div className={'story-card-left'}>
            <p className="story-title">{title === null ? 'Sample Title' : title}</p>
            <p className="story-author">{author === null ? 'Hacker News' : author}</p>
            <p className="story-url">{url === null ? 'Hacker News' : url}</p>
          </div>
          <div className={'story-card-right'}>
            <div className="story-points-circle">
               <p>{points}</p>
            </div>
            <div className="story-comments-block">
              <p className="story-comments-count">{num_comments}</p>
            </div>
          </div>
        </div>
        <hr className={{ padding: 0, margin: 0 }}/>
      </Col>
  );
};
