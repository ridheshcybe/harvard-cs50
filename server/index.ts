import express from "express";
import { resolve } from "path";
import { runfiles } from "./functions.js";

const app = express();
const port = process.env.PORT || 3000;
const dirtoread = resolve("../introduction/lectures");

app.set("view engine", "ejs");

const datas = await runfiles(dirtoread);

app.get("/", (req, res) => {
  res.render("index", { options: Object.keys(datas) });
});

app.get("/notes/:no/", (req, res) => {
  const no = req.params.no;
  const data = datas[no].notes;
  if (!data) return res.sendStatus(404);
  res.send(data);
});

app.get("/embed/:no/:f/", (req, res) => {
  const file = req.params.f;
  const lectureno = req.params.no;

  let data = datas[lectureno].embeds[file];

  if (!data) return res.sendStatus(404);
  res.type("text/plain");
  res.send(data);
});

app.get("/:no/:f", (req, res) => {
  const no = req.params.no;
  const file = req.params.f;

  const n = datas[no];
  if (!n) return res.status(404).render("error");

  const imports = n.imports[file];
  if (!imports) return res.status(404).render("error");

  const [fName, EXT] = file.split(".");
  res.contentType(`.${EXT}`);
  res.setHeader("Content-Disposition", `attachment; filename=${fName}.${EXT}`);
  res.send(imports);
});

app.get("/:no", (req, res) => {
  res.render("file");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
