import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

const BASE_URL = process.env.BASE_URL;

async function runTests() {
  try {
    console.log("\n=================================");
    console.log("1. AUTHENTICATION CHECK");
    console.log("=================================");
    console.log(
      "Token Loaded:",
      process.env.ACCESS_TOKEN ? "YES" : "NO"
    );

    console.log("\n=================================");
    console.log("2. DEPOTS API");
    console.log("=================================");

    const depots = await axios.get(
      `${BASE_URL}/evaluation-service/depots`,
      { headers }
    );

    console.log("Status:", depots.status);
    console.log("Total Depots:", depots.data.depots.length);
    console.log("Sample Depot:");
    console.log(depots.data.depots[0]);

    console.log("\n=================================");
    console.log("3. VEHICLES API");
    console.log("=================================");

    const vehicles = await axios.get(
      `${BASE_URL}/evaluation-service/vehicles`,
      { headers }
    );

    console.log("Status:", vehicles.status);
    console.log("Total Vehicles:", vehicles.data.vehicles.length);
    console.log("Sample Vehicle:");
    console.log(vehicles.data.vehicles[0]);

    console.log("\n=================================");
    console.log("4. SCHEDULER API");
    console.log("=================================");

    const scheduler = await axios.get(
      "http://localhost:5000/api/v1/schedule"
    );

    console.log("Status:", scheduler.status);

    console.log(
      "Total Schedules:",
      scheduler.data.schedules.length
    );

    console.log("First Schedule:");
    console.log(
      JSON.stringify(
        scheduler.data.schedules[0],
        null,
        2
      )
    );

    console.log("\n=================================");
    console.log("5. LOGGER CHECK");
    console.log("=================================");
    console.log(
      "Open logs/app.log and take screenshot."
    );

    console.log("\n=================================");
    console.log("ALL TESTS PASSED");
    console.log("=================================");

  } catch (error) {
    console.error("\nTEST FAILED");
    console.error(
      error.response?.data || error.message
    );
  }
}

runTests();