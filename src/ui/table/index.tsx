import { MdDeleteForever } from "react-icons/md";

export interface Column<T> {
    id: keyof T;
    label: string;
}

interface Props<T> {
    columns: Column<T>[];
    rows: T[];

}

export default function Table<T>(props: Props<T>) {

    const { columns, rows} = props;
    
    return (
        <div role="table">
            <div role="rowheader" className={`bg-teal-700 text-white font-semibold grid grid-rows-1 grid-cols-3 p-2`}>
                {columns.map((column, key) => (
                    <p role="cell" key={key}>{column.label} </p>
                ))}

                <p role="cell" > Ações </p>
            </div>
            {rows.map((row, key) => {
                return (
                    <div role="row" key={key} className={`grid grid-rows-1 grid-cols-3 p-2`}>
                        {columns.map((column, key) => {
                            if(column.id === 'admin') {
                                return (
                                    row[column.id] ?
                                    'Admin' :
                                    'Usuário'
                                )
                            } else {
                                return (
                                    //@ts-ignore
                                    <p role="cell" key={key}> {row[column.id]} </p>
                                )
                            }
                        })}
                        
                        {/*@ts-ignore*/}
                        <MdDeleteForever onClick={() => console.log(row.uuid)}/>

                    </div>
                )
            })}
        </div>
    );

}
