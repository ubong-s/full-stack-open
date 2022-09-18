// Header component
const Header = ({ course }) => {
   return <h1>{course}</h1>;
};

// Part component
const Part = ({ name, exercises }) => {
   return (
      <p>
         {name} {exercises}
      </p>
   );
};

// Content component
const Content = ({ parts }) => {
   return (
      <div>
         {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
         ))}
      </div>
   );
};

// Total component
const Total = ({ parts }) => {
   const total = parts.reduce((acc, part) => (acc += part.exercises), 0);

   return <p>Total of {total} exercises</p>;
};

const Course = ({ course }) => {
   return (
      <div>
         <Header course={course.name} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
      </div>
   );
};

export default Course;
