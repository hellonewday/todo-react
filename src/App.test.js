import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./utils/test.utils";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  removeTodo,
} from "./redux/thunk/todos";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("App component", () => {
  test("render app successfully", () => {
    renderWithProviders(<App />);
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /add task/i,
    });

    expect(input).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });
});

describe("Fetch todos", () => {
  test("should fetch todo list", async () => {
    const store = mockStore({ todos: { data: [] } });
    await store.dispatch(fetchTodos());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const actions = store.getActions();

    const fulfilledAction = actions.find(
      (action) => action.type === "FETCH_TODO/fulfilled"
    );

    expect(fulfilledAction.payload.length).toBeGreaterThanOrEqual(0);
  });
});

describe("Add todos", () => {
  const store = mockStore({ todos: { data: [] } });
  const exampleData = { title: "test data" };
  const actions = store.getActions();

  beforeAll(async () => {
    await store.dispatch(addTodo(exampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  test("should add todo", async () => {
    const fulfilledAddAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );
    expect(fulfilledAddAction).not.toBeNull();
    expect(fulfilledAddAction.payload.data.title).toBe(exampleData.title);
  });

  test("list should be updated", async () => {
    await store.dispatch(fetchTodos());
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fulfilledAction = actions.find(
      (action) => action.type === "FETCH_TODO/fulfilled"
    );
    let obj = fulfilledAction.payload.find(
      (item) => item.title === exampleData.title
    );
    expect(obj).not.toBeUndefined();
  });

  afterAll(async () => {
    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    await store.dispatch(removeTodo(createdAction.payload.data.id));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
});

describe("Edit todo", () => {
  const store = mockStore({ todos: { data: [] } });
  const exampleData = { title: "test data" };
  const exampleValue = "test 1";
  const actions = store.getActions();

  beforeAll(async () => {
    await store.dispatch(addTodo(exampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  test("should edit successfully", async () => {
    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    const id = createdAction.payload.data.id;

    await store.dispatch(editTodo({ id, title: exampleValue }));
    await new Promise((resolve) => setTimeout(resolve, 500));

    const editAction = actions.find(
      (action) => action.type === "EDIT_TODO/fulfilled"
    );

    expect(editAction.payload.title).toBe(exampleValue);
  });

  test("list should be updated", async () => {
    await store.dispatch(fetchTodos());
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fulfilledAction = actions.find(
      (action) => action.type === "FETCH_TODO/fulfilled"
    );
    let obj = fulfilledAction.payload.find(
      (item) => item.title === exampleValue
    );

    expect(obj).not.toBeUndefined();
  });

  afterAll(async () => {
    const editAction = actions.find(
      (action) => action.type === "EDIT_TODO/fulfilled"
    );

    await store.dispatch(removeTodo(editAction.payload.id));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
});

describe("Complete todo", () => {
  const store = mockStore({ todos: { data: [] } });
  const exampleData = { title: "test data" };
  const actions = store.getActions();

  beforeAll(async () => {
    await store.dispatch(addTodo(exampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  test("should complete todo successfully", async () => {
    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    const id = createdAction.payload.data.id;

    await store.dispatch(completeTodo(id));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const editAction = actions.find(
      (action) => action.type === "COMPLETE_TODO/fulfilled"
    );
    expect(editAction.payload.completed).toBe(true);
  });

  test("list should be updated status to completed = true", async () => {
    await store.dispatch(fetchTodos());
    await new Promise((resolve) => setTimeout(resolve, 500));

    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    const fulfilledAction = actions.find(
      (action) => action.type === "FETCH_TODO/fulfilled"
    );
    let obj = fulfilledAction.payload.find(
      (item) =>
        item.title === createdAction.payload.data.title &&
        item.completed === true
    );

    expect(obj).not.toBeUndefined();
  });

  afterAll(async () => {
    const editAction = actions.find(
      (action) => action.type === "COMPLETE_TODO/fulfilled"
    );

    await store.dispatch(removeTodo(editAction.payload.id));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
});

describe("Remove todo", () => {
  const store = mockStore({ todos: { data: [] } });
  const exampleData = { title: "test data" };
  const actions = store.getActions();

  beforeAll(async () => {
    await store.dispatch(addTodo(exampleData));
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  test("should remove successfully", async () => {
    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    await store.dispatch(removeTodo(createdAction.payload.data.id));
    await new Promise((resolve) => setTimeout(resolve, 500));

    const removeAction = actions.find(
      (action) => action.type === "REMOVE_TODO/fulfilled"
    );

    expect(removeAction.payload.id).toBe(createdAction.payload.data.id);
  });

  test("should update the todos after delete", async () => {
    await store.dispatch(fetchTodos());
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fulfilledFetchAction = actions.find(
      (action) => action.type === "FETCH_TODO/fulfilled"
    );

    const createdAction = actions.find(
      (action) => action.type === "ADD_TODO/fulfilled"
    );

    const checkExisting = fulfilledFetchAction.payload.find(
      (item) => item.id === createdAction.payload.data.id
    );

    expect(checkExisting).toBeUndefined();
  });
});
