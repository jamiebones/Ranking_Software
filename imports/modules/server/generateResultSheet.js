/*eslint-disable */
import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf';
import fs from 'fs';
import TeamSheetGeneration from '../../ui/components/TeamSheetGeneration/TeamSheetGeneration';


let action;

const getBase64String = (path) => {
  try {
    const file = fs.readFileSync(path);
    return new Buffer(file).toString('base64');
  } catch (exception) {
    action.reject(exception);
  }
};



const generatePDF = ( html , fileName ) => {
  try {
      pdf.create(html , {
        format : 'Legal',
        orientation: 'landscape',
        border : {top: '0' , right:'0.6in',
                  bottom : '0' , left: '0.6in'},
      }).toFile(`./tmp/${fileName}` , ( error , response ) => {
         if ( error ){
           action.reject(`[Creating Pdf] || ${error}`)
         } else {
           action.resolve({filename : fileName , 
                           base64 : getBase64String(response.filename)});
           fs.unlink( response.filename, ()=>{});
         }
     });
    

  }
  catch ( exception ){
     logger.log('error' , `Error Generating Pdf || ${ exception }`);
     action.reject(`[Generating PDF Error] || ${exception}`);
  }
};


const getCertificateAsHTML = (options) => {
  try {
    const {team, eventType, route, distance, 
           numOfStarters, cyclistGender,
           numOfFinishers, competitionDate, 
           eventName, type} = options;
        if (type === "Team"){
            return ReactDOMServer.renderToStaticMarkup(
                TeamSheetGeneration({team, eventType, route, distance, 
                                     numOfStarters, cyclistGender, eventName,
                                     numOfFinishers, competitionDate })
            )
        }else{
            //return individual result sheet
            return;
        }
    
  } catch (exception) {
    action.reject(exception);
  }
};


const handler = ( options , promise ) => {
  action = promise;
  const html = getCertificateAsHTML( options );
  const fileName = `result_sheet.pdf`;
  if (html && fileName) generatePDF(html, fileName);
};

export default options =>
  new Promise((resolve, reject) =>
    handler(options, { resolve, reject }));