import express from 'express';
const userRouter = express.Router();
import fs from 'fs';
import path from 'path';

const jsonUsers = fs.readFileSync(path.join('data', 'users.json'));
const parsedUsers = JSON.parse(jsonUsers);

userRouter.get('/', (req, res) => {
    console.log(parsedUsers);
    return res.send(parsedUsers);
});

export default userRouter;