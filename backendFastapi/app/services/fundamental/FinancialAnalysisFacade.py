from app.data_aquisition import YahooFinanceClient
from app.models import FundamentalMetrics
from app.utils import RowManager, get_logger
from app.data_procesing import BalanceSheetCleanStrategy, DataCleaner, MetricsDataExtractor
from typing import Tuple, Optional

logger = get_logger(__name__)


class FinancialAnalysisFacade:
    def full_analysis(self, ticker: str) -> Optional[FundamentalMetrics]:
        logger.info("begin the FinancialAnalysisFacade.full_analysis")

        try:
            yhclient = YahooFinanceClient(ticker)
            balance_sheet, cashflow = yhclient.get_all_data(printCsv=True)
            info = yhclient.get_company_info()
            bs_row_manager = RowManager(balance_sheet)
            cf_row_manager = RowManager(cashflow)
            balance_sheet_cleaner_strategy = BalanceSheetCleanStrategy()
            dataCleaner = DataCleaner(balance_sheet_cleaner_strategy)
            balance_sheet_cleaned = dataCleaner.clean(balance_sheet, bs_row_manager)

            calculator = MetricsDataExtractor(
                bs_row_manager=bs_row_manager,
                cf_row_manager=cf_row_manager,
                cash_flow=cashflow,
                balance_sheet=balance_sheet_cleaned,
            )
            metrics = calculator.calculate_metrics_per_year()
            metrics_cat = calculator.transformer_to_metrics_per_caterogy(metrics)
            f_metrics = FundamentalMetrics(
                ticker=ticker,
                companyName=info.companyName,
                metrics=metrics,
                metrics_cat=metrics_cat,
            )
            logger.info("f_metrics %s: ", f_metrics)
            return f_metrics
        except Exception as err:
            logger.error(f"full_analysis error: {str(err)}")
            return None


# {'operating_self.cash_flow': -72638000.0, 'shares_outstanding': 49834983.0, 'stockholders_equity': 94528000.0, 'net_income': -23719000.0, 'current_assets': 57081000.0, 'current_liabilities': 81642000.0, 'inventory': 4000.0, 'total_liabilities': 121012000.0, 'total_debt': 75275000.0, 'total_assets': 215540000.0}


# statement = FinancialStatement(**extracted)
# return FinancialAnalyzer(statement).analyze()
