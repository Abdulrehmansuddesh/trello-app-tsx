import { useState, ChangeEvent, FormEvent } from "react";

interface TaskCategory {
  id: number;
  todo?: string[];
  doing?: string[];
  done?: string[];
}

const HeaderMain = () => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<TaskCategory[]>([
    { id: 1, todo: [] },
    { id: 2, doing: [] },
    { id: 3, done: [] },
  ]);
  const [dropDownValue, setDropDownValue] = useState<string>("todo");

  const [editCategory, setEditCategory] = useState<string |null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const AddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Please enter a value");
      return;
    }

    const newData = data.map((item) => {
      if (item[dropDownValue] !== undefined) {
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

  const handleDelete = (category:string, indexToDelete: number) => {
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
      <form onSubmit={AddTodo}>
        <div className="flex justify-center items-center h-[10vh] gap-2">
          <input
            className="border-2 p-1"
            type="text"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
          <select
            className="border-2 p-1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDropDownValue(e.target.value as "todo" | "doing" | "done")
            }
            value={dropDownValue}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="border-2 px-4 py-1 bg-blue-300">
            Add
          </button>
        </div>
      </form>

      {/* Cards Section */}
      <div className="flex justify-around w-full p-4">
        {data.map((item) => {
          const key = Object.keys(item).find((k) => k !== "id") as string;
          return (
            <div key={item.id} className="w-[30%] border p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-bold capitalize text-center mb-2">{key}</h2>
              <ul className="space-y-2">
                {(item[key] as string[]).map((task, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border p-2 rounded-md"
                  >
                    {editCategory === key && editIndex === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEditValue(e.target.value)
                        }
                        className="border p-1 mr-2 w-full"
                      />
                    ) : (
                      <span>{task}</span>
                    )}

                    <div className="flex gap-2">
                      {editCategory === key && editIndex === index ? (
                        <button onClick={saveEdit} className="bg-green-400 px-2 rounded">
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(key, index, task)}
                          className="bg-blue-400 px-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(key, index)}
                        className="bg-red-400 px-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeaderMain;