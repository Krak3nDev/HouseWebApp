from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from aiogram_dialog import DialogManager, StartMode

from tgbot.dialogs.states import AdminStates
from tgbot.filters.admin import AdminFilter

admin_router = Router()
admin_router.message.filter(AdminFilter())


@admin_router.message(Command("menu"))
async def user_start(message: Message, dialog_manager: DialogManager):
    await dialog_manager.start(AdminStates.menu, mode=StartMode.RESET_STACK)
