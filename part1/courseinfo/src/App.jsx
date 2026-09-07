function App() {
    const course = {
        name: "Half Stack application development",
        parts: [
            { name: "Fundamentals of React", exercises: 10 },
            { name: "Using props to pass data", exercises: 7 },
            { name: "State of a component", exercises: 14 },
        ],
    };

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

function Header({ course }) {
    return <h1>{course.name}</h1>;
}

function Content({ parts }) {
    return (
        <>
            {parts.map((p) => (
                <Part part={p} />
            ))}
        </>
    );
}

function Part({ part }) {
    return (
        <p>
            {part.name} - Number of exercises: {part.exercises}
        </p>
    );
}

function Total({ parts }) {
    const totalExercises = parts.reduce(
        (total, currentPart) => total + currentPart.exercises,
        0,
    );

    return <p>Total number of exercises: {totalExercises}</p>;
}

export default App;
