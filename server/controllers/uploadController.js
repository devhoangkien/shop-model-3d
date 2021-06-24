"use strict";
import fs from "fs";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product";

cloudinary.config({
  cloud_name: "shopmodels",
  api_key: "634125622281371",
  api_secret: "64Rh97BIASBp-LHwcNE4Z3WHhmE",
});

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    console.log(err);
  });
};

// Upload Avatar
export const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.files.avatar;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "avatar",
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// Upload Product Image
export const uploadProduct = asyncHandler(async (req, res) => {
  const file = req.files.product;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "products",
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// Upload Product Models
export const uploadModel = asyncHandler(async (req, res) => {
  const file = req.files.model;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "models",
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

