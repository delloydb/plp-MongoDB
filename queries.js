// Task 2 - Basic CRUD
// Find all books in a specific genre
db.books.find({ genre: "Classic" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.5 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" });

// Task 3 - Advanced Queries
// Find books that are in stock and published after 2010
db.books.find({
  $and: [{ in_stock: true }, { published_year: { $gt: 2010 } }]
});

// Projection: return title, author, and price only
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort by price ascending
db.books.find().sort({ price: 1 });

// Sort by price descending
db.books.find().sort({ price: -1 });

// Pagination: 5 books per page (page 1)
db.books.find().limit(5).skip(0);

// Pagination: page 2
db.books.find().limit(5).skip(5);

// Task 4 - Aggregation Pipeline
// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
]);

// Task 5 - Indexing
// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain index usage
db.books.find({ title: "Sapiens" }).explain("executionStats");
