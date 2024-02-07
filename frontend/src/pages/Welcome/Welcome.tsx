import React, {useEffect, useState} from "react"
import {MainButton} from "@vkruglikov/react-telegram-web-app"
import { useNavigate } from "react-router-dom"
import "./Welcome.scss"
import {surveyPages} from "../../constants/routes.ts"
import {fetchSurveyFeedback, fetchSurveyStatus, SurveyData} from "../../utils/tools.ts"


interface WelcomeProps {
  title: string;
  subtitle: string;
  description: string;
}


const Welcome: React.FC<WelcomeProps> = ({title, subtitle, description}) => {

    const deepUrl: string | undefined = Telegram.WebApp.initDataUnsafe.start_param



    const navigate = useNavigate()

    const [surveyClosed, setSurveyClosed] = useState(false)
    const [surveyCompleted, setSurveyCompleted] = useState(false)
    const [loading, setLoading] = useState(true)


    const handleButtonClick = () => {
        navigate(surveyPages[0].path)
    }

    useEffect(() => {
        if (deepUrl) {
            setLoading(true)
            fetchSurveyFeedback(deepUrl).then((feedbackResponse: SurveyData) => {
                const surveyId = feedbackResponse.survey_id
                if (feedbackResponse.question1 && feedbackResponse.question4 && feedbackResponse.question7) {
                    setSurveyCompleted(true)
                }

                fetchSurveyStatus(surveyId).then((statusResponse) => {
                    if (!statusResponse.status) {
                        setSurveyClosed(true)
                    } else {
                        setSurveyClosed(false)
                    }
                    setLoading(false)
                }).catch((error) => {
                    console.error("Error fetching survey status:", error)
                    setLoading(false)
                })
            }).catch((error) => {
                console.error("Error fetching survey feedback:", error)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [deepUrl])

    if (loading) {
        return <div className="centered-message">Загрузка...</div>
    }

    if (surveyClosed) {
        return <div className="centered-message">Опрос закрыт</div>
    }

    if (surveyCompleted) {
        return <div className="centered-message">Вы уже прошли этот опрос</div>
    }


    return (

        <div className="welcome_page">
            {title && <h1 className="welcome_page__title">{title}</h1>}
            {subtitle && <p className="welcome_page__text--size">{subtitle}</p>}
            {description && <p className="welcome_page__text">{description}</p>}
            <MainButton
                text={"Почати"}
                onClick={handleButtonClick}
            >
            </MainButton>
        </div>
    )
}

export default Welcome
