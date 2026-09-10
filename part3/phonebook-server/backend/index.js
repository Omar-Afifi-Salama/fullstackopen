const express = require("express");
const morgan = require("morgan");
let { db } = require("./data");

const app = express();
const PORT = process.env.PORT || 3000;

function generateId() {
    const max = Number.MAX_SAFE_INTEGER;
    return String(Math.floor(Math.random() * max));
}

app.use(express.json());

morgan.token("body", (req) => {
    return req.body ? JSON.stringify(req.body) : " ";
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body",
    ),
);

app.use(express.static("dist"));

app.get("/info", (req, res) => {
    const timeReceived = new Date();

    return res
        .status(200)
        .send(
            `<p>Phonebook has info for ${db.length} people.</p><p>${timeReceived}</p>`,
        );
});

app.get("/api/persons", (req, res) => {
    return res.status(200).json(db);
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    const foundPerson = db.find((p) => p.id === id);

    if (!foundPerson) {
        return res.status(404).send(`<p>Person with id [${id}] not found.</p>`);
    }

    return res
        .status(200)
        .send(
            `<h1>${foundPerson.name}</h1><p>Id: ${foundPerson.id}</p><p>Phone Number: ${foundPerson.number}</p>`,
        );
});

app.post("/api/persons", (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }

    const { name, number } = req.body;

    if (typeof name !== "string" || typeof number !== "string") {
        return res
            .status(400)
            .send(
                "Both name and number attributes have to be present and of type string.",
            );
    }

    if (db.find((p) => p.name === name)) {
        return res
            .status(400)
            .send(`Name [${name}] already exists in phonebook.`);
    }

    const id = generateId();

    const newPerson = { id, name, number };

    db.push(newPerson);

    return res.status(201).json(newPerson);
});

app.put("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    const foundPerson = db.find((p) => p.id === id);
    if (!foundPerson) {
        return res.status(404).send(`<p>Person with id [${id}] not found.</p>`);
    }

    const { name, number } = req.body;

    if (typeof name !== "string" && typeof number !== "string") {
        return res
            .status(400)
            .send(
                "Both name and/or number attributes have to be present and of type string.",
            );
    }

    const updatedPerson = {
        ...foundPerson,
        name,
        number,
        id,
    };

    db = db.map((p) => (p.id === id ? updatedPerson : p));

    return res.status(200).json(updatedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    const foundPerson = db.find((p) => p.id === id);
    if (!foundPerson) {
        return res.status(404).send(`<p>Person with id [${id}] not found.</p>`);
    }

    db = db.filter((p) => p.id !== id);

    return res.status(200).end();
});

app.listen(3000, () => console.log(`[Listening on port ${PORT}]`));
