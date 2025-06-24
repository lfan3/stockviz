import pandas as pd
from .base_clean_strategy import CleaningStrategy
from app.core import ROW_ALIASES
from app.utils.logger import get_logger
from app.utils import RowManager


logger = get_logger(__name__)


class BalanceSheetCleanStrategy(CleaningStrategy):
    """
    Abstract class for balance sheet cleaning strategies.
    """

    def execute(self, data: pd.DataFrame, row_manager: RowManager) -> pd.DataFrame:
        """
        Clean financial data by removing empty columns.

        Args:
            balance_sheet: Raw balance sheet data

        Returns:
            pd.DataFrame: Cleaned balance sheet
        """

        shares_outstanding = row_manager.get_metric_name(
            ROW_ALIASES["shares_outstanding"]
        )
        stockholders_equity = row_manager.get_metric_name(
            ROW_ALIASES["stockholders_equity"]
        )

        empty_year_col = [
            col
            for col in data.columns
            if (
                pd.isna(pd.to_numeric(data.loc[stockholders_equity, col]))
                or pd.isna(pd.to_numeric(data.loc[shares_outstanding, col]))
            )
        ]

        extra = data.loc[[shares_outstanding, stockholders_equity]]
        print("ex", extra)
        logger.info("empty cols %s", empty_year_col)

        clean_balance_sheet = data.drop(columns=empty_year_col)
        logger.info("not empty cols %s", clean_balance_sheet.columns)

        return clean_balance_sheet
