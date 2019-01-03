   import { Meteor } from 'meteor/meteor';
   import {_} from 'meteor/underscore';
   import moment from 'moment';

    export const Capitalize = ((word) => {
      if ( word ) {
        return word.toUpperCase();
      }
      return null
     
    });

    export const GetNameFromUserId = (( userId) => {
        const user = Meteor.users.find( userId ).fetch();
        if ( user.length > 0 ){
            return `${user[0].profile.title} ${user[0].profile.name.first} ${user[0].profile.name.last}`
        }
    });

    export const GetNameDetailsObjectFromId = (( ) => {
      const user = Meteor.user();
          return {
            title : user && user.profile.title || '',
            firstname : user && user.profile.name.first,
            surname : user && user.profile.name.last,
            rank : 1 , 

          }
  });

    export const GetEmailFromUserId = (( userId) => {
        const user = Meteor.users.find( userId ).fetch();
        if ( user.length > 0 ){
            return ` ${user[0].emails[0].address}`
        }
    });

    export const SetTransactionId = () => {
        const date = new Date();
        const alphabet = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
        let text = "";
        const components = [
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              date.getSeconds(),
              date.getMilliseconds()
            ];
        for (let i=0; i < 2; i++){
           text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }
        const id = components.join("");
        return (id + text);
    }

    export const sumMeUp = ( firstitem , seconditem ) => {
       let sum = parseFloat(firstitem) + parseFloat(seconditem) ;
       return sum;
    }

    export const subtractMe = ( firstitem , seconditem ) => {
      let value = parseFloat(seconditem) - parseFloat(firstitem) ;
      return value;
   }


   
    

    export const Title = ( ) => {
      const title = [
        "Mr" , "Mrs" ,   
        "Dr" , "Dr(Mrs)" ,
        "Engr" , "Engr(Mrs)",
        "Prof" , "Arch"
      ]
      return title;
   }

   
    export const capFirstLetter = ( word ) => {
      if ( word ){
        const first = word.charAt(0).toUpperCase();
        const rest = word.slice(1);
        return first+rest
      }
   }

   export const capAllFirstLetter = ( word ) => {
     if ( word ){
       const arr = word.split(" ");
       let capWord = "";
       for (let i=0; i < arr.length; i++){
           let firstWord = arr[i];
           firstWord = firstWord.charAt(0).toUpperCase();
           let remainWord = arr[i].slice(1);
           capWord += firstWord + remainWord + " "
       }
        return capWord.trim();
     }

   }

export const GetAllUserRoles = ( userId ) => {
   return Roles.getRolesForUser( userId )
}

export const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export const CompareValues = ( key , order='asc' ) => {
  return function( a , b ){
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)){
      return 0
    }
    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if ( varA > varB ) {
      comparison = 1;
    }else if (varA < varB) {
      comparison = -1;
    }
    return (
       (order == 'desc') ? (comparison * -1 ) : comparison
    )
  }

}

export const RemoveSpaces = ( word ) => {
  if ( word ) {
    let replaceSpace = word.replace(/ /g, '_').replace(/\(/g , "").replace(/\)/g,"");
    return replaceSpace;
  }
  
}

export const ReplaceSpace = ( word ) => {
  if ( word ) {
    let replaceWord = word.replace(/_/g, ' ');
    return replaceWord;
  }
  
}



export const setInputHeight = ( defaultHeight, element ) => {
  if (element) {
    // Support passing an event and a raw element from refs;
    const target = element.target ? element.target : element;
    target.style.height = `${defaultHeight}px`;
    target.style.height = `${target.scrollHeight}px`;
  }
}


export const StripHtml = ( html ) => {
  if (Meteor.isClient){
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || ""
  }
   
}







