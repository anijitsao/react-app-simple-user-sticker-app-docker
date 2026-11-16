// dependencies

import {
  createConnectionToDB,
  closeConnectionToDB,
  selectDB,
} from "../utils/db.utils.js";

// logger
import { logger } from "../utils/logs.utils.js";

const { COLLECTION_USER_STICKER, SUCCESS, SERVER_ERR } = process.env;

const getAllUsers = async (req, res) => {
  const dbClient = createConnectionToDB();

  try {
    const db = selectDB(dbClient);

    // db call
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .toArray();

    let output = data.length > 0 ? [...data] : [];
    return output;
  } catch (error) {
    let output = { message: "FAILED", error: JSON.stringify(error) };
    logger.error("unable to get all the users", error);
    return output;
  } finally {
    await closeConnectionToDB(dbClient);
  }
};

// exports
export { getAllUsers };
