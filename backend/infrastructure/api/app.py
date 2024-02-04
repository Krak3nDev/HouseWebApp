import logging

import betterlogging as bl
import fastapi
from fastapi import FastAPI, APIRouter, Depends
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from config import load_config, Config
from infrastructure.api.types import SurveyResponse
from infrastructure.api.utils import get_repo
from infrastructure.database.repo.requests import RequestsRepo
from infrastructure.database.setup import create_session_pool

app = FastAPI()
log_level = logging.INFO
bl.basic_colorized_config(level=log_level)
log = logging.getLogger(__name__)

config: Config = load_config()
session_pool = create_session_pool(config.db)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

prefix_router = APIRouter(prefix="/api")


@prefix_router.post("/survey_feedback")
async def insert_survey_feedback(survey_response: SurveyResponse, repo: RequestsRepo = Depends(get_repo)) -> JSONResponse:

    await repo.survey_feedback.insert_survey_feedback(
        survey_response.user_id,
        survey_response.building_id,
        survey_response.survey_id,
        survey_response.question1,
        survey_response.question2,
        survey_response.question3,
        survey_response.question4,
        survey_response.question5,
        survey_response.question6,
        survey_response.question7,
        survey_response.question8,
        survey_response.question9

    )
    return JSONResponse(content={"status": "success"})


app.include_router(prefix_router)
