const app = require("./app");

const port = app.get("port");

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
