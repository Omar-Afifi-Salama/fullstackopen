export default function Part({ part }) {
    return (
        <p>
            {part.name} - Number of exercises: {part.exercises}
        </p>
    );
}
