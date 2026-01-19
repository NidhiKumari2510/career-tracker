import { useEffect, useState } from "react";
import { Briefcase, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { getFromStorage } from "../lib/storage";

type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: "Internship" | "Full-time";
  status: "Applied" | "Interviewing" | "Offer" | "Rejected";
  dateApplied: string;
  notes?: string;
  createdAt: string;
};

interface Stats {
  total: number;
  interviewing: number;
  offers: number;
  rejected: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    interviewing: 0,
    offers: 0,
    rejected: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const JOBS_STORAGE_KEY = "jobs";

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(recentJobs);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredJobs(
        recentJobs.filter(
          (job) =>
            job.companyName.toLowerCase().includes(query) ||
            job.jobTitle.toLowerCase().includes(query),
        ),
      );
    }
  }, [searchQuery, recentJobs]);

  function loadData() {
    setLoading(true);

    try {
      const jobs = getFromStorage<Job[]>(JOBS_STORAGE_KEY, []);

      // Sort by date applied (latest first)
      const sortedJobs = [...jobs].sort(
        (a, b) =>
          new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime(),
      );

      const recent = sortedJobs.slice(0, 10);

      setRecentJobs(recent);
      setFilteredJobs(recent);

      const statsData: Stats = {
        total: jobs.length,
        interviewing: jobs.filter((j) => j.status === "Interviewing").length,
        offers: jobs.filter((j) => j.status === "Offer").length,
        rejected: jobs.filter((j) => j.status === "Rejected").length,
      };

      setStats(statsData);
    } catch (err) {
      console.error("Error loading jobs from localStorage:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Track your job applications and career progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applied</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviewing</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {stats.interviewing}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Offers Received
              </p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {stats.offers}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {stats.rejected}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Applications
          </h3>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery
                ? "No applications match your search"
                : "No applications yet. Start by adding your first job application!"}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.jobTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.jobType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {job.companyName}
                      </div>
                      {job.location && (
                        <div className="text-sm text-gray-500">
                          {job.location}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          job.status,
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.dateApplied).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
