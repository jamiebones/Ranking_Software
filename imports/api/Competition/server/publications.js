    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
    import Competition from '../competition';


    Meteor.publish('competition.getCompetition', function competitionPublication(eventId) {         
      check( eventId , Match.OneOf( String, null, undefined ));
      return Competition.find({"finishedEnteringData": true,
                               "eventId": eventId  });     
    });
   
    

     


   

    
