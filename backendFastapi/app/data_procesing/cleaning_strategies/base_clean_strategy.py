import pandas as pd
from abc import ABC, abstractmethod
from typing import Dict, Any
from app.utils import RowManager


class CleaningStrategy:
    """Abstract base class for all data cleaning strategies."""

    @abstractmethod
    def execute(self, data: pd.DataFrame, row_manager: RowManager) -> pd.DataFrame:
        """Clean and transform sheet data.

        Args:
            data: Raw sheet DataFrame
            row_manager: Helper for row operations

        Returns:
            Cleaned DataFrame
        """
        pass
