
import Cyclist from '../../api/Cyclist/cyclist';
import Event from '../../api/Event/event';
import Competition from '../../api/Competition/competition';
import {_} from 'meteor/underscore';


const RankCyclist = ( options ) => {
  return new Promise((resolve , reject ) => {
    try {
        const { data } = options
        const arr = data;
        let sorted = arr.slice().sort(function(a,b){return a.time.at - b.time.at})
        let ranks = arr.slice().map(function(v){ return sorted.indexOf(v)+1 });
        let sortedArray = [];
        arr.map((cyclist,index) => {
            const obj = {
                    data:cyclist,
                    rank:ranks[index]
                  }
            sortedArray.push(obj)
            });
        const finalSort = sortedArray.slice().sort(function(a,b)
                          {return a.rank - b.rank})
        resolve(finalSort);
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
                const membersArray = cyclist.data.members;
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