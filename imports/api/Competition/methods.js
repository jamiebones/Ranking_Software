    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import Competition from './competition';
    import { check, Match } from 'meteor/check';
    import RankingTeamCyclist from '../../modules/server/rankCyclist';

   
    

    Meteor.methods({
      'competition.saveNewCompetition' : function CompetitionMethods(competition){
        check(competition, Object);
        return Competition.insert(competition);
      },

      "competition.saveTeamCyclistEvent" : function CompetitionMethods(members, eventId){
          check(members, Array);
          check(eventId, String);
          const obj = {
              data: members,
              eventId
          }
          return RankingTeamCyclist( obj ).then( (response) => {
            return response;
         }).catch( (error) => {
           throw new Meteor.Error( '500' , `${ error }`)
         })
         
      }
  });

  
   