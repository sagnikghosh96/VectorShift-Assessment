// draggableNode.js
// draggableNode.js
// Draggable node with icon and improved styling

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        ${type}
        cursor-grab active:cursor-grabbing
        min-w-24 h-16
        flex flex-col items-center justify-center gap-1
        rounded-lg
        bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600
        text-white text-xs font-semibold
        border border-indigo-400/30
        shadow-md hover:shadow-lg
        transition-all duration-200
        hover:scale-105
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};