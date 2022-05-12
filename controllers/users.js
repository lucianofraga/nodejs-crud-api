import fs from "fs";
import path from "path";

import { v4 as uuidv4 } from "uuid";

const jsonUsers = fs.readFileSync(path.join("data", "users.json")) || "[]";
let parsedUsers = JSON.parse(jsonUsers);

export const createUser = (req, res) => {
  const newUser = { id: uuidv4(), ...req.body };

  // writing to the database
  parsedUsers.push(newUser);
  fs.writeFileSync(
    path.join("data", "users.json"),
    JSON.stringify(parsedUsers)
  );

  return res.status(201).send(newUser);
};

export const getUsers = (req, res) => {
  return res.send(parsedUsers);
};

export const getById = (req, res) => {
  const { id } = req.params;
  const foundUser = parsedUsers.find((p) => p.id === id);

  if (!foundUser) {
    return res.status(404).send("User not found");
  }

  return res.send(foundUser);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const userToUpdate = parsedUsers.find((p) => p.id === id);

  if (!userToUpdate) {
    return res.status(404).send("User not found");
  }

  // Updating the existing properties
  Object.keys(req.body).forEach((p) => {
    if (req.body[p] && userToUpdate[p]) {
      userToUpdate[p] = req.body[p];
    }
  });

  // writing to the database
  fs.writeFileSync(
    path.join("data", "users.json"),
    JSON.stringify(parsedUsers)
  );

  return res.status(200).send(userToUpdate);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = parsedUsers.find((p) => p.id === id);

  if (!foundUser) {
    return res.status(400).send("Bad request");
  }

  // writing to the database
  parsedUsers = parsedUsers.filter((p) => p.id !== id);
  fs.writeFileSync(
    path.join("data", "users.json"),
    JSON.stringify(parsedUsers)
  );

  return res.send(foundUser);
};
