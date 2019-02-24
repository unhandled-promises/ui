const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3042;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended:true }));

  server.get("*",(req,res) => {
    return handle(req,res);
  })

  server.listen(PORT, err => {
    if(err) throw err;
    console.log(`Serving fools on port ${PORT}`);
  })
})