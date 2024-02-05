interface SurveyPageProps {
    title?: string;
    subtitle?: string;
    ratingLabel: string;
    onNextStep?: string;
    italicSubtitle?: string;
    qualityRating: number | undefined;
    setQualityRating: (rating: number | undefined) => void;
    positiveFeedback: string;
    setPositiveFeedback: (feedback: string) => void;
    negativeFeedback: string;
    setNegativeFeedback: (feedback: string) => void;
    showReturnButton?: boolean;
    isFinalPage?: boolean;
}
