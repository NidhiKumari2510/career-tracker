import { useState, FormEvent } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { CheckCircle } from 'lucide-react';
import { getFromStorage } from '../lib/storage';

const JOBS_STORAGE_KEY = 'jobs';


export default function AddJob() {
  const { navigateTo } = useNavigation();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'Internship' as 'Internship' | 'Full-time',
    status: 'Applied' as 'Applied' | 'Interviewing' | 'Offer' | 'Rejected',
    dateApplied: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const existingJobs = getFromStorage(JOBS_STORAGE_KEY, []);

    const newJob = {
      id: crypto.randomUUID(),
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      location: formData.location,
      jobType: formData.jobType,
      status: formData.status,
      dateApplied: formData.dateApplied,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    const updatedJobs = [...existingJobs, newJob];
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updatedJobs));

    setSuccess(true);
    setTimeout(() => {
      navigateTo('dashboard');
    }, 1500);
  } catch (err) {
    console.error('Error adding job:', err);
    alert('Error adding job. Please try again.');
  } finally {
    setLoading(false);
  }
};


  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="bg-green-50 p-4 rounded-full mb-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Job Added Successfully!</h3>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Add New Job Application</h2>
        <p className="text-gray-600 mt-1">Track your job application progress</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g., Google"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                id="jobType"
                required
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({ ...formData, jobType: e.target.value as 'Internship' | 'Full-time' })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Application Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'Applied' | 'Interviewing' | 'Offer' | 'Rejected',
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-2">
              Date Applied <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateApplied"
              required
              value={formData.dateApplied}
              onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Additional information about this application..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Job Application'}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className="px-6 py-3 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
