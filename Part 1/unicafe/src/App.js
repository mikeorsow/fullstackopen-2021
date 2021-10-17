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

const Statistics = ({countGood, countNeutral, countBad, countAll}) => {
  if (countAll === 0){
    return (
      <div>
        Please click one of the feedback buttons above to see the stats
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{countGood}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{countNeutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{countBad}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>{countAll}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(countGood-countBad)/countAll}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{(countGood/countAll)*100 + '%'}</td>
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
  const [all, setAll] = useState(0)
  const increaseGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }
  const increaseBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <Header title='Please provide feedback' />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Header title='Stats' />
      <Statistics countGood = {good} countNeutral = {neutral} countBad = {bad} countAll={all} />
    </div>
  )
}

export default App