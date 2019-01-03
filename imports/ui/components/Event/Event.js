import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button, FormControl  } from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import autoBind from 'react-autobind';
import { Bert } from 'meteor/themeteorchef:bert';
if (Meteor.isClient){
    import './Event.scss';
}



class NewEvent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            submitted: false,
            eventType:""
        }
        autoBind(this);
    }


    handleChange(event){
        const eventType = event.target.value;
        this.setState({"eventType" : eventType})
    }


    saveNewEvent(event){
        event.preventDefault();
        const eventType = this.state.eventType;
        const eventName = this.eventName.value;
        const first = this.first.value;
        const second = this.second.value;
        const third = this.third.value;

        const data = {
            type: eventType,
            eventName: eventName,
            scoring:{
                first,
                second,
                third
            }
        }
        this.setState({submitted:!this.state.submitted})

        Meteor.call('event.saveNewEvent' , data, (error, response) =>{
            if( error ){
                Bert.alert(error, 'danger');
                this.setState({submitted:!this.state.submitted})
            }
            else{
                //clear the textbox;
                //this.eventType.
                Bert.alert('Cycling event created', 'success');
                this.setState({submitted:!this.state.submitted})
                this.eventName.value = "";
                this.first.value = "";
                this.second.value = "";
                this.third.value = "";

            }
        })

    }


    render(){
        return (
           <div>
             <Row>
               <Col md={6}>
              <FormGroup controlId="formControlsSelect">
                 <ControlLabel>Select Event Type</ControlLabel>
                    <FormControl componentClass="select" 
                       placeholder="select" onChange={event=>this.handleChange(event)} 
                       ref={eventType=>this.eventType = eventType}>
                        <option value="select">select</option>
                        <option value="Individual">Individual Events</option>
                        <option value="Team">Team Events</option>
                    </FormControl>
              </FormGroup>

                <FormGroup>
                  <ControlLabel>Event Name</ControlLabel>
                   <input
                    type="text"
                    name="eventName"
                    ref={eventName => (this.eventName = eventName)}
                    className="form-control"
                  />
                </FormGroup>
                </Col>
                </Row>

            <Row>
            <fieldset className="col-xs-9">    	
					<legend>Scoring</legend>
                    <Col xs={3}>
                <FormGroup>
                  
                  <input
                    type="text"
                    name="first"
                    ref={first => (this.first = first)}
                    className="form-control"
                  />
                  <ControlLabel>First</ControlLabel>
                </FormGroup>
              </Col>
              <Col xs={3}>
                <FormGroup>
                  
                  <input
                    type="text"
                    name="second"
                    ref={second => (this.second = second)}
                    className="form-control"
                  />
                  <ControlLabel>Second</ControlLabel>
                </FormGroup>
                </Col>

                <Col xs={3}>
                <FormGroup>
                  <input
                    type="text"
                    name="third"
                    ref={third => (this.third = third)}
                    className="form-control"
                  />
                   <ControlLabel>Third</ControlLabel>
                </FormGroup>
              </Col>
					
					
					
			</fieldset>	
            
              
            </Row>

              <Button type="submit" bsStyle="success" 
                 onClick={(event)=>this.saveNewEvent(event)} 
                disabled={this.state.submitted ? true : false }>
                 {this.state.submitted ? "Please wait....." : "Create new event" }
              </Button>
            </div>
           
        )
    }
}

export default NewEvent