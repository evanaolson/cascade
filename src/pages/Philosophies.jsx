export default function Philosophies() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Organizational Philosophies</h1>
      <p className="text-lg text-gray-600 mb-8">
        Understanding different approaches to organizing your business files.
      </p>

      <div className="space-y-8">
        <div className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-semibold mb-2">Johnny Decimal</h2>
          <p className="text-gray-700">
            Numbered hierarchical system (10.00-19.99 categories). Clear structure, easy to communicate,
            works across all file systems. Best for SMBs and project-based companies.
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-semibold mb-2">GTD Filing</h2>
          <p className="text-gray-700">
            Getting Things Done methodology. Simple A-Z alphabetical with minimal depth.
            60-second file/retrieval rule. Best for professional services and consulting firms.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-semibold mb-2">ISO 15489 Functional</h2>
          <p className="text-gray-700">
            Function-based classification with compliance built-in. Organized by business functions
            rather than departments. Best for regulated industries (law, healthcare, finance).
          </p>
        </div>

        <div className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-semibold mb-2">DAM Structure</h2>
          <p className="text-gray-700">
            Digital Asset Management principles. Purpose-based organization (by campaign/usage).
            Best for creative businesses, marketing agencies, media companies.
          </p>
        </div>

        <div className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-semibold mb-2">LIFT Principle</h2>
          <p className="text-gray-700">
            Locate, Identify, Flat, Try DRY. Principle-based rather than prescriptive.
            Adapts as business grows. Best for tech companies and agile teams.
          </p>
        </div>
      </div>
    </div>
  );
}
