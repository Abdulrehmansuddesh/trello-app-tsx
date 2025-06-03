import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ChangeEvent } from "react";
  

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
    
  <li className="flex justify-between font-popins items-center p-2 pl-3   mx-1 mb-2 backdrop-blur-md bg-white/70 shadow-md rounded-[15px]">
      {isEditing ? (
        <input type="text" value={editValue} onChange={onChangeEdit} className=" p-1 border-none mr-2 w-full" />
      ) : ( 
        <span>{task}</span>
      )}
      <div className="flex gap-1">
        {isEditing ? (
          <button onClick={onSave} className=" text-blue-400 px-2  h-auto rounded cursor-pointer"><FontAwesomeIcon icon={faPen}/></button>
        ) : (
          <button onClick={onEdit} className=" px-2 rounded cursor-pointer"><FontAwesomeIcon className="text-blue-400" icon={faPen}/></button>
        )}
        <button onClick={onDelete} className="  px-2 rounded cursor-pointer"><FontAwesomeIcon className="text-red-600" icon={faTrash}/></button>
      </div>
    </li>
  );
};

export default TaskItem;


