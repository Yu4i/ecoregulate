"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("./db");
const uuid_1 = require("uuid");
exports.resolvers = {
    Query: {
        sites: async () => {
            const querySpec = {
                query: "SELECT * FROM c",
            };
            const { resources } = await db_1.container.items.query(querySpec).fetchAll();
            return resources;
        },
        site: async (_, { id }) => {
            const querySpec = {
                query: "SELECT * FROM c WHERE c.id = @id",
                parameters: [{ name: "@id", value: id }],
            };
            const { resources } = await db_1.container.items.query(querySpec).fetchAll();
            return resources[0];
        },
        sitesByStatus: async (_, { status }) => {
            const querySpec = {
                query: "SELECT c.id, c.name, c.location, c.type, i AS inspections FROM c JOIN i IN c.inspections WHERE i.status = @status",
                parameters: [{ name: "@status", value: status }],
            };
            const { resources } = await db_1.container.items.query(querySpec).fetchAll();
            return resources;
        },
    },
    Mutation: {
        addSite: async (_, { name, location, type }) => {
            const newSite = {
                id: (0, uuid_1.v4)(),
                name,
                location,
                type,
                inspections: [],
            };
            const { resource } = await db_1.container.items.create(newSite);
            return resource;
        },
        addInspection: async (_, { siteId, status, notes }) => {
            const site = await db_1.container.item(siteId, siteId).read();
            if (!site.resource)
                throw new Error("Site not found");
            const newInspection = {
                id: (0, uuid_1.v4)(),
                date: new Date().toISOString(),
                status,
                notes,
            };
            site.resource.inspections.push(newInspection);
            const { resource } = await db_1.container
                .item(siteId, siteId)
                .replace(site.resource);
            return resource;
        },
    },
};
