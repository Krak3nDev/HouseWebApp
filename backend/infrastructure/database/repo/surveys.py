from sqlalchemy import select, Update, true
from sqlalchemy.dialects.postgresql import Insert

from infrastructure.database.models import Survey
from infrastructure.database.repo.base import BaseRepo


class SurveyRepo(BaseRepo):
    async def add_survey(self, building_id: int, survey_type: str) -> int:
        statement = Insert(Survey).values(
            building_id=building_id,
            survey_type=survey_type
        ).returning(Survey.survey_id)
        result = await self.session.execute(statement)
        await self.session.commit()
        return result.scalar()

    async def get_surveys(self):
        statement = select(Survey).where(Survey.opened.is_(true()))
        result = await self.session.execute(statement)
        surveys = result.scalars().all()

        formatted_surveys = [
            {
                "survey_id": survey.survey_id,
                "building_id": survey.building_id,
                "opened": survey.opened,
                "survey_type": survey.survey_type,
                "formatted_created_at": survey.created_at.strftime("%d-%m-%Y %H:%M")
            }
            for survey in surveys
        ]
        return formatted_surveys

    async def change_survey_status(self, survey_id: int, status: bool = False):
        statement = (
            Update(Survey)
            .where(Survey.survey_id == survey_id)
            .values(opened=status)
        )
        await self.session.execute(statement)
        await self.session.commit()

    async def get_survey_date(self, survey_id: int):
        statement = select(Survey).where(Survey.survey_id == survey_id)
        result = await self.session.execute(statement)
        survey = result.scalar()
        return survey.created_at.strftime("%d-%m-%Y %H:%M")

    async def get_survey_status(self, survey_id: int) -> bool:
        statement = select(Survey).where(Survey.survey_id == survey_id)
        result = await self.session.execute(statement)
        survey = result.scalar()
        if survey:
            return survey.opened
