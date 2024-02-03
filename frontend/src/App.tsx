import "./App.scss"
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import {ROUTES} from "./constants/routes.ts"
import SurveyPage from "./pages/Survey/Survey.tsx"
import { useSessionStorage } from "react-use"


function App() {

    const [value, setValue, remove] = useSessionStorage("my-key", "default-value")


    const [qualityRatingPage1, setQualityRatingPage1] = useSessionStorage("qualityRatingPage1", null)
    const [positiveFeedbackPage1, setPositiveFeedbackPage1] = useSessionStorage("positiveFeedbackPage1", "")
    const [negativeFeedbackPage1, setNegativeFeedbackPage1] = useSessionStorage("negativeFeedbackPage1", "")

    const [qualityRatingPage2, setQualityRatingPage2] = useSessionStorage("qualityRatingPage2", null)
    const [positiveFeedbackPage2, setPositiveFeedbackPage2] = useSessionStorage("positiveFeedbackPage2", "")
    const [negativeFeedbackPage2, setNegativeFeedbackPage2] = useSessionStorage("negativeFeedbackPage2", "")

    const [qualityRatingPage3, setQualityRatingPage3] = useSessionStorage("qualityRatingPage3", null)
    const [positiveFeedbackPage3, setPositiveFeedbackPage3] = useSessionStorage("positiveFeedbackPage3", "")
    const [negativeFeedbackPage3, setNegativeFeedbackPage3] = useSessionStorage("negativeFeedbackPage3", "")




    const SurveyStarterPage = () => {
        return (
            <SurveyPage
                title="Шановні мешканці ЖК «Балківський»!"
                subtitle="Ми, керуюча компанія Bona Vita, цінуємо вашу думку і прагнемо постійно покращувати якість послуг, які ми надаємо.

Опитування надає цінний зворотний зв'язок, який допоможе нам зрозуміти ваше задоволення і вподобання, а також дізнатися про сфери, в яких ми можемо вдосконалюватися."
                ratingLabel="1. Оцініть, будь ласка, рівень роботи інтернет-провайдерів та системи безпеки
"
                italicSubtitle="(висловіть свою думку про якість послуг інтернет-провайдерів, роботу камер спостереження, міток доступу та шлагбаумів, щоб забезпечити надійну систему безпеки для всіх мешканців)"
                positiveLabel="Що Вам подобається найбільше?"
                negativeLabel="Що Вам не подобається найбільше?"

                onNextStep={ROUTES.SurveySecond}
                qualityRating={qualityRatingPage1}
                setQualityRating={setQualityRatingPage1}
                positiveFeedback={positiveFeedbackPage1}
                setPositiveFeedback={setPositiveFeedbackPage1}
                negativeFeedback={negativeFeedbackPage1}
                setNegativeFeedback={setNegativeFeedbackPage1}
            />
        )
    }

    const SurveySecond = () => {
        return (
            <SurveyPage
                ratingLabel="2. Оцініть, будь ласка, рівень роботи будівельної компанії «Стікон»"
                italicSubtitle="(висловіть свою думку про якість будівельних робіт, дотримання строків та якість виконання проєктів «Стікон»)"
                showReturnButton={true}
                onNextStep={ROUTES.SurveyThird}
                qualityRating={qualityRatingPage2}
                setQualityRating={setQualityRatingPage2}
                positiveFeedback={positiveFeedbackPage2}
                setPositiveFeedback={setPositiveFeedbackPage2}
                negativeFeedback={negativeFeedbackPage2}
                setNegativeFeedback={setNegativeFeedbackPage2}


            />


        )
    }

    const SurveyThird = () => {
        return (
            <SurveyPage

                ratingLabel="3. Оцініть, будь ласка, рівень роботи управляючої компанії Bona Vita"
                italicSubtitle="(оцінка якості обслуговування, оперативності реагування на заявки, рівня чистоти та благоустрою території, а також ефективності комунікації з нами)"
                showReturnButton={true}
                onNextStep={"/"}

                qualityRating={qualityRatingPage1}
                setQualityRating={setQualityRatingPage1}
                positiveFeedback={positiveFeedbackPage1}
                setPositiveFeedback={setPositiveFeedbackPage1}
                negativeFeedback={negativeFeedbackPage1}
                setNegativeFeedback={setNegativeFeedbackPage1}

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
                    element={<SurveySecond showReturnButton={true} />} />

                <Route
                    path={ROUTES.SurveyThird}
                    element={<SurveyThird showReturnButton={true} />} />


            </Routes>
        </BrowserRouter>
    )
}

export default App
