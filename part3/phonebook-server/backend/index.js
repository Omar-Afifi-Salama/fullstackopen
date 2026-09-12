require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const Person = require("./models/Person");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get("/info", (req, res, next) => {
    const timeReceived = new Date();

    Person.find({})
        .then((response) => {
            return res
                .status(200)
                .send(
                    `<p>Phonebook has info for ${response.length} people.</p><p>${timeReceived}</p>`,
                );
        })
        .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
    Person.find({})
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
    const { id } = req.params;

    Person.findById(id)
        .then((response) => {
            if (!response) {
                return res
                    .status(404)
                    .send(`<p>Person with id [${id}] not found.</p>`);
            }

            return res.status(200).json(response);
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
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

    Person.findOne({ name })
        .then((response) => {
            if (response) {
                return res
                    .status(400)
                    .send(`Name [${name}] already exists in phonebook.`);
            }

            const newPerson = new Person({ name, number });

            newPerson
                .save()
                .then((response) => {
                    return res.status(201).json(response);
                })
                .catch((error) => next(error));
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
    const { id } = req.params;

    const { name, number } = req.body;

    if (typeof name !== "string" && typeof number !== "string") {
        return res
            .status(400)
            .send(
                "Both name and/or number attributes have to be present and of type string.",
            );
    }

    Person.findById(id)
        .then((person) => {
            if (!person) {
                return res
                    .status(404)
                    .send(`<p>Person with id [${id}] not found.</p>`);
            }

            person.name = name;
            person.number = number;

            person
                .save()
                .then((response) => {
                    return res.status(200).json(response);
                })
                .catch((error) => next(error));
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    const { id } = req.params;

    Person.findByIdAndDelete(id)
        .then((response) => {
            if (!response) {
                return res
                    .status(404)
                    .send(`<p>Person with id [${id}] not found.</p>`);
            }

            return res.status(204).end();
        })
        .catch((error) => next(error));
});

function errorHandler(error, req, res) {
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Mal-formatted id" });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
}

app.use(errorHandler);

app.listen(3000, () => console.log(`[Listening on port ${PORT}]`));
