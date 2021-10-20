import React from 'react';

const Course = ({course}) => {
  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce(( accumulator, part ) => accumulator + part.exercises, 0);
  return(
    <p>Total of {sum} exercises</p>
  ) 
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={ parts[0] } />
      <Part part={ parts[1] } />
      <Part part={ parts[2] } />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )  
}

export default App;
