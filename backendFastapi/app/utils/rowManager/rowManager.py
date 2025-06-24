from typing import List
import pandas as pd
from app.utils.logger import get_logger

logger = get_logger(__name__)


class RowManager:
    """
    Manages row names in DataFrame, allowing for flexible matching of financial metrics.
    """

    def __init__(self, df: pd.DataFrame = None):
        """
        Initialize with a dictionary of row aliases.

        Args:
            row_aliases: Dictionary mapping metric names to lists of possible row names
        """
        self.df = df
        if df is None:
            logger.error("Forget to pass the DataFrame to RowManager")

    def get_metric_name(self, indexList: List[str]) -> str:
        logger.info("call get_metric_name indexList %s", indexList)
        try:
            for index in indexList:
                exact_matches = self.df.index[self.df.index == index]

                if not exact_matches.empty:
                    match = exact_matches[0]
                    logger.info(f"Found exact match: {match}")
                    return match
                partial_matches = self.df.index[
                    self.df.index.str.contains(index, case=False)
                ]
                logger.info("macth", partial_matches)

                if not partial_matches.empty:
                    match = partial_matches[0]
                    logger.info(f"Found partial match: '{index}' in '{match}'")
                    return match
            raise KeyError(
                f"Could not find any of: {', '.join(indexList)} in DataFrame index"
            )
        except Exception as err:
            logger.error("some error ", str(err))
