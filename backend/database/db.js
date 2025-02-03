import { Sequelize } from 'sequelize';

class MySQL {
  constructor() {
    if (!MySQL.instance) {
      const sequelize = new Sequelize('clinica_san_jose', 'root', 'UTPL2023', {
        host: 'localhost',
        dialect: 'mysql',
      });

      // Probar conexión
      sequelize
        .authenticate()
        .then(() => console.log('Conexión exitosa a MySQL'))
        .catch((err) => console.error('Error al conectar a MySQL:', err));

      MySQL.instance = sequelize; // Guardar la instancia
    }

    return MySQL.instance; // Retornar siempre la misma instancia
  }
}

// Exportar la instancia única
const mysqlInstance = new MySQL();


export default mysqlInstance;
