import { getDepots } from "../services/depot.service.js";
import { getVehicles } from "../services/vehicle.service.js";
import { optimizeVehicles } from "../services/knapsack.service.js";
import { logger } from "../middleware/logger.js";
export const getSchedule = async (req, res) => {
  try {
    await logger(
      "backend",
      "info",
      "scheduler-controller",
      "Starting optimization",
    );

    const depots = await getDepots();
    const vehicles = await getVehicles();

    const schedules = depots.map((depot) => {
      const result = optimizeVehicles(vehicles, depot.MechanicHours);

      return {
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        totalImpact: result.totalImpact,
        selectedTasks: result.selectedTasks.map((task) => task.TaskID),
      };
    });

    await logger(
      "backend",
      "info",
      "scheduler-controller",
      "Optimization completed successfully",
    );

    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    await logger("backend", "error", "scheduler-controller", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
