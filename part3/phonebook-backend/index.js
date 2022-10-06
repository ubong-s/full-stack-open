require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('body', function (request, response) {
   if (request.method === 'POST') {
      return JSON.stringify(request.body);
   }

   return ' ';
});

app.use(express.json());
app.use(
   morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

let persons = [
   {
      id: 1,
      name: 'Arto Hellas',
      number: '040-123456',
   },
   {
      id: 2,
      name: 'Ada Lovelace',
      number: '39-44-5323523',
   },
   {
      id: 3,
      name: 'Dan Abramov',
      number: '12-43-234345',
   },
   {
      id: 4,
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
   },
];

app.get('/info', (request, response) => {
   response.send(`<p>Phonebook has info for ${persons.length} people</p>
   <p>${new Date()}</p>
   `);
});

app.get('/api/persons', (request, response) => {
   Person.find({}).then((notes) => {
      response.json(notes);
   });
});

app.get('/api/persons/:id', (request, response, next) => {
   Person.findById(request.params.id)
      .then((person) => {
         if (person) {
            response.json(person);
         } else {
            response.status(404).end;
         }
      })
      .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
   Person.findByIdAndRemove(request.params.id)
      .then((result) => {
         response.status(204).end();
      })
      .catch((error) => next(error));
});

// const generateId = () => Math.floor(Math.random() * 100000);

app.post('/api/persons', (request, response) => {
   const { body } = request;

   if (!body.name || !body.number) {
      return response.status(400).json({
         error: 'name/number is missing',
      });
   }

   // const doesNameExist = persons.find(
   //    (p) => p.name.toLowerCase() === body.name.toLowerCase()
   // );

   // if (doesNameExist) {
   //    return response.status(400).json({ error: 'name must be unique' });
   // }

   const person = new Person({
      name: body.name,
      number: body.number,
   });

   person.save().then((savedPerson) => {
      response.json(savedPerson);
   });
});

const unknownEndpoint = (request, response) => {
   response.status(404).send('unknown endpoint');
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
   console.log(error.message);

   if (error.name === 'CastError') {
      response.status(500).json({ error: 'malformatted id' });
   }
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
