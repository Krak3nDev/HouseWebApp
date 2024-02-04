import React, { ChangeEvent, useState } from "react"
import RatingScale from "../../components/RatingScale/RatingScale"
import InputArea from "../../components/InputArea/InputArea"
import { MainButton } from "@vkruglikov/react-telegram-web-app"
import { useNavigate } from "react-router-dom"
import ReturnButton from "../../components/ReturnButton/ReturnButton.tsx"
import "./Survey.scss"
import {COMMON_LABELS} from "../../constants/texts.ts"
import { useShowPopup } from "@vkruglikov/react-telegram-web-app"


const SurveyPage: React.FC<SurveyPageProps> = ({
    title,
    subtitle,
    ratingLabel,
    onNextStep,
    italicSubtitle,
    qualityRating,
    setQualityRating,
    positiveFeedback,
    setPositiveFeedback,
    negativeFeedback,
    setNegativeFeedback,
    showReturnButton,
    isFinalPage = false,
}) => {
    const navigate = useNavigate()
    const showPopup = useShowPopup()


    const [localCurrentRating, setLocalCurrentRating] = useState<number | undefined>(qualityRating)
    const [localPositiveFeedback, setLocalPositiveFeedback] = useState<string>(positiveFeedback)
    const [localNegativeFeedback, setLocalNegativeFeedback] = useState<string>(negativeFeedback)




    const handlePositiveFeedbackChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalPositiveFeedback(event.target.value)
    }

    const handleNegativeFeedbackChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalNegativeFeedback(event.target.value)
    }

    const handleRatingChange = (newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setLocalCurrentRating(newValue)
        }
    }


    const handleNextOrSubmit = () => {
        setQualityRating(localCurrentRating)
        setPositiveFeedback(localPositiveFeedback)
        setNegativeFeedback(localNegativeFeedback)

        if (isFinalPage) {
            void showPopup({
                message: "Дякуємо за участь!",
            }).then(() => {
                window.Telegram.WebApp.close()
            })
        } else if (onNextStep) {
            navigate(onNextStep)
        }
    }


    return (
        <div className="survey-page">
            {title && <h1 className="survey-page__title">{title}</h1>}
            {subtitle && <p className="survey-page__text">{subtitle}</p>}
            {ratingLabel && <div className="survey-page__rating-label">{ratingLabel}</div>}
            {italicSubtitle && <p className="survey-page__italic-text">{italicSubtitle}</p>}

            <RatingScale
                name="quality"
                value={localCurrentRating}
                onRatingChange={handleRatingChange}
            />

            <InputArea
                label={COMMON_LABELS.positiveLabel}
                value={localPositiveFeedback}
                onChange={handlePositiveFeedbackChange}
            />

            <InputArea
                label={COMMON_LABELS.negativeLabel}
                value={localNegativeFeedback}
                onChange={handleNegativeFeedbackChange}
            />

            {localCurrentRating !== undefined && (
                <MainButton
                    text={isFinalPage ? "Відправити" : "Далі"}
                    onClick={handleNextOrSubmit}
                />
            )}
            {showReturnButton && <ReturnButton />}
        </div>
    )
}

export default SurveyPage
