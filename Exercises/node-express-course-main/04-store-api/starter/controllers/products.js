const Product = require("../models/product");

// Testing
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  let query = {}; // Initialize an empty query object

  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    const filters = req.query.numericFilters.split(",");
    filters.forEach((item) => {
      const [field, operator, value] = item.split(regEx); // Split using regex
      query[field] = { [operatorMap[operator]]: value }; // Parse value to float
      console.log(`filters = ${filters}`);
      console.log(`item = ${item}`);
      console.log(`item.split(regEx).filter(Boolean) = ${item.split(regEx).filter(Boolean)}`);
      console.log(`query[field] = ${query[field]}`);
    });
  }

  let result = Product.find(query); // Apply query filters

  if (req.query.sort) {
    const sortList = req.query.sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); // Default sort
  }

  if (req.query.fields) {
    const fieldsList = req.query.fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
