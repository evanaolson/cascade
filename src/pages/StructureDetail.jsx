import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RadioGroup, Radio, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import FolderTree from '../components/FolderTree';
import CommandTabs from '../components/CommandTabs';
import PhilosophySelector from '../components/PhilosophySelector';

export default function StructureDetail() {
  const { businessType, philosophy } = useParams();
  const navigate = useNavigate();
  const [structureData, setStructureData] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedPhilosophy, setSelectedPhilosophy] = useState(null);
  const [philosophies, setPhilosophies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Naming convention options (defaults match JSON data: lowercase with dashes)
  const [separator, setSeparator] = useState('dash'); // 'underscore', 'dash', 'space'
  const [casing, setCasing] = useState('lower'); // 'lower', 'upper', 'title'

  useEffect(() => {
    // Load all available philosophies for this business type
    const loadPhilosophies = async () => {
      try {
        const structureFiles = import.meta.glob('../data/structures/**/*.json');
        const availablePhilosophies = [];

        for (const path in structureFiles) {
          // Check if this file belongs to the current business type
          if (path.includes(`/${businessType}/`)) {
            const module = await structureFiles[path]();
            const data = module.default;
            availablePhilosophies.push({
              id: data.philosophy,
              name: data.philosophyName
            });
          }
        }

        setPhilosophies(availablePhilosophies);
      } catch (err) {
        console.error('Failed to load philosophies:', err);
      }
    };

    loadPhilosophies();
  }, [businessType]);

  useEffect(() => {
    // Load structure data for current philosophy
    setLoading(true);
    import(`../data/structures/${businessType}/${philosophy}.json`)
      .then(data => {
        setStructureData(data.default);
        setSelectedPhilosophy({
          id: data.default.philosophy,
          name: data.default.philosophyName
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load structure:', err);
        setLoading(false);
      });
  }, [businessType, philosophy]);

  const handlePhilosophyChange = (newPhilosophy) => {
    // Navigate to the new philosophy URL
    navigate(`/structures/${businessType}/${newPhilosophy.id}`);
  };

  // Transform folder name based on naming conventions
  const transformName = (name) => {
    let transformed = name;

    // Apply separator transformation
    if (separator === 'underscore') {
      transformed = transformed.replace(/[-\s]/g, '_');
    } else if (separator === 'dash') {
      transformed = transformed.replace(/[_\s]/g, '-');
    } else if (separator === 'space') {
      transformed = transformed.replace(/[-_]/g, ' ');
    }

    // Apply casing transformation
    if (casing === 'lower') {
      transformed = transformed.toLowerCase();
    } else if (casing === 'upper') {
      transformed = transformed.toUpperCase();
    } else if (casing === 'title') {
      transformed = transformed.split(/[-_\s]/).map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(separator === 'space' ? ' ' : separator === 'underscore' ? '_' : '-');
    }

    return transformed;
  };

  // Transform structure recursively
  const transformStructure = (structure) => {
    return structure.map(node => ({
      ...node,
      name: transformName(node.name),
      children: node.children ? transformStructure(node.children) : undefined
    }));
  };

  if (loading || !structureData) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const transformedStructure = transformStructure(structureData.structure);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{structureData.businessName}</h1>
        <p className="text-gray-600">{structureData.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Tools Module */}
          <Disclosure defaultOpen>
            {({ open }) => (
              <div className="bg-white border border-gray-300">
                <DisclosureButton className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50">
                  <h2 className="text-2xl font-semibold">Tools</h2>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="p-4 border-t border-gray-300">
                  <div className="space-y-4">
                    {philosophies.length > 1 && selectedPhilosophy && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Organizational Philosophy:</label>
                        <PhilosophySelector
                          philosophies={philosophies}
                          selected={selectedPhilosophy}
                          onChange={handlePhilosophyChange}
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Separator:</label>
                      <RadioGroup value={separator} onChange={setSeparator}>
                        <div className="flex border border-gray-300">
                          <Radio value="underscore" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900 border-r border-gray-300">
                            Underscores
                          </Radio>
                          <Radio value="dash" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900 border-r border-gray-300">
                            Dashes
                          </Radio>
                          <Radio value="space" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900">
                            Spaces
                          </Radio>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Casing:</label>
                      <RadioGroup value={casing} onChange={setCasing}>
                        <div className="flex border border-gray-300">
                          <Radio value="lower" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900 border-r border-gray-300">
                            lowercase
                          </Radio>
                          <Radio value="upper" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900 border-r border-gray-300">
                            UPPERCASE
                          </Radio>
                          <Radio value="title" className="flex-1 px-4 py-2 text-sm text-center cursor-pointer data-[checked]:bg-gray-900 data-[checked]:text-white hover:bg-gray-100 data-[checked]:hover:bg-gray-900">
                            Title Case
                          </Radio>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>

          {/* Folder Structure Module */}
          <Disclosure defaultOpen>
            {({ open }) => (
              <div className="bg-white border border-gray-300">
                <DisclosureButton className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50">
                  <h2 className="text-2xl font-semibold">Folder Structure</h2>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="p-4 border-t border-gray-300">
                  <FolderTree
                    structure={transformedStructure}
                    onSelectFolder={setSelectedFolder}
                  />

                  {selectedFolder && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200">
                      <h3 className="font-semibold text-blue-900">{selectedFolder.name}</h3>
                      <p className="text-sm text-blue-700 mt-1">{selectedFolder.description}</p>
                    </div>
                  )}
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        </div>

        {/* Commands Module */}
        <div>
          <Disclosure defaultOpen>
            {({ open }) => (
              <div className="bg-white border border-gray-300">
                <DisclosureButton className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50">
                  <h2 className="text-2xl font-semibold">Commands</h2>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="border-t border-gray-300">
                  <CommandTabs
                    structure={transformedStructure}
                    businessType={businessType}
                  />
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
