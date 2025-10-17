import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CommandTabs({ structure, businessType }) {
  const [copiedTab, setCopiedTab] = useState(null);

  const generateBashCommand = () => {
    const commands = structure.map(folder => {
      if (folder.children) {
        const childPaths = folder.children.map(child => `${folder.name}/${child.name}`);
        return `mkdir -p ${childPaths.join(' ')}`;
      }
      return `mkdir -p ${folder.name}`;
    });
    return commands.join(' && ');
  };

  const generatePowerShellCommand = () => {
    const commands = structure.map(folder => {
      if (folder.children) {
        const childPaths = folder.children.map(child => `${folder.name}\\${child.name}`);
        return childPaths.map(path => `New-Item -ItemType Directory -Force -Path "${path}"`).join('; ');
      }
      return `New-Item -ItemType Directory -Force -Path "${folder.name}"`;
    });
    return commands.join('; ');
  };

  const handleCopy = (text, tabIndex) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabIndex);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const tabs = [
    { name: 'Bash', command: generateBashCommand() },
    { name: 'PowerShell', command: generatePowerShellCommand() },
    { name: 'Download ZIP', command: null }
  ];

  return (
    <div className="bg-white border border-gray-300">
      <TabGroup>
        <TabList className="flex border-b border-gray-300">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium focus:outline-none ${
                  selected
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="p-4">
          {tabs.map((tab, index) => (
            <TabPanel key={tab.name}>
              {tab.command ? (
                <div className="space-y-3">
                  <pre className="bg-gray-50 border border-gray-200 p-4 overflow-x-auto text-sm">
                    <code>{tab.command}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(tab.command, index)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                  >
                    {copiedTab === index ? (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-5 h-5" />
                        Copy Command
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <button className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                    Download ZIP
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Download the folder structure as a ZIP file
                  </p>
                </div>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
