const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const {
  createFeatureRequest,
  updateFeatureRequest,
  deleteFeatureRequest,
  getAllFeatReq,
  getAllFeatReqByUser,
} = require("../controller/featureRequestController");
const { validateFeatues } = require("../validators/featureValidator");

const featureRequestRoute = express.Router();

featureRequestRoute.post(
  "/create-feature-request",
  isLoggedIn,
  validateFeatues,
  createFeatureRequest
);

featureRequestRoute.patch(
  "/update-feature-request/:id",
  isLoggedIn,
  validateFeatues,
  updateFeatureRequest
);

featureRequestRoute.delete(
  "/delete-feature-request/:id",
  isLoggedIn,
  deleteFeatureRequest
);

featureRequestRoute.get("/get-all-feature-request", getAllFeatReq);

featureRequestRoute.get(
  "/get-all-feature-request-by-user",
  isLoggedIn,
  getAllFeatReqByUser
);

module.exports = featureRequestRoute;
