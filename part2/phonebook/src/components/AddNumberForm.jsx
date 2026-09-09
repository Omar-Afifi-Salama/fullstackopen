import { useState } from "react";

export default function AddNumberForm({ onSave }) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const success = await onSave({
            name: name.trim(),
            number: number.trim(),
        });

        if (success) {
            setName("");
            setNumber("");
        }
    }

    return (
        <section>
            <h2>Add a New Number</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name-input">Name: </label>
                    <input
                        id="name-input"
                        name="nameInput"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="number-input">Number: </label>
                    <input
                        id="number-input"
                        name="numberInput"
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
    );
}
