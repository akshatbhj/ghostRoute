import mongoose from "mongoose";

const EndpointSchema = new mongoose.Schema(
  {
    // The URL endpoint that user wants to mock (e.g.: "/my-mock-api/users").
    endpointPath: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // The HTTP method user wants (e.g.: GET, POST, PUT etc.).
    method: {
      type: String,
      default: "GET",
      uppercase: true,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Restrict to valid verbs.
    },

    // An array of object to define what data to return.
    // E.g., [{ fieldName: 'email', fieldtype: 'Email' }, { fieldName: 'age', fieldtype: 'Number' }]
    responseSchema: [
      {
        fieldName: {
          type: String,
          required: true,
          trim: true,
        },
        fieldType: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true },
);

// COMPOUND INDEX: Ensures that a path+method combo is unique
// (e.g., You can have GET /users and POST /users, but not two GET /users)
EndpointSchema.index({ endpointPath: 1, method: 1 }, { unique: true });

export default mongoose.model("Endpoint", EndpointSchema);
