import express from "express";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Endpoint from "../models/Endpoint.js";

const router = express.Router();

const typeGenerator = {
  ID: () => faker.string.uuid(),
  "Full Name": () => faker.person.fullName(),
  Email: () => faker.internet.email(),
  Number: () => faker.number.int({ min: 1, max: 1000 }),
  "Avatar URL": () => faker.image.avatar(),
};

const generateFakeData = (schemaArray) => {
  return Array.from({ length: 10 }, () => {
    
    let mockObject = {};

    schemaArray.forEach((field) => {
      const generatorFunction = typeGenerator[field.fieldType];
      mockObject[field.fieldName] = generatorFunction
        ? generatorFunction()
        : "Unknown Type";
    });

    return mockObject;

  });
};

router.get("/*path", async (req, res) => {
  try {
    const rawPath = req.params.path;
    const requestedPath = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
    const endpoint = await Endpoint.findOne({ endpointPath: requestedPath });

    if (!endpoint) {
      return res
        .status(404)
        .json({ error: `Mock API not found at path: ${requestedPath}` });
    }

    const responseData = generateFakeData(endpoint.responseSchema);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error generating mock data: ", error);
    res.status(500).json({ error: `Server error while generating fake data.` });
  }
});

export default router;
