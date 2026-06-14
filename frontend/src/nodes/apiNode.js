import { BaseNode } from './baseNode';

const apiNodeConfig = {
  title: 'API Call',
  icon: '🌐',
  inputs: [
    { id: 'payload', label: 'Payload', position: 'left' },
  ],
  outputs: [
    { id: 'response', label: 'Response', position: 'right' },
  ],
  fields: [
    {
      name: 'method',
      type: 'select',
      label: 'Method',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      defaultValue: 'GET',
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      placeholder: 'https://api.example.com',
    },
  ],
  minWidth: 220,
  minHeight: 130,
  bgColor: 'bg-green-900',
  borderColor: 'border-green-500',
};

export const APINode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={apiNodeConfig} />;
};
