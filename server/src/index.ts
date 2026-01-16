import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { initDB } from "./db";

const startServer = async () => {
  await initDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({}),
  } as any);

  console.log(`Server ready at: ${url}`);
};

startServer().catch((error) => {
  console.error("Server startup error:", error);
  process.exit(1);
});