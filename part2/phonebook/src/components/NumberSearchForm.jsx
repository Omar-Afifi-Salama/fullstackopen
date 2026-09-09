export default function NumberSearchForm({ filter, onFilterChange }) {
    return (
        <section>
            <h2>Search by Name</h2>
            <div>
                <label htmlFor="search-input">Name: </label>
                <input
                    id="search-input"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    placeholder="Search contacts..."
                />
            </div>
            {!filter && (
                <p>
                    <small>Currently showing all contacts.</small>
                </p>
            )}
        </section>
    );
}
