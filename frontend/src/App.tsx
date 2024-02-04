import "./App.scss"
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import {ROUTES} from "./constants/routes.ts"
import SurveyPage from "./pages/Survey/Survey.tsx"
import { useSessionStorage } from "react-use"
import {SURVEY_TEXTS} from "./constants/texts.ts"


function App() {

    const [qualityRatingPage1, setQualityRatingPage1] = useSessionStorage<number | undefined>("qualityRatingPage1", undefined)
    const [positiveFeedbackPage1, setPositiveFeedbackPage1] = useSessionStorage<string>("positiveFeedbackPage1", "")
    const [negativeFeedbackPage1, setNegativeFeedbackPage1] = useSessionStorage<string>("negativeFeedbackPage1", "")

    const [qualityRatingPage2, setQualityRatingPage2] = useSessionStorage<number | undefined>("qualityRatingPage2", undefined)
    const [positiveFeedbackPage2, setPositiveFeedbackPage2] = useSessionStorage<string>("positiveFeedbackPage2", "")
    const [negativeFeedbackPage2, setNegativeFeedbackPage2] = useSessionStorage<string>("negativeFeedbackPage2", "")

    const [qualityRatingPage3, setQualityRatingPage3] = useSessionStorage<number | undefined>("qualityRatingPage3", undefined)
    const [positiveFeedbackPage3, setPositiveFeedbackPage3] = useSessionStorage<string>("positiveFeedbackPage3", "")
    const [negativeFeedbackPage3, setNegativeFeedbackPage3] = useSessionStorage<string>("negativeFeedbackPage3", "")


    const SurveyStarterPage = () => {
        return (
            <SurveyPage
                title={SURVEY_TEXTS.starter.title}
                subtitle={SURVEY_TEXTS.starter.subtitle}
                ratingLabel={SURVEY_TEXTS.starter.ratingLabel}
                italicSubtitle={SURVEY_TEXTS.starter.italicSubtitle}
                qualityRating={qualityRatingPage1}
                setQualityRating={setQualityRatingPage1}
                positiveFeedback={positiveFeedbackPage1}
                setPositiveFeedback={setPositiveFeedbackPage1}
                negativeFeedback={negativeFeedbackPage1}
                setNegativeFeedback={setNegativeFeedbackPage1}

                onNextStep={ROUTES.SurveySecond}


            />
        )
    }

    const SurveySecond = () => {
        return (
            <SurveyPage
                ratingLabel={SURVEY_TEXTS.second.ratingLabel}
                italicSubtitle={SURVEY_TEXTS.second.italicSubtitle}
                onNextStep={ROUTES.SurveyThird}
                qualityRating={qualityRatingPage2}
                setQualityRating={setQualityRatingPage2}
                positiveFeedback={positiveFeedbackPage2}
                setPositiveFeedback={setPositiveFeedbackPage2}
                negativeFeedback={negativeFeedbackPage2}
                setNegativeFeedback={setNegativeFeedbackPage2}
                showReturnButton={true}



            />


        )
    }

    const SurveyThird = () => {
        return (
            <SurveyPage
                ratingLabel={SURVEY_TEXTS.third.ratingLabel}
                italicSubtitle={SURVEY_TEXTS.third.italicSubtitle}
                showReturnButton={true}
                qualityRating={qualityRatingPage3}
                setQualityRating={setQualityRatingPage3}
                positiveFeedback={positiveFeedbackPage3}
                setPositiveFeedback={setPositiveFeedbackPage3}
                negativeFeedback={negativeFeedbackPage3}
                setNegativeFeedback={setNegativeFeedbackPage3}
                isFinalPage={true}


            />

        )
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<SurveyStarterPage/>} />


                <Route
                    path={ROUTES.SurveySecond}
                    element={<SurveySecond/>} />

                <Route
                    path={ROUTES.SurveyThird}
                    element={<SurveyThird />} />


            </Routes>
        </BrowserRouter>
    )
}

export default App
