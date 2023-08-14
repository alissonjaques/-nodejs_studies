import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://root:yY1zGNnYBfpFLez1@livraria.lo6vewb.mongodb.net/livraria"
);

const db = mongoose.connection;

export default db;
