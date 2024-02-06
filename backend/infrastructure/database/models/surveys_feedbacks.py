from typing import Optional

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import mapped_column, Mapped

from infrastructure.database.models import Base
from infrastructure.database.models.base import TimestampMixin


class SurveyFeedback(Base, TimestampMixin):
    __tablename__ = 'survey_feedbacks'
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.user_id'), primary_key=True)
    building_id: Mapped[int] = mapped_column(Integer, ForeignKey('buildings.building_id'), primary_key=True)
    survey_id: Mapped[int] = mapped_column(Integer, ForeignKey('surveys.survey_id'), primary_key=True)
    question1: Mapped[Optional[str]] = mapped_column(Text)
    question2: Mapped[Optional[str]] = mapped_column(Text)
    question3: Mapped[Optional[str]] = mapped_column(Text)
    question4: Mapped[Optional[str]] = mapped_column(Text)
    question5: Mapped[Optional[str]] = mapped_column(Text)
    question6: Mapped[Optional[str]] = mapped_column(Text)
    question7: Mapped[Optional[str]] = mapped_column(Text)
    question8: Mapped[Optional[str]] = mapped_column(Text)
    question9: Mapped[Optional[str]] = mapped_column(Text)
    deep_url: Mapped[str] = mapped_column(String(256))
