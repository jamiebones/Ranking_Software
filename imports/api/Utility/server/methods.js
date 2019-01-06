  import { Meteor } from 'meteor/meteor';
  import { check } from 'meteor/check';
  import GenerateResultSheet from '../../../modules/server/generateResultSheet';
  


  Meteor.methods({
    'utility.generateTeamResult' : function utilityGenerateCertificate( options ){
          check( options , Object );
          return GenerateResultSheet(options).then(( response ) => {
                                        return response;
                                     }).catch( (error) => {
                                       console.log('error' , `[utility.generatePDF] || ${error}`);
                                       throw new Meteor.Error( '500' , `${ error }`)
                            })
          },
     });
  
    