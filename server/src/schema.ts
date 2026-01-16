export const typeDefs = `#graphql
  type Inspection {
    id: ID!
    date: String!
    status: String!
    notes: String
  }

  type Site {
    id: ID!
    name: String!
    location: String!
    type: String!
    inspections: [Inspection]
  }

  type Query {
    sites: [Site]
    site(id: ID!): Site
    sitesByStatus(status: String!): [Site]
  }

  type Mutation {
    addSite(name: String!, location: String!, type: String!): Site
    addInspection(siteId: ID!, status: String!, notes: String!): Site
  }
`;