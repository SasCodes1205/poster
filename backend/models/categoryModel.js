import mongoose from "mongoose";

const fieldDefinitionSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  dataType: { 
    type: String, 
    enum: ["String", "Number", "Boolean", "Date", "Array"], 
    required: true 
  },
  isRequired: { type: Boolean, default: false },
  options: [{ type: String }],
  unit: { type: String },
  searchable: { type: Boolean, default: false }
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  fieldDefinitions: [fieldDefinitionSchema]
});

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    maxlength: 32 
  },
  subcategories: [subcategorySchema],
  legacySubcategories: [{ type: String }] // For backward compatibility
}, { timestamps: true });

// Virtual for backward compatibility
categorySchema.virtual('subcategoryNames').get(function() {
  return this.subcategories?.map(sc => sc.name) || this.legacySubcategories || [];
});

export default mongoose.model("Category", categorySchema);
