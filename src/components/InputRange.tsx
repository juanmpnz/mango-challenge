// Hooks
import { useRange } from "../hooks/useRange";
// Components
import Tooltip from "./Tooltip";

const InputRange = ({
  fixedValuesRange = false,
  range = { min: 0, max: 100 },
}: {
  range: { min: number; max: number } | [number, number][];
  fixedValuesRange?: boolean;
}) => {
  const {
    rangeValues,
    startDragging,
    handleInputChange,
    handleUserEditValues,
    rangeRef,
    minValue,
    maxValue,
    editingMaxValue,
    editingMinValue,
    inputValuesRef,
  } = useRange({
    range,
    fixedValuesRange,
  });

  return (
    <div className="flex gap-4">
      {editingMinValue && !fixedValuesRange ? (
        <input
          className="block w-10 rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600  "
          type="number"
          ref={inputValuesRef}
          name="min"
          onChange={(e) => handleInputChange("min", Number(e.target.value))}
        />
      ) : (
        <Tooltip
          content="Doble click para agregar un rango manual"
          id="tooltip-tags"
          hidden={fixedValuesRange}
        >
          <span
            onClick={() => handleUserEditValues("min")}
            data-tooltip-target="tooltip-tags"
          >
            <p className={`min-w-10 ${!fixedValuesRange && "cursor-pointer"}`}>
              {minValue} €
            </p>
          </span>
        </Tooltip>
      )}
      <div className="relative w-full max-w-72 flex flex-col justify-center">
        <div ref={rangeRef} className="relative h-1 bg-black rounded-full">
          <div
            className="absolute bg-gray-400 h-1 rounded-full"
            style={{
              left: `${(minValue / rangeValues.max) * 100}%`, // Inicio del rango
              width: `${((maxValue - minValue) / rangeValues.max) * 100}%`, // Ancho entre min y max
            }}
          />
        </div>
        <div
          className="absolute w-3 h-3 bg-black rounded-full transform -translate-x-1/2 cursor-pointer hover:scale-125"
          style={{ left: `${(minValue / rangeValues.max) * 100}%` }}
          onMouseDown={() =>
            rangeRef.current && startDragging("min", rangeRef.current)
          }
        />
        <div
          className="absolute w-3 h-3 bg-black rounded-full transform -translate-x-1/2 cursor-pointer hover:scale-125"
          style={{ left: `${(maxValue / rangeValues.max) * 100}%` }}
          onMouseDown={() =>
            rangeRef.current && startDragging("max", rangeRef.current)
          }
        />
      </div>
      {editingMaxValue && !fixedValuesRange ? (
        <input
          className="block w-10 rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600  "
          type="number"
          ref={inputValuesRef}
          name="max"
          onChange={(e) => handleInputChange("max", Number(e.target.value))}
        />
      ) : (
        <Tooltip
          hidden={fixedValuesRange}
          content="Doble click para agregar un rango manual"
          id="tooltip-tags"
        >
          <span
            onClick={() => handleUserEditValues("max")}
            data-tooltip-target="tooltip-tags"
          >
            <p className={`min-w-10 ${!fixedValuesRange && "cursor-pointer"}`}>
              {maxValue} €
            </p>
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default InputRange;
