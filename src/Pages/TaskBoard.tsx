import React, { useState, type FormEvent } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
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
  const [dropDownValue, setDropDownValue] = useState<string>("todo");

  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const AddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") return toast.error("Please enter a Task ❌");

    const newData = data.map((item) => {
      if (item[dropDownValue] as string[]) {
        return {
          ...item,
          [dropDownValue]: [...(item[dropDownValue] as string[]), value],
        };
      }
      return item;
    });
  
    console.log(data, "data");

    setData(newData);
    setValue("");
  };

  const handleDelete = (category: string, indexToDelete: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      confirmButtonText: "Delete",
      heightAuto:'300px',
      width: "300px",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = data.map((item) => {
          if (item[category] as string[]) {
            const updatedList = [...(item[category] as string[])];
            updatedList.splice(indexToDelete, 1);
            return { ...item, [category]: updatedList };
          }
          return item;
        });

        setData(newData);
        Swal.fire({
          title: "Deleted!",
          text: "Your list has been deleted.",
          icon: "success",
          width:"300px"
        });
      }
    });
  };

  const handleEdit = (
    category: string,
    index: number,
    currentValue: string
) => {
    console.log(index, "i");

    setEditCategory(category);
    setEditIndex(index);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editCategory === null || editIndex === null) return;

    const newData = data.map((item) => {
      if (item[editCategory] as number | string) {
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
        onDropDownChange={(e) => setDropDownValue(e.target.value as string)}
        onSubmit={AddTodo}
      />

      <div className="flex justify-center-safe gap-10  w-full p-4">
        <ToastContainer />
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
