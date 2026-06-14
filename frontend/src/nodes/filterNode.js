// filterNode.js
import { BaseNode } from './baseNode';

const filterNodeConfig = {
  title: 'Filter',
  icon: '🔍',
  inputs: [
    { id: 'data', label: 'Data', position: 'left' },
  ],
  outputs: [
    { id: 'filtered', label: 'Filtered', position: 'right' },
  ],
  fields: [
    {
      name: 'condition',
      type: 'select',
      label: 'Condition',
      options: ['Equal', 'Greater', 'Less', 'Contains', 'Regex'],
      defaultValue: 'Equal',
    },
    {
      name: 'value',
      type: 'text',
      label: 'Filter Value',
      placeholder: 'Enter value',
    },
  ],
  minWidth: 210,
  minHeight: 130,
  bgColor: 'bg-purple-900',
  borderColor: 'border-purple-500',
};

export const FilterNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={filterNodeConfig} />;
};
