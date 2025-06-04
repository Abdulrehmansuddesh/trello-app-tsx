import React, {  type ChangeEvent ,  type KeyboardEvent } from "react";
interface TaskItemProps {
  data :string[]
  key: number ;
  tasks:string[];
  task: string;
  isEditing: boolean;
  onChangeEdit: (e: ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  editValue: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  onChangeEdit,
  onEdit,
  onSave,
  onDelete,
  editValue,
}) => {
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };


  return (
    <li  className= " relative flex justify-between font-popins overflow-hidden items-center p-2 pl-3 mx-1 mb-2 backdrop-blur-md bg-white/70 shadow-md rounded-[15px]">
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={onChangeEdit}
          onKeyDown={handleKeyDown}
          className="p-1 border-none mr-2 w-[90%] outline-none"
          autoFocus
        />
      ) : (
        <span onClick={onEdit} className="cursor-text overflow-hidden w-[86%]">
          {task}
        </span>
      )}
      <button
        onClick={onDelete}
        className="px-2 absolute right-0  rounded cursor-pointer font-bold "
      > 
       🗑️
      </button>
    </li>
  );
};

export default TaskItem;
