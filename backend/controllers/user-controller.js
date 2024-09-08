import User from '../models/user-model.js';

export const getUsers = async (req, res) => {
  try {
    const id = req.auth.userId; // Assuming req.auth.userId is set somewhere
    const users = await User.getUsersExceptCurrent(id);
    console.log(id);
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const toggleBanStatus = async (req, res) => {
  try {
    const { blocked } = req.body;
    const { id } = req.params;
    await User.toggleBanStatus(id, blocked);
    res.json({ message: 'User banned status updated successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role) return res.status(400).send('Missing role parameter');

    await User.updateRole(id, role);
    res.json({ message: 'User role updated successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
