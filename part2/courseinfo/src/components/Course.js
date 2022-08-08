// header component
const Header = ({ name }) => <h2>{name}</h2>

// part component
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

// content compenent to redner all parts
const Content = ({ parts }) => {
    return (
        parts.map((part) => {
            return <Part key={part.id} part={part}/>
        })
    );
}

// total component
const Total = ({ parts }) => {

    // sums up all exercices
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (<p>Total of {total} exercises.</p>)
}

// course is a prop pased to Course from App.js
const Course = ({ course }) => {
    return (
        <>
        <Header name={course.name} /> 
        <Content parts={course.parts} />
        <Total parts={course.parts}/> 
        </>
    )
}

export default Course