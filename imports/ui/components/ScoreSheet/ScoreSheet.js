
import React from 'react';
import { Table, Panel, Row, Col, Button } from 'react-bootstrap';
import {sumMeUp, IncludeDots} from '../../../modules/utilities';
import { base64ToBlob } from '../../../modules/base64-to-blob.js';
import fileSaver from 'file-saver';
import styled from 'styled-components';
import moment from 'moment';



const ScoreSheetStyles = styled.div`
    .resultSpan{
        padding:5px;
    }






`

class ScoreSheet extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    downloadTeamResult(event , options ) {
            event.preventDefault();
            const { target } = event;
            target.innerHTML = '<em>downloading result...</em>';
            target.setAttribute('disabled' , 'disabled');
            Meteor.call('utility.generateTeamResult', options , 
            ( error, response ) => {
              if (error) { 
                Bert.alert(error.reason, 'danger');
                target.innerText = 'Download Result';
                target.removeAttribute('disabled');
               } else
              {
                const blob = base64ToBlob(response.base64);
                fileSaver.saveAs(blob, response.filename );
                target.innerText = 'Download Result';
                target.removeAttribute('disabled');
              }
            }); 
   }

    render(){
        const { team, competition:{eventType, route, distance, 
                                   numOfStarters, cyclistGender,
                                   numOfFinishers, competitionDate}={}, 
                                   events:{eventName}={} } = this.props;
        return (
            <ScoreSheetStyles>

                <Panel>
                    <Panel.Body>
                        <Row>
                            <Col md={4}>
                                <p>Event: <span className="resultSpan">{eventName}</span></p>
                            </Col>

                            <Col md={4}>
                                <p>Category:<span className="resultSpan">{cyclistGender}</span></p>
                            </Col>

                            <Col md={4}>
                                <p>Route:<span className="resultSpan">{route}</span></p>
                            </Col>

                        </Row>
                        <Row>
                             <Col md={4}>
                                <p>Event Type: <span className="resultSpan">{eventType}</span></p>
                            </Col>

                            <Col md={4}>
                                <p>Num of Starters: <span className="resultSpan">{numOfStarters}</span></p>
                            </Col>

                            <Col md={4}>
                                <p>Num of Finishers: <span className="resultSpan">{numOfFinishers}</span></p>
                            </Col>
                           
                        </Row>
                        <Row>
                            <Col md={4}>
                               <p> Distance:<span className="resultSpan">{distance}</span></p>
                                <br/>
                                <p>Date:<span className="resultSpan">{moment(competitionDate).format("MMMM DD YYYY")}</span></p>
                            
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>




              <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>S/N</th>
                    <th>NAME</th>
                    <th>STATE</th>
                    <th>REG/NO</th>
                    <th>S/T</th>
                    <th>F/T</th>
                    <th>A/T</th>
                    <th>POST</th>
                    </tr>
                </thead>
             
                <tbody>

            {team.map(({teamId,state,time:{st,ft,at}, members, rank}, index)=>{
                    return (
                        <tr key={sumMeUp(index, 9000)}>
                            <td>
                                <p>{1+index}</p>
                            </td>

                            <td>
                                {members.map(({name}, index)=>{
                                    return <p key={sumMeUp(index, 200)}>{name}</p>
                                })}
                            </td>

                            <td>
                                <p>{state}</p>
                            </td>

                            <td>
                                {members.map(({regNum}, index)=>{
                                    return <p key={sumMeUp(index, 1000)}>{regNum}</p>
                                })}
                            </td>

                            <td>
                                <p>{IncludeDots(st)}</p>
                            </td>

                            <td>
                                <p>{IncludeDots(ft)}</p>
                            </td>

                            <td>
                                <p>{IncludeDots(at)}</p>
                            </td>

                            <td>
                                <p>{rank}</p>
                            </td>


                        </tr>
                    )
            })}
                </tbody>
            </Table>

            <Button bsStyle="info" 
                    onClick={(event)=>this.downloadTeamResult(event,{
                    team, eventType, route, distance, 
                    numOfStarters, cyclistGender,
                    numOfFinishers, competitionDate, 
                    eventName,type:"Team"
            })}>
                Download Result
            </Button>

            </ScoreSheetStyles>
        )
    }
}


export default ScoreSheet;