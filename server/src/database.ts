import mysql from 'mysql';


const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'facturas',
    multipleStatements: true
});

pool.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Base de datos conectada con éxito');
    }
  });

export default pool;

