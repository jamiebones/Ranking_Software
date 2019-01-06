/* eslint-disable */
import React from 'react';
import { Button , Row , Col, Label } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SEO from '../../components/SEO/SEO';
import Loading from '../../components/Loading/Loading';
import Cyclist from '../../../api/Cyclist/cyclist';
import { withTracker } from 'meteor/react-meteor-data';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { ReactiveVar } from 'meteor/reactive-var';
import styled from "styled-components"


const ProfileStyles =  styled.div`
  .img-thumbnail{
    height: 100px;
    margin-bottom:5px;
  }

  .profileContainer{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 200px;
    margin: auto;
    text-align: center;
    margin-bottom: 20px;
  }

  span{
    padding: 5px;
  }

  .nameButton {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
  }

  .divTime{
    font-size:20px;
  }
`


class Index extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (( window.innerHeight + window.scrollY ) >= document.body.offsetHeight) {
        const currentLimit =  this.props.requestedProfile.get();
        if ( currentLimit < this.props.totalProfile ){
         this.props.requestedProfile.set(currentLimit + 25 );
        }
      }
    });
  }


  render(){
    const {loading, cyclist} = this.props;
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear()
    const months = ["January", "February", "March", "April", 
                    "May", "June","July", "August", 
                    "September", "October", "November", "December"]
    return(
      !loading ? (
        <ProfileStyles>
          <SEO
          title={`CFN Cyclist`}
          description={`Cycling Federation of Nigeria Cyclist ranking `}
          url={``}
          contentType=""
          
        />
        
         <Row>
            <Col md={ 12} sm={ 12 } lg={ 12 } xs={12}>
                 <div className="divTime text-center">
                      <p> Ranking of Cyclist by Cyclist Federation of Nigeria as at 
                        <span><i>{months[month]} {year}</i></span></p>
                 </div>
              {cyclist && cyclist.map(({title, firstname, surname, 
                                        points, profileImage, club}, index)=>{
                    
                 return(<Col md={3} xs={6} key={index}>
                          <div className="profileContainer">
                          {profileImage ? (
                             <img src={profileImage} 
                             className="img img-responsive img-thumbnail profileIndexImage" />
                          ) :
                          <img src="/image/noImage.png" 
                          className="img img-responsive img-thumbnail profileIndexImage"/>
                        }
                        
    
                          <p>Club: <span>{club}</span></p>
    
                          <p>Points: <span>{points}</span></p>
    
                          <p>Rank: <Label bsStyle="success"><span>{index + 1}</span></Label></p>

                          <p className="nameButton">{title} {firstname} {surname}</p>
    
                          </div>
                        </Col>
                        )
    
              })}
                  
    
                      
          </Col>
         </Row>
         </ProfileStyles>
      
      ):<Loading/>)
  }
}
  
let requestedProfile = new ReactiveVar(25)

export default withTracker(() => {
  if (Meteor.isClient) {
      const subscription = Meteor.subscribe('cyclist.getCyclistPoint', 
                           requestedProfile.get())
    return {
        loading: !subscription.ready(),
        cyclist :Cyclist.find({},{sort:{"points": -1}}).fetch(),
        requestedProfile,
        totalProfile: Counts.get('cyclist.getCyclistPoint')
    };
  }
  return { };
})( Index );

