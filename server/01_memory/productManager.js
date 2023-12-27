class ProductManager {
  static #products = [];

  constructor(data) {
    this.id =
      ProductManager.#products.length === 0
        ? 1
        : ProductManager.#products[ProductManager.#products.length - 1].id + 1; // Estamos usando operador Ternario
    this.title = data.title;
    this.photo = data.photo;
    this.price = data.price;
    this.stock = data.stock;
    ProductManager.#products.push(this);
  }

  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1, // Estamos usando operador Ternario
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(product);
    //  console.log(ProductManager.#products);
  }
  read() {
    return ProductManager.#products;
  }
  readOne(id) {
    return ProductManager.#products.find((each) => each.id === Number(id));
  }

  destroy(id) {
    try {
      let one = ProductManager.#products.find((each) => each.id === Number(id));
      if (!one) {
        throw new Error("There isn't any event with id n°"+ id);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== Number(id))          
            return "Product "+id + " deleted successfully";              
      }
    } catch (error) {
   
      return error.message;
    }
  }
}

const Products = new ProductManager({
  title: "Auto",
  photo: "URL",
  price: 10,
  stock: 10,
});

Products.create({
  title: "Bicicleta",
  photo: "URL",
  price: 15000,
  stock: 20,
});

console.log(Products.read());
// console.log(Products.readOne(1));
// console.log(Products.destroy(2));
// console.log(Products.read());
console.log(Products.destroy(2));
console.log(Products.read());
