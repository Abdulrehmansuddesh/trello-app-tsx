import React from "react";
import TaskItem from "./TaskItems";

interface TaskCardProps {
  title: string;
  tasks: string[];
  onEdit: (index: number, value: string) => void;
  onSave: () => void;
  onDelete: (index: number) => void;
  editIndex: number | null;
  editValue: string;
  onChangeEditValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title, tasks, onEdit, onSave, onDelete, editIndex, editValue, onChangeEditValue
}) => {
  return (
    <div className="w-[30%] border p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold capitalize text-center mb-2">{title}</h2>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            isEditing={editIndex === index}
            editValue={editValue}
            onEdit={() => onEdit(index, task)}
            onSave={onSave}
            onDelete={() => onDelete(index)}
            onChangeEdit={onChangeEditValue}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
