import React, { ChangeEvent } from "react";

interface TaskItemProps {
  task: string;
  isEditing: boolean;
  onChangeEdit: (e: ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  editValue: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isEditing, onChangeEdit, onEdit, onSave, onDelete, editValue }) => {
  return (
    <li className="flex justify-between items-center border p-2 rounded-md">
      {isEditing ? (
        <input type="text" value={editValue} onChange={onChangeEdit} className="border p-1 mr-2 w-full" />
      ) : (
        <span>{task}</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={onSave} className="bg-green-400 px-2 rounded">Save</button>
        ) : (
          <button onClick={onEdit} className="bg-blue-400 px-2 rounded">Edit</button>
        )}
        <button onClick={onDelete} className="bg-red-400 px-2 rounded">Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
