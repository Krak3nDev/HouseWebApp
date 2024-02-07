from typing import Sequence

from sqlalchemy import select, RowMapping

from infrastructure.database.models import User
from infrastructure.database.repo.base import BaseRepo


class UserRepo(BaseRepo):
    async def get_users(self) -> Sequence[RowMapping]:
        statement = select(User.user_id)
        result = await self.session.execute(statement)
        return result.mappings().all()
