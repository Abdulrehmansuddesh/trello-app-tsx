import React, {  useRef, type ChangeEvent ,  type KeyboardEvent } from "react";


const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  onChangeEdit,
  onEdit,
  onSave,
  onDelete,
  tasks,
  editValue,
}) => {
  

  const handelDrageStart = (e :any ,task : string ,tasks : string[])=>{
    console.log("handel start");
    
   

    e.target.style.opacity = 0.5;
    
  }

   const handelDrageEnd = (e : any)=>{
    console.log('drag end');
    e.target.style.opacity = 1;
  }


  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };


  return (
    <li draggable  onDragStart={(e)=>handelDrageStart(e,task,tasks)} onDragEnd={handelDrageEnd} className= "  relative flex justify-between font-popins overflow-hidden items-center p-2 pl-3 mx-1 mb-2 backdrop-blur-md bg-white/70 shadow-md rounded-[15px]">
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
