const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
   .connect(url)
   .then(() => {
      console.log('connected to MongoDB');
   })
   .catch((error) => {
      console.log('Error connecting to MongoDB', error.message);
   });

const personSchema = new mongoose.Schema({
   name: {
      type: String,
      minLength: [3, 'Name must be 3+ characters'],
      required: true,
   },
   number: {
      type: String,
      validate: {
         validator: function (v) {
            let validator =
               (v[2] === '-' || v[3] === '-') && /\d{2,3}-\d{7,8}/.test(v);

            return validator;
         },
         // eslint-disable-next-line
         message: `number should be in this format "XX-XXXXXXX" or "XXX-XXXXXXXX"!`,
      },
      minLength: [
         8,
         // eslint-disable-next-line
         `number should be in this format "XX-XXXXXXX" or "XXX-XXXXXXXX"!`,
      ],
      maxLength: [
         12,
         // eslint-disable-next-line
         `"XX-XXXXXXX" or "XXX-XXXXXXXX" and max characters is 12!`,
      ],
      required: true,
   },
});

personSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
   },
});

module.exports = mongoose.model('Person', personSchema);
