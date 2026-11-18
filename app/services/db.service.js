// dependencies

import {
  createConnectionToDB,
  closeConnectionToDB,
  selectDB,
} from "../utils/db.utils.js";

// logger
import { logger } from "../utils/logs.utils.js";

const { COLLECTION_USER_STICKER, SUCCESS, SERVER_ERR, RECORDS_LIMIT_TO_FETCH } =
  process.env;

const getAllUsers = async (skipRecords) => {
  const dbClient = createConnectionToDB();

  try {
    const db = selectDB(dbClient);

    // db call
    const data = await db
      .collection(COLLECTION_USER_STICKER)
      .find({})
      .sort({ _id: 1 })
      .skip(skipRecords)
      .limit(Number(RECORDS_LIMIT_TO_FETCH))
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
