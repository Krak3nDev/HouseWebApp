from typing import AsyncGenerator

from environs import Env

from config import Config, DbConfig, load_config
from infrastructure.database.repo.requests import RequestsRepo
from infrastructure.database.setup import create_engine, create_session_pool

config: Config = load_config()

env = Env()
env.read_env()
db_config = DbConfig.from_env(env)

engine = create_engine(db_config)
session_pool = create_session_pool(engine)


async def get_repo() -> AsyncGenerator:
    async with session_pool() as session:
        yield RequestsRepo(session)
