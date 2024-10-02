import User from '../models/user-model.js';

export const getUsers = async (req, res) => {
  try {
    const id = req.auth.userId;
    const users = await User.getUsersExceptCurrent(id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const { userId: id, userFullName, userProfileUrl } = req.auth.claims;
    let role = await User.getRole(id);

    if (!role?.role) {
      await User.createUser(id, userFullName, userProfileUrl);
      role = { role: 'user', blocked: false };
    }

    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleBanStatus = async (req, res) => {
  try {
    const { blocked } = req.body;
    const { id } = req.params;
    await User.toggleBanStatus(id, blocked);
    res.json({ message: 'User banned status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    if (!role) return res.status(400).json({ error: 'Missing role parameter' });

    await User.updateRole(id, role);
    res.json({ message: 'User role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearUserHistory = async (req, res) => {
  try {
    const { userId } = req.auth;
    const deletedCount = await User.clearHistory(userId);

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'No History to clear for this user.' });
    }

    res.status(200).json({ message: `${deletedCount} rows cleared for user ${userId}.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
