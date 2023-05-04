// only admin can update and delete post of his organization and user of other organization can't update and delete post of other organization
const boardModel = require("../model/board");
const postModel = require("../model/post");
const orgUserModel = require("../model/orgUsers");
const isPostOwner = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id).populate({
      path: "board",
      model: boardModel,
      select: "_id organization",
    });
    console.log(post);
    const orgUser = await orgUserModel.findOne({
      orgId: post.board.organization,
      userId: req.user.id,
    });
    if (!orgUser) return res.status(400).json({ error: "orgUser Not Found" });
    console.log(orgUser);
    if (post.createdBy.toString() !== req.user.id || orgUser.role !== "admin") {
      return res.status(400).json({ error: "You are not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { isPostOwner };