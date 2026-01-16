import { CosmosClient } from "@azure/cosmos";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";
const client = new CosmosClient({ endpoint, key });

export const database = client.database("EcoRegulateDB");
export const container = database.container("Sites");

export const initDB = async () => {
  const { database } = await client.databases.createIfNotExists({
    id: "EcoRegulateDB",
  });
  await database.containers.createIfNotExists({ id: "Sites" });

  // Seed sample data
  try {
    const { resources } = await container.items.query("SELECT * FROM c").fetchAll();
    
    if (resources.length === 0) {
      const sampleSites = [
        {
          id: uuidv4(),
          name: "Solar Farm Alpha",
          location: "California, USA",
          type: "Solar",
          inspections: [
            {
              id: uuidv4(),
              date: new Date().toISOString(),
              status: "Passed",
              notes: "All panels functioning optimally",
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Wind Farm Beta",
          location: "Texas, USA",
          type: "Wind",
          inspections: [
            {
              id: uuidv4(),
              date: new Date().toISOString(),
              status: "Passed",
              notes: "Turbines operating within parameters",
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Hydro Station Gamma",
          location: "Oregon, USA",
          type: "Hydro",
          inspections: [
            {
              id: uuidv4(),
              date: new Date().toISOString(),
              status: "Warning",
              notes: "Water flow rates normal",
            },
          ],
        },
      ];

      for (const site of sampleSites) {
        await container.items.create(site);
      }
      console.log("Sample data seeded successfully");
    }
  } catch (error) {
    console.error("Database seeding error:", error);
  }
};