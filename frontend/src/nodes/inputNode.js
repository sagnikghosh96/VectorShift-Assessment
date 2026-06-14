// inputNode.js
import { BaseNode } from './baseNode';

const inputNodeConfig = {
  title: 'Input',
  icon: '📥',
  inputs: [],
  outputs: [
    { id: 'value', label: 'Value', position: 'right' },
  ],
  fields: [
    {
      name: 'inputName',
      type: 'text',
      label: 'Name',
      defaultValue: 'input_1',
    },
    {
      name: 'inputType',
      type: 'select',
      label: 'Type',
      options: ['Text', 'File', 'Number'],
      defaultValue: 'Text',
    },
  ],
  minWidth: 200,
  minHeight: 110,
  bgColor: 'bg-cyan-900',
  borderColor: 'border-cyan-500',
};

export const InputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={inputNodeConfig} />;
};
