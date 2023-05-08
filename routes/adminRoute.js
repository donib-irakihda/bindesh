const express = require("express");
const adminRouter = express.Router();

const {
  adminLogin,
  onlyAdmin,
  getAllUsers,
  deleteUser,
  getAllOrg,
} = require("../controller/adminController");
const { isAdmin, isLoggedIn } = require("../middleware/auth");
const { validateLoginUser } = require("../validators/userValidator");

adminRouter.post("/login", validateLoginUser, adminLogin);

adminRouter.get("/adminOnly", isLoggedIn, isAdmin, onlyAdmin);

adminRouter.get("/get-all-orgs", isLoggedIn, isAdmin, getAllOrg);

adminRouter.get("/get-all-users", isLoggedIn, isAdmin, getAllUsers);

adminRouter.delete("/delete-user/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = adminRouter;
