import logging
from pathlib import Path
from .config import LOGGING_CONFIG


def setup_logging():
    try:
        log_dir = Path(__file__).parent.parent.parent / "logs"
        # if logs folder already exist, do nothing, if it does not exit, create a new folder
        log_dir.mkdir(exist_ok=True)
        # Apply config
        logging.config.dictConfig(LOGGING_CONFIG)
    except PermissionError as e:
        print(f"Permission denied for logs directory: {log_dir}")
        # Fallback to console-only logging
        LOGGING_CONFIG["loggers"][""]["handlers"] = ["console"]
        logging.config.dictConfig(LOGGING_CONFIG)
    except Exception as e:
        print(f"Failed to configure logging: {str(e)}")
        raise


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger()
