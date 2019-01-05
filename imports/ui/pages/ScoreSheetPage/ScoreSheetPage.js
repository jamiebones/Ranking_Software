/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import autoBind from 'react-autobind';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import Events from '../../../api/Event/event';
import Competition from '../../../api/Competition/competition';


if (Meteor.isClient){
  
}


class ScoreSheetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        eventType:"",
        eventName: ""
    };
    autoBind(this);
  }

  handleChangeEventType(event){
    const eventType = event.target.value;
    this.setState({eventType});
    eventTypeQuery.set(eventType)
  }

  handleChangeEventName(event){
    const eventName = event.target.value;
    this.setState({eventName});
    eventNameQuery.set(eventName)
  }


  render() {
    const { loading, eventNames, competition, history } = this.props;
    return (!loading ? (
      <div>
        <Row>
          <Col md={12} sm={12} lg={12}>
              <FormGroup>
                <ControlLabel>Event Type</ControlLabel>
                    <FormControl componentClass="select" 
                      placeholder="select" 
                      onChange={event=>this.handleChangeEventType(event)} 
                             ref={ eventType =>this.eventType = eventType }>
                             <option value="select">select event type</option>
                             <option value="Individual">Individual</option>
                             <option value="Team">Team</option>
                            </FormControl>
                </FormGroup>

                <FormGroup>
                <ControlLabel>Event</ControlLabel>
                    <FormControl componentClass="select" 
                      placeholder="select" 
                      onChange={event=>this.handleChangeEventName(event)} 
                             ref={ eventName =>this.eventName = eventName }>
                             <option value="select">select event</option>
                             {eventNames && eventNames.map(({_id, eventName })=>{
                               return <option value={_id} key={_id}>{eventName}</option>
                             })}
                            
                    </FormControl>
                </FormGroup>

          </Col>
        </Row>

        <Row>
          <Col md={12}>
             {competition && competition.length ?
                <div>
                  <Table striped hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {competition.map((comp)=>{
                          return (<tr key={comp._id}>
                                    <td><p>{comp.route}:<span>{comp.distance}</span></p></td>
                                    <td>
                                      <p>
                                        <Link to={{
                                           pathname: `/result/${comp.route}/${comp._id}/${comp.eventId}`,
                                           state:{
                                             competition: comp
                                           }
                                        }}>
                                           View Report
                                        </Link>
                                        
                                      </p>
                                    </td>
                                 </tr>)
                        })}
                      </tbody>
                    </Table>


                </div>
             
            
            : null}
          
                             
          
          </Col>

        </Row>



      </div>
    ) : <div />);
  }
}


let eventTypeQuery = new ReactiveVar("");
let eventNameQuery = new ReactiveVar("");

export default withTracker(() => {
  if (Meteor.isClient) {
      const subscription = Meteor.subscribe('events.getEventsByTypeCompetition', 
                                             eventTypeQuery.get())
      const sub2 = Meteor.subscribe('competition.getCompetition', eventNameQuery.get())
    
    return {
        loading: !subscription.ready() && !sub2.ready(),
        eventTypeQuery,
        eventNameQuery,
        eventNames: Events.find({"type": eventTypeQuery.get()}).fetch(),
        competition :Competition.find({"eventId": eventNameQuery.get(),
                                       "finishedEnteringData": true},
                                       {sort:{"competitionDate": 1}}).fetch()
    };
  }
  return { };
})( ScoreSheetPage );
