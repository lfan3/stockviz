from app.utils.logger import get_logger
from app.data_aquisition.yahoo_client import YahooFinanceClient
from app.data_aquisition.csv_client import CSVClient

logger = get_logger(__name__)
logger.info(f"data_init: {YahooFinanceClient}")
