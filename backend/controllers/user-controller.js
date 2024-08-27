import User from '../models/user-model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        await User.createUser(name, email);
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
