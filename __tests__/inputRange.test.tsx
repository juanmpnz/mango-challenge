import { render, screen, fireEvent } from "@testing-library/react";
import InputRange from "../src/components/InputRange";

test("El componente NO PUEDE ser un rango de entrada HTML5; tiene que ser personalizado.", () => {
  render(<InputRange range={{ min: 1, max: 99 }} />);
  const input = screen.queryByRole("slider");
  expect(input).toBeNull();
});

test("debería permitir al usuario arrastrar los controladores mínimo y máximo con rango como un objeto", () => {
  render(<InputRange range={{ min: 1, max: 99 }} />);

  const minHandle = screen.getByTestId("min-handle");
  const maxHandle = screen.getByTestId("max-handle");

  fireEvent.mouseDown(minHandle);
  fireEvent.mouseMove(document, { clientX: 50 });
  fireEvent.mouseUp(document);

  fireEvent.mouseDown(maxHandle);
  fireEvent.mouseMove(document, { clientX: 150 });
  fireEvent.mouseUp(document);
});

test("debería permitir al usuario arrastrar los controladores mínimo y máximo con el rango como una matriz", () => {
  render(<InputRange range={[1, 99, 20, 99, 35, 99]} fixedValuesRange />);

  const minHandle = screen.getByTestId("min-handle");
  const maxHandle = screen.getByTestId("max-handle");

  fireEvent.mouseDown(minHandle);
  fireEvent.mouseMove(document, { clientX: 50 });
  fireEvent.mouseUp(document);

  fireEvent.mouseDown(maxHandle);
  fireEvent.mouseMove(document, { clientX: 150 });
  fireEvent.mouseUp(document);
});
