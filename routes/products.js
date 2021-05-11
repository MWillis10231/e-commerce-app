const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;

// GET all the products by a category

router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const results = await db.query(
    "SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year, products.image FROM products, companies WHERE products.company_id = companies.company_id AND category = $1",
    [categoryId]
  );
  if (results.rows != 0) {
    res.send(results.rows);
  } else {
    res.send("No specific products found!");
  }
});

// GET ALL products

router.get("/", async (req, res) => {
  const results = await db.query(
    "SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year, products.image FROM products, companies WHERE products.company_id = companies.company_id ORDER BY stock_amount;"
  );
  res.send(results.rows);
});

// GET filter products

router.get("/search", async (req, res) => {
  // this variable will start building the query filter
  let queryFilter = ``;
  let queryNum = 1;
  let queryArray = [];
  console.log(queryFilter);
  console.log(queryArray);

  // name is the generic search - it checks if a search matches a product name, a product description or a company name
  if (req.query.name) {
    const { name } = req.query;
    queryArray.push("%" + name + "%");
    const nameFilter = ` AND (products.name ILIKE $${queryNum} OR companies.name ILIKE $${queryNum} OR products.description ILIKE $${queryNum})`;
    queryFilter = queryFilter + nameFilter;
    queryNum = queryNum + 1;
  }

  // others allow you to filter results
  // if there's a category
  if (req.query.category) {
      if (req.query.category == 0) {
        //push nothing
      } else {
        const { category } = req.query;
        queryArray.push(category);
        const categoryFilter = " AND products.category = ";
        queryFilter = queryFilter + categoryFilter + `$${queryNum}`;
        queryNum = queryNum + 1;
      }
  }

  // if there's a company, make that one of the queries
  if (req.query.company) {
    if (Array.isArray(req.query.company)) {
      const { company } = req.query;
      // the first value needs to be AND on the filter
      queryArray.push(company[0]);
      const companyFilter = " AND companies.name ILIKE ";
      queryFilter = queryFilter + companyFilter + `$${queryNum}`;
      queryNum = queryNum + 1;
      // the rest are OR (no product has multiple categories or companies in this database)
      for (let i = 1; i < company.length; i++) {
        queryArray.push(company[i]);
        const companyFilter = " OR companies.name ILIKE ";
        queryFilter = queryFilter + companyFilter + `$${queryNum}`;
        queryNum = queryNum + 1;
      }
    } else {
      const { company } = req.query;
      queryArray.push(company);
      const companyFilter = " AND companies.name ILIKE ";
      queryFilter = queryFilter + companyFilter + `$${queryNum}`;
      queryNum = queryNum + 1;
    }
  }
  // if there's a max and a min price use between, else use greater/lesser than
  if (req.query.pricemin && req.query.pricemax) {
    const { pricemin, pricemax } = req.query;
    queryArray.push(pricemin);
    queryArray.push(pricemax);
    const minPriceFilter = " AND products.price BETWEEN ";
    queryFilter = queryFilter + minPriceFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
    const maxPriceFilter = " AND ";
    queryFilter = queryFilter + maxPriceFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
  
  } else if (req.query.pricemin && !req.query.pricemax) {
    const { pricemin } = req.query;
    queryArray.push(pricemin);
    const minPriceFilter = " AND products.price >= ";
    queryFilter = queryFilter + minPriceFilter + `$${queryNum}`;
    queryNum = queryNum + 1;

  } else if (req.query.pricemax && !req.query.pricemin) {
    const { pricemax } = req.query;
    queryArray.push(pricemax);
    const maxPriceFilter = " AND products.price <= ";
    queryFilter = queryFilter + maxPriceFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
  }
  // if there's a min rating ...
  if (req.query.minrating && req.query.maxrating) {
    const { minrating, maxrating } = req.query;
    queryArray.push(minrating);
    queryArray.push(maxrating);
    const minRatingFilter = " AND products.score BETWEEN ";
    queryFilter = queryFilter + minRatingFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
    const maxRatingFilter = " AND ";
    queryFilter = queryFilter + maxRatingFilter + `$${queryNum}`;
    queryNum = queryNum + 1;

  } else if (req.query.minrating && !req.query.maxrating) {
    const { minrating } = req.query;
    queryArray.push(minrating);
    const minRatingFilter = " AND products.score >= ";
    queryFilter = queryFilter + minRatingFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
  } else if (req.query.maxrating && !req.query.minrating) {
    const { maxrating } = req.query;
    queryArray.push(maxrating);
    const maxRatingFilter = " AND products.score <= ";
    queryFilter = queryFilter + maxRatingFilter + `$${queryNum}`;
    queryNum = queryNum + 1;
  }

  let orderFilter = ''
  //now the orders
  // order BY ASC/DESC
  if (req.query.orderby || req.query.orderbyDESC) {
    orderFilter = ' ORDER BY '
    const { orderby } = req.query;
    if (orderby === "price") {
        orderFilter = orderFilter + "products.price";
    } else if (orderby === "pricedesc") {
        orderFilter = orderFilter + "products.price" + " DESC";
    } else if (orderby === "stock") {
        orderFilter = orderFilter + "products.stock_amount";
    } else if (orderby === "stockdesc") {
        orderFilter = orderFilter + "products.stock_amount" + " DESC";
    } else if (orderby === "score") {
        orderFilter = orderFilter + "products.score";
    } else if (orderby === "scoredesc") {
        orderFilter = orderFilter + "products.score" + " DESC";
    } else if (orderby === "rating") {
        orderFilter = orderFilter + "products.ratings";
    } else if (orderby === "ratingdesc") {
        orderFilter = orderFilter + "products.ratings" + " DESC";
    } else if (orderby === "year") {
        orderFilter = orderFilter + "products.year";
    } else if (orderby === "yeardesc") {
        orderFilter = orderFilter + "products.year" + " DESC";
    } else {
        orderFilter = orderFilter + "products.stock_amount";
    }
  }

  console.log(queryFilter);
  console.log(queryArray);

  let queryBase =
    "SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year, products.image FROM products, companies WHERE products.company_id = companies.company_id";
  let newQuery = `${queryBase}${queryFilter}${orderFilter}`;

  console.log(newQuery);

  const results = await db.query(newQuery, queryArray);

  if (results.rows != 0) {
    res.send(results.rows);
  } else {
    res.send("No products found!");
  }
});

// GET a single product by its id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.query(
    "SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year, products.image FROM products, companies WHERE products.company_id = companies.company_id AND product_id = $1",
    [id]
  );
  if (results.rows != 0) {
    res.send(results.rows[0]);
  } else {
    res.send("No product found!");
  }
});

/*    */
