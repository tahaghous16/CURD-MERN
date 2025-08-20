import User from "../models/user.model.js";

const controller = {
  //CREATE User
  createUser: async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists!" });
      }

      const userAdded = await User.create({
        name: name,
        email: email,
        age: age,
      });
      res.status(201).json(userAdded);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //READ User
  readUser: async (req, res) => {
    try {
      const showAll = await User.find();
      res.status(200).json(showAll);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //READ single user
  readSingleUser: async (req, res) => {
    const { id } = req.params;
    try {
      const singleUser = await User.findById(id);
      if (!singleUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(singleUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //DELETE User
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Update User
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default controller;
