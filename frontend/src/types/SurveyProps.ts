interface SurveyPageProps {
    page?: number;
    path?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    ratingLabel: string;
    onNextStep?: string;
    qualityRating: number | undefined;
    setQualityRating: (rating: number | undefined) => void;
    positiveFeedback: string;
    setPositiveFeedback: (feedback: string) => void;
    negativeFeedback: string;
    setNegativeFeedback: (feedback: string) => void;
    showReturnButton?: boolean;
    isFinalPage?: boolean;
}
