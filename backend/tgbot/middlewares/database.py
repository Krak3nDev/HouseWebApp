from typing import Callable, Dict, Any, Awaitable

from aiogram import BaseMiddleware
from aiogram.types import Update

from infrastructure.database.repo.requests import RequestsRepo


class DatabaseMiddleware(BaseMiddleware):
    def __init__(self, session_pool) -> None:
        self.session_pool = session_pool

    async def __call__(
        self,
        handler: Callable[[Update, Dict[str, Any]], Awaitable[Any]],
        event: Update,
        data: Dict[str, Any],
    ) -> Any:
        async with self.session_pool() as session:
            repo = RequestsRepo(session)
            event_from_user = data.get("event_from_user")
            if not event_from_user:
                return await handler(event, data)

            data["repo"] = repo

            result = await handler(event, data)
        return result