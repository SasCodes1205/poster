import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    // Required fields for ads (renamed from original product fields)
    name: { type: String, required: true }, // Now used as title for ads
    image: { type: String, required: true }, // Main image
    image2: { type: String }, // Additional images
    image3: { type: String },
    image4: { type: String },
    brand: { type: String, required: true }, // Keep as is
    quantity: { type: Number, required: true, default: 1 }, // Items available
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 1 }, // Available stock

    ////////////////////////////added
     attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    },

    ////////////////////////////////
    // Additional ad-specific fields
    location: { type: String, required: true },
    contact: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'sold', 'expired', 'hidden'],
      default: 'active'
    },
    views: { type: Number, default: 0 },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    },
    seller: { type: ObjectId, ref: "User", required: true },
    
    // Original product fields we'll repurpose
    reviews: [reviewSchema], // Can be used for ad ratings/comments
    rating: { type: Number, default: 0 }, // Average rating
    numReviews: { type: Number, default: 0 }, // Review count
    
    // New ad-specific optional fields
    adType: {
      type: String,
      enum: ['sell', 'buy', 'rent', 'exchange'],
      default: 'sell'
    },
    condition: {
      type: String,
      enum: ['new', 'used', 'refurbished'],
      default: 'used'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true } 
  }
);

// Indexes for better ad search performance
productSchema.index({ name: 'text', description: 'text' }); // Searchable fields
productSchema.index({ category: 1 });
productSchema.index({ location: 1 });
productSchema.index({ price: 1 });
productSchema.index({ status: 1 });
productSchema.index({ adType: 1 });
productSchema.index({ condition: 1 });

// Virtual for days remaining (ad-specific)
productSchema.virtual('daysRemaining').get(function() {
  return Math.max(0, Math.ceil((this.expiryDate - Date.now()) / (1000 * 60 * 60 * 24)));
});


//////////////////////////////////////////////////////////

productSchema.pre("save", async function(next) {
  if (this.isNew || this.isModified("subcategory")) {
    const category = await mongoose.model("Category").findById(this.category);
    
    if (!category) {
      throw new Error(`Category ${this.category} not found`);
    }
    
    const subcategory = category.subcategories.find(
      sc => sc.name === this.subcategory
    );
    
    if (subcategory) {
      // Validate required fields
      for (const fieldDef of subcategory.fieldDefinitions) {
        if (fieldDef.isRequired && !this.attributes?.has(fieldDef.fieldName)) {
          throw new Error(`Required field "${fieldDef.fieldName}" is missing`);
        }
        
        // Type validation
        if (this.attributes?.has(fieldDef.fieldName)) {
          const value = this.attributes.get(fieldDef.fieldName);
          let isValid = true;
          
          switch(fieldDef.dataType) {
            case "Number":
              isValid = typeof value === "number";
              break;
            case "Boolean":
              isValid = typeof value === "boolean";
              break;
            case "Date":
              isValid = value instanceof Date || !isNaN(Date.parse(value));
              break;
            case "Array":
              isValid = Array.isArray(value);
              break;
            // String is default
          }
          
          if (!isValid) {
            throw new Error(
              `Field "${fieldDef.fieldName}" must be of type ${fieldDef.dataType}`
            );
          }
          
          // Validate against options if provided
          if (fieldDef.options?.length > 0 && !fieldDef.options.includes(value)) {
            throw new Error(
              `Field "${fieldDef.fieldName}" must be one of: ${fieldDef.options.join(", ")}`
            );
          }
        }
      }
    }
  }
  next();
});

////////////////////////////////////////////////////////////


const Product = mongoose.model("Product", productSchema);
export default Product;