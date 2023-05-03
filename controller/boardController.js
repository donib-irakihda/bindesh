const boardModel = require("../model/board");
const organizationModel = require("../model/organization");
// create board
const createBoard = async (req, res) => {
  try {
    const { name, organization, description, boardType } = req.body;
    const org = await organizationModel.findById(organization);
    if (!org) return res.status(404).json({ error: "Organization not valid" });
    const board = new boardModel({
      name,
      organization,
      description,
      admin: req.user.id,
      boardType,
    });
    await board.save();
    org.board = board._id;
    await org.save();
    res.status(201).json({
      message: "Board created successfully",
      boardData: board,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Board creation failed",
    });
  }
};

//update board
const updateBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = await boardModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res
      .status(201)
      .json({ message: "Board updated successfully", boardData: board });
  } catch (error) {
    res.status(500).json({ error: "Board not updated" });
  }
};

module.exports = {
  createBoard,
  updateBoard,
};