const express = require('express');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
const cors = require('cors'); // Importa el paquete CORS

const elementoRoutes = require("./routes/elemento");
const datoRoutes = require("./routes/datos");
const saveRoutes = require("./routes/save");

const app = express();
const port = process.env.PORT || 9000;

mongoose.connect('mongodb://localhost:27017/ActividadIOT')
  .then(() => {
    console.log('Conexión a MongoDB establecida correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });


//middleware
app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

app.use('/api', elementoRoutes);
app.use('/api', datoRoutes);
//app.use('/api', saveRoutes);

//routes
app.get('/', (req, res) => {
  res.send('Bienvenido a mi api')
})


// Escuchar en todas las interfaces de red
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});
