import React, {useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import styles from "./RatingScale.module.scss"

interface RatingScaleProps {
  name: string;
  onRatingChange: (value: number | number[]) => void;
  value: number | undefined;
}

const MAX = 10
const MIN = 0

const marks = Array.from({ length: MAX - MIN + 1 }, (_, i) => ({
    value: i + MIN,
    label: `${i + MIN}`,
}))

const RatingScale: React.FC<RatingScaleProps> = ({ name, onRatingChange, value }) => {
    const [sliderValue, setSliderValue] = useState<number | undefined>(value)



    const handleChange = (newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setSliderValue(newValue)
            if (onRatingChange) {
                onRatingChange(newValue)
            }
        }
    }
    const thumbStyle = sliderValue === undefined ? { visibility: "hidden" } : {}

    return (
        <div className={styles.ratingScale}>
            <div className={styles.sliderLabels}>
                <Typography
                    variant="body2"
                    className="minLabel"
                    onClick={() => handleChange(MIN)}
                    sx={{ cursor: "pointer" }}
                >
          Min
                </Typography>
                <Box sx={{ width: "100%", px: 2 }}>
                    <Slider
                        name={name}
                        marks={marks}
                        step={1}
                        value={sliderValue ?? MIN}
                        valueLabelDisplay="auto"
                        min={MIN}
                        max={MAX}
                        onChange={(_, newValue) => handleChange(newValue)}
                        sx={{
                            marginX: "auto",
                            "& .MuiSlider-thumb": thumbStyle,
                        }}
                    />
                </Box>
                <Typography
                    variant="body2"
                    className="maxLabel"
                    onClick={() => handleChange(MAX)}
                    sx={{ cursor: "pointer" }}
                >
          Max
                </Typography>
            </div>
        </div>
    )
}

export default RatingScale
