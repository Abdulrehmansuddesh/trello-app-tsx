import React from "react";
import TaskItem from "./TaskItems";

interface TaskCardProps {
  // key: number
  setData : string[]
  data : string[]
  title: string;
  tasks: string[];
  onEdit: (index: number, value: string) => void;
  onSave: () => void;
  onDelete: (index: number) => void;
  editIndex: number | null;
  editValue: string;
  onChangeEditValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const TaskCard: React.FC<TaskCardProps> = ({title,tasks,onEdit,onSave,onDelete, editIndex,editValue,onChangeEditValue,}) => {
 

 

  return (
    <div className="w-[22%]  cursor-pointer  h-[350px] p-4 rounded-xl mt-10 backdrop-blur-md bg-white/30  shadow-lg">

      <h3 className="text-lg font-semibold font-popins capitalize text-start border-b-2 pb-0.5  border-white  mb-4">
        {title}
      </h3>
      <div
        className="  h-[90%] w-full overflow-auto 
             [scrollbar-width:thin] 
             [scrollbar-color:#94a3b8_#f1f5f9] 
             [&::-webkit-scrollbar]:w-2 
             [&::-webkit-scrollbar-track]:bg-slate-100 
             [&::-webkit-scrollbar-thumb]:bg-slate-400 
             [&::-webkit-scrollbar-thumb]:rounded-full 
             hover:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <ul className="space-y-1   cursor-pointer">
          {tasks.map((task, index) => (
            <TaskItem
              tasks={tasks}
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

    </div>
  );
};

export default TaskCard;
