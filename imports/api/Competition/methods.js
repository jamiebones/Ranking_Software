    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import Competition from './competition';
    import { check, Match } from 'meteor/check';
   
    

    Meteor.methods({
      'competition.saveNewCompetition' : function CompetitionMethods(competition){
        check(competition, Object);
        return Competition.insert(competition);
      }
  });


   