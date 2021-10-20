import React from 'react';

const Courses = ({courses}) => {
  const allCourses = courses.map(course => <Course key={course.id} course={course} />)
  return (
    <div>
      {allCourses}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>


const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return(
    <b>Total of {sum} exercises</b>
  ) 
}

const Content = ({ parts }) => {
  const allParts = parts.map(part => <Part key={part.id} part={part} />)
  return (
    <div>
      {allParts}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )  
}

export default App;
