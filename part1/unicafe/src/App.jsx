import { useState } from "react";

import "./App.css";

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1>UniCafe</h1>

            <section>
                <h2>Give Feedback</h2>
                <div className="button-island">
                    <Button
                        className="good"
                        text="Good"
                        onClick={() => setGood((prev) => prev + 1)}
                    />
                    <Button
                        className="neutral"
                        text="Neutral"
                        onClick={() => setNeutral((prev) => prev + 1)}
                    />
                    <Button
                        className="bad"
                        text="Bad"
                        onClick={() => setBad((prev) => prev + 1)}
                    />
                </div>
            </section>

            <section>
                <h2>Statistics</h2>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </section>
        </>
    );
}

function Button({ className, text, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}

function Statistics({ good, neutral, bad }) {
    const total = good + neutral + bad;

    if (total === 0) return <p>No feedback given.</p>;

    const average = ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1);
    const positive = ((good / total) * 100).toFixed(1);

    return (
        <table>
            <tbody>
                <StatisticLine text="Good" value={good} unit="Reviews" />
                <StatisticLine text="Neutral" value={neutral} unit="Reviews" />
                <StatisticLine text="Bad" value={bad} unit="Reviews" />
                <StatisticLine text="Total" value={total} unit="Reviews" />
                <StatisticLine text="Average" value={average} unit="" />
                <StatisticLine text="Positive" value={positive} unit="%" />
            </tbody>
        </table>
    );
}

function StatisticLine({ text, value, unit }) {
    return (
        <tr>
            <th scope="row" style={{ textAlign: "left" }}>
                {text}
            </th>
            <td>
                {value} {unit}
            </td>
        </tr>
    );
}

export default App;
