import userService from "../services/user.service.js";

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "Submit all fields for registration" });
  }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(500).send({ message: "Error creating user" });
  }

  res.status(201).send({
    message: "User created successfully",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(500).send({ message: "Error retrieving users" });
  }

  res.status(200).send(users);
};

const findById = async (req, res) => {
  const user = req.user;
  res.status(200).send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name && !username && !email && !password && !avatar && !background) {
    res.status(400).send({ message: "Submit at least one field for update" });
  }

  const { id, user } = req.id;

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User updated successfully" });
};

export default { create, findAll, findById, update };
