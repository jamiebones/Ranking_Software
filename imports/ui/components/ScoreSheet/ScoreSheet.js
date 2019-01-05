
import React from 'react';
import { Table, Panel, Row, Col } from 'react-bootstrap';
import {sumMeUp} from '../../../modules/utilities';
import moment from 'moment';

class ScoreSheet extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const { team, competition:{eventType, route, distance, 
                                   numOfStarters, cyclistGender,
                                   numOfFinishers, competitionDate}={}, 
                                   events:{eventName}={} } = this.props;
        return (
            <div>

                <Panel>
                    <Panel.Body>
                        <Row>
                            <Col md={4}>
                                <p>Event: {eventName}</p>
                            </Col>

                            <Col md={4}>
                                <p>Category:{cyclistGender}</p>
                            </Col>

                            <Col md={4}>
                                <p>Route:{route}</p>
                            </Col>

                        </Row>
                        <Row>
                             <Col md={4}>
                                <p>Event Type: {eventType}</p>
                            </Col>

                            <Col md={4}>
                                <p>Num of Starters: {numOfStarters}</p>
                            </Col>

                            <Col md={4}>
                                <p>Num of Finishers: {numOfFinishers}</p>
                            </Col>
                           
                        </Row>
                        <Row>
                            <Col md={4}>
                               <p> Distance:{distance}</p>
                                <br/>
                                <p>Date:{moment(competitionDate).format("MMMM DD YYYY")}</p>
                            
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

            {team.map(({data:{teamId,state,time:{st,ft,at}, members} , rank}, index)=>{
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
                                <p>{st}</p>
                            </td>

                            <td>
                                <p>{ft}</p>
                            </td>

                            <td>
                                <p>{at}</p>
                            </td>

                            <td>
                                <p>{rank}</p>
                            </td>


                        </tr>
                    )
            })}
                </tbody>
            </Table>;

            </div>
        )
    }
}


export default ScoreSheet;