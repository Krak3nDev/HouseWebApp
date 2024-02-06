from .admin import admin_router
from .user import user_router

routers_list = [user_router, admin_router]