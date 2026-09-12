const mongoose = require("mongoose");
const Person = require("./models/Person");

if (process.argv.length < 3) {
    console.log(
        "Missing MongoDB user's password, try 'node mongo.js <password>'",
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://omarafifi2030_db_user:${password}@cluster0.4il1ctx.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

// print out all people inside the phonebook
if (process.argv.length === 3) {
    Person.find({})
        .then((results) => {
            console.log("Phonebook: ");
            for (let i = 0; i < results.length; i++) {
                console.log(`${results[i].name} ${results[i].number}`);
            }
        })
        .then(() => mongoose.connection.close());
} else {
    // else extract name and number to create a new person object
    if (process.argv.length < 5) {
        console.log(
            "Missing person's name or number, try 'node mongo.js <password> <name> <number>'",
        );
        process.exit(1);
    }

    const name = process.argv[3];
    const number = process.argv[4];

    const newPerson = new Person({ name, number });

    newPerson.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
