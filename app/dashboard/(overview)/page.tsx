'use client';

import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { lusitana } from '@/app/ui/fonts';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const monthlyData = [
    { month: 'Jan', interviews: 65, completion: 85 },
    { month: 'Feb', interviews: 75, completion: 88 },
    { month: 'Mar', interviews: 85, completion: 92 },
    { month: 'Apr', interviews: 70, completion: 87 },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'postings', name: 'Job Postings', icon: BriefcaseIcon },
    { id: 'applicants', name: 'Applicants', icon: UserGroupIcon },
    { id: 'companies', name: 'Companies', icon: BuildingOfficeIcon },
  ];

  return (
    <div className="flex flex-col space-y-6 bg-gray-900 min-h-screen">
  

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 relative group flex items-center space-x-2
                  ${activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Total Interviews"
              value="295"
              change="+12%"
              icon={<DocumentChartBarIcon className="h-6 w-6" />}
            />
            <StatCard
              title="Completion Rate"
              value="88%"
              change="+3%"
              icon={<ChartBarIcon className="h-6 w-6" />}
            />
            <StatCard
              title="Avg Duration"
              value="45min"
              change="-2min"
              icon={<ClockIcon className="h-6 w-6" />}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-white">Interview Trends</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="interviews" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="completion" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-white">Recent Activity</h2>
              <div className="space-y-4">
                <ActivityItem
                  title="UX Research Interview"
                  subtitle="Tech Industry"
                  status="completed"
                  timestamp="2 hours ago"
                />
                <ActivityItem
                  title="Product Feedback"
                  subtitle="Healthcare Sector"
                  status="in-progress"
                  timestamp="3 hours ago"
                />
                <ActivityItem
                  title="Market Analysis"
                  subtitle="Finance Industry"
                  status="scheduled"
                  timestamp="Tomorrow, 10:00 AM"
                />
              </div>
            </div>
          </div>

          {/* Recent Interviews Table */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-white">Recent Interviews</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  <InterviewRow
                    topic="Mobile App Usability"
                    industry="Technology"
                    date="2024-04-05"
                    status="completed"
                  />
                  <InterviewRow
                    topic="Patient Experience"
                    industry="Healthcare"
                    date="2024-04-04"
                    status="in-progress"
                  />
                  <InterviewRow
                    topic="Banking App Feedback"
                    industry="Finance"
                    date="2024-04-03"
                    status="scheduled"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'postings' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Job Postings</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              New Posting
            </button>
          </div>
          {/* Add job postings content here */}
        </div>
      )}

      {activeTab === 'applicants' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Applicants</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Applicant
            </button>
          </div>
          {/* Add applicants content here */}
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Companies</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Company
            </button>
          </div>
          {/* Add companies content here */}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-white">{value}</p>
          <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change} from last month
          </p>
        </div>
        <div className="text-blue-400">{icon}</div>
      </div>
    </div>
  );
}

function ActivityItem({ title, subtitle, status, timestamp }: { title: string; subtitle: string; status: string; timestamp: string }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-yellow-400" />;
      case 'scheduled':
        return <CalendarIcon className="h-5 w-5 text-blue-400" />;
      default:
        return <XCircleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {getStatusIcon(status)}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <p className="text-sm text-gray-500">{timestamp}</p>
    </div>
  );
}

function InterviewRow({ topic, industry, date, status }: { topic: string; industry: string; date: string; status: string }) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 text-green-200';
      case 'in-progress':
        return 'bg-yellow-900 text-yellow-200';
      case 'scheduled':
        return 'bg-blue-900 text-blue-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{topic}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{industry}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(status)}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
        <button className="text-blue-400 hover:text-blue-300">Edit</button>
      </td>
    </tr>
  );
}