const mysql2 = require('mysql2')
const pool = mysql2.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    //port: process.env.DB_PORT
})

// GET CONTACTS
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id: ' + connection.threadId)

        connection.query('SELECT * FROM contact', (err, rows) => {
            connection.release()
            if(!err) {
                const headers = {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods':'GET'}
                const response = {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify(rows),
                };
                res.send(response)
            }
            else console.log(err)
        })
    
    })
}

// ADD A CONTACT
exports.add = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id: ' + connection.threadId)
    
        //console.log(req)
        let columns = Object.keys(req.body)
        let values = Object.values(req.body)
        let command = `INSERT INTO contact (${columns.map(col => col)}) VALUES (${values.map(val => `"${val}"`)})`
        console.log(command)
        connection.query(command, (err, rows) => {
            connection.release()
            if(!err) {
                const headers = {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods':'POST'}
                const response = {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify(rows),
                };
                res.send(response)
            }
            else console.log(err)
        }) 
    })
}

// UPDATE A CONTACT
exports.update = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id: ' + connection.threadId)

        console.log(req)
        let contactID = req.body.id
        let columns = Object.keys(req.body.data)
        let values = Object.values(req.body.data)
        let command = `UPDATE contact SET `

        if(columns.length != values.length) throw 'Invalid Key-Value Pairs'

        columns.forEach((col, i) => {
            command += `${col} = "${values[i]}"${i < columns.length - 1 ? `,` : ``}`
        })

        command += ` WHERE contact_id = ${contactID}`
        console.log(command)

        connection.query(command, (err, rows) => {
            connection.release()
            if(!err) {
                const headers = {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods':'PATCH'}
                const response = {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify(rows),
                };
                res.send(response)
            }
            else console.log(err)
        }) 
    })
}

// DELETE A CONTACT
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id: ' + connection.threadId)
    
        console.log(req)
        let contactID = req.body.id
        let command = `DELETE FROM contact WHERE contact_id = ${contactID}`

        connection.query(command, (err, rows) => {
            connection.release()
            if(!err) {
                const headers = {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods':'DELETE'}
                const response = {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify(rows),
                };
                res.send(response)
            }
            else console.log(err)
        }) 
    })
}