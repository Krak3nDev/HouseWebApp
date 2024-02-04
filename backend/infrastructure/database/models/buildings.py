from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.database.models.base import int_pk, Base, TableNameMixin


class Building(Base, TableNameMixin):
    building_id: Mapped[int_pk]
    building_name: Mapped[str] = mapped_column(String(256))

