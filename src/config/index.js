let DB_URI =
  "mongodb+srv://BaleMoya:balemoya123@balemoya.mgq0f.mongodb.net/test";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
  DB_URI,
};
