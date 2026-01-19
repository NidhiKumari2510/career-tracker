import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Circle } from 'lucide-react';

interface Topic {
  key: string;
  name: string;
}

interface Section {
  title: string;
  topics: Topic[];
}

const roadmapData: Section[] = [
  {
    title: 'Programming Fundamentals',
    topics: [
      { key: 'lang-syntax', name: 'Language syntax' },
      { key: 'control-structures', name: 'Control structures' },
      { key: 'functions-recursion', name: 'Functions & recursion' },
      { key: 'oop-basics', name: 'OOP basics' },
    ],
  },
  {
    title: 'Time & Space Complexity',
    topics: [
      { key: 'big-o', name: 'Big-O notation' },
      { key: 'time-complexity', name: 'Time complexity analysis' },
      { key: 'space-time-tradeoffs', name: 'Space-time trade-offs' },
    ],
  },
  {
    title: 'Core Data Structures',
    topics: [
      { key: 'arrays', name: 'Arrays' },
      { key: 'strings', name: 'Strings' },
      { key: 'linked-lists', name: 'Linked Lists' },
      { key: 'stacks', name: 'Stacks' },
      { key: 'queues', name: 'Queues' },
      { key: 'hash-maps', name: 'Hash Maps' },
    ],
  },
  {
    title: 'Searching & Sorting',
    topics: [
      { key: 'linear-search', name: 'Linear Search' },
      { key: 'binary-search', name: 'Binary Search' },
      { key: 'bubble-sort', name: 'Bubble Sort' },
      { key: 'merge-sort', name: 'Merge Sort' },
      { key: 'quick-sort', name: 'Quick Sort' },
      { key: 'heap-sort', name: 'Heap Sort' },
    ],
  },
  {
    title: 'Trees',
    topics: [
      { key: 'binary-trees', name: 'Binary Trees' },
      { key: 'binary-search-trees', name: 'Binary Search Trees' },
      { key: 'avl-trees', name: 'AVL Trees' },
      { key: 'heaps', name: 'Heaps' },
      { key: 'tree-traversals', name: 'Tree Traversals' },
    ],
  },
  {
    title: 'Graphs',
    topics: [
      { key: 'graph-representation', name: 'Graph representation' },
      { key: 'bfs', name: 'BFS' },
      { key: 'dfs', name: 'DFS' },
      { key: 'topological-sort', name: 'Topological Sort' },
      { key: 'dijkstra', name: "Dijkstra's Algorithm" },
      { key: 'bellman-ford', name: 'Bellman-Ford' },
      { key: 'union-find', name: 'Union-Find' },
      { key: 'prim', name: "Prim's Algorithm" },
      { key: 'kruskal', name: "Kruskal's Algorithm" },
    ],
  },
  {
    title: 'Problem-Solving Patterns',
    topics: [
      { key: 'two-pointers', name: 'Two Pointers' },
      { key: 'sliding-window', name: 'Sliding Window' },
      { key: 'divide-conquer', name: 'Divide and Conquer' },
      { key: 'greedy', name: 'Greedy' },
      { key: 'backtracking', name: 'Backtracking' },
    ],
  },
  {
    title: 'Dynamic Programming',
    topics: [
      { key: 'dp-fundamentals', name: 'DP Fundamentals' },
      { key: 'memoization', name: 'Memoization' },
      { key: 'tabulation', name: 'Tabulation' },
      { key: 'common-patterns', name: 'Common DP Patterns' },
    ],
  },
];

export default function DSARoadmap() {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    setLoading(true);
    const { data, error } = await supabase.from('dsa_progress').select('*').eq('completed', true);

    if (error) {
      console.error('Error loading progress:', error);
      setLoading(false);
      return;
    }

    if (data) {
      setCompletedTopics(new Set(data.map((item) => item.topic_key)));
    }
    setLoading(false);
  }

  async function toggleTopic(topicKey: string) {
    const isCompleted = completedTopics.has(topicKey);

    if (isCompleted) {
      const { error } = await supabase.from('dsa_progress').delete().eq('topic_key', topicKey);

      if (error) {
        console.error('Error removing progress:', error);
        return;
      }

      setCompletedTopics((prev) => {
        const newSet = new Set(prev);
        newSet.delete(topicKey);
        return newSet;
      });
    } else {
      const { error } = await supabase.from('dsa_progress').insert([
        {
          topic_key: topicKey,
          completed: true,
          completed_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error saving progress:', error);
        return;
      }

      setCompletedTopics((prev) => new Set([...prev, topicKey]));
    }
  }

  const totalTopics = roadmapData.reduce((acc, section) => acc + section.topics.length, 0);
  const completedCount = completedTopics.size;
  const completionPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

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
        <h2 className="text-2xl font-semibold text-gray-900">DSA Roadmap</h2>
        <p className="text-gray-600 mt-1">Track your Data Structures & Algorithms learning progress</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {totalTopics} topics completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{completionPercentage}%</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {roadmapData.map((section, sectionIndex) => {
          const sectionCompleted = section.topics.filter((t) => completedTopics.has(t.key)).length;
          const sectionTotal = section.topics.length;
          const sectionPercentage = Math.round((sectionCompleted / sectionTotal) * 100);

          return (
            <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <span className="text-sm font-medium text-gray-600">
                    {sectionCompleted}/{sectionTotal} ({sectionPercentage}%)
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.topics.map((topic) => {
                    const isCompleted = completedTopics.has(topic.key);
                    return (
                      <button
                        key={topic.key}
                        onClick={() => toggleTopic(topic.key)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                          isCompleted
                            ? 'bg-green-50 border-green-500 hover:bg-green-100'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={`font-medium ${
                            isCompleted ? 'text-green-900' : 'text-gray-700'
                          }`}
                        >
                          {topic.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
