var mysql = require("mysql")
var pool = mysql.createPool({

    host: 'sql.freedb.tech',
    port: 3306,
    user: 'freedb_rohit',
    password: 'amBkcrf3@qNUfSP',
    database: 'freedb_rohit',
    multipleStatements:true,
    connectionLimit: 100
})

module.exports= pool;