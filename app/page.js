"use client"
import React, { useState, useEffect } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const storedData = localStorage.getItem("mainTask");
    if (storedData) {
      setMainTask(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mainTask", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      setMainTask([...mainTask, { email, pass }]);
    } else {
      const updatedTask = [...mainTask];
      updatedTask[editIndex] = { email, pass };
      setMainTask(updatedTask);
      setEditIndex(-1);
    }
    setEmail("");
    setPass("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    setEditIndex(i);
    setEmail(mainTask[i].email);
    setPass(mainTask[i].pass);
  };

  let renderTask = <h2 className="text-center">No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <tr key={i}>
          <td>{t.email}</td>
          <td>{t.pass}</td>
          <td>
            <button
              onClick={() => {
                editHandler(i);
              }}
              className="bg-green-400 text-white px-5 py-1 mb-1 mt-2 font-bold mr-2 rounded">
              Edit
            </button>
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className="bg-red-400 text-white px-3 py-1 mb-1 mt-2 font-bold rounded">
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h1 className="font-extrabold text-center text-5xl text-blue-500 mb-8 mt-5">
        My Login List Data
      </h1>
      <div className="flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center flex-col bg-sky-200  border-zinc-700 border-4 w-3/2 p-7 mb-10">

          <input
            type="email"
            className="border-zinc-700 border-4 px-3 py-3 text-2xl m-5"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }} />
          <input
            type="password"
            className="border-zinc-700 border-4 px-3 py-3 text-2xl m-5"
            placeholder="Enter your Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }} />
          <button className="px-6 py-2 bg-cyan-50 font-bold text-2xl rounded mt-2">
            {editIndex === -1 ? "Login" : "Update"}
          </button>
        </form>
      </div>
      
      <div className="p-8 flex justify-center items-center" >
      <table className="w-1/3 border-2 bg-white text-center border-black">
          <thead>
            <tr className="bg-slate-700 text-white" >
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-2">Password</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTask}</tbody>
        </table>
      </div>
    </>
  );
};

export default Page;