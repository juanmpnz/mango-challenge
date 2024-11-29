import { render, fireEvent } from "@testing-library/react";
import InputRange from "../src/components/InputRange";

describe("InputRange Component", () => {
  it("should not allow minValue to go below initMin or maxValue to exceed initMax", () => {
    const range = {min: 10, max : 50};
 
    // Renderiza el componente
    const { getByText, container } = render(
      <InputRange range={range}  />
    );

    // Obtiene referencias visuales de los valores iniciales
    const minValueText = getByText(`${initMin} €`);
    const maxValueText = getByText(`${initMax} €`);

    // Simula interacciones (por simplicidad, asumimos que los controladores funcionan)
    const rangeContainer = container.querySelector(".relative.h-1");

    // Simula que el usuario arrastra el controlador izquierdo a un valor menor que initMin
    if (rangeContainer) {
      fireEvent.mouseDown(rangeContainer, { clientX: 0 }); // Punto extremo izquierdo
      fireEvent.mouseMove(window, { clientX: -50 }); // Fuera del rango hacia la izquierda
      fireEvent.mouseUp(window);
    }

    // Verifica que el valor mínimo no desciende por debajo de initMin
    expect(minValueText.textContent).toBe(`${initMin} €`);

    // Simula que el usuario arrastra el controlador derecho a un valor mayor que initMax
    if (rangeContainer) {
      fireEvent.mouseDown(rangeContainer, { clientX: 100 }); // Punto extremo derecho
      fireEvent.mouseMove(window, { clientX: 150 }); // Fuera del rango hacia la derecha
      fireEvent.mouseUp(window);
    }

    // Verifica que el valor máximo no excede initMax
    expect(maxValueText.textContent).toBe(`${initMax} €`);
  });
});