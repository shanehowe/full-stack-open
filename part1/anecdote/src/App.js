import { useState } from 'react'

const Heading = ({ text }) => <h2>{text}</h2>

const Button = ({ value, handleClick }) => {
  return (
    <button onClick={handleClick}>{ value }</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  
  const setAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)

    setSelected(randomNumber)
  }

  const updatepoints = () => {
    const newPoints = [...points]
    newPoints[selected] += 1

    setPoints(newPoints)
  }

  let max = points.indexOf(Math.max(...points))

  return (
    <>
    <Heading text={"Anecdote of the day"} />
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} points.</p>
    </div>
    <Button value={"Next anecdote"} handleClick={setAnecdote} />
    <Button value={"vote"} handleClick={updatepoints} />
    <Heading text={"Anecdote with most points"} />
    <div>
    {anecdotes[max]}
      <p>has {points[max]} points.</p>
    </div>
    </>
  )
}

export default App
