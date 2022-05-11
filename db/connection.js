// const mysql = require('mysql2');
var mysql=require('mysql');
const util = require('util');
// Connect to database
const connection = mysql.createConnection(
    {
      host:'127.0.0.1',
      port: '3306',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'Patricia407!',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );
// node native promisify
const query = util.promisify(connection.query).bind(connection);

(async () => {
  try {
    const rows = await query('select count(*) as count from file_managed');
    console.log(rows);
  } finally {
    connection.end();
  }
})()
  // var mysql=require('mysql');
  //   var connection=mysql.createConnection({
  //     host:'127.0.0.1',
  //     port: '3306',
  //     user:'root',
  //     password:'12345',
  //     database:'db'
  //   });

    connection.connect(function(error){
      if(!!error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    });