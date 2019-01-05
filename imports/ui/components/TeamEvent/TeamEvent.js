
import React from 'react';
import autoBind from 'react-autobind';
import DatePicker from 'react-datepicker';
import { Row, Col, FormGroup, ControlLabel, 
         Button, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import { templateParser, templateFormatter, parseDigit } from 'input-format';
import {SetTransactionId, StatesInNigeria, sumMeUp } from '../../../modules/utilities';
import { ReactInput } from 'input-format';
import { Bert } from 'meteor/themeteorchef:bert';
import Cyclist from '../../../api/Cyclist/cyclist';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import Downshift from 'downshift';
import {_} from 'meteor/underscore';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
}



const StyledCyclist = styled.div`
       .smallInput {
           width: 40%
       }
      .downshift-dropdown {
        margin-left: 0.5px;
        width: 60%;
        border: 1px solid whitesmoke;
        border-bottom: none;
      }
      .dropdown-item {
        padding: 0.9rem;
        cursor: pointer;
        border-bottom: 1px solid whitesmoke;
        font-size: 1.3rem;
        text-align: left;
      }
      .dropdown-button {
        padding: 0.6rem;
        border-radius: 3px;
        background: white;
        cursor: pointer;
      }
`;




class TeamEventForm extends React.Component{
    constructor(props){
        super(props)
        const cyclist = props.cyclist || [];
        this.state = {
            cyclist,
            addingMembers: false,
            teamState: "",
            selectedMember:{},
            ST:null,
            FT:null,
            AT:null,
            team:{
              state:null,
              teamId:null,
              ST:null,
              FT:null,
              AT:null,
              cyclist:[]
            }
        }
        autoBind(this);
    }

    handleChange(event){
        const teamState = event.target.value;
        this.setState((state)=>{
            return {...state, teamState }
        })
    }

    handleST( value ) {
        let ST = this.state.ST;
        ST = value;
        this.setState({ST});
     }

     handleFT( value ) {
        let FT = this.state.FT;
        FT = value;
        this.setState({FT});
     }

     handleAT( value ) {
        let AT = this.state.AT;
        AT = value;
        this.setState({AT});
     }


     createTeam(event){
         event.preventDefault();
         //get the values and check if a team created 
         //already has members on it
         const { teamState, ST, FT, AT } = this.state;
         const teamId = SetTransactionId();
         const teamDetails ={
            state: teamState,
            teamId:teamId,
            eventId:this.props.eventId,
            ST,
            FT,
            AT,
            cyclist:[]
         }
             this.setState({team:teamDetails, 
                            addingMembers:true});
             
             this.props.updateTeam(teamDetails);
     }

     onChange(selectedCyclist) {
        this.setState({
            selectedMember:selectedCyclist
        });
    }

    clearTeamData(){
        this.setState({selectedMember:{},
            addingMembers:false,
            team:{
                state:null,
                teamId:null,
                eventId:null,
                ST:null,
                FT:null,
                AT:null,
                cyclist:[]}
        });
    }

    saveTeamMembers(event){
        event.preventDefault();
        //get selected members
        const {firstname, surname, _id } = this.state.selectedMember;
        const regNum = this.regNum.value;
        if(regNum == "" || regNum == undefined){
            alert('Please add the registration number');
            return;
        }
        if ( firstname && surname ){
            const confirmMe = confirm(`Adding cyclist ${firstname} ${surname}`);
            if ( confirmMe ){
                const { team }= this.state;
                let members = team.cyclist;
                //check if the members array already contain
                //a member id
                const memberExist = _.find(members, (member)=>{
                    return member.cyclistId === _id;
                })
                if (memberExist){
                    //we have a member already
                    alert(`${firstname} ${surname} already added to this team`);
                    this.setState({selectedMember:{}});
                    this.regNum.value = "";
                    return;
                }

                members.push({
                    name:firstname + " " + surname,
                    regNum,
                    cyclistId:_id
                })
                team.cyclist = members;
                //set state and clear selectedMembers
                this.setState({team, selectedMember:{}});
                this.regNum.value = "";
                this.props.updateTeam(team);
            }
        }
    }


