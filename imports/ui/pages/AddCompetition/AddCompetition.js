import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TeamEvent from '../../components/TeamEvent/TeamEvent';
import autoBind from 'react-autobind';




class NewCompetition extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            team: [
                 {state:"",
                    ST:"",
                    teamId:"",
                    FT:"",
                    AT:"",
                    members:[
                        {name:"",
                        regNum:""}
                    ]
                  }
                ],
        }
        autoBind(this);
    }


    updateTeam(team){
        const {state,teamId,ST,FT,AT,members } = team;
        const teamDetails = {
            state,
            ST,
            teamId,
            FT,
            AT,
            members
        }
        let teamsInState = this.state.team;
        


    }

    


    render(){
        return (
            <Row>
              <Col md={8} mdOffset={2}>

                 <TeamEvent updateTeam={this.updateTeam} 
                   checkTeam={this.state.checkTeam}/>
             
              </Col>
            </Row>
        )
    }
}

export default NewCompetition;