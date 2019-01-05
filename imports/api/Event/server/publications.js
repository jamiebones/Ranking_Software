    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
    import Events from '../event';
    import Competition from '../../Competition/competition';
   
  
     Meteor.publish('events.getEventsByType', function eventPublication(type) {         
       check( type , Match.OneOf( String, null, undefined ));
       return [ Events.find({"type":type}),
                Competition.find({"finishedEnteringData": false})
             ]
     });

     Meteor.publish('events.getEventsByTypeCompetition', function eventPublication(type) {         
      check( type , Match.OneOf( String, null, undefined ));
        return Events.find({"type":type})
    });

    Meteor.publish('events.getEventById', function eventPublication(eventId, compId) {         
      check( eventId , String);
      check( compId , String);
        return [ Events.find(eventId),
                 Competition.find(compId)
              ]
    });






     

   

    
