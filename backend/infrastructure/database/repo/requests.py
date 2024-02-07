from infrastructure.database.repo.base import BaseRepo
from infrastructure.database.repo.buildings import BuildingRepo
from infrastructure.database.repo.surveys import SurveyRepo
from infrastructure.database.repo.surveys_feedbacks import SurveyFeedbackRepo
from infrastructure.database.repo.users import UserRepo


class RequestsRepo(BaseRepo):
    @property
    def survey_feedback(self) -> SurveyFeedbackRepo:
        return SurveyFeedbackRepo(self.session)

    @property
    def building(self) -> BuildingRepo:
        return BuildingRepo(self.session)

    @property
    def survey(self) -> SurveyRepo:
        return SurveyRepo(self.session)

    @property
    def users(self) -> UserRepo:
        return UserRepo(self.session)
