const mongoose = require("mongoose");
const env = require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose

.connect("mongodb+srv://moaaz:mumbojumbo@cluster0.mjk74.mongodb.net/?retryWrites=true&w=majority", {
    
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log(err));

const connection = mongoose.connection;

module.exports = connection;
