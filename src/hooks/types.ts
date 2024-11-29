export type DraggingType = "min" | "max" | null;

export type InputRange = { min: number; max: number } | [number, number][];

export type RangeValues = {
  min: number;
  max: number;
};

export interface UseDragRangeProps {
  range: InputRange;
  fixedValuesRange?: boolean;
}
