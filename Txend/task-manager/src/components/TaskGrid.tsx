"use client";
import styles from "../app/page.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TaskGrid() {
  let [rows, setRows] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  let [showAddDialog, setShowAddDialog] = useState(false);

  function createTask() {

    const form = document.querySelector('form');
    if (!form)
      return;

    const formData = Object.fromEntries(new FormData(form).entries())
    console.log("formData", formData)
    axios
      .post("/api/tasks", formData)
      .then((res) => {
        setRows(res.data.rows);
        setShowAddDialog(false)
      })
      .catch(() => {
        alert("Cannot create task");
      });
  }

  function deleteTask(id: string) {
    axios
      .delete("/api/tasks?id=" + id)
      .then((res) => {
        setRows(res.data.rows);
        alert("task deleted successfully");
      })
      .catch(() => {
        alert("Cannot delete task");
      });
  }

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((res) => {
        setRows(res.data.rows);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Cannot create task");
        setIsLoading(false);
      });
  }, []);

  let actionsFn = (params: GridRenderCellParams<any>) => {
    return (
      <>
        <Button>Edit</Button>
        <Button
          onClick={() => {
            deleteTask(params.id.toString());
          }}
        >
          Delete
        </Button>
      </>
    );
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      headerClassName: "grid-header",
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
      headerClassName: "grid-header",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,

      headerClassName: "grid-header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      editable: true,

      headerClassName: "grid-header",
    },

    {
      field: "actions",
      headerName: "actions",
      width: 210,
      editable: true,

      headerClassName: "grid-header",
      renderCell: actionsFn,
    },
  ];

  return (
    <div className={styles.gridMain}>
      <div>
        {" "}
        <Button
          onClick={() => {
            setShowAddDialog(true);
          }}
        >
          {" "}
          Add Task{" "}
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        className={styles.grid}
        loading={isLoading}
      ></DataGrid>{" "}
      <dialog open={showAddDialog}>
        <button
          onClick={() => {
            setShowAddDialog(false);
          }}
        >
          Close
        </button>
        <form

          onSubmit={() => {
            return false;
          }}
        >
          <div>
            <label>Title</label>
            <input id="title" name="title" type="text"></input>
          </div>
          <div>
            <label>Description</label> 
            <input id="description" name="description" type="text"></input>
          </div>
          <div>
            <label>Status</label>
            <select  name="Status" id="Status">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <Button onClick={createTask}>Submit</Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
