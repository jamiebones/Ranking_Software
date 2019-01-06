
import Cyclist from '../../api/Cyclist/cyclist';
import Event from '../../api/Event/event';
import Competition from '../../api/Competition/competition';
import {_} from 'meteor/underscore';


const RankCyclist = ( options ) => {
  return new Promise((resolve , reject ) => {
    try {
        const {data} = options;
        let rankedData = data.map(function(item, i) {
          if (i > 0) {
              //Get our previous list item
              var prevItem = data[i - 1];
              if (prevItem.time.at == item.time.at) {
                  //Same score = same rank
                  item.rank = prevItem.rank;
              } else {
                  //Not the same score, give em the current iterated index + 1
                  item.rank = i + 1;
              }
          } else {
              //First item takes the rank 1 spot
              item.rank = 1;
          }
      
          return item;
      });
        
        resolve(rankedData);
      }
    catch (e){
        reject(e);
        console.log(e);
    }
    
  })
 }

 const SaveCyclistPoint = (sortedArray, options) => {
     return new Promise((resolve, reject)=>{
        try{
            //get the events and use the scoring point for
            //grading
            const  {eventId} = options
            const  competition = Competition.findOne(eventId);
            //get the scoring system
            //get the event
            const event = Event.findOne(competition.eventId);
            const {first, second, third } = event.scoring;

            //we will filter here to get 1 to 3
            const rankArray = sortedArray.filter((arr)=>{
                return arr.rank <= 3;
            });

            //map over this and assign the scores;
            rankArray.map((cyclist) =>{
                const membersArray = cyclist.members;
                const rank = cyclist.rank;
                if (rank == 1){
                    membersArray.map(({cyclistId})=>{
                        Cyclist.update(cyclistId, {$inc:{"points" : first}})
                    })
                }
                if (rank == 2){
                    membersArray.map(({cyclistId})=>{
                        Cyclist.update(cyclistId, {$inc:{"points" : second }})
                    })
                }
                if (rank == 3){
                    membersArray.map(({cyclistId})=>{
                        Cyclist.update(cyclistId, {$inc:{"points" : third}})
                    })
                }
                //loop through members array
               
            });
            resolve();
        } catch(e){
            reject(e);

        }
     })
 }


const SaveCyclistTeam = ( options ) => {
    //eventId represents the primary _id key here
    return new Promise((resolve , reject ) => {
      try {
          const {data, eventId} = options;
         resolve(Competition.update(eventId,{$set:{"team": data, 
                                                    "finishedEnteringData":true}
                                            })
                                            );
        }
      catch (e){
          reject(e);
          console.log(e);
      }
      
    })
   }
  

 export default sendInvoiceToAuthor = async ( options ) => {
   try {
    const sortedArray = await RankCyclist( options )
    await SaveCyclistPoint( sortedArray, options );
    SaveCyclistTeam( options );
    return 'Competition was saved successfully';
    
   } catch (error) {
     console.log(error);
     return error;
   }
}