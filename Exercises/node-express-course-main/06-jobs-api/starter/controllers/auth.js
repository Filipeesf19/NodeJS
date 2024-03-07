const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body }); //"User" comes as an object and is spread
  const token = user.createJWT(); // Generated a JWT token for that user object
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); //sends a response back to the client with status code 201 (indicating successful creation), along with a JSON object containing the user's name and the generated token.
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password); //compare the input password and the password related to the user

  //if the password if different, throw an error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token }); // Generated a JWT token for that user object
};

module.exports = { register, login };
