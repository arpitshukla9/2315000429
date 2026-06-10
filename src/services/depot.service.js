import apiClient from "../config/axios.js";
import { logger } from "../middleware/logger.js";

export const getDepots = async () => {
  try {
    logger("backend", "info", "depot-service", "Fetching depots");

    const res = await apiClient.get("/evaluation-service/depots");

    logger("backend", "info", "depot-service", "Depots fetched successfully");

    return res.data.depots;
  } catch (error) {
    logger("backend", "error", "depot-service", error.message);

    throw error;
  }
};
