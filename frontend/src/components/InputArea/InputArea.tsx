// InputArea.js
import TextField from "@mui/material/TextField"
import styles from "./InputArea.module.scss"

function InputArea({ label, value, onChange}) {

    return (
        <div className={styles.textFieldWrapper}>
            <TextField
                id="standard-basic"
                label={label}
                multiline
                rows={4}
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
                className={styles.textField}
            />
        </div>
    )
}

export default InputArea
