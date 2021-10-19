import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Anecdote = ({selectedAnecdote, votes}) => {
  return (
    <>
      {selectedAnecdote}
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(7).fill(0));
  const randomInt = () => Math.floor(Math.random()*anecdotes.length);
  const showRandomAnecdote = () => setSelected(randomInt);
  const addVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }
  const topVoteIndex = () => {
    return votes.indexOf(Math.max(...votes))
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote selectedAnecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={addVote} text='Vote' />
      <Button handleClick={showRandomAnecdote} text='Next Anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote selectedAnecdote={anecdotes[topVoteIndex()]} votes={votes[topVoteIndex()]} />
    </div>
  )
}

export default App