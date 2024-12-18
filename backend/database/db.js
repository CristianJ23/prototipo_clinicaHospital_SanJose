import {Sequelize} from 'sequelize'


// Crea una instancia de Sequelize para conectar con MySQL
const db = new Sequelize('clinica_san_jose', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });


export default db