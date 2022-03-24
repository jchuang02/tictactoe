import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("On initial render, the play again button should be disabled", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /Play Again/i })).toBeDisabled();
});

test("Player indicators should correctly show the player who's turn it is", () => {
  render(<App />);
  const players = screen.getAllByRole("marquee");
  const spaces = screen.getAllByRole("gridcell");
  expect(players[0]).toHaveClass("active");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>O</div>");
  expect(players[0]).not.toHaveClass("active");
  expect(players[1]).toHaveClass("active");
});

test("Testing game where player 2 tries to click on occupied space", () => {
  render(<App />);
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).not.toContainHTML("<div>X</div>");
});

test("Testing game where player 1 wins with a vertical sequence", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[7]);
  expect(spaces[7]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).not.toContainHTML("<div>X</div>");
  expect(window.alert).toBeCalledWith("Player 1 is the winner!");
});

test("Testing game where player 2 wins with a horizontal sequence", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[3]);
  expect(spaces[3]).toContainHTML("<div>X</div>");
  expect(window.alert).toBeCalledWith("Player 2 is the winner!");
});

test("Testing game where player 1 wins with a diagonal sequence", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>O</div>");
  expect(window.alert).toBeCalledWith("Player 1 is the winner!");
});

test("Testing game where player 1 wins with all spaces filled", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[3]);
  expect(spaces[3]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[7]);
  expect(spaces[7]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>O</div>");
  expect(window.alert).toBeCalledWith("Player 1 is the winner!");
});

test("Testing game where all spaces resulting in a draw", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[3]);
  expect(spaces[3]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[7]);
  expect(spaces[7]).toContainHTML("<div>O</div>");
  expect(window.alert).toBeCalledWith("It's a draw");
});

test("Play Again button is enabled after the game has ended", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[3]);
  expect(spaces[3]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[7]);
  expect(spaces[7]).toContainHTML("<div>O</div>");
  expect(window.alert).toBeCalledWith("It's a draw");
  expect(screen.getByRole("button", { name: /Play Again/i })).toBeEnabled();
});

test("All spaces are empty after Play Again button is clicked", () => {
  render(<App />);
  window.alert = jest.fn();
  const spaces = screen.getAllByRole("gridcell");
  userEvent.click(spaces[4]);
  expect(spaces[4]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[1]);
  expect(spaces[1]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[2]);
  expect(spaces[2]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[6]);
  expect(spaces[6]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[8]);
  expect(spaces[8]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[0]);
  expect(spaces[0]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[3]);
  expect(spaces[3]).toContainHTML("<div>O</div>");
  userEvent.click(spaces[5]);
  expect(spaces[5]).toContainHTML("<div>X</div>");
  userEvent.click(spaces[7]);
  expect(spaces[7]).toContainHTML("<div>O</div>");
  expect(window.alert).toBeCalledWith("It's a draw");
  expect(screen.getByRole("button", { name: /Play Again/i })).toBeEnabled();
  userEvent.click(screen.getByRole("button", { name: /Play Again/i }));
  spaces.forEach((space) => {
    expect(space).not.toContainHTML("<div>O</div>");
    expect(space).not.toContainHTML("<div>X</div>");
  });
});
