import fs from 'fs';
import path from 'path';

import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const userRouter = express.Router();
const jsonUsers = fs.readFileSync(path.join('data', 'users.json')) || '[]';
const parsedUsers = JSON.parse(jsonUsers);

userRouter.get('/', (req, res) => {
    return res.send(parsedUsers);
});

userRouter.post('/', (req, res) => {
    const newUser = { id: uuidv4(), ...req.body };
    
    // writing to the database
    parsedUsers.push(newUser);
    fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(parsedUsers));

    return res.status(201).send(newUser);
});

export default userRouter;