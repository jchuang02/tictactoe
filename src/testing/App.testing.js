import { render, screen } from "@testing-library/react";
import App from "../App";
test("On initial render, the play again button should be disabled", () => {
  render(<App />);

  screen.debug();
});
