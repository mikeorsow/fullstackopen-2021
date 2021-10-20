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

const Content = ({ parts }) => {
  const allParts = parts.map(part => <Part key={part.id} part={part} />)
  return (
    <div>
      {allParts}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return(
    <b>Total of {sum} exercises</b>
  ) 
}

export default Courses