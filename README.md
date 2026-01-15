# EcoRegulate - Energy Site Compliance Dashboard

A full-stack web application for the Alberta Energy Regulator (AER) demonstrating modern cloud-native development with Azure, GraphQL, and React.

## 🎯 Overview

**EcoRegulate** is a compliance dashboard that enables energy inspectors to:
- View a real-time list of active energy sites (Solar Farms, Wind Farms, Hydro Stations)
- Monitor the current compliance status of each site (Passed, Warning, Critical)
- Submit new inspection reports with findings and anomalies directly to the database
- Track inspection history per site

This project demonstrates **Full Stack Developer** competency by integrating:
- ☁️ Azure Cloud Services (Cosmos DB)
- 📊 RESTful API with GraphQL
- ⚛️ Modern Frontend with React + TypeScript
- 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **API:** Apollo Server (GraphQL)
- **Database:** Azure Cosmos DB (NoSQL)
- **SDK:** @azure/cosmos

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 3.4.17
- **State Management:** Apollo Client (GraphQL)
- **Icons:** Lucide React
- **Routing:** React Router DOM 7.12.0

### DevOps & Deployment
- **Version Control:** Git & GitHub
- **Cloud Platform:** Microsoft Azure
  - Static Web Apps (Frontend)
  - App Service (Backend)
  - Cosmos DB (Database)
- **CI/CD:** GitHub Actions (via Azure Static Web Apps)

---

## 📁 Project Structure

```
ecoregulate/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── App.tsx             # Main dashboard component
│   │   ├── ReportModal.tsx      # Inspection report form
│   │   ├── main.tsx            # Apollo Client setup
│   │   └── index.css           # Global styles
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── package.json
│   └── index.html
│
├── server/                      # Node.js/GraphQL Backend
│   ├── src/
│   │   ├── index.ts            # Apollo Server entry point
│   │   ├── schema.ts           # GraphQL type definitions
│   │   ├── resolvers.ts        # GraphQL resolvers
│   │   └── db.ts               # Azure Cosmos DB connection
│   ├── .env                    # Environment variables (Cosmos credentials)
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Azure subscription (with Cosmos DB instance)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Yu4i/ecoregulate.git
cd ecoregulate
```

2. **Install dependencies:**

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the `server/` directory:
```env
COSMOS_ENDPOINT=https://your-cosmos-db.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-primary-key
```

### Running Locally

**Terminal 1 - Start the GraphQL Server:**
```bash
cd server
npm start
# Server runs at http://localhost:4000
```

**Terminal 2 - Start the React Frontend:**
```bash
cd client
npm run dev
# Frontend runs at http://localhost:5173
```

Visit `http://localhost:5173` to see the dashboard!

---

## 📊 Features

### Current Implementation
- ✅ **Site Listing** - View all energy sites with real-time data
- ✅ **Status Monitoring** - Visual status badges (Passed/Warning/Critical)
- ✅ **Inspection Reports** - Modal form to submit new inspection reports
- ✅ **Database Integration** - Data persisted in Azure Cosmos DB
- ✅ **Responsive Design** - Works on desktop and tablet devices
- ✅ **GraphQL API** - Efficient data fetching with Apollo Client

### Upcoming Features
- 🔄 Advanced filtering & search
- 📍 Map view of sites (with location data)
- 📈 Historical inspection analytics
- 📧 Email notifications for critical issues
- 👥 Multi-user authentication & role-based access
- 🔐 Enhanced security & audit logs

---

## 🔗 API Documentation

### GraphQL Endpoints

**Query: Get All Sites**
```graphql
query GetSites {
  sites {
    id
    name
    location
    type
    inspections {
      id
      status
      date
      notes
    }
  }
}
```

**Mutation: Add Inspection Report**
```graphql
mutation AddInspection($siteId: ID!, $status: String!, $notes: String!) {
  addInspection(siteId: $siteId, status: $status, notes: $notes) {
    id
    status
    date
  }
}
```

---

## 📦 Build & Deployment

### Building for Production

**Frontend:**
```bash
cd client
npm run build
# Output: dist/ folder ready for deployment
```

**Backend:**
```bash
cd server
npm run build
# TypeScript compilation ready for deployment
```

### Deploying to Azure

#### Frontend - Azure Static Web Apps
1. Push code to GitHub
2. In Azure Portal, create a Static Web App linked to your GitHub repo
3. Configure build settings:
   - Build location: `client`
   - App location: `src`
   - Output location: `dist`

#### Backend - Azure App Service
1. Create an App Service in Azure Portal
2. Deploy using GitHub Actions or Azure CLI
3. Set environment variables in App Service configuration
4. Ensure Cosmos DB connection works from App Service

---

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd client
npm run test

# Backend tests
cd server
npm run test
```

### Manual Testing Checklist
- [ ] Dashboard loads and displays all sites
- [ ] Click "Report Issue" button opens modal
- [ ] Submit inspection report from modal
- [ ] Site status updates after submission
- [ ] Close modal without submission works
- [ ] Responsive on mobile devices

---

## 📝 Environment Configuration

### Development
```
COSMOS_ENDPOINT=https://localhost:8081/ (Cosmos Emulator)
COSMOS_KEY=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4AB0+/Dy05sdcSXCh33kcqWGSTW5RbzevV+a6wig==
```

### Production
```
COSMOS_ENDPOINT=https://your-prod-cosmos.documents.azure.com:443/
COSMOS_KEY=<your-production-key>
REACT_APP_GRAPHQL_ENDPOINT=https://your-backend.azurewebsites.net/graphql
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💼 Author

**Yuvraj**
- GitHub: [@Yu4i](https://github.com/Yu4i)
- Email: yuvmasoun@gmail.com

---

## 🙏 Acknowledgments

- Azure Cosmos DB for scalable NoSQL database
- Apollo GraphQL for efficient data management
- Tailwind CSS for rapid UI development
- Lucide React for beautiful icons
- The open-source community

---

## 📞 Support

For issues, questions, or suggestions, please:
1. Check existing [GitHub Issues](https://github.com/Yu4i/ecoregulate/issues)
2. Create a new issue with detailed description
3. Include screenshots if relevant

---

**Made with ❤️ for the Alberta Energy Regulator**
