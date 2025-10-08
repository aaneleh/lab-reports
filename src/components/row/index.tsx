import { ReactElement } from "react";

export default function Row(props: { cells: ReactElement[], className?: string }) {
  return (
    <div role="row" className={`grid grid-rows-1 grid-cols-${props.cells.length} p-2 ${props.className}`}>
        {props.cells.map((el, key)=>
            <div role="cell" key={key}>{el}</div>
        )}
    </div>
  );
}
