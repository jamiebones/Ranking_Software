    import React from 'react';
    import { Button , Row , Col ,Jumbotron } from 'react-bootstrap';
   

    const AccountCreated = ({ history }) => (
      <Row>
         <Col md={ 8 } mdOffset={2} sm={ 8 } smOffset={2} lg={ 8 } lgOffset={2}>
            <Row>
         <Jumbotron>
            <p>
              Hello , your account was created succesfully <br/>
              <Button bsStyle="primary" className="push-right"
              onClick={()=> history.push('/login')}
                >
                  Proceed To Login
              </Button>
            </p>
         </Jumbotron>
       </Row>
     </Col>
    </Row>
    )

    export default AccountCreated;
