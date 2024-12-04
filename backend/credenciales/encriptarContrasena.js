const bcrypt = require('bcrypt');

// Función para encriptar una contraseña
async function encriptarContraseña(contraseña) {
  try {
    // Sal para bcrypt, que hace que cada encriptación sea única
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(contraseña, saltRounds);

    console.log('Contraseña encriptada:', passwordHash);
    return passwordHash;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
  }
}

// Tomar la contraseña desde el argumento de la línea de comandos
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Por favor, ingresa una contraseña como argumento.');
  process.exit(1);
}

const contraseña = args[0];
encriptarContraseña(contraseña);
