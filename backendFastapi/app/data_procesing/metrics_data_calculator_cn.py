from app.utils.logger import get_logger
from app.models import YearMetrics, MetricsCategory
import pandas as pd



logging = get_logger(__name__)


class MetricsDataExtractor:
    def __init__(self, sheet:pd.DataFrame):
        self.sheet = sheet
    def transform_data(self):
        self.sheet
        years = self.sheet.columns

        print("year", years)
    