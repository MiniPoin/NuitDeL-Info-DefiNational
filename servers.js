const EXPRESS = require("express");
const PATH = require("path");
const CORS = require("cors");

const app = EXPRESS();
const PORT = 3000;

// Middleware
app.use(CORS());
app.use(EXPRESS.json());
app.use(EXPRESS.static(PATH.join(__dirname, "src")));

// Route principale - servir index.html
app.get("/", (req, res) => {
  res.sendFile(PATH.join(__dirname, "src/index.html"));
});

// Servir n'importe quel fichier HTML demandé
app.get("/:page.html", (req, res) => {
  res.sendFile(PATH.join(__dirname, "src", `${req.params.page}.html`));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
