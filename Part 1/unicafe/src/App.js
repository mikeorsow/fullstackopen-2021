import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = () => {

}

const Statistics = () => {

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='Please provide feedback' />
    </div>
  )
}

export default App