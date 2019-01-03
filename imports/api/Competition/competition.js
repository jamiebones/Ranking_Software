    /* eslint-disable */
    import { Mongo } from 'meteor/mongo';
    import SimpleSchema from 'simpl-schema';
    
    const Competition = new Mongo.Collection('Competition');

    if ( Meteor.isServer ) {
      // Competition._ensureIndex({ title: 1, authors: 1});
    }
    
    Competition.allow({
      insert: () => false,
      update: () => false,
      remove: () => false,
    });

    Competition.deny({
      insert: () => true,
      update: () => true,
      remove: () => true,
    });

    const CompetitionSchema = new SimpleSchema({
      "eventId" : {
         type: String,
         label:'The id of the events'
       },
       "route" : {
        type: String,
        label:'The route of the competition',
        optional: true
      },
       "distance" : {
         type: String,
         label: 'The distance',
         optional: true
       },

       "numOfStarters" : {
        type: Number,
        label: 'The number of starters',
        optional: true
      },

      "cyclistGender" : {
        type : String ,
        label : 'sex of the cyclist',
     },

     "numOfFinishers":{
        type: Number,
        label: 'the number that finished',
        optional: true
     },

     "date" : {
       type: String,
       label: 'date of competition',
       optional: true
     },
     "competitionDate":{
       type: Date,
       label:"date of Competition",
       optional: true
     },
     "individual":{
        type: Array, 
        label: "array list of cyclist",
        optional: true
     },
     //individual cyclist represents the array holding
     //the scores of the individual cyclist
     "individual.cyclist.$": Object,

     "individual.cyclist.$.name": {
       type: String,
       label: "cyclist name",
       optional: true
     },

     "individual.cyclist.$.cyclistId": {
      type: String,
      label: "cyclist id number",
      optional: true
    },

    "individual.cyclist.$.regNum": {
      type: String,
      label: "reg number of the cyclist",
      optional: true
    },

    "individual.cyclist.$.state": {
      type: String,
      label: "state of cyclist",
      optional: true
    },

    "individual.cyclist.$.time": Object,

    "individual.cyclist.$.time.hours": {
      type: String,
      label: "hours",
      optional: true
    },

    "individual.cyclist.$.time.minutes": {
      type: String,
      label: "minutes",
      optional: true
    },

    "individual.cyclist.$.time.seconds": {
      type: String,
      label: "seconds",
      optional: true
    },

    //team event will be saved here

    "team":{
      type: Array, 
      label: "array list of team cyclist",
      optional: true
   },
   //individual cyclist represents the array holding
   //the scores of the individual cyclist
   "team.cyclist.$": Object,

   "team.cyclist.$.members": {
     type: Array,
     label: "array list of team members",
     optional: true
   },

  "team.cyclist.$.members.$": Object,

  "team.cyclist.$.members.$.name": {
    type: String,
    label: "name of the cyclist",
    optional: true
  },

  "team.cyclist.$.members.$.regNum": {
    type: String,
    label: "reg number of cyclist",
    optional: true
  },

  "team.cyclist.$.members.$.cyclistId": {
    type: String,
    label: "id of the cyclist",
    optional: true
  },

  "team.cyclist.$.teamId": {
    type: String,
    label: "teamId of the team",
    optional: true
  },

  "team.cyclist.$.state": {
    type: String,
    label: "state of the team",
    optional: true
  },

  "team.cyclist.$.time": Object,

  "team.cyclist.$.time.st": {
    type: String,
    label: "S/T",
    optional: true
  },

  "team.cyclist.$.time.ft": {
    type: String,
    label: "F/T",
    optional: true
  },

  "team.cyclist.$.time.at": {
    type: String,
    label: "A/T",
    optional: true
  },
});

Competition.attachSchema( CompetitionSchema );
export default Competition;
