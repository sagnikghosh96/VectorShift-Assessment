// baseNode.js
// Flexible abstraction for creating nodes with minimal repetition

import { useState, useCallback, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

/**
 * BaseNode - Reusable node component
 * 
 * Config object should have:
 * {
 *   title: string,
 *   icon: JSX or string,
 *   inputs: [ {id, label, position} ] | [],
 *   outputs: [ {id, label, position} ] | [],
 *   fields: [ {name, type, label, options} ] | [],
 *   minWidth: number (default 200),
 *   minHeight: number (default 100),
 *   bgColor: string (Tailwind color class),
 *   borderColor: string,
 *   onFieldChange: (fieldName, value) => void (optional)
 * }
 */
export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract field values from data
  const [fieldValues, setFieldValues] = useState(
    config.fields?.reduce((acc, field) => {
      acc[field.name] = data?.[field.name] || field.defaultValue || '';
      return acc;
    }, {}) || {}
  );

  const handleFieldChange = useCallback(
    (fieldName, value) => {
      setFieldValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      updateNodeField(id, fieldName, value);
      config.onFieldChange?.(fieldName, value);
    },
    [id, updateNodeField, config]
  );

  // Calculate dynamic width based on content
  const dynamicWidth = useMemo(() => {
    const baseWidth = config.minWidth || 200;
    const textLength = Object.values(fieldValues).join('').length;
    return Math.max(baseWidth, 150 + textLength * 4);
  }, [fieldValues, config.minWidth]);

  const borderColor = config.borderColor || 'border-indigo-500';

  return (
    <div
      className={`
        rounded-lg border-2 p-4 bg-gradient-to-br from-slate-800 to-slate-900
        ${borderColor} shadow-lg transition-all duration-200
        hover:shadow-xl hover:${borderColor}/50
        flex flex-col gap-3
      `}
      style={{
        width: `${dynamicWidth}px`,
        minHeight: config.minHeight || 100,
      }}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
        {config.icon && (
          <span className="text-lg">
            {typeof config.icon === 'string' ? config.icon : config.icon}
          </span>
        )}
        <h3 className="font-semibold text-sm text-slate-100">
          {config.title}
        </h3>
      </div>

      {/* Input Handles */}
      {config.inputs?.map((input, idx) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={input.position || Position.Left}
          id={input.id}
          style={{
            top: input.customTop,
            backgroundColor: '#6366f1',
            border: '2px solid #0f172a',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
          }}
          title={input.label}
        />
      ))}

      {/* Fields */}
      <div className="flex flex-col gap-2">
        {config.fields?.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300">
              {field.label}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
                className="
                  bg-slate-700 border border-slate-600 rounded px-2 py-1.5
                  text-xs text-red-500 placeholder-red-300
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                  transition-colors
                "
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
                rows={field.rows || 3}
                className="
                  bg-slate-700 border border-slate-600 rounded px-2 py-1.5
                  text-xs text-red-500 placeholder-red-300 resize-none
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                  transition-colors
                "
              />
            )}

            {field.type === 'select' && (
              <select
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="
                  bg-slate-700 border border-slate-600 rounded px-2 py-1.5
                  text-xs text-red-500
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                  transition-colors
                "
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'number' && (
              <input
                type="number"
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
                className="
                  bg-slate-700 border border-slate-600 rounded px-2 py-1.5
                  text-xs text-red-500 placeholder-red-300
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                  transition-colors
                "
              />
            )}
          </div>
        ))}
      </div>

      {/* Output Handles */}
      {config.outputs?.map((output, idx) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={output.position || Position.Right}
          id={output.id}
          style={{
            top: output.customTop,
            backgroundColor: '#ec4899',
            border: '2px solid #0f172a',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
          }}
          title={output.label}
        />
      ))}
    </div>
  );
};
