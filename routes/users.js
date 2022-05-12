import fs from 'fs';
import path from 'path';

import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const userRouter = express.Router();
const jsonUsers = fs.readFileSync(path.join('data', 'users.json')) || '[]';
let parsedUsers = JSON.parse(jsonUsers);

userRouter.get('/', (req, res) => {
    return res.send(parsedUsers);
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = parsedUsers.find(p => p.id === id);
    
    if (!foundUser) {
        return res.status(404).send('User not found');
    }

    return res.send(foundUser);
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = parsedUsers.find(p => p.id === id);
    
    if (!foundUser) {
        return res.status(400).send('Bad request');
    }

    // writing to the database
    parsedUsers = parsedUsers.filter(p => p.id !== id);
    fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(parsedUsers));

    return res.send(foundUser);
});

userRouter.post('/', (req, res) => {
    const newUser = { id: uuidv4(), ...req.body };
    
    // writing to the database
    parsedUsers.push(newUser);
    fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(parsedUsers));

    return res.status(201).send(newUser);
});

userRouter.patch('/:id', (req, res) => {
    
    const { id } = req.params;
    const userToUpdate = parsedUsers.find(p => p.id === id);

    if (!userToUpdate) {
        return res.status(404).send('User not found');
    }
    
    // Updating the existing properties
    Object.keys(req.body).forEach(p => {
        if (req.body[p] && userToUpdate[p]) {
            userToUpdate[p] = req.body[p];
        }
    });
    
    // writing to the database
    fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(parsedUsers));

    return res.status(200).send(userToUpdate);
});

export default userRouter;