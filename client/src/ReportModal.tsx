import { useState } from "react";
import { X, Save } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const ADD_INSPECTION = gql`
  mutation AddInspection($siteId: ID!, $status: String!, $notes: String!) {
    addInspection(siteId: $siteId, status: $status, notes: $notes) {
      id
      status
    }
  }
`;

interface Props {
  siteId: string;
  onCc: () => void;
}

export function ReportModal({ siteId, onCc }: Props) {
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");
  
  const [addInspection, { loading }] = useMutation(ADD_INSPECTION, {
    onCompleted: () => {
      onCc(); // Close the modal after successful submission
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInspection({ variables: { siteId, status, notes } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">New Inspection Report</h2>
          <button onClick={onCc} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="Passed">Passed (Green)</option>
              <option value="Warning">Warning (Yellow)</option>
              <option value="Critical">Critical Issue (Red)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Inspector Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Describe the anomaly..."
              required
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}