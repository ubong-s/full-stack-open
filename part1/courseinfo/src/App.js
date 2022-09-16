// Header component
const Header = (props) => {
   return <h1>{props.course}</h1>;
};

// Part component
const Part = (props) => {
   return (
      <p>
         {props.title} {props.exercises}
      </p>
   );
};

// Content component
const Content = (props) => {
   return (
      <div>
         <Part
            title={props.parts[0].title}
            exercises={props.parts[0].exercises}
         />
         <Part
            title={props.parts[1].title}
            exercises={props.parts[1].exercises}
         />
         <Part
            title={props.parts[2].title}
            exercises={props.parts[2].exercises}
         />
      </div>
   );
};

// Total component
const Total = (props) => {
   return (
      <p>
         Number of exercises{' '}
         {props.parts[0].exercises +
            props.parts[1].exercises +
            props.parts[2].exercises}
      </p>
   );
};

const App = () => {
   const course = {
      title: 'Half Stack application development',
      parts: [
         {
            id: 1,
            title: 'Fundamentals of React',
            exercises: 10,
         },
         {
            id: 2,
            title: 'Using props to pass data',
            exercises: 7,
         },
         {
            id: 3,
            title: 'State of a component',
            exercises: 14,
         },
      ],
   };

   return (
      <div>
         <Header course={course.title} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
      </div>
   );
};

export default App;
