const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Peca = mongoose.model("Peca", {
  identificador: Number,
  nome: String,
  dataAquisicao: Date,
  quantidade: Number,
  valor: Number,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/peca", async (req, res) => {
  const peca = await Peca.find();
  res.send(peca);
});

app.get("/peca/:id", async (req, res) => {

  const id = Number(req.params.id);
  const peca = await Peca.find({ identificador: id });
  res.send(peca);

});

app.put("/peca/:id", async (req, res) => {
    const id = Number(req.params.id);
  const peca = await Peca.findOneAndUpdate(
   { identificador: id},
    {
      identificador: req.body.identificador,
      nome: req.body.nome,
      dataAquisicao: req.body.dataAquisicao,
      quantidade: req.body.quantidade,
      valor: req.body.valor,
    },
    { new: true }
  );

  return res.send(peca);
});

app.post("/peca", async (req, res) => {
  const peca = new Peca({
    identificador: req.body.identificador,
    nome: req.body.nome,
    dataAquisicao: req.body.dataAquisicao,
    quantidade: req.body.quantidade,
    valor: req.body.valor,
  });

  await peca.save();
  res.send(peca);
});

app.delete("/peca/:id", async (req, res) => {
  const peca = await Peca.findByIdAndDelete(req.params.id);
  res.send(peca);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://guilhermegutofer:L8SwtRlc3aXUKOvl@api-trabfinal.1egzbn8.mongodb.net/?retryWrites=true&w=majority&appName=Api-TrabFinal"
  );
  console.log(`Server is running on port ${port}`);
});
