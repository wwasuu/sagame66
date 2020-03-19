const jwt = require("jsonwebtoken");

function validate(req, res, next) {
  try {
    const authorization = req.get("Authorization");
    if (!authorization) throw Error('invalid token')
    const token = authorization.split(" ")[1];
    if (!token) {
      throw Error('invalid token')
    }

    const { username, role } = jwt.verify(token, "1l3bELIMRB992m9PhuamgCjDM3URu8K4");
    
    req.auth = { username, role };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, error: { message: error.message } });
  }
}

function authorization(req, res, next) {
    try {
      const authorization = req.get("Authorization");
      if (!authorization) throw Error('invalid token')
      const token = authorization.split(" ")[1];
      if (!token) {
        throw Error('invalid token')
      }
  
      const { username } = jwt.verify(token, "1l3bELIMRB992m9PhuamgCjDM3URu8K4");
      
      req.auth = { username };
      return next();
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error: { message: error.message } });
    }
  }

module.exports = {
  validate,
  authorization
};
