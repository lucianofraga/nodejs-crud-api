import express from 'express';
import fs from 'fs';
import path from 'path';

const userRouter = express.Router();
const jsonUsers = fs.readFileSync(path.join('data', 'users.json'));
const parsedUsers = JSON.parse(jsonUsers);

userRouter.get('/', (req, res) => {
    return res.send(parsedUsers);
});

userRouter.post('/', (req, res) => {
    // writing to the database
    parsedUsers.push(req.body);
    fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(parsedUsers));

    return res.status(201);
});

export default userRouter;