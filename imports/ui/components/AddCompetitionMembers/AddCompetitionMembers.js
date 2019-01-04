import React from 'react'
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, 
         Button, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import TeamEvent from '../TeamEvent/TeamEvent';
import moment from 'moment';
import {FilterReturnStoredTeamArray} from '../../../modules/utilities';
import {_} from 'meteor/underscore';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
    import "./AddCompetitionMembers.scss";
}


var store = require('store');




class AddCompetitionMembers extends React.Component{
    constructor(props){
        super(props);
        autoBind(this);var store = require('store');
        this.state={
            route:"",
            eventId:"",
            eventType:"",
            numOfStarters:"",
            cyclistGender:"",
            finishedEnteringData:"",
            numOfFinishers:"",
            competitionDate:"",
            individual:"",
            team:"",
            distance:"",
            showSelected:false,
            storeDataTeam:store.get('team') ||
            store.set('team' , [ {eventId : "",
                                  members:[
                                     {
                                        state : "",
                                        teamId : "",
                                        FT:"",
                                        AT:"",
                                        ST:"",
                                        cyclist:[
                                            { name:"",cyclistId:"",regNum:""}
                                        ]
                                      }
                                 ]
                                }
                             ])
        }
    }

   
    showSelectedCompetition(competition){
       const { route,eventId,
        numOfStarters,
        cyclistGender,
        finishedEnteringData,
        numOfFinishers,
        competitionDate,
        individual,
        team,
        distance,
        eventType} = competition;
        
        this.setState({showSelected:true,
                       route,eventId,numOfStarters,
                       cyclistGender,finishedEnteringData,
                       numOfFinishers,competitionDate,
                       individual,team,distance,eventType
        });
    }

    updateTeam(teamDetails){
        debugger;
        const savedTeam = this.state.storeDataTeam;
        const { ST,teamId,FT,AT,cyclist, eventId,state } = teamDetails;
        //adding a new team here
        //find stored event in the store using the eventId
        const findSavedTeam = _.find(savedTeam,(team)=>{
            return team.eventId === eventId;
        });
        //if saved team
        if (findSavedTeam){
            //check if we have a teamId
            let saveStoreMembers = _.find(findSavedTeam.members,(team)=>{
                return team.teamId === teamId;
            });

            if (saveStoreMembers){
                //we already have an teamid lets
                //replace the old by filtering out the old one
                //and replacing it
                let newTeamArray = _.filter(findSavedTeam.members,(team) =>{
                    return team.teamId != teamId;
                });
                const newteamMembersOby = {
                    ST,
                    teamId,
                    FT,
                    AT,
                    cyclist,
                    state
                }
                newTeamArray.push(newteamMembersOby);
                //remove the old eventId
                findSavedTeam.members = newTeamArray;

                let remainArray = _.filter(savedTeam,(team) =>{
                    return team.eventId != eventId;
                });
                remainArray.push(findSavedTeam)
                //save to the store here
                store.set('team', remainArray);
                this.setState({storeDataTeam:store.get('team')});
            }

            else{
                //no teamId new entry here
                //we just add it to the members array of event object
                const newTeamObject = {
                    ST,
                    teamId,
                    FT,
                    AT,
                    cyclist,
                    state
                }
                findSavedTeam.members.push(newTeamObject);
                //remove it and put the updated one
                let formerArray = _.filter(savedTeam,(team) =>{
                    return team.eventId != eventId;
                });
                formerArray.push(findSavedTeam);
                //save it in the store
                store.set('team' , formerArray)
                this.setState({storeDataTeam:store.get('team')});
            }
        } else{
            //we are saving a new team to state here
            //add to the already storeData for team here
            const cyclistTeam = {
                ST,
                teamId,
                eventId,
                FT,
                AT,
                cyclist
            }
            const newEventToSave = {
                eventId,
                members:[
                    {
                        state,
                        FT,
                        AT,
                        ST,
                        teamId,
                        cyclist
                    }
                ]
            }
            savedTeam.push(newEventToSave);
            store.set('team', savedTeam);
            this.setState({storeDataTeam:store.get('team')});
        }
    }



    render(){
        const { unFinishedCompetitionEntry } = this.props; 
        const {showSelected,route,eventId,numOfStarters,
               cyclistGender,finishedEnteringData,
               numOfFinishers,competitionDate,
               individual,team,distance, eventType, storeDataTeam } = this.state;
        return(
            <div>
                <Row>
                    <Col md={12}>
                      {unFinishedCompetitionEntry && 
                       unFinishedCompetitionEntry.map((competition)=>{
                          return (
                           <p key={competition.eventId} className="compStyles" onClick={()=>this.showSelectedCompetition(competition)}>
                               Route: {competition.route} 
                               -Date: {moment(competition && 
                                competition.competitionDate).format('MMMM DD YYYY')}<br/>
                           </p>
                          )
                      })}
                    
                    </Col>
                </Row>

                {showSelected ? (

                    <Row>
                      <Col md={8}>
                         <p>{route}</p>
                         <p>{cyclistGender}</p>
                         <p>{numOfStarters}</p>
                         <p>{numOfFinishers}</p>
                         <p>{distance}</p>
                         <p>
                           Date : {moment(competitionDate).format('MMMM DD YYYY')}
                         </p>
                         {eventType == "Team" ? (
                             
                             <TeamEvent updateTeam={this.updateTeam} 
                                        eventId={this.state.eventId}  />

                         ):
                         
                        
                        null}

                      </Col>


                    <Col md={4}>
                        {/*list the saved members list here */}
                        {eventType == "Team" ? (
                                <div>
                                  
                                    {FilterReturnStoredTeamArray(storeDataTeam, eventId).map(({state,teamId,FT,AT,ST,cyclist})=>{
                                        return (
                                            <div key={teamId}>
                                                <p>State: {state}</p>
                                                <p>FT:{FT}</p>
                                                <p>AT:{AT}</p>
                                                <p>ST:{ST}</p>
                                                {cyclist.map(({name,cyclistId,regNum})=>{
                                                    return(
                                                        <p key={cyclistId}>
                                                            <span>{name}: {regNum}</span>
                                                        </p>
                                                    )
                                                })}


                                            </div>
                                        )
                                    })}
                                    
                                  
                                </div>
                        )
                    
                    : null}


                    </Col>

                    </Row>

                ):
                
            
            
                null}

                
        
         
            </div>
        )
    }
}

export default AddCompetitionMembers;