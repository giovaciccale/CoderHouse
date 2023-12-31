// const fs = require("fs");
import fs from "fs";
// const crypto = require("crypto");
import crypto from "crypto";


import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserManager {
  constructor() {
    this.ruta = path.join(__dirname, "data", "userManager.json");
    this.usuarios = [];
  }

  async saveUsers() {
    const jsonData = JSON.stringify(this.usuarios, null, 2);
    await fs.promises.writeFile(this.ruta, jsonData);
  }

  create(usuario) {
    // Asigna un ID autoincrementable
    usuario.id = crypto.randomBytes(12).toString("hex");

    this.usuarios.push(usuario);
    this.saveUsers();
    console.log("Usuario creado con éxito");
  }

  async read() {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);
      console.log(this.usuarios);
      return this.usuarios
    } catch (error) {
      console.log("Error al leer el archivo");
    }
  }

  readOne(id) {
    try {
     
      
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);
      const usuario = this.usuarios.find((each) => each.id === String(id));


      if (!usuario) {
        throw new Error("Don't exist user with ID " + id);
      }else console.log(usuario);
      return usuario;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
    
  }

  async destroy(id) {
    try {
      const resultado =  fs.readFileSync(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado); 
      let one = this.usuarios.find((each) => each.id === String(id));    
      if (!one) {
        throw new Error("There isn't any event with id n° "+ id);
      } else {
        this.usuarios = this.usuarios.filter(
          (each) => each.id !== String(id))    
          const jsonData = JSON.stringify(this.usuarios, null, 2);
          await fs.promises.writeFile(this.ruta, jsonData);   
            return console.log("Product "+id + " deleted successfully");              
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }


}

// Uso de la clase ProductManager

const usuarios = [
  {
    name: "Arturo",
    photo: "URL",
    email: "prueba1@hotmail.com",
  },
  {
    name: "Juan",
    photo: "URL",
    email: "prueba2@hotmail.com",
  },
  {
    name: "Pedro",
    photo: "URL",
    email: "prueba3@hotmail.com",
  },
];


const userManager = new UserManager("./server/02_fs/data/productManager.json");
export default userManager;


// userManager.create(usuarios[0]);
// userManager.create(usuarios[1]);
// userManager.create(usuarios[2]);
// userManager.read();
// userManager.readOne(3);

// userManager.destroy("f2558a9aaf1a66d6c9bf9364");