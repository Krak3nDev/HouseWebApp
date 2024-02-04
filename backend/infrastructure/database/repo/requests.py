from infrastructure.database.repo.base import BaseRepo
from infrastructure.database.repo.surveys_feedbacks import SurveyFeedbackRepo


class RequestsRepo(BaseRepo):
    @property
    def survey_feedback(self) -> SurveyFeedbackRepo:
        return SurveyFeedbackRepo(self.session)
