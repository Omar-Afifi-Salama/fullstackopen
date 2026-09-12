const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
    .connect(url, { family: 4 })
    .then(() => {
        console.log("[Connected to MongoDB]");
    })
    .catch((error) => {
        console.error("[Error connecting to MongoDB]:", error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name must be at least 3 characters long."],
        required: [true, "Name is required."],
    },
    number: {
        type: String,
        minLength: [8, "Number must be at least 8 numbers long."],
        require: [true, "Number is required."],
        validate: {
            validator: function isCorrectlyFormatted(v) {
                const parts = v.split("-");

                if (parts.length !== 2) {
                    return false;
                }

                const [countryCode, number] = parts;

                if (
                    (countryCode.length !== 2 && countryCode.length !== 3) ||
                    Number.isNaN(countryCode)
                ) {
                    return false;
                }

                if (Number.isNaN(number)) {
                    return false;
                }

                return true;
            },
            message: ({ value }) =>
                `${value} is not a valid phone number. It must be in the following format: <country code>-<number>`,
        },
    },
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
