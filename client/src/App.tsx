import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { Activity, MapPin, Server, AlertTriangle } from "lucide-react";
import { ReportModal } from "./ReportModal";

interface Inspection {
  id: string;
  status: string;
  date: string;
}

interface Site {
  id: string;
  name: string;
  location: string;
  type: string;
  inspections: Inspection[];
}

interface GetSitesData {
  sites: Site[];
}

const GET_SITES = gql`
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
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<GetSitesData>(GET_SITES);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  console.log("selectedSiteId:", selectedSiteId);

  if (loading) return <div className="flex h-screen items-center justify-center font-medium text-gray-500">Loading EcoRegulate...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">System Error: {error.message}</div>;

  const getStatusColor = (inspections: any[]) => {
    if (!inspections || inspections.length === 0) return "bg-gray-100 text-gray-600";
    const last = inspections[inspections.length - 1];
    if (last.status === "Critical") return "bg-red-100 text-red-700";
    if (last.status === "Warning") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {selectedSiteId && (
        <ReportModal siteId={selectedSiteId} onCc={() => setSelectedSiteId(null)} />
      )}

      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Activity />
            </div>
            EcoRegulate
          </h1>
          <p className="mt-1 text-gray-500">Alberta Energy Regulator • Compliance Dashboard</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.sites?.map((site) => (
          <div key={site.id} className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                    <Server size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{site.name}</h2>
                    <span className="text-xs text-gray-400">ID: {site.id.substring(0, 8)}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusColor(site.inspections)}`}>
                   {site.inspections?.length > 0 ? site.inspections[site.inspections.length-1].status : "No Data"}
                </span>
              </div>
              
              <div className="space-y-3 py-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{site.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Activity size={18} className="text-gray-400" />
                  <span>{site.type} Sector</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                <button 
                  onClick={() => {
                    console.log("Report Issue clicked for site:", site.id);
                    setSelectedSiteId(site.id);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <AlertTriangle size={16} />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;