import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TeamEvent from '../../components/TeamEvent/TeamEvent';
import autoBind from 'react-autobind';
import {_} from 'meteor/underscore';

var store = require('store');



class NewCompetition extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            storeData:store.get('team') ||
            store.set('team' , {team: [
                                   {state:"",
                                    ST:"",
                                    teamId:"",
                                    FT:"",
                                    AT:"",
                                    members:[ ]
                                    }
               ]},),
            team: [
                  {state:"",
                    ST:"",
                    teamId:"",
                    FT:"",
                    AT:"",
                    members:[ ]
                  }
                ],
        }
        autoBind(this);
    }


    updateTeam(teamDetails){
        const savedTeam = this.state.storeData;
        const { team:{teamId}} = teamDetails;
        //adding a new team here
        const findSavedTeam = _.find(savedTeam.team,(team)=>{
            return team.teamId === teamId;
        });
        //if saved team
        if (findSavedTeam){
            //replace the old by filtering out the old one
            //and replacing it
            let newTeamArray = _.filter(savedTeam.team,(team) =>{
                return team.teamId != teamDetails.team.teamId;

            });
            //saved to state
            const {team:{ST,teamId,FT,AT,members}} = teamDetails;
            const teamArray = {
                ST,
                teamId,
                FT,
                AT,
                members
            }
            newTeamArray.push(teamArray);
            this.setState({team:newTeamArray});
            store.set('team', {team:newTeamArray})
        } else{
            //we are saving a new team to state here
            //add to the already storeData for team here
            const {team:{ST,teamId,FT,AT,members}} = teamDetails;
            const cyclistTeam = {
                ST,
                teamId,
                FT,
                AT,
                members
            }
            let arrayTeams = savedTeam.team
            arrayTeams.push(cyclistTeam);
            this.setState({team:arrayTeams});
            store.set('team', {team:arrayTeams});
        }
    }

    render(){
        const {storeData} = this.state;
        return (
            <Row>
              <Col md={8} mdOffset={2}>

                 <TeamEvent updateTeam={this.updateTeam}  />
             
              </Col>
            </Row>
        )
    }
}

export default NewCompetition;