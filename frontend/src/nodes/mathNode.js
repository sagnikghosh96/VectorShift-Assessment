import { BaseNode } from './baseNode';

const mathNodeConfig = {
  title: 'Math',
  icon: '🔢',
  inputs: [
    { id: 'a', label: 'A', position: 'top-1/4' },
    { id: 'b', label: 'B', position: 'top-3/4' },
  ],
  outputs: [
    { id: 'result', label: 'Result', position: 'right' },
  ],
  fields: [
    {
      name: 'operation',
      type: 'select',
      label: 'Operation',
      options: ['Add', 'Subtract', 'Multiply', 'Divide', 'Power'],
      defaultValue: 'Add',
    },
  ],
  minWidth: 200,
  minHeight: 120,
  bgColor: 'bg-blue-900',
  borderColor: 'border-blue-500',
};

export const MathNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={mathNodeConfig} />;
};
