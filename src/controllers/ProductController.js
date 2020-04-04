const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    // server para dar um valor padrão para a paginação do mongoose-paginate
    // também serve para o user dizer que pag quer buscar na url: /products?page=2
    const { page = 1 } = req.query;

    //const products = await Product.find(); // sem o mongoose-paginate
    // o 1ª parâmetro do paginate, o {}, podiam ser funções de filtros/ querys, etc
    const products = await Product.paginate({}, { page, limit: 10});

    return res.json(products);
  },

  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  async update(req, res) {
    // {new: true} é necessário p/ informar ao mongoose que o produto precisa retornar atualizado
    // sem o {new: true}, o mongoose passaria o dados do req.body antes da atualização
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(product);
  },

  async remove(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send();
  }
};

/*
Product.create({
    title: "React NAtive",
    description: "Build native Apps",
    url: "http://github.com/facebook/react-native"
  });
*/
