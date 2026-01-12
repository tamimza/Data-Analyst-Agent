"use client";

import { useState } from "react";
import Link from "next/link";

type Section = "overview" | "how-it-works" | "improvements" | "setup";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  const navigation = [
    {
      title: "GETTING STARTED",
      items: [
        { id: "overview" as Section, label: "Overview" },
        { id: "how-it-works" as Section, label: "How It Works" },
      ],
    },
    {
      title: "DEVELOPMENT",
      items: [
        { id: "improvements" as Section, label: "Future Improvements" },
        { id: "setup" as Section, label: "Setup & Installation" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">AI Data Analysis</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === item.id
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Back to App */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Docs</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium capitalize">
              {activeSection.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-4xl">
          {activeSection === "overview" && <OverviewSection />}
          {activeSection === "how-it-works" && <HowItWorksSection />}
          {activeSection === "improvements" && <ImprovementsSection />}
          {activeSection === "setup" && <SetupSection />}
        </div>
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Data Analysis Agent</h1>
      <p className="text-xl text-gray-600 mb-8">
        AI-powered intelligence for CSV data analysis.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Problem Does This Solve?</h2>
      <p className="text-gray-600 mb-6">
        Organizations and individuals face a significant barrier when trying to extract insights from their data.
        Traditional data analysis requires knowledge of Python, SQL, pandas, or specialized tools.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">What they do today:</h3>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">1</span>
            <span className="text-gray-600">Open Excel or Google Sheets manually</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">2</span>
            <span className="text-gray-600">Write complex formulas or pivot tables</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">3</span>
            <span className="text-gray-600">Learn Python/pandas for advanced analysis</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">4</span>
            <span className="text-gray-600">Debug code errors and syntax issues</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">5</span>
            <span className="text-gray-600">Interpret results and create reports</span>
          </li>
        </ol>
        <p className="text-sm text-gray-500 mt-4">That takes hours or even days per analysis.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 rounded-xl p-6 border border-red-100">
          <h4 className="font-semibold text-red-700 mb-2">Manual Process</h4>
          <p className="text-3xl font-bold text-red-600">Hours to Days</p>
          <p className="text-sm text-red-600 mt-1">Per analysis request</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
          <h4 className="font-semibold text-emerald-700 mb-2">With AI Data Analysis</h4>
          <p className="text-3xl font-bold text-emerald-600">5-30 seconds</p>
          <p className="text-sm text-emerald-600 mt-1">Instant answers in natural language</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Natural Language Interface</h3>
            <p className="text-gray-600">Ask questions in plain English like &quot;What&apos;s the average sales by region?&quot;</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Zero Code Required</h3>
            <p className="text-gray-600">Users don&apos;t write a single line of code - Claude AI writes it for them</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Instant Results</h3>
            <p className="text-gray-600">Get answers in seconds, not hours or days</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Secure Execution</h3>
            <p className="text-gray-600">All code runs in an isolated Docker container, protecting your system</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">How It Works</h1>
      <p className="text-xl text-gray-600 mb-8">
        Understanding the magic behind the AI Data Analysis Agent.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Complete Flow</h2>
      <p className="text-gray-600 mb-6">
        When you upload a CSV file and ask a question, here&apos;s exactly what happens behind the scenes:
      </p>

      {/* Step 1 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
          <h3 className="text-xl font-bold text-gray-900">File Upload</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              User selects a CSV file from their computer
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              File is validated (type, size, extension)
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Saved to server with unique UUID filename
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous file automatically deleted (cleanup)
            </li>
          </ul>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
          <h3 className="text-xl font-bold text-gray-900">Ask a Question</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              User types a natural language question
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Question sent to backend with file ID and conversation history
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Docker container verified to be running
            </li>
          </ul>
        </div>
      </div>

      {/* Step 3 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
          <h3 className="text-xl font-bold text-gray-900">Claude Generates Code</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-4">Claude AI receives the question with a system prompt instructing it to:</p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Write Python code using pandas
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Read the CSV from /app/uploads/[filename]
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Include error handling
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Print only the final results
            </li>
          </ul>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
            <pre>{`import pandas as pd

df = pd.read_csv('/app/uploads/abc123.csv')
avg_salary = df.groupby('department')['salary'].mean()
print(avg_salary.to_string())`}</pre>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
          <h3 className="text-xl font-bold text-gray-900">Secure Code Execution</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-4">Before execution, code goes through security checks:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <h4 className="font-semibold text-red-700 mb-2">Blocked Operations</h4>
              <ul className="text-sm text-red-600 space-y-1">
                <li>import os, subprocess</li>
                <li>eval(), exec(), __import__()</li>
                <li>open(), .write(), .remove()</li>
                <li>pickle, shutil modules</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <h4 className="font-semibold text-emerald-700 mb-2">Allowed Operations</h4>
              <ul className="text-sm text-emerald-600 space-y-1">
                <li>pandas, numpy</li>
                <li>matplotlib (calculations)</li>
                <li>seaborn, openpyxl</li>
                <li>Standard data operations</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-600 mt-4">
            Code runs in an isolated Docker container with only the uploads folder mounted.
            30-second timeout prevents runaway processes.
          </p>
        </div>
      </div>

      {/* Step 5 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
          <h3 className="text-xl font-bold text-gray-900">Claude Interprets Results</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-4">
            The execution results are sent back to Claude for interpretation:
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Raw Output</p>
              <code className="text-sm">75432.50</code>
            </div>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="flex-1 bg-emerald-100 rounded-lg p-3 text-center">
              <p className="text-xs text-emerald-600 mb-1">Human-Friendly</p>
              <span className="text-sm text-emerald-700">&quot;The average salary is $75,432.50&quot;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
          <h3 className="text-xl font-bold text-gray-900">Display to User</h3>
        </div>
        <div className="ml-11 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600">
            The formatted answer is displayed in the chat interface. Users can ask follow-up questions
            with full conversation context maintained.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">Tech Stack</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Next.js 15 (App Router)</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Backend</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Next.js API Routes</li>
            <li>Claude 3.5 Sonnet (Anthropic)</li>
            <li>Docker (Python 3.11)</li>
            <li>pandas, numpy, matplotlib</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ImprovementsSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Future Improvements</h1>
      <p className="text-xl text-gray-600 mb-8">
        Taking this project to the next level with enterprise features.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">The Vision</h2>
        <p className="text-gray-600">
          Currently, this application provides text-based answers to data questions. To compete with
          enterprise tools like Power BI, Tableau, or Azure Synapse Analytics, we need to add
          visualization capabilities and more advanced features.
        </p>
      </div>

      {/* Charts Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Visualization (Charts)</h2>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Like Power BI Does</h3>
            <p className="text-gray-600 mb-4">
              When working with Azure, after completing the ETL process (Extract, Transform, Load),
              we typically export the cleaned data to Power BI for visualization. Users can create
              interactive dashboards, charts, and reports.
            </p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Implementation Ideas:</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-2">Option A: Chart.js Integration</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>- Lightweight, easy to integrate</li>
              <li>- Bar, line, pie, scatter charts</li>
              <li>- Claude generates chart config</li>
              <li>- Render in React component</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-2">Option B: D3.js / Recharts</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>- More customization options</li>
              <li>- Complex visualizations</li>
              <li>- Interactive tooltips</li>
              <li>- Animation support</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h5 className="font-medium text-blue-900 mb-2">How It Would Work:</h5>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. User asks: &quot;Show me sales by region as a bar chart&quot;</li>
            <li>2. Claude generates Python code to compute the data</li>
            <li>3. Claude also returns chart configuration JSON</li>
            <li>4. Frontend renders the chart using Chart.js/Recharts</li>
            <li>5. User can download or export the visualization</li>
          </ol>
        </div>
      </div>

      {/* Multiple File Formats */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Multiple File Formats</h2>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
        <p className="text-gray-600 mb-4">Currently only CSV files are supported. We could expand to:</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold text-sm">XLS</span>
            </div>
            <p className="text-sm text-gray-600">Excel Files (.xlsx, .xls)</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-yellow-600 font-bold text-sm">JSON</span>
            </div>
            <p className="text-sm text-gray-600">JSON Files</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-600 font-bold text-sm">SQL</span>
            </div>
            <p className="text-sm text-gray-600">Database Connections</p>
          </div>
        </div>
      </div>

      {/* More Improvements */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Additional Features</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Export Reports</h3>
              <p className="text-gray-600">Generate PDF or Excel reports with analysis results and charts</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Save Analysis History</h3>
              <p className="text-gray-600">Persist conversations to database for future reference</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Multi-User Support</h3>
              <p className="text-gray-600">Authentication, user workspaces, and team collaboration</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Scheduled Reports</h3>
              <p className="text-gray-600">Automate recurring analyses and email reports to stakeholders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Azure Comparison */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Comparison: Our Tool vs Azure Analytics</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-900 border-b">Feature</th>
              <th className="text-left p-4 font-semibold text-gray-900 border-b">Our AI Agent</th>
              <th className="text-left p-4 font-semibold text-gray-900 border-b">Azure Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b text-gray-600">Setup Time</td>
              <td className="p-4 border-b text-emerald-600 font-medium">Minutes</td>
              <td className="p-4 border-b text-gray-600">Days to Weeks</td>
            </tr>
            <tr>
              <td className="p-4 border-b text-gray-600">Cost</td>
              <td className="p-4 border-b text-emerald-600 font-medium">~$5-20/month (API)</td>
              <td className="p-4 border-b text-gray-600">$100s-$1000s/month</td>
            </tr>
            <tr>
              <td className="p-4 border-b text-gray-600">Query Method</td>
              <td className="p-4 border-b text-emerald-600 font-medium">Natural Language</td>
              <td className="p-4 border-b text-gray-600">SQL / Power BI</td>
            </tr>
            <tr>
              <td className="p-4 border-b text-gray-600">Data Size</td>
              <td className="p-4 border-b text-gray-600">Up to 10MB</td>
              <td className="p-4 border-b text-emerald-600 font-medium">Petabytes</td>
            </tr>
            <tr>
              <td className="p-4 text-gray-600">Visualization</td>
              <td className="p-4 text-orange-600">Coming Soon</td>
              <td className="p-4 text-emerald-600 font-medium">Power BI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SetupSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Setup & Installation</h1>
      <p className="text-xl text-gray-600 mb-8">
        Get the AI Data Analysis Agent running on your machine.
      </p>

      <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 mb-8">
        <h2 className="text-lg font-semibold text-emerald-900 mb-2">GitHub Repository</h2>
        <a
          href="https://github.com/tamimza/Data-Analyst-Agent"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-mono text-sm break-all"
        >
          https://github.com/tamimza/Data-Analyst-Agent
        </a>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Node.js (v18+)</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <code>node --version</code>
          </div>
          <p className="text-sm text-gray-500 mt-2">Install from nodejs.org</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Docker Desktop</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <code>docker --version</code>
          </div>
          <p className="text-sm text-gray-500 mt-2">Install from docker.com</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Git</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <code>git --version</code>
          </div>
          <p className="text-sm text-gray-500 mt-2">Install from git-scm.com</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Anthropic API Key</h3>
          <p className="text-sm text-gray-600">Sign up at console.anthropic.com and create an API key</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Steps</h2>

      {/* Step 1 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
          <h3 className="text-lg font-semibold text-gray-900">Clone the Repository</h3>
        </div>
        <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
          <pre>{`git clone https://github.com/tamimza/Data-Analyst-Agent.git
cd Data-Analyst-Agent`}</pre>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
          <h3 className="text-lg font-semibold text-gray-900">Install Dependencies</h3>
        </div>
        <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
          <pre>npm install</pre>
        </div>
      </div>

      {/* Step 3 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
          <h3 className="text-lg font-semibold text-gray-900">Configure Environment</h3>
        </div>
        <div className="ml-11">
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 mb-4">
            <pre>cp .env.example .env</pre>
          </div>
          <p className="text-gray-600 mb-3">Edit the .env file and add your API key:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
            <pre>{`ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Optional settings (defaults shown)
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=text/csv,application/vnd.ms-excel
DOCKER_CONTAINER_NAME=python-analysis-container`}</pre>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
          <h3 className="text-lg font-semibold text-gray-900">Build & Start Docker Container</h3>
        </div>
        <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
          <pre>{`docker-compose build
docker-compose up -d

# Verify container is running
docker ps`}</pre>
        </div>
      </div>

      {/* Step 5 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
          <h3 className="text-lg font-semibold text-gray-900">Run the Application</h3>
        </div>
        <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
          <pre>{`# Development mode
npm run dev

# OR Production mode
npm run build && npm start`}</pre>
        </div>
      </div>

      {/* Step 6 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
          <h3 className="text-lg font-semibold text-gray-900">Access the Application</h3>
        </div>
        <div className="ml-11">
          <p className="text-gray-600 mb-3">Open your browser and navigate to:</p>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <code className="text-emerald-700 text-lg font-mono">http://localhost:3000</code>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
      <div className="space-y-4">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <h3 className="font-semibold text-yellow-900 mb-2">Docker not running?</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <pre>{`# Start Docker Desktop, then:
docker-compose up -d`}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <h3 className="font-semibold text-yellow-900 mb-2">Port 3000 in use?</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <pre>{`# Use a different port
PORT=3001 npm run dev`}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <h3 className="font-semibold text-yellow-900 mb-2">API key errors?</h3>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-100">
            <pre>cat .env | grep ANTHROPIC_API_KEY</pre>
          </div>
          <p className="text-sm text-yellow-800 mt-2">Verify your key is correct and has no extra spaces</p>
        </div>
      </div>
    </div>
  );
}
