/* eslint-disable */
import React from 'react';
import { Button , Row , Col, Media } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SEO from '../../components/SEO/SEO';
if (Meteor.isClient ) import './Index.scss';


const Index = (props) => (
  <div className="homePage">
    <SEO
     title={`Home page of EruditeScholars.net`}
     description={` Erudite Scholars is a world-class versatile online hub 
     that provides support and visibility to exciting researches
     published in journals and books in various sectors of Agriculture ,
     Science , Technology and Medicine. We exist to provide freely the dissemination of manuscripts 
     for teaching and reference purposes.Erudite Scholars aims at establishing
     disseminated knowledge and creates the medium of communication between
     experts in research for development, policy makers and executives in the 
     industries and institution.`}
     url={``}
     contentType="article"
    
   />
    
     <Row>
        <Col md={ 8 } sm={ 8 } lg={ 8 } xs={12}>
          
              

                  
      </Col>
     </Row>
     </div>
  
);

export default Index;
