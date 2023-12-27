import express from "express";
import ProductManager from "./02_fs/productManager.js";



const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//middlewares

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints

server.get("/api/products", (req, res) => {
  try {
    const all = ProductManager.read()
    
    return res.status(200).json(all)



  } catch (error) {
    return res.status(404).json({
        success: false,
        message: error.message
    })
  }  
  })

   const rutaconParams1 = "/api/products/:pid";
    const cbParams1 = (req, res) => {
      const {pid} = req.params 
      
      return res.status(200).send("El id del producto a filtrar es: "+ pid)

    }
    server.get(rutaconParams1, cbParams1)



