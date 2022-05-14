const mysql = require('mysql2');

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

    connection.connect(function(error){
      if(error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    });
    module.exports= connection;