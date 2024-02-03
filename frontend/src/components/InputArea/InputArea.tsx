// InputArea.js
import React from "react"
import TextField from "@mui/material/TextField"
import styles from "./InputArea.module.scss"

function InputArea({ label, value, onChange }) {
    return (
        <div className={styles.textFieldWrapper}>
            <TextField
                id="standard-basic"
                label={label}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={value}
                onChange={onChange} 
            />
        </div>
    )
}

export default InputArea
