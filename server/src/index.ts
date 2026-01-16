import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { initDB } from "./db";

const startServer = async () => {
  try {
    console.log("Initializing database...");
    await initDB();
    console.log("Database initialized successfully");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
    const host = "0.0.0.0";

    const { url } = await startStandaloneServer(server, {
      listen: { host, port },
      context: async () => ({}),
    } as any);

    console.log(`✅ Server ready at: ${url}`);
    console.log(`📍 Listening on ${host}:${port}`);
  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
};

startServer();