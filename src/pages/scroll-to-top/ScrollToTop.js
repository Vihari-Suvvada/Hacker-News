import React from 'react';
import {withRouter} from 'react-router-dom';

class ScrollToTopData extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTop = withRouter(ScrollToTopData);

export {ScrollToTop};
