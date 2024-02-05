from sqlalchemy import ForeignKey, Boolean, true, String
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.database.models import Base
from infrastructure.database.models.base import TimestampMixin, int_pk, TableNameMixin


class Survey(Base, TimestampMixin, TableNameMixin):
    survey_id: Mapped[int_pk]
    building_id: Mapped[int] = mapped_column(ForeignKey('buildings.building_id'))
    opened: Mapped[bool] = mapped_column(
        Boolean, default=true()
    )
    survey_type: Mapped[str] = mapped_column(String(256))
