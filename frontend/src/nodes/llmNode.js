// llmNode.js
import { BaseNode } from './baseNode';

const llmNodeConfig = {
  title: 'LLM',
  icon: '🤖',
  inputs: [
    { id: 'system', label: 'System', customTop: '33%' },
    { id: 'prompt', label: 'Prompt', customTop: '67%' },
  ],
  outputs: [
    { id: 'response', label: 'Response', position: 'right' },
  ],
  fields: [
    {
      name: 'model',
      type: 'select',
      label: 'Model',
      options: ['GPT-4', 'GPT-3.5', 'Claude', 'Llama'],
      defaultValue: 'GPT-4',
    },
    {
      name: 'temperature',
      type: 'number',
      label: 'Temperature',
      placeholder: '0.7',
    },
  ],
  minWidth: 200,
  minHeight: 130,
  bgColor: 'bg-violet-900',
  borderColor: 'border-violet-500',
};

export const LLMNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={llmNodeConfig} />;
};