    render(){
        const {loading} = this.props;
        const {addingMembers} = this.state;
        const cyclistNames = this.state.cyclist;
        const TEMPLATE = 'xx:xx:xx';
        const parse = templateParser(TEMPLATE, parseDigit);
        const format = templateFormatter(TEMPLATE);
        return (!loading ? (
           
            <div>
            { addingMembers == false ? (
                <div>

                    <FormGroup>
                         <ControlLabel>Select State</ControlLabel>
                            <FormControl componentClass="select" 
                             placeholder="select" onChange={event=>this.handleChange(event)} 
                             ref={ teamState =>this.teamState = teamState }>
                             <option value="select">select</option>
                             {StatesInNigeria().map(({state_name},index)=>{
                                 return(
                                  <option value={state_name} key={index}>{state_name}</option>
                                 )
                             })}
                            </FormControl>
                     </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>S/T</ControlLabel>
                                        <ReactInput
                                            value={this.state.ST}
                                            onChange={( value )=> this.handleST( value )}
                                            className="form-control"
                                            parse={parse}
                                            format={format} 
                                            placeholder="00:00:00"
                                            />
                                    </FormGroup>


                                <FormGroup>
                                    <ControlLabel>F/T</ControlLabel>
                                        <ReactInput
                                            value={this.state.FT}
                                            onChange={( value )=> this.handleFT( value )}
                                            className="form-control"
                                            parse={parse}
                                            format={format} 
                                            placeholder="00:00:00"
                                            />
                                </FormGroup>


                                <FormGroup>
                                    <ControlLabel>A/T</ControlLabel>
                                        <ReactInput
                                            value={this.state.AT}
                                            onChange={( value )=> this.handleAT( value )}
                                            className="form-control"
                                            parse={parse}
                                            format={format} 
                                            placeholder="00:00:00"
                                            />
                                </FormGroup>

                                <FormGroup>
                                    <Button bsStyle="success" 
                                      onClick={(event)=>this.createTeam(event)}>
                                            Create New Team
                                    </Button>
                                </FormGroup>

                </div>
            ): 
            <div>

               <p>Please add members to {this.state.teamState} team</p> 

                <Row>
                <fieldset className="col-xs-9">    	
					<legend>Add Members</legend>
                   <StyledCyclist>
                    <FormGroup>
                        <Downshift onChange={this.onChange} 
                             itemToString={cyclist => (cyclist ? `${cyclist.firstname} ${cyclist.surname}` : '')}>
                      
                        {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, selectedItem, getLabelProps }) => (
                            <div>
                            <label style={{ marginTop: '1rem', display: 'block' }} 
                              {...getLabelProps()}>
                              Select a cyclist
                            </label> 
                        
                            <input {...getInputProps({ placeholder: "Search cyclist list..." })} 
                                   className="form-control" id="authorInput"/>
                        
                            {isOpen ? (
                                <div className="downshift-dropdown">
                                {
                                    // filter the cyclist and return items that match the inputValue
                                    this.props.cyclist
                                    .filter(item => !inputValue || item.firstname.toLowerCase().includes(inputValue.toLowerCase()))
                                    // map the return value and return a div
                                    .map((item, index) => (
                                        <div
                                            className="dropdown-item"
                                            {...getItemProps({ key: (sumMeUp(index, 3233)), index, item })}
                                            style={{
                                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            }}>
                                          {item.firstname} {item.surname}
                                      </div>
                                    ))
                                }
                                </div>
                            ) : 
                               null
                             }
                            </div>
                        )}
                  </Downshift>
                </FormGroup>
                </StyledCyclist>
           
              
                <FormGroup>
                  <ControlLabel>Reg Num</ControlLabel>
                  <input
                    type="text"
                    name="second"
                    ref={regNum => (this.regNum = regNum)}
                    className="form-control"
                  />
                  
                </FormGroup>

                <Button className="pull-left" 
                  bsSize="xs" bsStyle="danger" 
                  onClick={()=>this.clearTeamData()}>
                    Finish 
                </Button>

                <Button className="pull-right" 
                   bsSize="xs" bsStyle="success" 
                   onClick={(event)=>this.saveTeamMembers(event)}>
                    Add team Member
                </Button>
                
			</fieldset>	
            
              
            </Row>
            </div>
        }

        </div>):null )
    }

}


  export default withTracker(() => {
      let subscription;
      if (Meteor.isClient){
        subscription = Meteor.subscribe('cyclist.getAllAthleteNames');
      }
    
    return {
        loading: subscription && !subscription.ready(),
        cyclist: Cyclist.find({},{sort:{"surname":1}}).fetch()
      };
  })(TeamEventForm);
