import express from "express";
import Endpoint from "../models/Endpoint.js";

const router = express.Router();

router.post("/create-endpoint", async (req, res) => {
  try {
    // Grab the data, user sent in the body of the request.
    const { endpointPath, method, responseSchema } = req.body;

    const existingEndpoint = await Endpoint.findOne({ endpointPath });
    if (existingEndpoint) {
      res
        .status(400)
        .json({ error: "An endpoint with this path already exists." });
    }

    // Create a new document using the Mongoose model.
    const newEndpoint = new Endpoint({
      endpointPath,
      method,
      responseSchema,
    });

    // Save it to database
    const savedEndpoint = await newEndpoint.save();

    // Send a success message back to the frontend.
    res.status(201).json({
      message: "Mock endpoint created successfully.",
      data: savedEndpoint,
    });
  } catch (error) {
    console.error("Error creating endpoint.", error);
    res
      .status(500)
      .json({ error: "Server error while creating the endpoint." });
  }
});

export default router;
