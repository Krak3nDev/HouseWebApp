import React, {ChangeEvent, useEffect, useState} from "react"
import RatingScale from "../../components/RatingScale/RatingScale"
import InputArea from "../../components/InputArea/InputArea"
import { MainButton } from "@vkruglikov/react-telegram-web-app"
import { useNavigate } from "react-router-dom"
import ReturnButton from "../../components/ReturnButton/ReturnButton.tsx"
import "./Survey.scss"
import {COMMON_LABELS} from "../../constants/texts.ts"
import { useShowPopup } from "@vkruglikov/react-telegram-web-app"
import {collectData, sendDataToAPI, SurveyData} from "../../utils/tools.ts"
import {surveyPages} from "../../constants/routes.ts"
import {useSessionStorage} from "react-use"
import {useSurveyPageStorage} from "../../hooks/useSurveyPageStorage.ts"


const logSessionStorage = (page) => {
    console.log(`Session Storage for Page ${page}:`, {
        qualityRating: sessionStorage.getItem(`qualityRating-${page}`),
        positiveFeedback: sessionStorage.getItem(`positiveFeedback-${page}`),
        negativeFeedback: sessionStorage.getItem(`negativeFeedback-${page}`)
    })
}

const SurveyPage: React.FC<SurveyPageProps> = ({
    page,
    path,
    title,
    subtitle,
    ratingLabel,
    italicSubtitle,
    showReturnButton,
    isFinalPage,
    ...storageProps
}) => {


    const navigate = useNavigate()
    const showPopup = useShowPopup()


    const { qualityRating, setQualityRating, positiveFeedback, setPositiveFeedback, negativeFeedback, setNegativeFeedback } = useSurveyPageStorage(page)


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
            {subtitle && <p className="survey-page__text">{subtitle}</p>}
            {ratingLabel && <div className="survey-page__rating-label">{ratingLabel}</div>}
            {italicSubtitle && <p className="survey-page__italic-text">{italicSubtitle}</p>}
            <RatingScale
                name="quality"
                value={qualityRating}
                onRatingChange={handleRatingChange}
            />

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
