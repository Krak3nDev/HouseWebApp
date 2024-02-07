import base64
import secrets
import string
from typing import Sequence

from sqlalchemy import RowMapping


def generate_random_deep_link(users: Sequence[RowMapping], bot_username: str, survey_id: int, building_id: int) -> list[dict[str, str]]:
    base_url = ""
    max_length = 64
    links = []
    alphabet = string.ascii_letters + string.digits

    random_part_length = max_length - len(base_url)

    for user in users:
        token = ''.join(secrets.choice(alphabet) for _ in range(random_part_length))

        deep_link = base_url + token
        links.append({
            'user_id': user['user_id'],
            'deep_url': deep_link,
            'survey_id': survey_id,
            'building_id': building_id
        })

    return links