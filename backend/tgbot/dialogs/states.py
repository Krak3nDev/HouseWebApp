from aiogram.fsm.state import StatesGroup, State


class AdminStates(StatesGroup):
    menu = State()


class Buildings(StatesGroup):
    view = State()
    poll = State()
    confirm = State()


class Survey(StatesGroup):
    edit = State()
    confirm = State()