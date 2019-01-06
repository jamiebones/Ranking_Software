    /* eslint-disable */
    import React from 'react';
    import autoBind from 'react-autobind';
    import PropTypes from 'prop-types';
    import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
    import { Grid } from 'react-bootstrap';
    import { Meteor } from 'meteor/meteor';
    import { Accounts } from 'meteor/accounts-base';
    import styled from 'styled-components';
    import { connect } from 'react-redux';
    import { compose } from 'redux';
    import { Roles } from 'meteor/alanning:roles';
    import Navigation from '../../components/Navigation/Navigation';
    //import Authenticated from '../../components/Authenticated/Authenticated';
    import Public from '../../components/Public/Public';
    import NormalRoute from '../../components/NormalRoute/NormalRoute';
    import Index from '../../pages/Index/Index';
    import NewEvent from '../../pages/AddNewEvent/AddNewEvent';
    import AddCompetition from '../../pages/AddCompetition/AddCompetition';
    import CyclistProfile from '../../pages/AddCyclistProfile/AddCyclistProfile';
    import CompetitionTab from '../../pages/CompetitionTab/CompetitionTab';
    import ScoreSheetPage from '../../pages/ScoreSheetPage/ScoreSheetPage';
    import ViewResult from '../../pages/ViewResult/ViewResult';
    import Notification from '../../../api/Notification/Notification';
    import Footer from '../../components/Footer/Footer';
    import AccountCreated from '../../components/AccountCreated/AccountCreated';
    import getUserName from '../../../modules/get-user-name';
    
    import Signup from '../../pages/Signup/Signup';
    import Logout from '../../pages/Logout/Logout';
    import Login from '../../pages/Login/Login';
    import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
    import ResetPassword from '../../pages/ResetPassword/ResetPassword';
    import LoginLayout from '../LoginLayout/LoginLayout';
    import AuthorizedLayout from '../AuthorizedLayout/AuthorizedLayout';
    
    import { onLogin, onLogout } from '../../../modules/redux/actions';
    import withTrackerSSR from '../../../modules/with-tracker-ssr';
   
    import NotFound from '../../pages/NotFound/NotFound';
    if (Meteor.isClient){
      import './App.scss';
    }
   
    


    const StyledApp = styled.div`
    visibility: ${props => (props.ready && !props.loading ? 'visible' : 'hidden')};
  
    > .container {
      margin-bottom: 80px;
      padding-bottom: 20px;
    }
  
    .verify-email {
      margin-bottom: 0;
      padding: 0;
      border-top: none;
      border-bottom: 1px solid #e7e7e7;
      background: #fff;
      color: var(--gray-dark);
      border-radius: 0;
  
      p {
        padding: 19px;
      }
  
      .btn {
        padding: 0;
      }
    }
  `;
  
   

    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = { ready: false, afterLoginPath: null };
        autoBind(this);
      }
    

      componentDidMount() {
        const { handleOnLogin, handleOnLogout } = this.props;
        Accounts.onLogin(() => handleOnLogin());
        Accounts.onLogout(() => handleOnLogout());
        this.setPageReady();
      }
    
      setPageReady() {
        this.setState({ ready: true });
      }
    
      setAfterLoginPath(afterLoginPath) {
        this.setState({ afterLoginPath });
      }
  
    render() {
      const { props, state, setAfterLoginPath } = this;
      return (
        
          <StyledApp ready={this.state.ready}> 
            
              <Navigation {...props} {...state} />
              <Grid fluid>
               <Switch>

                
               

                

               {/*  <Route path="/app" 
                  render={routeProps => <Authenticated component={LoginLayout} 
                                         {...routeProps} {...props} {...state}
                                         setAfterLoginPath={setAfterLoginPath}/> }
      />*/}

              
                <Route exact name="index" path="/" component={Index} />
              
                <Route exact name="view_result" path="/result/:route/:compId/:eventId" 
                    component={ViewResult} />

                <Route exact name="new_cyclist_profile" path="/new_cyclist_profile" component={CyclistProfile} />
                
                <Route exact name="add_competitio" path="/add_competition" 
                    component={CompetitionTab} />
                
                <Route exact name="create_event" path="/create_event" component={NewEvent} />

                <Route exact name="competion_sheets" path="/competition_results" 
                       component={ScoreSheetPage} />


                
                <Public path="/signup" component={Signup} {...props} {...state} />
                <Public path="/login" component={Login} {...props} {...state } />
                <Route exact path="/logout" render={routeProps => <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />} {...props} {...state} />
                
                <NormalRoute exact name="recover-password" path="/recover-password" component={RecoverPassword} {...props} {...state}/>
                <NormalRoute exact name="token" path="/reset-password/:token" component={ResetPassword} {...props} {...state} />
               
                 <Public path="/account_created" component={AccountCreated} {...props} />
                 <Route component={NotFound} />
              </Switch>
              </Grid>
              <Footer />
          </StyledApp>
      );
    }
  }
  
  App.defaultProps = {
    userId: '',
    emailAddress: '',
  };
  
  App.propTypes = {
    loading: PropTypes.bool.isRequired,
    userId: PropTypes.string,
    emailAddress: PropTypes.string,
    emailVerified: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    handleOnLogin: PropTypes.func.isRequired,
    handleOnLogout: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({ ...state });
  const mapDispatchToProps = dispatch => ({
    handleOnLogin: data => dispatch(onLogin(data)),
    handleOnLogout: data => dispatch(onLogout(data)),
  });
  
  //export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTrackerSSR(() => {
      const loggingIn = Meteor.loggingIn();
      const user = Meteor.user();
      const userId = Meteor.userId();
      const loading = !Roles.subscription.ready();
      const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
      const emailAddress = user && user.emails && user.emails[0].address;
      const notify = Meteor.subscribe("notification.getUnreadNotification");
      
      return {
        loading,
        loggingIn,
        authenticated: !loggingIn && !!userId,
        name: name || emailAddress,
        roles: Roles.getRolesForUser(userId),
        userId,
        unReadCount : notify.ready() && Notification.find({"for" : userId , 
                                        "read" : false}).count(),
        emailAddress,
        emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
      };
    }),
  )(App);



  