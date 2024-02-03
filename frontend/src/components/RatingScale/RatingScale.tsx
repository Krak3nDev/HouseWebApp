import React, { useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import styles from "./RatingScale.module.scss"

const MAX = 10
const MIN = 0

const marks = Array.from({ length: MAX - MIN + 1 }, (_, i) => ({
    value: i + MIN,
    label: `${i + MIN}`,
}))

function RatingScale({ name, onRatingChange }) {
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (onRatingChange) {
            onRatingChange(newValue)
        }
    }

    const thumbStyle = value === null ? { visibility: "hidden" } : {}

    return (
        <div className={styles.ratingScale}>
            {/* Label тепер видалений, тому тут його немає */}
            <div className={styles.sliderLabels}>
                <Typography
                    variant="body2"
                    className="minLabel"
                    onClick={() => handleChange(null, MIN)}
                    sx={{ cursor: "pointer" }}
                >
                    Min
                </Typography>
                <Box sx={{ width: "100%", px: 2 }}>
                    <Slider
                        name={name}
                        marks={marks}
                        step={1}
                        value={value === null ? MIN : value}
                        valueLabelDisplay="auto"
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                        sx={{
                            marginX: "auto",
                            "& .MuiSlider-thumb": thumbStyle,
                        }}
                    />
                </Box>
                <Typography
                    variant="body2"
                    className="maxLabel"
                    onClick={() => handleChange(null, MAX)}
                    sx={{ cursor: "pointer" }}
                >
                    Max
                </Typography>
            </div>
        </div>
    )
}

export default RatingScale
