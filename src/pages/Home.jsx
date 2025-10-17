import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamically import all structure files
    const loadStructures = async () => {
      try {
        // Use Vite's import.meta.glob to get all JSON files
        const structureFiles = import.meta.glob('../data/structures/**/*.json');

        const structures = [];
        const seenTypes = new Set();

        // Load each structure file
        for (const path in structureFiles) {
          const module = await structureFiles[path]();
          const data = module.default;

          // Only add each business type once (use the default philosophy)
          if (!seenTypes.has(data.businessType)) {
            seenTypes.add(data.businessType);
            structures.push({
              type: data.businessType,
              name: data.businessName,
              description: data.description,
              philosophy: data.philosophy
            });
          }
        }

        // Sort alphabetically by name
        structures.sort((a, b) => a.name.localeCompare(b.name));

        setBusinessTypes(structures);
        setLoading(false);
      } catch (err) {
        console.error('Error loading structures:', err);
        setError('Failed to load business structures');
        setLoading(false);
      }
    };

    loadStructures();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading structures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Folder Structure Directories</h1>
      <p className="text-sm text-gray-500 mb-8">
        {businessTypes.length} business {businessTypes.length === 1 ? 'type' : 'types'} available
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businessTypes.map((business) => (
          <Link
            key={business.type}
            to={`/structures/${business.type}/${business.philosophy}`}
            className="border border-gray-300 p-6 hover:border-gray-900 transition-colors bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{business.name}</h2>
            <p className="text-gray-600 text-sm">{business.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
