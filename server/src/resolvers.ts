import { container } from "./db";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    sites: async () => {
      const querySpec = {
        query: "SELECT * FROM c",
      };
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    },
    site: async (_: any, { id }: { id: string }) => {
      const querySpec = {
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [{ name: "@id", value: id }],
      };
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources[0];
    },
    sitesByStatus: async (_: any, { status }: { status: string }) => {
      const querySpec = {
        query: "SELECT c.id, c.name, c.location, c.type, i AS inspections FROM c JOIN i IN c.inspections WHERE i.status = @status",
        parameters: [{ name: "@status", value: status }],
      };
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    },
  },
  Mutation: {
    addSite: async (_: any, { name, location, type }: any) => {
      const newSite = {
        id: uuidv4(),
        name,
        location,
        type,
        inspections: [],
      };
      const { resource } = await container.items.create(newSite);
      return resource;
    },
    addInspection: async (_: any, { siteId, status, notes }: any) => {
      const site = await container.item(siteId, siteId).read();
      if (!site.resource) throw new Error("Site not found");

      const newInspection = {
        id: uuidv4(),
        date: new Date().toISOString(),
        status,
        notes,
      };

      site.resource.inspections.push(newInspection);
      const { resource } = await container
        .item(siteId, siteId)
        .replace(site.resource);
      return resource;
    },
  },
};