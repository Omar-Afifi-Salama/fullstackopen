import { useState } from "react";

import "./App.css";

const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
];

export default function App() {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const mostVotedIndex = findMostVotedIndex();

    function handleNext() {
        const newIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(newIndex);
    }

    function handleVote() {
        setVotes((prev) => {
            const newVotes = [...prev];
            newVotes[selected]++;
            return newVotes;
        });
    }

    function findMostVotedIndex() {
        let mostVotedIndex = 0;

        for (let i = 0; i < anecdotes.length; i++) {
            if (votes[i] >= votes[mostVotedIndex]) {
                mostVotedIndex = i;
            }
        }

        return mostVotedIndex;
    }

    return (
        <>
            <h1>Anecdotes App</h1>

            <hr />

            <section>
                <h2>Anecdote of the day</h2>
                <p className="quote">{anecdotes[selected]}</p>
                <p>This has {votes[selected] || 0} votes.</p>

                <button onClick={handleVote}>Vote</button>
                <button onClick={handleNext}>Next Anecdote</button>
            </section>

            <hr />

            <section>
                <h2>Anecdote with most votes</h2>
                <p className="quote">{anecdotes[mostVotedIndex]}</p>
                <p>This has {votes[mostVotedIndex] || 0} votes.</p>
            </section>
        </>
    );
}
