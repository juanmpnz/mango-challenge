"use client";
import React from "react";
// Hooks
import useRagnes from "../../hooks/useRangesValues";
// Components
import Loader from "../../components/Loader";
import InputRange from "../../components/InputRange";

const exerciseTwo: React.FC = () => {
  const { data, isLoading, error } = useRagnes();
  const exerciseTwoValues = data?.exerciseTwo;

  if (error) return <h1>Error al obtener datos de la Api</h1>;
 
  return (
    <div>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <h1 className="text-2xl">Exercise 2</h1>
        <div className="mt-8">
          <InputRange range={exerciseTwoValues} fixedValuesRange />
        </div>
      </>
    )}
  </div>
  );
};

export default exerciseTwo;
