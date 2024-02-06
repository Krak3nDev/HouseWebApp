from typing import Optional

from sqlalchemy.dialects.postgresql import insert

from infrastructure.database.models import SurveyFeedback
from infrastructure.database.repo.base import BaseRepo


class SurveyFeedbackRepo(BaseRepo):
    async def insert_survey_feedback(self, user_id: int, building_id: int, survey_id: int,
                                     question1: int, question2: Optional[str], question3: Optional[str],
                                     question4: int, question5: Optional[str], question6: Optional[str],
                                     question7: int, question8: Optional[str], question9: Optional[str]) -> None:
        query = insert(SurveyFeedback).values(
            user_id=user_id,
            building_id=building_id,
            survey_id=survey_id,
            question1=question1,
            question2=question2,
            question3=question3,
            question4=question4,
            question5=question5,
            question6=question6,
            question7=question7,
            question8=question8,
            question9=question9
        )
        await self.session.execute(query)
        await self.session.commit()