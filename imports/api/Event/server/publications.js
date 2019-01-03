    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
   
    import { Roles } from 'meteor/alanning:roles';
    //import {Match} from 'meteor/check'


    

     Meteor.publish('papers.convertPaperToPdfAdmin', function papersPublication() {         
          return 
     });

     Meteor.publish('papers.findProxyPaperUploaded', function papersPublication() {         
        return 
   });


     Meteor.publish('papers.searchJournalsPapers', function( search ) {
        check( search , Match.OneOf( String, null, undefined ) );
        let query      = { "pdf" : {$exists : true , $ne: null }},
            projection = { limit: 3, sort: { title: 1 } };
      
        if ( search ) {
          let regex = new RegExp( search, 'i' );
          query = {
            $or: [
              { title: regex },
              { authors: {$elemMatch : {"surname" : regex} }}
            ]
          };
      
          projection.limit = 10;
        }
      
        return 
      });





   

    
