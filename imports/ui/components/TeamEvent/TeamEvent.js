
import React from 'react';
import autoBind from 'react-autobind';
import DatePicker from 'react-datepicker';
import { Row, Col, FormGroup, ControlLabel, 
         Button, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
import { templateParser, templateFormatter, parseDigit } from 'input-format';
import {SetTransactionId} from '../../../modules/utilities';
import { ReactInput } from 'input-format';
import { Bert } from 'meteor/themeteorchef:bert';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
}



class TeamEventForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            addingMembers: false,
            teamState: "",
            ST:null,
            FT:null,
            AT:null,
            team:{
              state:null,
              teamId:null,
              ST:null,
              FT:null,
              AT:null,
              members:[]
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

     toggleForm(){

     }

     createTeam(event){
         event.preventDefault();
         //get the values and check if a team created 
         //already has members on it
         const { teamState, ST, FT, AT, team } = this.state;
         const teamId = SetTransactionId();
         const teamDetails ={
            state: teamState,
            teamId:teamId,
            ST,
            FT,
            AT,
            members:[]
         }


         //check if we have any member in the team;
         //if ( team.state !== ""){
            //we have a team here
         //   switch(members.length){
          //      case members.length == 0:
          //      alert('Please add members to the created team, before creating another team')
           //     break;
           //     case members.length > 1:
           //     const confirm = confirm(`Are you done adding members to your team.
             //                           You have ${members.length} in your team`);
          //      if ( confirm ){
                    //create a new team
           //         this.setState({team:{...team, teamId}});
            //        this.props.updateTeam({...team, teamId});
             //   }
             //   break;
          //  }
        /// }else{
             this.setState({teamDetails, addingMembers:true});
             this.props.updateTeam({teamDetails});
        // }

     }


    render(){
        const {updateTeam} = this.props;
        const {addingMembers} = this.state;
        const TEMPLATE = 'xx:xx:xx';
        const parse = templateParser(TEMPLATE, parseDigit);
        const format = templateFormatter(TEMPLATE);
        return (
            <div>
               
               
            <div>

            { addingMembers == false ? (
                <div>

                    <FormGroup>
                         <ControlLabel>Select State</ControlLabel>
                            <FormControl componentClass="select" 
                             placeholder="select" onChange={event=>this.handleChange(event)} 
                             ref={ teamState =>this.teamState = teamState }>
                             <option value="select">select</option>
                             <option value="Edo">Edo</option>
                             <option value="Delta">Delta</option>
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
                                    <Button onClick={(event)=>this.createTeam(event)}>
                                            Create New Team
                                    </Button>
                                </FormGroup>

                </div>
            ): `Please add members to ${this.state.teamState} team`}

             

              <Row>
                <fieldset className="col-xs-9">    	
					<legend>Add Members</legend>
                
                <FormGroup>
                <ControlLabel>Name</ControlLabel>
                  <input
                    type="text"
                    name="first"
                    ref={first => (this.first = first)}
                    className="form-control"
                  />
                  
                </FormGroup>
           
              
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
                  onClick={()=>this.setState({"addingMembers":false})}>
                    Finish 
                </Button>

                <Button className="pull-right" 
                   bsSize="xs" bsStyle="success">
                    Add team Member
                </Button>
                
			</fieldset>	
            
              
            </Row>
            
            </div>

            </div>
        )
    }

}



export default TeamEventForm;