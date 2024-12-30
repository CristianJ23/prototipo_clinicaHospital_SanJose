import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import routes from "./routes/routes.js";
import loggerMiddleware from "./controllers/middleware.js";
import loadAssociations from "./models/associations.js";
import session from 'express-session';



const app = express();

//cargar asociaciones
loadAssociations();

// Configura express-session
app.use(session({
  secret: 'tu-secreto-aqui',  // Asegúrate de usar un secreto fuerte
  resave: false,              // No resguardar la sesión si no se ha modificado
  saveUninitialized: true,    // Guardar sesiones nuevas, incluso si no han sido modificadas
  cookie: { secure: true }   // En producción, deberías usar 'secure: true' con HTTPS
}));

// Configurar CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // Aquí pones la URL de tu frontend
  methods: ['GET', 'POST', 'DELETE'],        // Métodos permitidos
  allowedHeaders: ['Content-Type'],// Encabezados permitidos
}));

// Rutas
app.use(express.json()); // Middleware para parsear JSON
app.use('/kriss', routes);


// Ruta raíz
// app.get('/', (req, res) => {
//   res.send("hola mundo");
// });

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Ocurrió un error interno" });
});

// Prueba la conexión a la base de datos
(async () => {
  try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

// Manejo de rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(8000, () => {
  console.log("Servidor corriendo en el puerto 8000");
});
