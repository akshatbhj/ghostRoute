import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

// These must exactly match the keys in backend typeGenerator!
const FAKER_TYPES = ["ID", "Full Name", "Email", "String", "Number", "Boolean"];

export default function SchemaBuilder() {
  const [fields, setFields] = useState([{ fieldName: "", fieldType: "" }]);

  const addField = () => {
    setFields([...fields, { fieldName: "", fieldType: "" }]);
  };

  const removeField = (indexToRemove) => {
    setFields(fields.filter((_, index) => index !== indexToRemove));
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-end gap-3 p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm"
        >
          {/* Field Name Input */}
          <div className="flex-1">
            <Input
              label={index === 0 ? "Field Name" : ""} // Only show label on the first row
              placeholder="e.g. user_email"
              value={field.fieldName}
              onChange={(e) =>
                handleFieldChange(index, "fieldName", e.target.value)
              }
            />
          </div>

          {/* Field Type Dropdown */}
          <div className="flex-1">
            <Select
              label={index === 0 ? "Data Type" : ""}
              options={FAKER_TYPES}
              value={field.fieldType}
              onChange={(e) =>
                handleFieldChange(index, "fieldType", e.target.value)
              }
            />
          </div>

          {/* Delete Row Button */}
          <div className="pb-1">
            <button
              onClick={() => removeField(index)}
              className=" cursor-pointer p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
              title="Remove Field"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Add New Row Button */}
      <div className="pt-2">
        <Button variant="secondary" onClick={addField}>
          + Add Field
        </Button>
      </div>
    </div>
  );
}
