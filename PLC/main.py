from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import PLC_IP, log_folder
from .routes import main_page, manual_page, alarms_page, diagnostic_page, settings_page

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(main_page.router)
app.include_router(manual_page.router)
app.include_router(diagnostic_page.router)
app.include_router(alarms_page.router)
app.include_router(settings_page.router)
