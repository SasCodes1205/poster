import mongoose from 'mongoose';
import Category from '../models/categoryModel.js'; // Adjust path as needed
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect('mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/AD-Poster?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected for migration'))
  .catch(err => console.error('MongoDB connection error:', err));

async function migrateCategories() {
  try {
    const categories = await Category.find({});

    let migratedCount = 0;
    
    for (const category of categories) {
      if (category.legacySubcategories?.length > 0 && !category.subcategories?.length) {
        category.subcategories = category.legacySubcategories.map(name => ({
          name,
          fieldDefinitions: getDefaultFieldDefinitions(category.name, name)
        }));
        
        await category.save();
        migratedCount++;
        console.log(`Migrated category: ${category.name}`);
      }
    }

    console.log(`Migration complete. Updated ${migratedCount} categories.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

function getDefaultFieldDefinitions(categoryName, subcategoryName) {
  // Common fields for many categories
  const commonFields = [
    { 
      fieldName: "condition", 
      dataType: "String", 
      options: ["New", "Used", "Refurbished"],
      searchable: true
    }
  ];

  // Category-specific field definitions
  switch(categoryName) {
    case "Electronics":
      return getElectronicsFields(subcategoryName);
    case "Vehicles":
      return getVehicleFields(subcategoryName);
    case "Property":
      return getPropertyFields(subcategoryName);
    case "Fashion & Beauty":
      return getFashionFields(subcategoryName);
    default:
      return commonFields;
  }
}

function getElectronicsFields(subcategoryName) {
  const baseFields = [
    { fieldName: "brand", dataType: "String", isRequired: true, searchable: true },
    { fieldName: "model", dataType: "String", searchable: true },
    { fieldName: "warranty", dataType: "Boolean" }
  ];

  switch(subcategoryName) {
    case "Mobile Phones":
      return [
        ...baseFields,
        { fieldName: "storage", dataType: "String", isRequired: true, unit: "GB" },
        { fieldName: "ram", dataType: "String", unit: "GB" },
        { fieldName: "color", dataType: "String" }
      ];
    case "Laptops":
      return [
        ...baseFields,
        { fieldName: "processor", dataType: "String", isRequired: true },
        { fieldName: "screenSize", dataType: "Number", unit: "inches" }
      ];
    default:
      return baseFields;
  }
}

function getVehicleFields(subcategoryName) {
  const baseFields = [
    { fieldName: "make", dataType: "String", isRequired: true, searchable: true },
    { fieldName: "model", dataType: "String", isRequired: true },
    { fieldName: "year", dataType: "Number", isRequired: true }
  ];

  switch(subcategoryName) {
    case "Cars":
      return [
        ...baseFields,
        { fieldName: "mileage", dataType: "Number", isRequired: true, unit: "km" },
        { fieldName: "transmission", dataType: "String", options: ["Automatic", "Manual"] },
        { fieldName: "fuelType", dataType: "String", options: ["Petrol", "Diesel", "Electric", "Hybrid"] }
      ];
    case "Motorbikes":
      return [
        ...baseFields,
        { fieldName: "engineCapacity", dataType: "Number", unit: "cc" }
      ];
    default:
      return baseFields;
  }
}

function getPropertyFields(subcategoryName) {
  const baseFields = [
    { fieldName: "area", dataType: "Number", isRequired: true, unit: "sq ft" }
  ];

  switch(subcategoryName) {
    case "Houses for Sale":
    case "Houses for Rent":
      return [
        ...baseFields,
        { fieldName: "bedrooms", dataType: "Number", isRequired: true },
        { fieldName: "bathrooms", dataType: "Number", isRequired: true },
        { fieldName: "furnished", dataType: "Boolean" }
      ];
    case "Apartments for Rent":
      return [
        ...baseFields,
        { fieldName: "floor", dataType: "Number" },
        { fieldName: "rentPeriod", dataType: "String", options: ["Monthly", "Yearly"] }
      ];
    default:
      return baseFields;
  }
}

function getFashionFields(subcategoryName) {
  const baseFields = [
    { fieldName: "size", dataType: "String", isRequired: true },
    { fieldName: "color", dataType: "String", isRequired: true }
  ];

  switch(subcategoryName) {
    case "Watches":
      return [
        ...baseFields,
        { fieldName: "watchType", dataType: "String", options: ["Analog", "Digital", "Smart"] }
      ];
    case "Footwear":
      return [
        ...baseFields,
        { fieldName: "material", dataType: "String" }
      ];
    default:
      return baseFields;
  }
}

// Run the migration
migrateCategories();