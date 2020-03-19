const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { sequelizeConnection } = require("./server/connection/sequelize");
const Router = require("./routes").Router;
const { UserModel } = require("./server/model/user");
const { AuthModel } = require("./server/model/auth");
const { encrypt, compare } = require("./server/util/password");
const AuthMiddleWare = require("./server/middleware/auth");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(logger("dev"));
  server.use(compression());
  server.use(bodyParser.json({ limit: "5mb" }));
  server.use(bodyParser.json({ type: "application/vnd.api+json" }));
  server.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

  Router.forEachPrettyPattern((page, pattern, defaultParams) =>
    server.get(pattern, (req, res) =>
      app.render(
        req,
        res,
        `/${page}`,
        Object.assign({}, defaultParams, req.query, req.params)
      )
    )
  );

  server.get("/api/user", AuthMiddleWare.validate, async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json({ success: true, data: { users } });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: { message: error.message } });
    }
  });

  server.post("/api/user", async (req, res) => {
    try {
      const data = req.body;
      const existingUser = await UserModel.findOne({
        where: { mobile_number: data.mobile_number }
      });
      if (existingUser) {
        throw Error("Mobile number must be unique.");
      }
      const user = await UserModel.create(data);
      const password = await encrypt(data.password);
      const auth = await AuthModel.create({
        username: data.mobile_number,
        password,
        role: data.role || "USER"
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: { message: error.message } });
    }
  });

  server.get("/api/me", AuthMiddleWare.validate, async (req, res) => {
    try {
      const auth = req.auth;
      const user = await UserModel.findOne({
        where: { mobile_number: auth.username }
      });
      if (!user) {
        throw Error("user not found.");
      }
      
      res.json({ success: true, data: { user } });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: { message: error.message } });
    }
  });


  server.post('/api/auth', async (req, res) => {
    try {
        const data = req.body
        const auth = await AuthModel.findOne({
          where: { username: data.username }
        });
        if (!auth) {
          throw Error("invalid username or password.");
        }
        const isValidPassword = await compare(data.password, auth.password)
        if (!isValidPassword) {
          throw Error("invalid username or password.");
        }
        const token = jwt.sign(
          {
              username: auth.username,
              role: auth.role
          },
          '1l3bELIMRB992m9PhuamgCjDM3URu8K4',
          {
              expiresIn: '1d',
          },
      )
      res.json({ success: true, data: { token } });
    } catch (error) {
        console.error(error)
        res.json({ success: false, error: { message: error.message } });
    }
})

server.post('/api/admin/auth', async (req, res) => {
  try {
      const data = req.body
      const auth = await AuthModel.findOne({
        where: { username: data.username }
      });
      if (!auth) {
        throw Error("invalid username or password.");
      }
      const isValidPassword = await compare(data.password, auth.password)
      if (!isValidPassword) {
        throw Error("invalid username or password.");
      }
      const token = jwt.sign(
        {
            username: auth.username,
            role: auth.role
        },
        '1l3bELIMRB992m9PhuamgCjDM3URu8K4',
        {
            expiresIn: '30d',
        },
    )
    res.json({ success: true, data: { token } });
  } catch (error) {
      console.error(error)
      res.json({ success: false, error: { message: error.message } });
  }
})

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  sequelizeConnection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
