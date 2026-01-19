import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Filter } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Job = Database['public']['Tables']['jobs']['Row'];
type StatusFilter = 'All' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, jobs]);

  async function loadJobs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('date_applied', { ascending: false });

    if (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
      return;
    }

    if (data) {
      setJobs(data);
    }
    setLoading(false);
  }

  function applyFilters() {
    let filtered = [...jobs];

    if (statusFilter !== 'All') {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.company_name.toLowerCase().includes(query) ||
          job.job_title.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
    }

    setFilteredJobs(filtered);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Interviewing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        <h2 className="text-2xl font-semibold text-gray-900">All Job Applications</h2>
        <p className="text-gray-600 mt-1">View and manage all your job applications</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company, role, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <div className="text-gray-500">
            {jobs.length === 0
              ? 'No job applications yet. Start by adding your first application!'
              : 'No applications match your filters.'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{job.job_title}</h3>
                  <p className="text-gray-600 text-sm">{job.company_name}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                {job.location && (
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Location:</span>
                    {job.location}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Type:</span>
                  {job.job_type}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Applied:</span>
                  {new Date(job.date_applied).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {job.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 line-clamp-2">{job.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{jobs.length}</span> applications
        </div>
      </div>
    </div>
  );
}
