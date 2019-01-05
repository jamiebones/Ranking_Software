import React from 'react'
import autoBind from 'react-autobind';
import DatePicker from 'react-datepicker';
import { Row, Col, FormGroup, ControlLabel, 
         Button, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
}




class CompetitionDetails extends React.Component{
    constructor(props){
        super(props);
        autoBind(this);
        this.state={
            submitted:false,
            competitionDate:moment(),
            gender:"",
            eventId:"",
            eventType:""
        }
    }

    handleDateChange(date) {
        this.setState({
          competitionDate: date
        });
      }

    handleGender(event){
        const gender = event.target.value;
        this.setState({gender});
    }

    handleEventName(event){
        const eventId = event.target.value;
        this.setState({eventId})
    }

    handleEventType(event){
        const eventType = event.target.value;
        this.setState({eventType});
        this.props.eventType(eventType);
    }


    saveNewCompetition(event){
        event.preventDefault();
        this.setState({submitted:!this.state.submitted});
        const {eventId, eventType, gender, competitionDate} = this.state;
        const starters = this.starters.value;
        const finishers = this.finishers.value;
        const route = this.route.value;
        const distance = this.distance.value;
        const dateOfComp = moment(competitionDate).format();

        const competionDetails = {
            eventId,
            route,
            distance,
            numOfStarters:starters,
            cyclistGender:gender,
            finishedEnteringData: false,
            numOfFinishers:finishers,
            competitionDate:dateOfComp,
            eventType
        }

        Meteor.call('competition.saveNewCompetition',competionDetails, 
         (error, response) =>{
            if( error ){
                Bert.alert(error, 'danger')
                this.setState({submitted:!this.state.submitted});
            }
            else{
                //clear the textbox;
                this.starters.value = "";
                this.finishers.value = "";
                this.route.value = "";
                this.route.value = "";
                this.setState({submitted:!this.state.submitted});
                this.props.changeTab('enterMembers');
            }
        })

    }
    

    render(){
        const { submitted } = this.state;
        const { eventName } = this.props;
    
        return(
            <div>
        
            
            <Form horizontal>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Event Type
                    </Col>
                    <Col sm={10}>
                       <FormControl componentClass="select" 
                        placeholder="select" 
                        onChange={event=>this.handleEventType(event)} 
                        ref={ eventType=>this.eventType = eventType }>
                            <option value="select">select</option>
                            <option value="Individual">Individual</option>
                            <option value="Team">Team</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Event Name
                    </Col>
                    <Col sm={10}>
                       <FormControl componentClass="select" 
                        placeholder="select" 
                        onChange={event=>this.handleEventName(event)} 
                        ref={ eventName=>this.eventName = eventName }>
                            <option value="select">select event name</option>
                            {eventName && eventName.map(({_id, eventName}) =>{
                             return(
                                <option value={_id} key={_id}>{eventName}</option>
                                )
                            })}
                    
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Route
                    </Col>

                    <Col sm={10}>
                        <input className="form-control" type="textarea" 
                            ref={ route=>(this.route = route )}/>
                    </Col>
                </FormGroup>


                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Distance
                    </Col>
                    <Col sm={6}>
                    <input className="form-control" type="text" 
                      ref={ distance=>( this.distance = distance )}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Num of Starters
                    </Col>
                    <Col sm={6}>
                    <input className="form-control" type="text" 
                      ref={ starters =>( this.starters = starters )}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Num of Finishers
                    </Col>
                    <Col sm={6}>
                    <input className="form-control" type="text" 
                      ref={ finishers =>( this.finishers = finishers )}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Cyclist Gender
                    </Col>
                    <Col sm={6}>
                      <FormControl componentClass="select" 
                        placeholder="select" 
                        onChange={event=>this.handleGender(event)} 
                        ref={ gender => this.gender = gender }>
                            <option value="select">select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </FormControl>
                    </Col>
                 </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Competition Date
                    </Col>
                    <Col sm={6}>
                    <DatePicker
                        selected={this.state.competitionDate}
                        onChange={this.handleDateChange}
                        className="form-control"
                        placeholderText="MM-DD-YYYY"
                        id="compDate"
                      />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit" 
                      onClick={(event)=>this.saveNewCompetition(event)}>
                      
                      {submitted ? "Saving competition-----"  : "Save New Competition"}
                      
                      </Button>
                    </Col>
                </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CompetitionDetails;