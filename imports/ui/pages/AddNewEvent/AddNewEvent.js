import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NewEvents from '../../components/Event/Event'




class NewEvent extends React.Component{
    render(){
        return (
            <Row>
              <Col md={8}>

                <NewEvents />
             
              </Col>
            </Row>
        )
    }
}

export default NewEvent;