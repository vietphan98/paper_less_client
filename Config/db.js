const Pool = require("pg").Pool;

const db = new Pool({
    user : "rfid_auto",
    password : "rfid@123",
    host : "147.121.56.228",
    port: 5432,
    database: "postgres"
})
module.exports = db