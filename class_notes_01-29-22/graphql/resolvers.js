// resolvers decides what acutally happens because of typedefs

// need access to db
import db from "../../db/index.js";

const resolvers = {
  Query: {
    books: async () => {
      return await db.models.Book.find({});
    },
  },
};

export default resolvers;
