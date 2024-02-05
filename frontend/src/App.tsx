import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {ROUTES} from "./constants/routes.ts"
import SurveyPage from "./pages/Survey/Survey.tsx"
import { useSessionStorage } from "react-use"


function App() {

    const SurveyStarterPage = () => {
        return (
            <SurveyPage
                title="Шановні мешканці ЖК «Олімпійський»!"
                subtitle={<>Вас вітає «STIKON»<br />
                Дякуємо, що живете у будинку, побудованому нашою компанією. Чи задоволені Ви сервісом управляючої компанії Bona Vita, або є що покращити?<br />
                Будь ласка, надайте відповіді, заповнивши анкету. Це займе 1-3 хвилини.</>}
                ratingLabel="Чи порекомендуєте Ви послуги управляючої компанії Bona Vita своїм друзям та знайомим?
"
                onNextStep={ROUTES.SurveySecond}
            />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<SurveyStarterPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
