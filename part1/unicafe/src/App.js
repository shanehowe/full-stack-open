import { useState } from 'react'

const Heading = ({name}) => <h2>{name}</h2>

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ name, value }) => {
  
  return (
  <tr>
    <td>{name} {value}</td>
  </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {

  const all = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  const positive = (good / (good + bad + neutral)) * 100;

  if (all === 0) {
    return <p>No feedback given.</p>
  }

  return (
    <>
    <table>
      <tbody>
          <StatisticLine name={"Good"} value={good} />
          <StatisticLine name={"Neutral"} value={neutral} />
          <StatisticLine name={"Bad"} value={bad} />
          <StatisticLine name={"All"} value={all} />
          <StatisticLine name={"Average"} value={average.toFixed(2)} />
          <StatisticLine name={"Positive"} value={positive.toFixed(2) + "%"} />
      </tbody>
    </table>

    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
 
  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Heading name={"Give Feedback"} />
      <Button text={"Good"} onClick={handleGood} />
      <Button text={"Neutral"} onClick={handleNeutral}/>
      <Button text={"Bad"} onClick={handleBad} />
      <Heading name={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App