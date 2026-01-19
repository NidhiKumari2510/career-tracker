import { ExternalLink, Video, FileText, Code, BookOpen, Mic } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const interviewResources: Resource[] = [
  {
    title: 'LeetCode',
    description: 'Practice coding problems and prepare for technical interviews',
    url: 'https://leetcode.com',
    icon: Code,
  },
  {
    title: 'Pramp',
    description: 'Free peer-to-peer mock interviews with other engineers',
    url: 'https://www.pramp.com',
    icon: Mic,
  },
  {
    title: 'interviewing.io',
    description: 'Anonymous technical mock interviews with engineers from top companies',
    url: 'https://interviewing.io',
    icon: Video,
  },
];

const learningResources: Resource[] = [
  {
    title: 'NeetCode Roadmap',
    description: 'Curated list of 150 LeetCode problems organized by pattern',
    url: 'https://neetcode.io/roadmap',
    icon: BookOpen,
  },
  {
    title: 'Cracking the Coding Interview',
    description: 'Comprehensive guide to technical interview preparation',
    url: 'https://www.crackingthecodinginterview.com',
    icon: FileText,
  },
  {
    title: 'System Design Primer',
    description: 'Learn how to design large-scale systems',
    url: 'https://github.com/donnemartin/system-design-primer',
    icon: Code,
  },
  {
    title: 'Tech Interview Handbook',
    description: 'Free curated interview preparation materials for busy engineers',
    url: 'https://www.techinterviewhandbook.org',
    icon: BookOpen,
  },
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Interview Resources</h2>
        <p className="text-gray-600 mt-1">Prepare for your next technical interview</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Mock Interview Planning</h3>
        <p className="text-blue-800 mb-4">
          Practice is key to interview success. Schedule regular mock interviews to build
          confidence and identify areas for improvement.
        </p>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-start gap-2">
            <span className="font-semibold">1.</span>
            <span>Schedule at least 2-3 mock interviews per week</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold">2.</span>
            <span>Practice both technical and behavioral questions</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold">3.</span>
            <span>Record yourself and review your performance</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold">4.</span>
            <span>Get feedback from peers or mentors</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mock Interview Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviewResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Preparation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Technical Preparation</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Master data structures and algorithms fundamentals</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Practice coding problems daily</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Learn to think out loud while coding</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Understand time and space complexity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Review system design concepts</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Behavioral Preparation</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Prepare STAR method examples</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Research the company and role</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Prepare thoughtful questions to ask</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Practice your introduction</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Be ready to discuss your projects in depth</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
