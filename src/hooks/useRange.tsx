// Hooks
import { useState, useEffect, useRef } from "react";
import useOnClickOutside from "./useClickOutside";
import { DraggingType, RangeValues, UseDragRangeProps } from "./types";

export const useRange = ({ range, fixedValuesRange }: UseDragRangeProps) => {
  const [rangeValues, setRangeValues] = useState<RangeValues>({
    min: 0,
    max: 100,
  });
  // Hooks para que los usuarios puedan clickear tag y editar manualmente el rango dinamico.
  const [editingMaxValue, setEditingMaxValue] = useState(false);
  const [editingMinValue, setEditingMinValue] = useState(false);
  // Hooks deslizadores
  const [isDragging, setIsDragging] = useState<DraggingType>(null);
  const [rangeElement, setRangeElement] = useState<HTMLElement | null>(null);
  // Valores del rango modificados o no por el usuario
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  // Array con los parametros fijos del ej. 2
  const [fixedRanges, setFixedRanges] = useState([]);
  // REFS
  const rangeRef = useRef<HTMLDivElement>(null);
  const inputValuesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    formatFixedValues(range);
  }, []);

  const formatFixedValues = (range) => {
    if (fixedValuesRange) {
      const frequency = range.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      let max = null;
      let maxCount = -1;

      for (const num in frequency) {
        if (
          frequency[num] > maxCount ||
          (frequency[num] === maxCount && num > max)
        ) {
          max = Number(num);
          maxCount = frequency[num];
        }
      }

      const min = range.filter((num) => num < max);

      setRangeValues({ min: min[0], max });
      setMaxValue(max);
      setMinValue(min[0]);
      setFixedRanges(min);
      return;
    }
    setMaxValue(range.max);
    setMinValue(range.min);
    setRangeValues({ min: range.min, max: range.max });
    return;
  };

  const handleUserEditValues = (type: string) => {
    type === "min"
      ? setEditingMinValue(!editingMinValue)
      : setEditingMaxValue(!editingMaxValue);
  };

  useOnClickOutside(inputValuesRef, () =>
    handleUserEditValues(inputValuesRef.current.name)
  );

  const handleMouseUp = () => {
    setIsDragging(null);
    setRangeElement(null);
  };

  const startDragging = (type: DraggingType, rangeRef: HTMLElement) => {
    setIsDragging(type);
    setRangeElement(rangeRef);
  };

  const findClosest = (array: number[], value: number): number => {
    return array.reduce((closest, current) =>
      Math.abs(current - value) < Math.abs(closest - value) ? current : closest
    );
  };

  const handleInputChange = (type: "min" | "max", value: number) => {
    if (fixedValuesRange) {
      if (type === "min" && value >= rangeValues.min) {
        setMinValue(findClosest(fixedRanges, value));
      } else if (type === "max" && value <= rangeValues.max) {
        setMaxValue(findClosest(fixedRanges, value));
      }
    } else {
      if (type === "min" && value >= rangeValues.min && value < maxValue) {
        setMinValue(Math.min(value, rangeValues.max));
      } else if (
        type === "max" &&
        value <= rangeValues.max &&
        value > minValue
      ) {
        setMaxValue(Math.max(value, rangeValues.min));
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !rangeElement) return;

    const rect = rangeElement.getBoundingClientRect();
    const totalWidth = rect.width;
    const offset = e.clientX - rect.left;
    const newValue = Math.round((offset / totalWidth) * 100);

    if (isDragging === "min") {
      handleInputChange("min", Math.min(newValue, maxValue));
    } else if (isDragging === "max") {
      handleInputChange("max", Math.max(newValue, minValue));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
 
  return {
    handleMouseMove,
    startDragging,
    handleInputChange,
    handleUserEditValues,
    rangeValues,
    minValue,
    maxValue,
    editingMaxValue,
    editingMinValue,
    rangeRef,
    inputValuesRef,
  };
};
