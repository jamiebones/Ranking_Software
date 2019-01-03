    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check, Match } from 'meteor/check';
    import Events from './event'
   
    

    Meteor.methods({
        'event.saveNewEvent': function EventMethods(data){
            check(data, Object);
            console.log(data)
          //  try{
                return Events.insert(data)
            //}catch(e){
            //    throw new Meteor.Error(e,'Unable to add new events')
         //   }
        }
      
    
    });


   