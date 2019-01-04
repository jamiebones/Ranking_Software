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
       "eventType":{
         type: String,
         label:'the event type'
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

     "finishedEnteringData":{
        type: Boolean,
        label:"has data capture finished",
        defaultValue: false
     },

     "numOfFinishers":{
        type: Number,
        label: 'the number that finished',
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
     "individual.$": Object,
     //individual cyclist represents the array holding
     //the scores of the individual cyclist

     "individual.$.name": {
       type: String,
       label: "cyclist name",
       optional: true
     },

     "individual.$.cyclistId": {
      type: String,
      label: "cyclist id number",
      optional: true
    },

    "individual.$.regNum": {
      type: String,
      label: "reg number of the cyclist",
      optional: true
    },

    "individual.$.state": {
      type: String,
      label: "state of cyclist",
      optional: true
    },

    "individual.$.time": Object,

    "individual.$.time.hours": {
      type: String,
      label: "hours",
      optional: true
    },

    "individual.$.time.minutes": {
      type: String,
      label: "minutes",
      optional: true
    },

    "individual.$.time.seconds": {
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
   "team.$": Object,

   "team.$.teamId": {
    type: String,
    label: "teamId of the team",
    optional: true
  },

  "team.$.state": {
    type: String,
    label: "state of the team",
    optional: true
  },

  "team.$.time": Object,

  "team.$.time.st": {
    type: String,
    label: "S/T",
    optional: true
  },

  "team.$.time.ft": {
    type: String,
    label: "F/T",
    optional: true
  },

  "team.$.time.at": {
    type: String,
    label: "A/T",
    optional: true
  },

   "team.$.members": {
     type: Array,
     label: "array list of team members",
     optional: true
   },

  "team.$.members.$": Object,

  "team.$.members.$.name": {
    type: String,
    label: "name of the cyclist",
    optional: true
  },

  "team.$.members.$.regNum": {
    type: String,
    label: "reg number of cyclist",
    optional: true
  },

  "team.$.members.$.cyclistId": {
    type: String,
    label: "id of the cyclist",
    optional: true
  },

  
});

Competition.attachSchema( CompetitionSchema );
export default Competition;
