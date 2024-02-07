from typing import Optional

from pydantic import BaseModel


class SurveyResponse(BaseModel):
    user_id: int
    building_id: int
    survey_id: int
    question1: Optional[str]
    question2: Optional[str]
    question3: Optional[str]
    question4: Optional[str]
    question5: Optional[str]
    question6: Optional[str]
    question7: Optional[str]
    question8: Optional[str]
    question9: Optional[str]
    deep_url: Optional[str] = None


class SurveyStatusResponse(BaseModel):
    status: bool
