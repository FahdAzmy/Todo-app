import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Divider, Grid, TextField } from "@mui/material";
import Todo from "./Todo";
import { useContext } from "react";
import { v4 as id } from "uuid";
import { todocContext } from "./contexts/TodoContexst";

export default function TodoList() {
  const { todos, setTodos } = useContext(todocContext); // Context for managing todos
  const [alignment, setAlignment] = React.useState("All"); // State for filter button alignment
  const [title, setTitle] = React.useState(""); // State for new todo title

  // Handle filter button change
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Memoized filter for completed todos
  const filterButtonCompleted = React.useMemo(() => {
    return todos.filter((t) => t.isCompleted === true);
  }, [todos]);

  // Memoized filter for uncompleted todos
  const filterButtonUncompleted = React.useMemo(() => {
    return todos.filter((t) => t.isCompleted === false);
  }, [todos]);

  // Determine which todos to render based on filter
  let todoToBeRendered = todos;
  if (alignment === "Done") {
    todoToBeRendered = filterButtonCompleted;
  } else if (alignment === "Wating") {
    todoToBeRendered = filterButtonUncompleted;
  }

  // Map todos to Todo components
  const mession = todoToBeRendered.map((t) => <Todo key={t.id} todo={t} />);

  // Handle adding a new todo
  function handleAddClick() {
    const createMession = {
      id: id(),
      title: title,
      detials: "",
      isCompleted: false,
    };

    const updateTasks = [...todos, createMession];
    setTodos(updateTasks);
    localStorage.setItem("todos", JSON.stringify(updateTasks)); // Save to local storage
    setTitle(""); // Clear the input field
  }

  // Load todos from local storage on component mount
  React.useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            color="black"
          >
            ToDoList
          </Typography>
          <Divider />

          {/* Filter Buttons */}
          <ToggleButtonGroup
            style={{ marginTop: "20px" }}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Done">Done</ToggleButton>
            <ToggleButton value="Wating">Wating</ToggleButton>
          </ToggleButtonGroup>

          {/* Render Todos */}
          {mession}

          {/* Input and Add Button */}
          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs={8}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Enter a Mession"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                style={{ width: "100%", height: "100%", marginLeft: "5px" }}
                variant="contained"
                onClick={handleAddClick}
                disabled={title.length === 0}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
