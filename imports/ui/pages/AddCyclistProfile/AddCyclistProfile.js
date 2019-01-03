import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CyclistProfile from '../../components/CyclistProfile/CyclistProfile'




class NewProfile extends React.Component{
    render(){
        return (
            <Row>
              <Col md={8} mdOffset={2}>

                 <CyclistProfile />
             
              </Col>
            </Row>
        )
    }
}

export default NewProfile;