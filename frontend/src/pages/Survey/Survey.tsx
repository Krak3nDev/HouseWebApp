import React, { useState } from "react"
import RatingScale from "../../components/RatingScale/RatingScale"
import InputArea from "../../components/InputArea/InputArea"
import { MainButton } from "@vkruglikov/react-telegram-web-app"
import { useNavigate } from "react-router-dom"
import "./Survey.scss"
import ReturnButton from "../../components/ReturnButton/ReturnButton.tsx" // Переконайтеся, що шлях до компоненту вірний

function SurveyPage({
    title,
    subtitle,
    ratingLabel,
    onNextStep,
    showReturnButton,
}) {
    const [qualityRating, setQualityRating] = useState(null)
    const [positiveFeedback, setPositiveFeedback] = useState("")
    const [negativeFeedback, setNegativeFeedback] = useState("")
    
    const positiveLabel = "Що Вам найбільше подобається в роботі Bona Vita?"
    const negativeLabel = "Що Вам найбільше не подобається в роботі Bona Vita?"
    const navigate = useNavigate()
    const [currentRating, setCurrentRating] = useState(qualityRating)

    const handleNext = () => {
        setQualityRating(currentRating)
        setPositiveFeedback(positiveFeedback)
        setNegativeFeedback(negativeFeedback)

        console.log(onNextStep)

        navigate(onNextStep)
    }

    return (
        <div className="survey-page">
            {title && <h1 className="survey-page__title">{title}</h1>}
            {subtitle && <p className="survey-page__text">{subtitle}</p>}
            {ratingLabel && (
                <div className="survey-page__rating-label">
                    {ratingLabel}
                </div>
            )}

            <RatingScale
                name="quality"
                onRatingChange={setCurrentRating}
            />
            <InputArea
                label={positiveLabel}
                value={positiveFeedback}
                onChange={(e) => setPositiveFeedback(e.target.value)}
            />
            <InputArea
                label={negativeLabel}
                value={negativeFeedback}
                onChange={(e) => setNegativeFeedback(e.target.value)}
            />
            {currentRating !== null && (
                <MainButton
                    text="Далі"
                    onClick={handleNext}
                />
            )}
            {showReturnButton && <ReturnButton />}
        </div>
    )
}

export default SurveyPage
