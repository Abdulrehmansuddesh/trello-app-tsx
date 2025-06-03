import React, { useState, ChangeEvent, FormEvent } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCards";

interface TaskCategory {
  id: number;
  todo?: string[];
  doing?: string[];
  done?: string[];
}

const TaskBoardPage = () => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<TaskCategory[]>([
    { id: 1, todo: [] },
    { id: 2, doing: [] },
    { id: 3, done: [] },
  ]);
  const [dropDownValue, setDropDownValue] = useState<"todo" | "doing" | "done">("todo");

  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const AddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") return alert("Please enter a value");

    const newData = data.map((item) => {
      if (item[dropDownValue]) {
        return {
          ...item,
          [dropDownValue]: [...(item[dropDownValue] as string[]), value],
        };
      }
      return item;
    });

    setData(newData);
    setValue("");
  };

  const handleDelete = (category: string, indexToDelete: number) => {
    const newData = data.map((item) => {
      if (item[category]) {
        const updatedList = [...(item[category] as string[])];
        updatedList.splice(indexToDelete, 1);
        return { ...item, [category]: updatedList };
      }
      return item;
    });

    setData(newData);
  };

  const handleEdit = (category: string, index: number, currentValue: string) => {
    setEditCategory(category);
    setEditIndex(index);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editCategory === null || editIndex === null) return;

    const newData = data.map((item) => {
      if (item[editCategory]) {
        const updatedList = [...(item[editCategory] as string[])];
        updatedList[editIndex] = editValue;
        return { ...item, [editCategory]: updatedList };
      }
      return item;
    });

    setData(newData);
    setEditCategory(null);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <>
      <TaskForm
        value={value}
        dropDownValue={dropDownValue}
        onChange={(e) => setValue(e.target.value)}
        onDropDownChange={(e) => setDropDownValue(e.target.value as "todo" | "doing" | "done")}
        onSubmit={AddTodo}
      />

      <div className="flex justify-around w-full p-4">
        {data.map((item) => {
          const key = Object.keys(item).find((k) => k !== "id") as string;
          return (
            <TaskCard
              key={item.id}
              title={key}
              tasks={item[key] as string[]}
              onEdit={(index, value) => handleEdit(key, index, value)}
              onSave={saveEdit}
              onDelete={(index) => handleDelete(key, index)}
              editIndex={editCategory === key ? editIndex : null}
              editValue={editValue}
              onChangeEditValue={(e) => setEditValue(e.target.value)}
            />
          );
        })}
      </div>
    </>
  );
};

export default TaskBoardPage;
