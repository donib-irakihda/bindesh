const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPostByBoardId,
} = require("../controller/postContoller");
const { validatePost } = require("../validators/postValidator");
const upload = require("../helper/multer");
const postRoute = express.Router();

const { isPostOwner } = require("../middleware/postMiddleware");
const { isLoggedIn } = require("../middleware/auth");
// create post
postRoute.post(
  "/create-post",
  upload.single("file"),
  isLoggedIn,
  validatePost,
  createPost
);

// update post
postRoute.put(
  "/update-post/:id",
  upload.single("file"),
  isLoggedIn,
  isPostOwner,
  validatePost,
  updatePost
);

// delete post
postRoute.delete("/delete-post/:id", deletePost);

postRoute.get("/get-post/board/:boardId", getPostByBoardId);

module.exports = postRoute;
