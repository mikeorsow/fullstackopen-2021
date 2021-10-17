import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
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

  return (
    <div>
      <Header title='Please provide feedback' />
      <Button text='good' />
      <Button text='neutral' />
      <Button text='bad' />
      <Header title='Stats' />
      <Statistics countGood='3' countNeutral='4' countBad='99' />

    </div>
  )
}

export default App