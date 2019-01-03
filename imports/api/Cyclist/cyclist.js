    /* eslint-disable */
    import { Mongo } from 'meteor/mongo';
    import SimpleSchema from 'simpl-schema';


    const Cyclist = new Mongo.Collection('Cyclist');

    if ( Meteor.isServer ) {
      // Cyclist._ensureIndex({ title: 1, authors: 1});
    }
    
    Cyclist.allow({
      insert: () => false,
      update: () => false,
      remove: () => false,
    });

    Cyclist.deny({
      insert: () => true,
      update: () => true,
      remove: () => true,
    });

    const CyclistSchema = new SimpleSchema({
       
      "firstname" : {
         type: String,
         label:'The cyclist first name'
       },

       "surname" : {
        type: String,
        label:'The cyclist surname'
      },
       
       "title" : {
         type: String,
         label: 'The cyclist title'
       },

       "contact" : {
        type: Object,
        label: 'The contact address of the cyclist',
        optional: true
      },

      "contact.email" : {
        type : String ,
        label : 'email address of the cyclist',
        optional : true ,
     },

     "contact.address" : {
      type : String ,
      label : 'contact address of the cyclist',
      optional : true ,
   },


     "contact.phone" : {
       type: Array,
       label: 'phone numbers of cyclist',
       optional: true
     },

     "contact.phone.$" : String , 

     "dob":{
       type: Date,
       label:"date of birth of cyclist",
       optional: true
     },

     "points":{
       type: Number,
       label:"the points of the cyclist",
       optional: true
     },

     "profileImage":{
        type: String,
        label: "base 64 image of the image",
        optional: true
     },

     "club":{
        type: String,
        label: "club of the cyclist",
        optional: true
     },

    // "clubHistory.club.$": Object,

    // "clubHistory.club.$.from" : {
    //  type : String , 
    //  label : 'club history from',
    // "clubHistory.club.$": Object,

   //  "clubHistory.club.$.from" : {
    //  type : String , 
    //  label : 'club history from',
    //  optional :   optional : true ,
    // },

    // "clubHistory.club.$.to" : {
    //  type : String , 
    //  label : 'club history to',
    //  optional : true ,
    // },

    // "clubHistory.club.$.clubName" : {
    //  type : String , 
     // label : 'date comment was made',
    //  optional : true ,
    // },
});

Cyclist.attachSchema( CyclistSchema );
export default Cyclist;
