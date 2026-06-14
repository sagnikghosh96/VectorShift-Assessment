// summarizerNode.js
import { BaseNode } from './baseNode';

const summarizerNodeConfig = {
  title: 'Summarizer',
  icon: '📝',
  inputs: [
    { id: 'text', label: 'Text', position: 'left' },
  ],
  outputs: [
    { id: 'summary', label: 'Summary', position: 'right' },
  ],
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Summary Style',
      options: ['Bullet Points', 'Paragraph', 'Outline'],
      defaultValue: 'Paragraph',
    },
    {
      name: 'maxLength',
      type: 'number',
      label: 'Max Words',
      placeholder: '100',
    },
  ],
  minWidth: 220,
  minHeight: 130,
  bgColor: 'bg-amber-900',
  borderColor: 'border-amber-500',
};

export const SummarizerNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={summarizerNodeConfig} />;
};
