import { useState, useEffect, useMemo } from "react";

import AddNumberForm from "./components/AddNumberForm";
import NumberSearchForm from "./components/NumberSearchForm";
import Results from "./components/Results";
import Notification from "./components/Notification";

import numbersApi from "./services/numbersApi";
import "./App.css";

export default function App() {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState("");
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        numbersApi
            .getAll()
            .then((data) => setPersons(data))
            .catch((error) => console.oror("Could not fetch contacts", error));
    }, []);

    function showNotification(message, type = "success") {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }

    function handleCreateOrUpdate(contactObj) {
        const normalizedName = contactObj.name.trim().toLowerCase();
        const foundPerson = persons.find(
            (p) => p.name.trim().toLowerCase() === normalizedName,
        );

        if (!foundPerson) {
            return numbersApi
                .create(contactObj)
                .then((returnedObj) => {
                    setPersons((prev) => prev.concat(returnedObj));
                    showNotification(
                        `Successfully added ${returnedObj.name}`,
                        "success",
                    );
                    return true;
                })
                .catch((error) => {
                    console.error(error);

                    if (error.response.data.error) {
                        showNotification(error.response.data.error, "error");
                    } else {
                        showNotification(
                            `Failed to add ${contactObj.name}`,
                            "error",
                        );
                    }

                    return false;
                });
        }

        const consentToUpdate = confirm(
            `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`,
        );

        if (!consentToUpdate) return false;

        return numbersApi
            .update(foundPerson.id, {
                ...contactObj,
                id: foundPerson.id,
            })
            .then((returnedObj) => {
                setPersons((prev) =>
                    prev.map((p) =>
                        p.id === foundPerson.id ? returnedObj : p,
                    ),
                );
                showNotification(
                    `Successfully updated ${returnedObj.name}`,
                    "success",
                );
                return true;
            })
            .catch((error) => {
                console.error(error);

                if (error.response && error.response.status === 404) {
                    showNotification(
                        `Information of ${foundPerson.name} has already been removed from the server`,
                        "error",
                    );
                    setPersons((prev) =>
                        prev.filter((p) => p.id !== foundPerson.id),
                    );
                } else {
                    if (error.response.data.error) {
                        showNotification(error.response.data.error, "error");
                    } else {
                        showNotification(
                            `Failed to update ${contactObj.name}`,
                            "error",
                        );
                    }
                }
                return false;
            });
    }

    function handleDelete(id) {
        const foundPerson = persons.find((p) => p.id === id);

        if (!foundPerson || !confirm(`Delete ${foundPerson.name}?`)) return;

        numbersApi
            .remove(id)
            .then(() => {
                setPersons((prev) => prev.filter((p) => p.id !== id));
                showNotification(
                    `Successfully deleted ${foundPerson.name}`,
                    "success",
                );
            })
            .catch((error) => {
                console.error(error);

                if (error.response && error.response.status === 404) {
                    showNotification(
                        `Information of ${foundPerson.name} has already been removed from the server`,
                        "error",
                    );
                    setPersons((prev) => prev.filter((p) => p.id !== id));
                } else {
                    showNotification(
                        `Failed to delete ${foundPerson.name}`,
                        "error",
                    );
                }
            });
    }

    const resultsToShow = useMemo(() => {
        if (!filter.trim()) return persons;
        const filterInLowerCased = filter.toLowerCase();

        return persons.filter((p) =>
            p.name.toLowerCase().includes(filterInLowerCased),
        );
    }, [persons, filter]);

    return (
        <main>
            <h1>Phonebook</h1>
            <hr />
            <Notification notification={notification} />{" "}
            <AddNumberForm onSave={handleCreateOrUpdate} />
            <hr />
            <NumberSearchForm filter={filter} onFilterChange={setFilter} />
            <Results persons={resultsToShow} onDelete={handleDelete} />
        </main>
    );
}
