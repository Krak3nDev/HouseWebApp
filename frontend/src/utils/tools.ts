import axios, { AxiosError } from "axios"
import { BASE_URL } from "../constants/api"


export interface SurveyData {
  user_id: number;
  building_id: number;
  survey_id: number;
  question1: string | null;
  question2: string | null;
  question3: string | null;
  question4: string | null;
  question5: string | null;
  question6: string | null;
  question7: string | null;
  question8: string | null;
  question9: string | null;
}

interface ApiResponse {
  status: boolean;
}

export const collectData = (): SurveyData => {
    return {
        user_id: 1,
        building_id: 1,
        survey_id: 1,
        question1: sessionStorage.getItem("qualityRatingPage1"),
        question2: sessionStorage.getItem("positiveFeedbackPage1"),
        question3: sessionStorage.getItem("negativeFeedbackPage1"),
        question4: sessionStorage.getItem("qualityRatingPage2"),
        question5: sessionStorage.getItem("positiveFeedbackPage2"),
        question6: sessionStorage.getItem("negativeFeedbackPage2"),
        question7: sessionStorage.getItem("qualityRatingPage3"),
        question8: sessionStorage.getItem("positiveFeedbackPage3"),
        question9: sessionStorage.getItem("negativeFeedbackPage3"),
    }
}

export const sendDataToAPI = async (data: SurveyData): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(BASE_URL + "survey_feedback", data)
        console.log(BASE_URL + "survey_feedback")

        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        if (axiosError.response?.data && typeof axiosError.response.data === "object") {
            throw new Error(axiosError.response.data.status)
        } else {
            throw new Error("Помилка під час відправки даних")
        }
    }
}


export const fetchSurveyStatus = async (surveyId: number): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}survey_status?survey_id=${surveyId}`)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        if (axiosError.response?.data && typeof axiosError.response.data === "object") {
            throw new Error(axiosError.response.data.status)
        } else {
            throw new Error("Error fetching survey status")
        }
    }
}


export const fetchSurveyFeedback = async (deepUrl: string): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}survey_feedback?deep_url=${encodeURIComponent(deepUrl)}`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching survey feedback")
    }
}