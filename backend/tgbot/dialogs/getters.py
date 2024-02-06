import logging

from aiogram_dialog import DialogManager

from infrastructure.database.repo.requests import RequestsRepo


async def get_houses(dialog_manager: DialogManager, repo: RequestsRepo, **kwargs):
    buildings = await repo.building.get_buildings()
    return {"buildings": buildings}


async def get_building_name(dialog_manager: DialogManager, repo: RequestsRepo, **kwargs):
    building_id = int(dialog_manager.dialog_data.get("building_id"))
    building_name = await repo.building.get_building_name(building_id)
    return {"building_name": building_name}


async def get_all_surveys(dialog_manager: DialogManager, repo: RequestsRepo, **kwargs):
    surveys = await repo.survey.get_surveys()
    return {"surveys": surveys}


async def get_survey_date(dialog_manager: DialogManager, repo: RequestsRepo, **kwargs):
    survey_id = int(dialog_manager.dialog_data.get("survey_id"))
    survey_date = await repo.survey.get_survey_date(survey_id)
    return {"survey_date": survey_date}