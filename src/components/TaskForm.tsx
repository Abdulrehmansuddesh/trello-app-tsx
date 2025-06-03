import React, { type ChangeEvent, type FormEvent } from "react";

interface TaskFormProps {
  value: string;
  dropDownValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDropDownChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ value, dropDownValue, onChange, onDropDownChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center font-popins items-center h-[10vh] gap-2 pt-10 ">
        <input placeholder="Add Task" className="px-3 font-medium rounded-[5px] w-[250px] h-[40px] backdrop-blur-md bg-white/30  shadow-lg"  type="text" value={value} onChange={onChange} />
        <select className=" w-[100px] text-center  font-medium h-[40px] cursor-pointer rounded-[5px]   backdrop-blur-md bg-white/20  shadow-lg" value={dropDownValue} onChange={onDropDownChange}>
          <option className=" my-2 px-2 shadow-md hover:bg-amber-300 " value="todo">Todo</option>
          <option  className="" value="doing">Doing</option>
          <option  className="" value="done">Done</option>
        </select>
        <button type="submit" className=" h-[40px] font-semibold  rounded-[5px]  backdrop:blur-md bg-white/30 w-[90px] cursor-pointer shadow-2xl">Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
