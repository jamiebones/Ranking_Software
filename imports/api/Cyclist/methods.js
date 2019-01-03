    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check, Match } from 'meteor/check';
    import CyclistProfile from './cyclist';
   
    

    Meteor.methods({
      'cyclist.saveCyclistProfile': function cyclistMethod(profile){
          check(profile, Object);
          return CyclistProfile.insert(profile);
      }
    });


   