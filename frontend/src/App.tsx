import "./App.scss"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {surveyPages} from "./constants/routes.ts"
import SurveyPageRoute from "./components/SurveyPageRoute/SurveyPageRoute.tsx"


function App() {



    return (
        <BrowserRouter>
            <Routes>
                {surveyPages.map((page, index) => (
                    <Route
                        key={index}
                        path={page.path}
                        element={<SurveyPageRoute
                            page={index + 1}
                            {...page} />}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App