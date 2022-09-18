import { useState } from 'react';

const Statistics = ({ good, bad, neutral }) => {
   const total = good + bad + neutral;
   const average = total > 0 ? ((good - bad) / total).toFixed(1) : 0;
   const positive =
      total > 0 ? `${((good * 100) / total).toFixed(1)} %` : `${0} %`;

   return (
      <>
         {total === 0 ? (
            <p>No feedback given</p>
         ) : (
            <table>
               <tbody>
                  <StatisticLine text='good' value={good} />
                  <StatisticLine text='neutral' value={neutral} />
                  <StatisticLine text='bad' value={bad} />
                  <StatisticLine text='all' value={total} />
                  <StatisticLine text='average' value={average} />
                  <StatisticLine text='positive' value={positive} />
               </tbody>
            </table>
         )}
      </>
   );
};
const StatisticLine = ({ text, value }) => {
   return (
      <tr>
         <td>{text}</td>
         <td>{value}</td>
      </tr>
   );
};

const Button = ({ handleClick, text }) => {
   return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
   const [good, setGood] = useState(0);
   const [neutral, setNeutral] = useState(0);
   const [bad, setBad] = useState(0);

   const handleGood = () => setGood(good + 1);

   const handleNeutral = () => setNeutral(neutral + 1);

   const handleBad = () => setBad(bad + 1);

   return (
      <div>
         <h1>Give Feedback</h1>
         <Button handleClick={handleGood} text='good' />
         <Button handleClick={handleNeutral} text='neutral' />
         <Button handleClick={handleBad} text='bad' />
         <h2>Statistics</h2>
         <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
   );
};

export default App;
