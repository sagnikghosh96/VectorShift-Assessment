// outputNode.js
import { BaseNode } from './baseNode';

const outputNodeConfig = {
  title: 'Output',
  icon: '📤',
  inputs: [
    { id: 'value', label: 'Value', position: 'left' },
  ],
  outputs: [],
  fields: [
    {
      name: 'outputName',
      type: 'text',
      label: 'Name',
      defaultValue: 'output_1',
    },
    {
      name: 'outputType',
      type: 'select',
      label: 'Type',
      options: ['Text', 'File', 'Image'],
      defaultValue: 'Text',
    },
  ],
  minWidth: 200,
  minHeight: 110,
  bgColor: 'bg-teal-900',
  borderColor: 'border-teal-500',
};

export const OutputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={outputNodeConfig} />;
};