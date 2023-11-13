
import Express from "express";
import ClientController from "./controllers/ClientController";

const app = Express();
app.use(Express.json());
const PORT = 3333;

app.post("/usuarios",ClientController.createClient);

app.get("/usuarios/:id",ClientController.listClientId);

app.get("/usuarios",ClientController.listClient);

app.put("/usuarios/",ClientController.uptadeClient);

app.delete("/usuarios/:id",ClientController.deleteClient);

app.listen(PORT, () => {
  console.log(`Servidor rodando! ${PORT}`);
});
