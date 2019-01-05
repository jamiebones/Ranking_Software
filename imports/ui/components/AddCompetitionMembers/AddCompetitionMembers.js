import React from 'react'
import autoBind from 'react-autobind';
import { Row, Col, Label,Panel,
         Button,  } from 'react-bootstrap';
import TeamEvent from '../TeamEvent/TeamEvent';
import moment from 'moment';
import {FilterReturnStoredTeamArray} from '../../../modules/utilities';
import { Bert } from 'meteor/themeteorchef:bert';
import {_} from 'meteor/underscore';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
    import "./AddCompetitionMembers.scss";
}


var store = require('store');


class AddCompetitionMembers extends React.Component{
    constructor(props){
        super(props);
        autoBind(this)
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
        eventType,_id} = competition;
        
        this.setState({showSelected:true,
                       route,eventId,numOfStarters,
                       cyclistGender,finishedEnteringData,
                       numOfFinishers,competitionDate,
                       individual,team,distance,eventType,_id
        });
    }

    saveCyclistTeamData(eventId){
        //get the list from the store
        const savedTeams = store.get('team');
        //get the one matching the eventId;
        let teamDetails = _.find(savedTeams, team => {
            return team.eventId === eventId;
        });
        //here is where we destructure and save back to db;
       let holdingArray = [];
       //map through the members property 
       const teamMembers = teamDetails.members;
       teamMembers.map(({state, teamId, FT, AT, ST, cyclist})=>{
           const cyclistDetails = {
                teamId,
                state,
                time:{
                    st: ST,
                    ft: FT,
                    at: AT
                },
                members:cyclist
           }
           holdingArray.push(cyclistDetails);
       });
       //done with the loop
       const makeIsave = confirm('You are about to saved in the database.This is permanent. Are you sure?');
       if (!makeIsave){
           return;
       }
       Meteor.call("competition.saveTeamCyclistEvent", holdingArray,eventId,(error)=>{
            if (error){
                Bert.alert(error, 'danger')
            }
            else{
                //remove it here from the store
                const storeData = store.get('team');
                const remainingStore = storeData.filter((team)=>{
                    return team.eventId !== eventId;
                });
                //save new store
                store.set('team', remainingStore);
                this.setState({storeDataTeam: 
                               remainingStore,
                               showSelected:false});
                Bert.alert('Competition data saved successfully', 'success');
            }
       })
    }

    updateTeam(teamDetails){
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

    removeTeam(eventId, teamId){
        //event id here represents
        let storeData = store.get('team');
        //find the eventId
        const eventArray = storeData.find((arr)=>{
            return arr.eventId = eventId;
        });
        //find the member;
        const teamMembers = eventArray.members;
        const remainingTeam = teamMembers.filter((member)=>{
            return member.teamId !== teamId;
        });
        teamMembers.members = remainingTeam;
        //remove previous event
        const remainArray = storeData.filter((arr)=>{
            return arr.eventId !== eventId;
        });
        remainArray.push(teamMembers);
        store.set('team', remainArray);
        this.setState({storeDataTeam:store.get('team')});


    }



    render(){
        const { unFinishedCompetitionEntry } = this.props; 
        const {showSelected,route,eventId,numOfStarters,
               cyclistGender,finishedEnteringData,_id,
               numOfFinishers,competitionDate,
               individual,team,distance, eventType, storeDataTeam } = this.state;
        return(
            <div>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <p>Race <span>click on a route to add details</span></p>
                      {unFinishedCompetitionEntry && 
                       unFinishedCompetitionEntry.map((competition)=>{
                          return (
                           <p key={competition._id} className="compStyles" 
                                onClick={()=>this.showSelectedCompetition(competition)}>
                               {competition.route}
                           </p>
                          )
                      })}
                    
                    </Col>
                </Row>

                {showSelected ? (
                    
                    <div>

                     
                   
                    <Row>
                      <Col md={6} mdOffset={2}>
                      <Row>
                        <Col md={10}>
                        <Panel>
                         <Panel.Heading>Viewing: {route}</Panel.Heading>
                        <Panel.Body>
                          <p>Route:<Label>{route}</Label></p>
                          <p>Gender:<Label>{cyclistGender}</Label></p>
                          <p>Num of Starters:<Label>{numOfStarters}</Label></p>
                          <p>Num of Finishers:<Label>{numOfFinishers}</Label></p>
                          <p>Distance:<Label>{distance}</Label></p>
                          <p>
                             Date : <Label>{moment(competitionDate).format('MMMM DD YYYY')}</Label>
                         </p>

                        </Panel.Body>
                     </Panel>
                        </Col>
                     </Row>
                      
                         
                        
                         {eventType == "Team" ? (
                        
                            <Row>
                                <Col md={9}>
                                   <TeamEvent updateTeam={this.updateTeam} 
                                    eventId={this.state._id}  />
                                </Col>
                            </Row>
                             
                         ):
                         
                        
                        null}

                      </Col>


                    <Col md={3} mdOffset={1}>
                        {/*list the saved members list here */}
                        {eventType == "Team" ? (
                                <div className="displayTeamDiv">
                                  
                                    {FilterReturnStoredTeamArray(storeDataTeam, _id).length ?

                                    (
                                        <div>
                                             {FilterReturnStoredTeamArray(storeDataTeam, _id).map(({state,teamId,FT,AT,ST,cyclist})=>{
                                                 return (
                                                    <div key={teamId}>
                                                        <p>State: <Label bsStyle="info">{state}</Label></p>
                                                        
                                                        <p>FT:{FT}</p>
                                                        <p>AT:{AT}</p>
                                                        <p>ST:{ST}</p>
                                                        <div className="teamMembers">
                                                        <p>Team members</p>
                                                        {cyclist.map(({name,cyclistId,regNum})=>{
                                                            return(
                                                                <p key={cyclistId}>
                                                                    <span>Name: {name}</span><br/>
                                                                    <span>Reg: {regNum}</span>
                                                                </p>
                                                            )
                                                        })}
                                                        </div>
                                                        <Button bsSize="xs" className="pull-left" 
                                                           bsStyle="danger" onClick={()=>this.removeTeam(_id,teamId)}>
                                                            Remove Team
                                                        </Button>
                                                        <div className="clearfix"></div>
                                                        <hr/>
        
                                                    </div>
        
                                                )
                                             })}

                                                <Button bsStyle="success" 
                                                    onClick={()=>this.saveCyclistTeamData(_id)}>
                                                    Save Cyclist List
                                                </Button>
                                    
                                        </div>
                                    ): null}
                                    
                                   
                                  
                                </div>
                        )
                    
                    : null}


                    </Col>

                    </Row>

                    </div>

                ):
                
            
            
                null}

                
       
         
            </div>
        )
    }
}

export default AddCompetitionMembers;