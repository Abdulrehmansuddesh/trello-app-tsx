import React, { type KeyboardEvent } from "react";
import {DndContext} from '@dnd-kit/core';


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
  title,
  tasks,
  onEdit,
  onSave,
  onDelete,
  editIndex,
  editValue,
  onChangeEditValue,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  return (
    <DndContext>
    <div className="w-[22%] cursor-pointer h-[350px] p-4 rounded-xl mt-10 backdrop-blur-md bg-white/30 shadow-lg">
      <h3 className="text-lg font-semibold font-popins capitalize text-start border-b-2 pb-0.5 border-white mb-4">
        {title}
      </h3>

      <div
        className="h-[90%] w-full overflow-auto 
        [scrollbar-width:thin] 
        [scrollbar-color:#94a3b8_#f1f5f9] 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-slate-100 
        [&::-webkit-scrollbar-thumb]:bg-slate-400 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <ul className="space-y-1 cursor-pointer">
          {tasks.map((task, index) => (
            <li
              
            key={index}
              draggable
              className="relative flex justify-between font-popins overflow-hidden items-center p-2 pl-3 mx-1 mb-2 backdrop-blur-md bg-white/70 shadow-md rounded-[15px]"
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={onChangeEditValue}
                  onKeyDown={handleKeyDown}
                  className="p-1 border-none mr-2 w-[90%] outline-none"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => onEdit(index, task)}
                  className="cursor-text overflow-hidden w-[86%]"
                >
                  {task}
                </span>
              )}

              <button
                onClick={() => onDelete(index)}
                className="px-2 absolute right-0 rounded cursor-pointer font-bold"
              >
               🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </DndContext>
  );
};

export default TaskCard;















