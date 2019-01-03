    /* eslint-disable */
    import { Mongo } from 'meteor/mongo';
    import SimpleSchema from 'simpl-schema';
    


    const Event = new Mongo.Collection('Event');

    if ( Meteor.isServer ) {
      // Event._ensureIndex({ title: 1, authors: 1});
    }
    
    Event.allow({
      insert: () => false,
      update: () => false,
      remove: () => false,
    });

    Event.deny({
      insert: () => true,
      update: () => true,
      remove: () => true,
    });

    const EventSchema = new SimpleSchema({
       
      "type" : {
         type: String,
         label:'The Event type'
       },

       //event type represents whether team or individual event

       "eventName" : {
        type: String,
        label:'The event name'
      },
       
       "scoring" : {
        type: Object,
        label: 'The scoring of the event',
        optional: true
      },

      "scoring.first" : {
        type : Number ,
        label : 'scoring for first',
        optional : true ,
     },

     "scoring.second" : {
       type: Number,
       label: 'scoring for second',
       optional: true
     },

     "scoring.third" : {
      type: Number,
      label: 'scoring for third',
      optional: true
    },


});

Event.attachSchema( EventSchema );
export default Event;
