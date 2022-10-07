require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

// eslint-disable-next-line
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

// let persons = [
//    {
//       id: 1,
//       name: 'Arto Hellas',
//       number: '040-123456',
//    },
//    {
//       id: 2,
//       name: 'Ada Lovelace',
//       number: '39-44-5323523',
//    },
//    {
//       id: 3,
//       name: 'Dan Abramov',
//       number: '12-43-234345',
//    },
//    {
//       id: 4,
//       name: 'Mary Poppendieck',
//       number: '39-23-6423122',
//    },
// ];

app.get('/info', (request, response) => {
   Person.find({}).then((persons) => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      `);
   });
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
      .then(() => {
         response.status(204).end();
      })
      .catch((error) => next(error));
});

// const generateId = () => Math.floor(Math.random() * 100000);

app.post('/api/persons', (request, response, next) => {
   const { body } = request;

   const person = new Person({
      name: body.name,
      number: body.number,
   });

   person
      .save()
      .then((savedPerson) => {
         response.json(savedPerson);
      })
      .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
   const { body } = request;

   const person = {
      name: body.name,
      number: body.number,
   };

   Person.findByIdAndUpdate(request.params.id, person, {
      new: true,
      runValidators: true,
      context: 'query',
   })
      .then((updatedPerson) => {
         response.json(updatedPerson);
      })
      .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
   response.status(404).send('unknown endpoint');
};

app.use(unknownEndpoint);

// eslint-disable-next-line
const errorHandler = (error, request, response, next) => {
   console.log(error.message);

   if (error.name === 'CastError') {
      return response.status(500).json({ error: 'malformatted id' });
   } else if (error.name === 'ValidationError') {
      return response.status(400).json({
         error: error.message,
      });
   }
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
