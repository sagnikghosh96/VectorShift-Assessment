// databaseNode.js
import { BaseNode } from './baseNode';

const databaseNodeConfig = {
  title: 'Database',
  icon: '🗄️',
  inputs: [
    { id: 'query', label: 'Query', position: 'left' },
  ],
  outputs: [
    { id: 'result', label: 'Result', position: 'right' },
  ],
  fields: [
    {
      name: 'dbType',
      type: 'select',
      label: 'Database Type',
      options: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
      defaultValue: 'PostgreSQL',
    },
    {
      name: 'table',
      type: 'text',
      label: 'Table/Collection',
      placeholder: 'table_name',
    },
  ],
  minWidth: 220,
  minHeight: 130,
  bgColor: 'bg-rose-900',
  borderColor: 'border-rose-500',
};

export const DatabaseNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={databaseNodeConfig} />;
};
