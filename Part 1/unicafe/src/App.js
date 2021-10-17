import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{props.countGood}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{props.countNeutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{props.countBad}</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Header title='Please provide feedback' />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Header title='Stats' />
      <Statistics countGood={good} countNeutral={neutral} countBad={bad} />
    </div>
  )
}

export default App