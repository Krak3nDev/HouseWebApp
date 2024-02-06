import React, {ChangeEvent, useEffect, useRef, useState} from "react"
import RatingScale from "../../components/RatingScale/RatingScale"
import InputArea from "../../components/InputArea/InputArea"
import { useNavigate } from "react-router-dom"
import ReturnButton from "../../components/ReturnButton/ReturnButton.tsx"
import "./Survey.scss"
import {COMMON_LABELS} from "../../constants/texts.ts"
import { useShowPopup, useWebApp } from "@vkruglikov/react-telegram-web-app"
import {collectData, sendDataToAPI, SurveyData} from "../../utils/tools.ts"
import {surveyPages} from "../../constants/routes.ts"
import { Button } from "@mui/material"
import { useBlockSwipe } from "../../hooks/useBlockSwipe.ts"


const SurveyPage: React.FC<SurveyPageProps> = ({
    page,
    path,
    title,
    subtitle,
    description,
    ratingLabel,
    onNextStep,
    showReturnButton,
    isFinalPage,
    ...storageProps
}) => {

    const WebApp = useWebApp()
    const [qualityRating, setQualityRating] = useState<undefined|number>(undefined)
    const [positiveFeedback, setPositiveFeedback] = useState("")
    const [negativeFeedback, setNegativeFeedback] = useState("")
    
    const navigate = useNavigate()
    const showPopup = useShowPopup()
    const sliderRef = useRef(null)
    useBlockSwipe(sliderRef)


    useEffect(() => {
        WebApp.expand()
    }, [])

    const handlePositiveFeedbackChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPositiveFeedback(event.target.value)
    }

    const handleNegativeFeedbackChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNegativeFeedback(event.target.value)
    }

    const handleRatingChange = (newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setQualityRating(newValue)
        }
    }



    const handleNextOrSubmit = async () => {
        if (isFinalPage) {
            const dataToSend: SurveyData = collectData()

            console.log("Data to send:", dataToSend)

            try {
                await sendDataToAPI(dataToSend)

                await showPopup({
                    message: "Дякуємо за участь!",
                })

                window.Telegram.WebApp.close()
            } catch (error) {
                console.error("Failed to send survey data:", error)
            }
        } else {
            storageProps.setQualityRating(qualityRating)
            storageProps.setPositiveFeedback(positiveFeedback)
            storageProps.setNegativeFeedback(negativeFeedback)

            const currentPageIndex = surveyPages.findIndex(page => page.path === path)
            const nextPage = surveyPages[currentPageIndex + 1]
            if (nextPage) {
                navigate(nextPage.path)
            }
        }
    }

    return (
        <div className="survey-page">
            {title && <h1 className="survey-page__title">{title}</h1>}
            {subtitle && <p className="survey-page__text--size">{subtitle}</p>}
            {description && <p className="survey-page__text">{description}</p>}
            {ratingLabel && (
                <div className="survey-page__rating-label">
                    {ratingLabel}
                </div>
            )}

            <div ref={sliderRef}>
            <RatingScale
                name="quality"
                value={qualityRating}
                onRatingChange={handleRatingChange}
            />
            </div>
                
                <InputArea
                    label={COMMON_LABELS.positiveLabel}
                    value={positiveFeedback}
                    onChange={handlePositiveFeedbackChange}
                />

            <InputArea
                label={COMMON_LABELS.negativeLabel}
                value={negativeFeedback}
                onChange={handleNegativeFeedbackChange}
            />

            {qualityRating !== undefined && (
                <Button variant="contained" onClick={handleNextOrSubmit}>
                    {isFinalPage ? "Відправити" : "Далі"}
                </Button>
            )}

            {showReturnButton && <ReturnButton />}
        </div>
    )
}

export default SurveyPage
