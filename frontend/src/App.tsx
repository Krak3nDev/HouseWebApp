import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import {surveyPages} from "./constants/routes.ts"
import SurveyPageRoute from "./components/SurveyPageRoute/SurveyPageRoute.tsx"
import Welcome from "./pages/Welcome/Welcome.tsx"



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Welcome
                        title={surveyPages[0].title}
                        subtitle={surveyPages[0].subtitle}
                        description={surveyPages[0].description
                        } />}
                />
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