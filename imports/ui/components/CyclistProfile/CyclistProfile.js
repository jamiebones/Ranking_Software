import React from 'react'
import autoBind from 'react-autobind';
import DatePicker from 'react-datepicker';
import { Row, Col, FormGroup, ControlLabel, 
         Button, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
import { templateParser, templateFormatter, parseDigit } from 'input-format';
import { ReactInput } from 'input-format';
if (Meteor.isClient){
    import "react-datepicker/dist/react-datepicker.css";
    import './CyclistProfile.scss';
}




class CyclistProfile extends React.Component{
    constructor(props){
        super(props);
        autoBind(this);
        this.state={
            phoneNumbers:[],
            dob: moment(),
            profileImage:"",
            phone:"",
            submitted:false
        }
    }

    handlePhoneNumberChange( value ) {
        let phone = this.state.phone;
        phone = value;
        this.setState({phone});
     }

    handleDateChange(date) {
        this.setState({
          dob: date
        });
      }

    handleChange(event){
        const title = event.target.value;
        this.setState({title});
    }



    showImage(src, target, callback){
        const fileReader = new FileReader();
        fileReader.onload = function(){
            target.src = fileReader.result;
            callback(fileReader.result);
        }
        fileReader.readAsDataURL(src.files[0])
    }

    callback(image){
        this.setState({profileImage: image });
    }

    putImage() {
        const src = document.getElementById("select_image");
        const target = document.getElementById("target");
        this.showImage(src, target, this.callback);
    }

    savePhoneContact(event){
        event.preventDefault();
        const number = this.state.phone;
        let phoneNumbers = this.state.phoneNumbers;
        phoneNumbers.push(number)
        this.setState((state)=>{
            return { ...state, phoneNumbers, phone:"" }
        })
    }

    removeContact(number){
        let phoneNumbers = this.state.phoneNumbers;
        let newPhones = phoneNumbers.filter((phone)=>{
            return phone !== number;
        });
        this.setState({phoneNumbers: newPhones});
    }


    saveNewCyclistProfile(event){
        event.preventDefault();
        const firstname = this.firstName.value;
        const surname = this.surname.value;
        const address = this.address.value;
        const phone = this.state.phoneNumbers;
        const email = this.email.value;
        const title = this.state.title;
        const club = this.clubName.value;
        const profileImage = this.state.profileImage;
        const dob = moment(this.state.dob).format();
        const imageTag = document.getElementById("target");
        const fileTag = document.getElementById("select_image");
        const profile = {
            firstname,
            surname,
            title,
            dob,
            profileImage,
            club,
            contact:{
                email,
                phone,
                address
            }
        }
        this.setState({submitted:!this.state.submitted})
        Meteor.call('cyclist.saveCyclistProfile',profile, (error, response) =>{
            if( error ){
                Bert.alert(error, 'danger')
            }
            else{
                //clear the textbox;
                //this.eventType.
                Bert.alert('Cyclist profile created', 'success');
                this.setState({submitted:!this.state.submitted,
                                phone:"",
                                phoneNumbers:[],
                                profileImage:""
                            });
                imageTag.src = "";
                fileTag.value = "";
                this.firstName.value = "";
                this.surname.value = "";
                this.address.value = "";
                this.email.value = "";
                this.clubName.value = "";
            }
        })

    }
    

    render(){
        const { phoneNumbers, submitted } = this.state;
        const TEMPLATE = 'xxx-xxxx-xxxx';
        const parse = templateParser(TEMPLATE, parseDigit);
        const format = templateFormatter(TEMPLATE)
        return(
            <div>
              <Row>
                <Col md={4} mdOffset={2}>
                  <img id="target" className="img img-responsive img-thumbnail profileImage" />
                </Col>
              </Row>
            
            <Form horizontal>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Profile Image
                    </Col>
                    <Col sm={10}>
                      <input id="select_image" name="image" 
                        className="input-file" type="file" 
                        onChange={(event)=>this.putImage(event)}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Title
                    </Col>

                    <Col sm={10}>
                        <FormControl componentClass="select" 
                        placeholder="select" onChange={event=>this.handleChange(event)} 
                        ref={ title=>this.title = title }>
                            <option value="select">select</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                        </FormControl>
                    </Col>
              
                    
              </FormGroup>


                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       First Name
                    </Col>
                    <Col sm={10}>
                    <input className="form-control" type="text" 
                            ref={ firstName=>(this.firstName = firstName )}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Surname
                    </Col>
                    <Col sm={10}>
                    <input className="form-control" type="text" 
                            ref={ surname=>(this.surname = surname )}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Contact Address
                    </Col>
                    <Col sm={10}>
                    <input className="form-control" type="textarea" 
                            ref={ address=>(this.address = address )}/>
                    </Col>
               </FormGroup>

               <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Email
                    </Col>
                    <Col sm={10}>
                    <input className="form-control" type="email" 
                        ref={ email =>(this.email = email )}
                    />
                    </Col>
               </FormGroup>

                <FormGroup>
                   <Col componentClass={ControlLabel} sm={2}>
                       Phone Number(s)
                    </Col>
                    <Col md={10}>
                        <InputGroup>
                          <ReactInput
                            value={this.state.phone}
                            onChange={( value )=> this.handlePhoneNumberChange( value )}
                            className="form-control"
                            parse={parse}
                            format={format} 
                            placeholder="000-0000-0000"
                             />
                        <InputGroup.Button>
                            <Button onClick={event=>this.savePhoneContact(event)}>
                                Add phone number
                            </Button>
                        </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col md={10} mdOffset={2}>
                     <div className="phoneNumbers">
                      {phoneNumbers.length ?
                        <div>
                        {phoneNumbers && phoneNumbers.map((number, index)=>{
                            return(
                            <p key={index} onClick={()=>this.removeContact(number)}>
                                {number}
                            </p>
                        )
                        })}
                        <HelpBlock>
                           Click on the phone number to remove it.
                        </HelpBlock>
                    </div>
                        : null}
                    </div>
                    
                    </Col>
                </FormGroup>



                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      Date of Birth
                    </Col>
                    <Col sm={10}>
                    <DatePicker
                        selected={this.state.dob}
                        onChange={this.handleDateChange}
                        className="form-control"
                        placeholderText="MM-DD-YYYY"
                        id="dob"
                      />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                       Club
                    </Col>
                    <Col sm={10}>
                       <input className="form-control" type="text" 
                         ref={ clubName=>(this.clubName = clubName )}/>
                    </Col>
                </FormGroup>


                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit" 
                      onClick={(event)=>this.saveNewCyclistProfile(event)}>
                      
                      {submitted ? "Saving profile-----"  : "Save Cyclist Profile"}
                      
                      </Button>
                    </Col>
                </FormGroup>
                </Form>;
            </div>
        )
    }
}

export default CyclistProfile;