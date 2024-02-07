import logging

from aiogram import Bot
from aiogram.types import CallbackQuery
from aiogram_dialog import Dialog, Window, DialogManager, ShowMode
from aiogram_dialog.widgets.kbd import ScrollingGroup, Select, Start, Cancel, Back, Button
from aiogram_dialog.widgets.text import Const, Format

from infrastructure.database.repo.requests import RequestsRepo
from tgbot.dialogs.getters import get_houses, get_building_name, get_all_surveys, get_survey_date
from tgbot.dialogs.states import AdminStates, Buildings, Survey
from tgbot.utils.generate_links import generate_random_deep_link


async def update_house_id(
        callback: CallbackQuery, select: Select,
        manager: DialogManager, item_id: str):
    manager.dialog_data.update(building_id=item_id)
    await manager.next()


async def update_poll_type(
        callback: CallbackQuery, select: Select,
        manager: DialogManager, item_id: str):
    manager.dialog_data.update(poll_type=item_id)
    await manager.next()


async def create_survey(
        callback: CallbackQuery, button: Button,
        manager: DialogManager, **kwargs):
    bot: Bot = manager.middleware_data.get("bot")
    manager.show_mode = ShowMode.SEND
    repo: RequestsRepo = manager.middleware_data.get("repo")
    building_id = int(manager.dialog_data["building_id"])
    poll_type = manager.dialog_data["poll_type"]

    survey = await repo.survey.add_survey(building_id, poll_type)


    me = await bot.get_me()
    users = await repo.users.get_users()
    if users:
        new_users = generate_random_deep_link(users, me.username, survey, building_id)
        await repo.survey_feedback.bulk_update_deep_link(new_users)



    await callback.message.answer("Опитування створено!")
    await manager.done()


async def to_confirm_edit_survey(
        callback: CallbackQuery, select: Select,
        manager: DialogManager, item_id: str):
    manager.dialog_data.update(survey_id=item_id)
    await manager.next()


async def edit_status(
        callback: CallbackQuery, button: Button,
        manager: DialogManager, **kwargs
):
    manager.show_mode = ShowMode.SEND
    repo: RequestsRepo = manager.middleware_data.get("repo")
    survey_id = int(manager.dialog_data["survey_id"])
    await repo.survey.change_survey_status(survey_id)
    await callback.message.answer("Ви змінили статус опитування!")
    await manager.done()


admin_menu = Dialog(
    Window(
        Const("Виберіть дію:"),
        Start(
            Const("Створити опитування"),
            id="create_poll",
            state=Buildings.view
        ),
        Start(
            Const("Змінити статус опитування"),
            id="edit_poll",
            state=Survey.edit
        ),
        state=AdminStates.menu
    )
)

create_survey_dialog = Dialog(
    Window(
        Const("Оберіть будинок, для якого створити опитування:"),
        ScrollingGroup(
            Select(
                Format("Будинок {item.building_name}"),
                id="s_houses",
                item_id_getter=lambda item: item.building_id,
                items="buildings",
                on_click=update_house_id
            ),
            id="scroll_houses",
            width=2,
            height=5,
        ),
        Cancel(
            Const("Назад"),
            id="cancel",
        ),
        getter=get_houses,
        state=Buildings.view,
    ),
    Window(
        Const("Оберіть тип опитування"),
        Select(
            Format("{item}"),
            id="s_poll_type",
            items=["Співробітники", "Мешканці"],
            item_id_getter=lambda item: item,
            on_click=update_poll_type,
        ),
        Back(
            Const("Назад"),
            id="back",
        ),
        state=Buildings.poll,
    ),
    Window(
        Format(
            "Ви підтверджуєте створення опитування для будинку - <b>{building_name}</b>, типу - <b>{dialog_data[poll_type]}</b>?"),
        Button(Const("Підтвердити"), id="confirm", on_click=create_survey),
        Cancel(
            Const("Скасувати"),
            id="cancel",
        ),
        getter=get_building_name,
        state=Buildings.confirm,
    ),

)

edit_survey_dialog = Dialog(Window(
    Const("Оберіть опитування, яке потрібно деактивувати:"),
    ScrollingGroup(
        Select(
            Format(" {item[formatted_created_at]}"),
            id="s_surveys",
            item_id_getter=lambda item: item["survey_id"],
            items="surveys",
            on_click=to_confirm_edit_survey
        ),
        id="scroll_surveys",
        width=2,
        height=5,
    ),
    Cancel(
        Const("Назад"),
        id="cancel",
    ),
    getter=get_all_surveys,
    state=Survey.edit,
),
    Window(
        Format("Ви підтверджуєте деактивацію опитування {survey_date}? "),
        Button(Const("Підтвердити"), id="confirm", on_click=edit_status),
        Cancel(
            Const("Скасувати"),
            id="cancel",
        ),
        getter=get_survey_date,
        state=Survey.confirm,
    ),

)
