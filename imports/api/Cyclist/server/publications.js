    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
    import Cyclist from '../cyclist';
    import { Counts } from 'meteor/tmeasday:publish-counts';
   


    

     Meteor.publish('cyclist.getAllAthleteNames', function cyclistPublication() { 
        return Cyclist.find({}, {fields:{firstname: 1, surname:1}})
     });

     Meteor.publish('cyclist.getCyclistPoint', function CyclistPublication(limit) {         
      check(limit, Number);
      Counts.publish(this, 'cyclist.getCyclistPoint', 
                Cyclist.find({}), { noReady: true });
      return Cyclist.find({}, { limit: limit || 25 , sort: { points: -1 } });
   });


  






   

    
