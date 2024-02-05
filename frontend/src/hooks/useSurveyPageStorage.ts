import {useSessionStorage} from "react-use"

export function useSurveyPageStorage(page) {
    console.log(page)
    const [qualityRating, setQualityRating] = useSessionStorage<number | undefined>(`qualityRating-${page}`, undefined)
    const [positiveFeedback, setPositiveFeedback] = useSessionStorage<string>(`positiveFeedback-${page}`, "")
    const [negativeFeedback, setNegativeFeedback] = useSessionStorage<string>(`negativeFeedback-${page}`, "")

    return { qualityRating, setQualityRating, positiveFeedback, setPositiveFeedback, negativeFeedback, setNegativeFeedback }
}
