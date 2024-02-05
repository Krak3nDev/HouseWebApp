import {useSurveyPageStorage} from "../../hooks/useSurveyPageStorage.ts"
import SurveyPage from "../../pages/Survey/Survey.tsx"


const SurveyPageRoute = ({ page, ...props }) => {
    const storageProps = useSurveyPageStorage(page)

    return <SurveyPage
        page={page}
        {...props}
        {...storageProps}
    />
}

export default SurveyPageRoute
