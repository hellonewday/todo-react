import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setUpStore } from "../store";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setUpStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper(c) {
    const { children } = c;
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
