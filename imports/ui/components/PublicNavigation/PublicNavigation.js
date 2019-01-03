
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = ( ) => (
<div>
    
        <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem eventKey={1} href="/signup">Create Account</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem eventKey={2} href="/login">Log In</NavItem>
        </LinkContainer>
      </Nav>
     
</div>
);

export default PublicNavigation;
