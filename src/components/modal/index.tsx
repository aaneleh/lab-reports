'use client'

import { ReactElement, useState } from "react"
import Button from "../button"

export function Modal(props: {state: boolean | undefined, setState: (arg0: boolean) => void, children:ReactElement}){
    return (
        <dialog open={props.state} className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-8 max-w-md min-w-md border-2 border-gray-300 rounded">
            {props.children}
            <div className="py-4 w-full flex flex-col" onClick={()=>props.setState(false)}>
                <Button>
                    Fechar
                </Button>
            </div>
        </dialog>
    )
}

export default function ModalTrigger(props: { label: string, children : ReactElement }) {

    const [open, setOpen] = useState(false)

    return (
        <>
        <div onClick={()=> setOpen(true)}>
            <Button>{props.label}</Button>
        </div>
            {
                open 
                ? 
                    <Modal state={open} setState={setOpen}>{props.children}</Modal>
                :
                    <></>
            }
        </>
    )
}