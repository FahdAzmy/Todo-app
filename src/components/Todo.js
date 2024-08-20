import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { todocContext } from "./contexts/TodoContexst";

export default function Todo({ todo, showDelete }) {
  const [showEditDialog, setShowEditDialog] = useState(false); // State to show/hide edit dialog
  const { todos, setTodos } = useContext(todocContext); // Context for managing todos
  // Event handler to show delete dialog
  function handleDeleteClick() {}
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    detials: todo.detials,
  });

  // Event handler to show edit dialog
  function handleEditClick() {
    setShowEditDialog(true);
  }

  // Event handler to close edit dialog
  function handleEditClose() {
    setShowEditDialog(false);
  }

  // Event handler to toggle the completion status of a todo
  function handleCheckClick() {
    const updateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  // Event handler to confirm deletion of a todo

  // Event handler to confirm editing of a todo
  function handleEditConfirm() {
    const editTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: editTodo.title, detials: editTodo.detials };
      } else {
        return t;
      }
    });
    setTodos(editTodos);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(editTodos));
  }

  return (
    <div>
      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={handleEditClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleEditConfirm();
          },
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            style={{ width: "500px" }}
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            id="detials"
            name="detials"
            label="Detials"
            type="text"
            style={{ width: "500px" }}
            value={editTodo.detials}
            onChange={(e) =>
              setEditTodo({ ...editTodo, detials: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>

      {/* Todo Card */}
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          marginTop: "20px",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid xs={7}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold" }}
                color="white"
                textAlign="left"
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" color="gray" textAlign="left">
                {todo.detials}
              </Typography>
            </Grid>
            <Grid
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="7px"
            >
              <IconButton
                onClick={handleCheckClick}
                style={{
                  color: todo.isCompleted ? "white" : "#8cb34a",
                  background: todo.isCompleted ? "#8cb34a" : "white",
                  border: "solid #8cb34a 3px",
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={handleEditClick}
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
