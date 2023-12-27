// const fs = require("fs");
import fs from "fs";
// const crypto = require("crypto");
import crypto from "crypto";



class ProductManager {
  constructor() {
    this.ruta = "./data/productManager.json"; 
    this.productos = [];
    console.log(this.productos);
  }

  async saveProducts() {
    const jsonData = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, jsonData);
    
  }

  create(producto) {
    // Asigna un ID autoincrementable
    producto.id = crypto.randomBytes(12).toString("hex");

    this.productos.push(producto);
    this.saveProducts();
    console.log("Producto creado con éxito");
  }

  async read() {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
      console.log(this.productos);
    } catch (error) {
      console.log("Error al leer el archivo");
    }
  }
  readOne(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
      const producto = this.productos.find((each) => each.id === String(id));

      if (!producto) {
        throw new Error("Don't exist product with ID " + id);
      } else console.log(producto);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
      let one = this.productos.find((each) => each.id === String(id));
      if (!one) {
        throw new Error("There isn't any event with id n° " + id);
      } else {
        this.productos = this.productos.filter(
          (each) => each.id !== String(id)
        );
        const jsonData = JSON.stringify(this.productos, null, 2);
        await fs.promises.writeFile(this.ruta, jsonData);
        return console.log("Product " + id + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
}

// Uso de la clase ProductManager

const productManager = new ProductManager( "./data/productManager.json");
export default productManager;
const productos = [
  {
    title: "Bicicleta",
    photo: "URL",
    price: 15000,
    stock: 20,
  },
  {
    title: "Moto",
    photo: "URL",
    price: 700,
    stock: 10,
  },
  {
    title: "Triciclo",
    photo: "URL",
    price: 20,
    stock: 1,
  },
];


// productManager.create(productos[0]);
// productManager.create(productos[1]);
// productManager.create(productos[2]);
// productManager.read();

// // productManager.destroy('0ebdc685849cd70de1427050');

// productManager.readOne("ec21eb78943d69f6515f6664");
// productManager.destroy("1543ffd836de7078c846ffbc");
