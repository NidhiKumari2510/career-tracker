import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import AllJobs from './pages/AllJobs';
import DSARoadmap from './pages/DSARoadmap';
import ResumeFeedback from './pages/ResumeFeedback';
import Resources from './pages/Resources';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-job':
        return <AddJob />;
      case 'all-jobs':
        return <AllJobs />;
      case 'dsa-roadmap':
        return <DSARoadmap />;
      case 'resume-feedback':
        return <ResumeFeedback />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
