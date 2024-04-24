const express = require("express");
const elementoSchema = require("../models/elemento");
const datoSchema = require("../models/datos");

const router = express.Router();

//create elemento
router.post("/elemento", (req, res) =>{
    const elemento = elementoSchema(req.body);
    elemento
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

router.get('/elemento', (req, res) => {
    elementoSchema.find()
        .then((data) => {
            const datosFormateados = {};

            data.forEach((item, index) => {
                datosFormateados[item.elemento] = item.statusdato;
            });

            res.json(datosFormateados);
        })
        .catch((error) => res.json({ message: error }));
});


router.put("/elementos/:id", (req, res) => {
    const { id } = req.params;
    const { elemento, statusdato } = req.body;
    elementoSchema.updateOne({ _id: id }, { $set: { elemento, statusdato }}).
    then((data) => res.json(data)).catch((error) => res.json({ message: error  }));
})

router.get("/save-data/:valores", (req, res) => {
    elementoSchema
      .find()
      .then((data) => {
          console.log("Datos obtenidos");
        const { valores } = req.params;
        let arreglo_datos = valores.split("_");
  
        console.log(arreglo_datos);
        let temp = {
          "elemento": "Temperatura",
          "valor": arreglo_datos[0],
        };
  
        let humedad = {
          "elemento": "Humedad",
          "valor": arreglo_datos[1],
        };
  
        let luminosidad = {
          "elemento": "Luminosidad",
          "valor": arreglo_datos[2],
        };
        console.log(luminosidad);
        const datos = datoSchema(temp);
        datos
          .save();
  
          const dato = datoSchema(humedad);
        dato
          .save();
  
          const dat = datoSchema(luminosidad);
        dat
          .save();
  
          const datosFormateados = {};
          console.log(data);
        data.forEach(item => {
          datosFormateados[item.elemento] = item.statusdato;
        });
  
        res.json(datosFormateados);
      })
      .catch((error) => res.json({ message: error }));
  });
  
module.exports = router;