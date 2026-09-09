import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import CountryDetails from "./components/CountryDetails";

import "./App.css";

function App() {
    const [countryDB, setCountryDB] = useState(null);
    const [filter, setFilter] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => setCountryDB(response.data))
            .catch((error) => {
                console.error("Failed to fetch countries data from DB", error);
            });
    }, []);

    function handleFilterChange(e) {
        setFilter(e.target.value);
        setSelectedCountry(null);
    }

    const results = useMemo(
        function findMatched() {
            if (!countryDB || !filter) return null;

            const lowerCasedFilter = filter.toLowerCase();

            return countryDB.filter((c) =>
                c.name.common.toLowerCase().includes(lowerCasedFilter),
            );
        },
        [countryDB, filter],
    );

    return (
        <main
            style={{
                fontFamily: "sans-serif",
                maxWidth: "800px",
                marginInline: "auto",
            }}
        >
            <h1>Country Finder</h1>

            {!countryDB ? (
                <p>
                    <b>Fetching Database.</b> Thank you for you patience
                </p>
            ) : (
                <>
                    <div>
                        <label htmlFor="filter-input">Country Name: </label>
                        <input
                            value={filter || ""}
                            onChange={handleFilterChange}
                            placeholder="Start typing to see results ..."
                            id="filter-input"
                        />
                    </div>

                    {selectedCountry ? (
                        <CountryDetails country={selectedCountry} />
                    ) : !filter ? (
                        <p>
                            <b>Starting Typing</b>
                        </p>
                    ) : results.length > 10 ? (
                        <p>
                            <b>To many results.</b> Continue typing to narrow
                            results
                        </p>
                    ) : results.length === 0 ? (
                        <p>
                            <b>No countries found</b> with the current filter.
                            Try again.
                        </p>
                    ) : results.length === 1 ? (
                        <CountryDetails country={results[0]} />
                    ) : (
                        <ul>
                            {results.map((r) => (
                                <li key={r.name.common}>
                                    <span>{r.name.common}</span>
                                    <button
                                        onClick={() => setSelectedCountry(r)}
                                    >
                                        Show
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
