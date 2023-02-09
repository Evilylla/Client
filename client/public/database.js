const { Client } = require('pg');


const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "users"
})

client.connect();

client.query(`SELECT * FROM users.usertable`, (err, res) => {
    if(!err)
    {
        console.log(res.rows);
    } 
    else 
    {
        console.log(err.message);
    }
    client.end;
})


const onConfirm = () => {

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let street = document.getElementById("street").value;
    let postalcode = document.getElementById("postCode").value;
    let tguid = tg.initDataUnsafe?.user?.username;

    client.query(`INSERT INTO users.usertable (fname, sname, street, postalcode, tguid) values ($1, $2, $3, $4, $5) RETURNING *`,[fname, lname, street, postalcode, tguid], (err, res) => {
        if(!err)
        {
            console.log(res.rows);
        } 
        else 
        {
            console.log(err.message);
        }
        client.end;
    })
}





