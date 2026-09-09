export default function Total({ parts }) {
    const totalExercises = parts.reduce(
        (total, currentPart) => total + currentPart.exercises,
        0,
    );

    return (
        <p>
            <b>Total number of exercises: {totalExercises}</b>
        </p>
    );
}
