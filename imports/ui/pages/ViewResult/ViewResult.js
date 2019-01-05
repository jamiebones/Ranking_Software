
/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import autoBind from 'react-autobind';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../../../api/Event/event';
import Competition from '../../../api/Competition/competition';
import {RankCyclist} from '../../../modules/utilities';
import ScoreSheet from '../../components/ScoreSheet/ScoreSheet';


if (Meteor.isClient){
  
}


class ViewResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
       
    };
    autoBind(this);
  }


  render() {
    const { loading, events, competition } = this.props;
    const team = RankCyclist(competition && competition.team);
    return (!loading ? (
      <div>
        <Row>
          <Col md={12} sm={12} lg={12}>
              
              <ScoreSheet team={team} competition={competition} 
                          events={events}/>
          
          </Col>

        </Row>
      </div>
    ) : <div />);
  }
}


export default withTracker(({match}) => {
  if (Meteor.isClient) {
      //event id represents _id
      const eventId = match.params.eventId;
      const compId = match.params.compId
      const subscription = Meteor.subscribe('events.getEventById', eventId, compId)
      
    return {
        loading: !subscription.ready(),
        events: Events.findOne(eventId),
        competition :Competition.findOne(compId)
    };
  }
  return { };
})( ViewResult );
