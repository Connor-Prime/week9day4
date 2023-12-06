import * as _React from "react";
import {forwardRef} from "react";
import { TextField } from "@mui/material";



interface inputState {
    name: string,
    placeholder: string
}



export const InputText = forwardRef((props: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref} //data coming from user submitall will be forwarded to the form using this input box
            fullWidth
            type = 'text'
            {...props}
        >
        </TextField>
    )
})

export const InputPassword = forwardRef((props: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref} //data coming from user submitall will be forwarded to the form using this input box
            fullWidth
            type = 'password'
            {...props}
        >
        </TextField>
    )
})