import jwt from "jsonwebtoken";

export const validateToken = (request, response, next) => {
  const token = request.headers["authorization"]
    ? request.headers["authorization"].split(" ")[1]
    : "";

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, authData) => {
      if (!error) next();
      else {
        response.status(403).send({ message: "Invalid token" });
      }
    });
  } else {
    response.status(403).send({ message: "Invalid token" });
  }
};
