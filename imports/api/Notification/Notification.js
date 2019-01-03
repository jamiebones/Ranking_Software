import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


const Notification = new Mongo.Collection('Notification');

Notification.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Notification.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const NotificationSchema = new SimpleSchema({
   message : {
     type: String,
     label:'The message sent to the receipent'
   },
   for: {
     type: String,
     label: 'The person the message for'
   },
   from: {
     type: String,
     label: 'The person sending the message'
   },
   read : {
     type: Boolean,
     label: 'The message flag',
     defaultValue : false,
   },
   date: {
   type: String,
   label: 'date the message was sent',
   autoValue() {
     if (this.isInsert){
       return (new Date()).toISOString();
     }
   },
 },
});

Notification.attachSchema( NotificationSchema );
export default Notification;
