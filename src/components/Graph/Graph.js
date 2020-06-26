import React from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactEcharts from 'echarts-for-react';

const GraphData = (props) => {

  let xAxisData = [];
  let yAxisData = [];

  props.currentPageStoryData.forEach(story => {
    xAxisData.push(story.objectID);
    yAxisData.push(story.points);
  });

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: 'Votes: {c}',
    },
    legend: {
      show: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: 2,
      axisLabel: {
        show: true,
        rotate: 90,
      },
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [
      {
        name: 'Hacker-News',
        type: 'line',
        lineStyle: {
          width: 4,
        },
        data: yAxisData,
        itemStyle: {
          color: '#00B4DB',
        },
      },
    ],
  };

  return (
      <Container>
        <Row>
          <Col xs={12}>
            <ReactEcharts option={option}/>
          </Col>
        </Row>
      </Container>
  );
};

const mapStateToProps = state => {
  return state.stories;
};

const PostGraph = connect(mapStateToProps, null)(GraphData);

export default PostGraph;
