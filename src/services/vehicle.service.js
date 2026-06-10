import apiClient from "../config/axios.js";
import { logger } from "../middleware/logger.js";

export const getVehicles = async () => {
  try {
    logger("backend", "info", "vehicle-service", "Fetching vehicles");

    const res = await apiClient.get("/evaluation-service/vehicles");

    logger(
      "backend",
      "info",
      "vehicle-service",
      "Vehicles fetched successfully",
    );

    return res.data.vehicles;
  } catch (error) {
    logger("backend", "error", "vehicle-service", error.message);

    throw error;
  }
};
