import React, { ChangeEvent, FormEvent } from "react";

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
      <div className="flex justify-center items-center h-[10vh] gap-2">
        <input className="border-2 p-1" type="text" value={value} onChange={onChange} />
        <select className="border-2 p-1" value={dropDownValue} onChange={onDropDownChange}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="border-2 px-4 py-1 bg-blue-300">Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
