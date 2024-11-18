'use client';

import {
  BookOpenIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

export default function HelpDocsPage() {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-900 min-h-screen text-gray-300">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <BookOpenIcon className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Help & Documentation</h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <QuestionMarkCircleIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <QuickLinkCard
          icon={<LightBulbIcon className="h-6 w-6" />}
          title="Getting Started"
          description="Learn the basics of setting up interview simulations"
        />
        <QuickLinkCard
          icon={<BeakerIcon className="h-6 w-6" />}
          title="Best Practices"
          description="Tips for conducting effective interviews"
        />
        <QuickLinkCard
          icon={<ChatBubbleLeftRightIcon className="h-6 w-6" />}
          title="FAQ"
          description="Common questions and answers"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg h-fit">
          <nav className="space-y-2">
            <NavItem active>Getting Started</NavItem>
            <NavItem>Interview Styles</NavItem>
            <NavItem>Question Types</NavItem>
            <NavItem>Managing Sessions</NavItem>
            <NavItem>Analytics Guide</NavItem>
            <NavItem>Troubleshooting</NavItem>
          </nav>
        </div>

        {/* Main Documentation Content */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Understanding Interview Simulation</h2>
            <p className="mb-4">
              Our AI-powered interview simulation platform helps researchers conduct more effective and consistent interviews. By leveraging advanced language models, we can help you achieve more reliable results while reducing the time and resources typically required for qualitative research.
            </p>
            <div className="border-l-4 border-blue-500 pl-4 bg-gray-700 p-4 rounded-r-lg">
              <p className="text-sm italic">
                "The key to effective research is asking the right questions in the right way. Our platform helps you achieve this consistently across all your interviews."
              </p>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Interview Styles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Friendly</h3>
                <p>Best for creating a comfortable environment where applicants feel at ease sharing personal experiences and opinions. The AI interviewer uses casual language and empathetic responses.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Formal</h3>
                <p>Suited for professional contexts where maintaining structure and professionalism is key. The AI interviewer maintains a professional tone and focuses on precise questioning.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Probing</h3>
                <p>Ideal for deep-dive research where you need to uncover underlying motivations and detailed explanations. The AI interviewer uses follow-up questions to explore responses in detail.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Best Practices for Question Design</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>Start with broad, open-ended questions to establish context</li>
              <li>Use probing questions to explore specific aspects of responses</li>
              <li>Avoid leading questions that might bias responses</li>
              <li>Include a mix of experience-based and opinion-based questions</li>
              <li>Consider the applicant's technical knowledge level when formulating questions</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="flex items-center space-x-3 mb-2">
        <div className="text-blue-400">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function NavItem({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href="#"
      className={`block px-3 py-2 rounded-md transition-colors ${
        active ? 'bg-blue-900 text-blue-100' : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {children}
    </a>
  );
}