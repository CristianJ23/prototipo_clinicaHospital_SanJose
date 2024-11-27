import {Sequelize} from 'sequelize'


// Crea una instancia de Sequelize para conectar con MySQL
const db = new Sequelize('clinica_usuarios_roles', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });


export default db