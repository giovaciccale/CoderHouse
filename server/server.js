import express from "express";
import productManager from "./02_fs/productManager.js";
import userManager from "./02_fs/userManager.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints

server.get("/api/products", async (req, res) => {
  try {
    const all = await productManager.read();
    return res.json({
      success: true,
      response: all,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "not found!",
    });
  }
});

const rutaconParams1 = "/api/products/:pid";
const cbParams1 = (req, res) => {
  try {
    const { pid } = req.params;
    const one = productManager.readOne(pid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "not found!",
    });
  }
};
server.get(rutaconParams1, cbParams1);

server.get("/api/users", async (req, res) => {
  try {
    const all = await userManager.read();
    return res.json({
      success: true,
      response: all,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "not found!",
    });
  }
});
const rutaconParams2 = "/api/users/:uid";
const cbParams2 = (req, res) => {
  try {
    const { uid } = req.params;
    const one = userManager.readOne(uid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "not found!",
    });
  }
};
server.get(rutaconParams2, cbParams2);
