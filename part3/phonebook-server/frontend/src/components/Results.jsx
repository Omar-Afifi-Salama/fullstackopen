export default function Results({ persons, onDelete }) {
    return (
        <section>
            <h2>Results</h2>

            {persons.length === 0 ? (
                <p>
                    <b>No Results Found</b>
                </p>
            ) : (
                <ul>
                    {persons.map((p) => (
                        <li key={p.id}>
                            <span>
                                {p.name} - {p.number}
                            </span>
                            <button onClick={() => onDelete(p.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
