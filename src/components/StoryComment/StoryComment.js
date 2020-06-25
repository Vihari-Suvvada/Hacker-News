import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import ReactLoading from 'react-loading';
//import './Comment.css';
import './StoryComment.css';
import {Comment} from '../../pages/comment/Comment';


export default class PostComment extends React.Component {

  state = {
    storyData: null,
    loading: false,
  };

  componentDidMount() {
      console.log('componentdidmount called')
    this.getSingleStory();
  }

  getSingleStory = () => {
    const {storyId} = this.props.match.params;
    this.setState({
      loading: true,
    });
    axios.get(`http://hn.algolia.com/api/v1/items/${storyId}`).
        then(response => {
          this.setState({
            storyData: response.data,
          });
        }).
        catch(errors => {
          console.log(errors);
        }).finally(() => this.setState({loading: false}));
  };

  render() {
    const {loading, storyData} = this.state;

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
    if (storyData === null) return <Alert variant={'danger'}>No data found!</Alert>;

    const {title, author, url, children} = storyData;
    const buildComments = children.map(comment => <Comment data={comment} key={comment.id}/>);

    return (
        <div className="comment-detailed-section">
          <div className="comment-detailed-header">
            <Container>
              <Row>
                <Col xs={12}>
                  <h4>{title}</h4>
                  <br/>
                  <Row>
                    <Col xs={2}>
                      <p><span className="w100">Author :</span></p>
                    </Col>
                    <Col xs={10}>
                      <p>{author}</p>
                    </Col>
                    <Col xs={2}>
                      <p><span className="w100">URL :</span></p>
                    </Col>
                    <Col xs={10}>
                      <p>{url}</p>
                    </Col>
                  </Row>
                  <br/>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="comment-detailed-body">
            <Container>
              <Row>
                <Col xs={12}>
                  <h5>Comments :</h5>
                </Col>
                <Col xs={12}>
                  {buildComments}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
    );
  }
}

