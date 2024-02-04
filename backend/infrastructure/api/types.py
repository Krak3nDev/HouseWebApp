from pydantic import BaseModel

class SurveyResponse(BaseModel):
    user_id: int
    building_id: int
    survey_id: int
    question1: int
    question2: str
    question3: str
    question4: int
    question5: str
    question6: str
    question7: int
    question8: str
    question9: str
