import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import userIcon from '../../assets/images/user.png';
import timeIcon from '../../assets/images/time.png';
import './Comment.css';

export const Comment = props => {
  const {id, text, author, created_at, created_at_i} = props.data;
  const data = moment.unix(created_at_i).fromNow();
  return (
      <Row key={id} className="story-comment">
        <Col xs={6}>
          <p><img src={userIcon} alt="Author" width={17} height={17}/> {author}</p>
        </Col>
        <Col xs={6}>
          <p><img src={timeIcon} alt="Time" width={17} height={17}/> {data}</p>
        </Col>
        <Col xs={12}>
          <div dangerouslySetInnerHTML={{__html: text}}/>
          <hr/>
        </Col>
      </Row>
  );
};
