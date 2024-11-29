"use client";
import React from "react";
// Hooks
import useRagnes from "../../hooks/useRangesValues";
// Components
import Loader from "../../components/Loader";
import InputRange from "../../components/InputRange";

const exerciseOne: React.FC = () => {
  const { data, isLoading, error } = useRagnes();
  const exerciseOneValues = data?.exerciseOne;

  if (error) return <h1>Error al obtener datos de la Api</h1>;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl">Exercise 1</h1>
          <div className="mt-8">
            <InputRange range={exerciseOneValues} />
          </div>
        </>
      )}
    </div>
  );
};

export default exerciseOne;
