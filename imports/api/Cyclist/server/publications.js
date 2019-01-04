    /* eslint-disable */
    import { Meteor } from 'meteor/meteor';
    import { check , Match } from 'meteor/check';
    import Cyclist from '../cyclist'
   


    

     Meteor.publish('cyclist.getAllAthleteNames', function cyclistPublication() { 
        return Cyclist.find({}, {fields:{firstname: 1, surname:1}})
     });

     Meteor.publish('papers.findProxyPaperUploaded', function papersPublication() {         
        return 
   });







   

    
