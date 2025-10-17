import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function TreeNode({ node, onSelectFolder }) {
  const hasChildren = node.children && node.children.length > 0;

  if (!hasChildren) {
    return (
      <div
        className="flex items-center gap-2 py-2 pl-6 hover:bg-gray-100 cursor-pointer group relative"
        onClick={() => onSelectFolder(node)}
      >
        <span className="text-gray-400">📁</span>
        <span className="text-gray-700">{node.name}</span>
        {node.description && (
          <span className="ml-3 text-xs text-gray-500 hidden group-hover:inline">
            {node.description}
          </span>
        )}
      </div>
    );
  }

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <DisclosureButton
            className="flex items-center gap-2 py-2 pl-2 hover:bg-gray-100 w-full group"
            onClick={() => onSelectFolder(node)}
          >
            <ChevronRightIcon
              className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
            />
            <span className="text-gray-400">{open ? '📂' : '📁'}</span>
            <span className="text-gray-700 font-medium">{node.name}</span>
            {node.description && (
              <span className="ml-3 text-xs text-gray-500 hidden group-hover:inline">
                {node.description}
              </span>
            )}
          </DisclosureButton>
          <DisclosurePanel className="pl-4">
            {node.children?.map((child, index) => (
              <TreeNode key={index} node={child} onSelectFolder={onSelectFolder} />
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default function FolderTree({ structure, onSelectFolder }) {
  return (
    <div className="bg-white border border-gray-300 p-4">
      <div className="space-y-1">
        {structure.map((node, index) => (
          <TreeNode key={index} node={node} onSelectFolder={onSelectFolder} />
        ))}
      </div>
    </div>
  );
}
