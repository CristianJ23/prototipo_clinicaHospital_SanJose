import {Sequelize} from 'sequelize'


// Crea una instancia de Sequelize para conectar con MySQL
const db = new Sequelize('clinica_san_jose', 'root', 'UTPL2023', {
    host: 'localhost',
    dialect: 'mysql'
  });


export default db