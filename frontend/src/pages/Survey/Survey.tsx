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
    qualityRating,
    setQualityRating,
    positiveFeedback,
    setPositiveFeedback,
    negativeFeedback,
    setNegativeFeedback,
    italicSubtitle,
    showReturnButton,
}) {
    const positiveLabel = "Що Вам подобається найбільше?"
    const negativeLabel = "Що Вам не подобається найбільше?"
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
            {italicSubtitle && <p className="survey-page__italic-text">{italicSubtitle}</p>}

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
