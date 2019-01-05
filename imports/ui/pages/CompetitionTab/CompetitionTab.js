/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs, Tab, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import autoBind from 'react-autobind';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import Events from '../../../api/Event/event';
import Competition from '../../../api/Competition/competition';
import CompetitionCreationDetails from '../../components/CompetionDetails/CompetitionDetails';
import AddCompetitionMembers from '../../components/AddCompetitionMembers/AddCompetitionMembers';

if (Meteor.isClient){
  import './CompetitionTab.scss';
}
const CompetionStyleHeader = styled.h4`
  .label {
    position: relative;
    top: -2px;
    font-size: 10px;
  }

`;

const CompetionStyleTabs = styled(Tabs)`
  .nav.nav-tabs {
    margin-bottom:30px;
  }
`;

class CompetitionTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        activeTab: 'createCompetition',
        eventType:""
    };
    autoBind(this);
  }

  changeEventType(eventType){
    this.setState({eventType});
    eventTypeQuery.set(eventType)
  }

  changeTab(tab){
      this.setState({"activeTab": tab});
  }

  render() {
    const { loading, eventTypeQuery,eventName } = this.props;
    return (!loading ? (
      <div className="competitionTab">
        <Row>
          <Col md={12} sm={12} lg={12}>
           <CompetionStyleHeader className="page-header">
               Create Cyclist Competition 
           </CompetionStyleHeader>
           <CompetionStyleTabs animation={false} activeKey={this.state.activeTab} 
           onSelect={activeTab => this.setState({ activeTab })} id="manual-upload-tabs">
          <Tab eventKey="createCompetition" title="Save Competition Data">
             <Row>
               <Col md={8} mdOffset={2}>
                   <CompetitionCreationDetails 
                      eventType={this.changeEventType} 
                      changeTab={this.changeTab} 
                      eventName={this.props.eventName} />
               </Col>
             </Row>
          </Tab>


          <Tab eventKey="enterMembers" title="Enter Members">
             <Col md={12}>
                 <AddCompetitionMembers 
                  unFinishedCompetitionEntry={this.props.competition} />
              </Col>
          </Tab>
        </CompetionStyleTabs>
          </Col>
        </Row>
      </div>
    ) : <div />);
  }
}


let eventTypeQuery = new ReactiveVar("");

export default withTracker(() => {
  if (Meteor.isClient) {
      const subscription = Meteor.subscribe('events.getEventsByType', 
                                             eventTypeQuery.get())
    return {
        loading: !subscription.ready(),
        eventTypeQuery,
        eventName: Events.find({"type": eventTypeQuery.get()}).fetch(),
        competition :Competition.find({"finishedEnteringData": false}).fetch()
    };
  }
  return { };
})( CompetitionTab );
