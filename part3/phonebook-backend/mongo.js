const mongoose = require('mongoose');

if (process.argv.length < 3) {
   console.log(
      'Please provide the password as an argument: node mongo.js <password>'
   );
   process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://ubsly:${password}@nodeexpressprojects.zf3tp45.mongodb.net/PHONEBOOK-APP?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
   name: String,
   number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose
   .connect(url)
   .then(() => {
      console.log('connected');
      const name = process.argv[3];
      const number = process.argv[4];

      if (name && number) {
         const person = new Person({
            name,
            number,
         });

         return person.save().then(() => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close();
            console.log('completed');
         });
      }

      if (process.argv.length === 4) {
         console.log('some parameters are missing');
         mongoose.connection.close();
         console.log('completed');
      }

      if (!name && !number) {
         console.log('phonebook:');
         Person.find({})
            .then((result) => {
               result.forEach((person) => {
                  console.log(`${person.name} ${person.number}`);
               });
            })
            .then(() => {
               mongoose.connection.close();
               console.log('completed');
            });
      }
   })

   .catch((err) => console.log(err));
