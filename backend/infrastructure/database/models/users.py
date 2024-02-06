from typing import Optional

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.database.models import Base
from infrastructure.database.models.base import TimestampMixin, int_pk, TableNameMixin


class User(Base, TimestampMixin, TableNameMixin):
    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=False)
    telegram_id: Mapped[Optional[int]]

