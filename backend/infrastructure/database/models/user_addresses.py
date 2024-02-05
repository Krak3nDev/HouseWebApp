from typing import Optional

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.database.models import Base
from infrastructure.database.models.base import TimestampMixin, int_pk


class UserAdress(Base, TimestampMixin):
    __tablename__ = "user_addresses"
    address_id: Mapped[int_pk]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"))
    building_id: Mapped[int] = mapped_column(ForeignKey("buildings.building_id"))
    apartment_number: Mapped[Optional[str]] = mapped_column(String(256))
