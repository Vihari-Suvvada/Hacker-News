import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {withRouter} from 'react-router-dom';

const NavigationBar = (props) => {

  const redirectToGraphPage = () => {
    props.history.push('/TopStories-graph/');
  };

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Hacker News</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <NavDropdown title="Menu " id="collasible-nav-dropdown">
              <NavDropdown.Item>Show hidden</NavDropdown.Item>
              <NavDropdown.Item onClick={redirectToGraphPage}>Show graph</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
};
export default withRouter(NavigationBar);
