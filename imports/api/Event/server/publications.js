    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
    import Events from '../event';
    import Competition from '../../Competition/competition';
   
  
     Meteor.publish('events.getEventsByType', function papersPublication(type) {         
       check( type , Match.OneOf( String, null, undefined ));
       return [ Events.find({"type":type}),
                Competition.find({"finishedEnteringData": false})
             ]
     });

   

    
