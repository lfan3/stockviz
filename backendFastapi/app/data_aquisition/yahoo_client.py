from pathlib import Path
import yfinance as yf
import pandas as pd
from app.models.fundamental_model import YearMetrics, FundamentalMetrics, CompanyInfo
from app.utils import get_logger


logger = get_logger(__name__)
data_aquisition_folder = Path(__file__).parent


class YahooFinanceClient:
    def __init__(self, ticker):
        self.ticker = ticker
        self.ticker_obj = yf.Ticker(ticker)

    def _get_balance_sheet(self):
        logger.info("get_balance_sheet")
        return self.ticker_obj.balance_sheet

    def _get_cash_flow(self):
        logger.info("get_cash_flow")

        return self.ticker_obj.cashflow

    def get_company_info(self) -> CompanyInfo:
        logger.info("get compoany info %s", self.ticker_obj.info)

        return CompanyInfo(companyName=self.ticker_obj.info.get("longName", "N/A"))

    def get_financial_data(self, printCsv=True) -> tuple[pd.DataFrame, pd.DataFrame]:
        """
        Fetches financial data for a given ticker from Yahoo Finance.

        Args:
            ticker (str): Stock ticker symbol.

        Returns:
            pd.DataFrame: DataFrame containing financial data.
        """
        try:
            balance_sheet = self._get_balance_sheet()
            cash_flow = self._get_cash_flow()

            if balance_sheet.empty:
                raise ValueError(
                    f"No balance_sheet data found for ticker: {self.ticker}"
                )
            if cash_flow.empty:
                raise ValueError(f"No cash_flow data found for ticker: {self.ticker}")
            if printCsv:
                cash_flow.to_csv(
                    f"{data_aquisition_folder}/cash_flow_{self.ticker}.csv"
                )
                balance_sheet.to_csv(
                    f"{data_aquisition_folder}/balance_sheet_{self.ticker}.csv"
                )

            return balance_sheet, cash_flow
        except Exception as e:
            logger.error(f"Error fetching data for {self.ticker}: {e}")
            raise e

    def get_price_data(self, period, interval, progress=False):
        try:
            data = yf.download(
                tickers=self.ticker,
                period=period,  # 1d, 5d, 1mo, 1y, max
                interval=interval,  # 1m, 1h, 1d, 1wk
                progress=progress,  # Disable progress bar
            )
            # data.to_csv(f"{data_aquisition_folder}/price_{self.ticker}_daily.csv")
            return data
        except Exception as e:
            logger.error(f"get_price_data error for {self.ticker}: {e}")

