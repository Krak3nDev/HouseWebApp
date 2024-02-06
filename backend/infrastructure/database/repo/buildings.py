from typing import Sequence

from sqlalchemy import Select

from infrastructure.database.models import Building
from infrastructure.database.repo.base import BaseRepo


class BuildingRepo(BaseRepo):
    async def get_buildings(self) -> Sequence[Building]:
        statement = Select(Building)
        result = await self.session.execute(statement)
        return result.scalars().all()

    async def get_building_name(self, building_id: int) -> str:
        statement = Select(
            Building.building_name
        ).where(Building.building_id == building_id)
        result = await self.session.execute(statement)
        return result.scalar_one()


