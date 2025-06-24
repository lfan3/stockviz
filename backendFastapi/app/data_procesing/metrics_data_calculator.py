from numpy import integer
from app.core import ROW_ALIASES
from app.utils.logger import get_logger
from app.models import YearMetrics, MetricsCategory

logging = get_logger(__name__)


class MetricsDataExtractor:
    def __init__(self, bs_row_manager, cf_row_manager, cash_flow, balance_sheet):
        if not bs_row_manager:
            raise ValueError("bs_row_manager is nessaisary")
        if not cf_row_manager:
            raise ValueError("cf_row_manager is nessaisary")
        if cash_flow.empty:
            raise ValueError(" cash_flow is nessaisary")
        if balance_sheet.empty:
            raise ValueError("balance_sheet is nessaisary")
        self.bs_row_manager = bs_row_manager
        self.cf_row_manager = cf_row_manager
        self.cash_flow = cash_flow
        self.balance_sheet = balance_sheet

    def _calculate_metrics_for_year(
        self,
        year: str,
    ):
        # 3. Calculate metrics with safety checks
        year_int = int(str(year).split("-")[0])
        year_metrics = {"year": year_int}  # Cash flow per share

        logging.info(f"Processing year: {year_int}")
        try:
            keys = {
                "shares_outstanding": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["shares_outstanding"]
                ),
                "stockholders_equity": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["stockholders_equity"]
                ),
                "current_assets": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["current_assets"]
                ),
                "current_liabilities": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["current_liabilities"]
                ),
                "inventory": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["inventory"]
                ),
                "total_liabilities": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["total_liabilities"]
                ),
                "total_debt": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["total_debt"]
                ),
                "total_assets": self.bs_row_manager.get_metric_name(
                    ROW_ALIASES["total_assets"]
                ),
                "net_income": self.cf_row_manager.get_metric_name(
                    ROW_ALIASES["net_income"]
                ),
                "operating cash flow": self.cf_row_manager.get_metric_name(
                    ROW_ALIASES["operating cash flow"]
                ),
            }
            logging.info("keys for metrics %s", keys)

            data = {
                "operating_self.cash_flow": self.cash_flow.loc[
                    keys["operating cash flow"], year
                ],
                "shares_outstanding": self.balance_sheet.loc[
                    keys["shares_outstanding"], year
                ],
                "stockholders_equity": self.balance_sheet.loc[
                    keys["stockholders_equity"], year
                ],
                "net_income": self.cash_flow.loc[keys["net_income"], year],
                "current_assets": self.balance_sheet.loc[keys["current_assets"], year],
                "current_liabilities": self.balance_sheet.loc[
                    keys["current_liabilities"], year
                ],
                "inventory": self.balance_sheet.loc[keys["inventory"], year],
                "total_liabilities": self.balance_sheet.loc[
                    keys["total_liabilities"], year
                ],
                "total_debt": self.balance_sheet.loc[keys["total_debt"], year],
                "total_assets": self.balance_sheet.loc[keys["total_assets"], year],
            }
            logging.info("data for metrics %d, %s", year_int, data)
            if data["shares_outstanding"] != 0:
                year_metrics["operatingCashFlowPerShare"] = (
                    data["operating_self.cash_flow"] / data["shares_outstanding"]
                )
            else:
                year_metrics["operatingCashFlowPerShare"] = 0
                logging.error(
                    f"⚠️ Shares outstanding is zero in {year}, cannot calculate operating cash flow per share"
                )
            if data["stockholders_equity"] != 0:
                year_metrics["roe"] = data["net_income"] / data["stockholders_equity"]
            else:
                year_metrics["roe"] = 0
                logging.error(
                    f"⚠️ Stockholders equity is zero in {year}, cannot calculate roe"
                )  # Liquidity ratios
            if data["current_liabilities"] != 0:
                year_metrics["currentRatio"] = (
                    data["current_assets"] / data["current_liabilities"]
                )
                year_metrics["quickRatio"] = (
                    data["current_assets"] - data["inventory"]
                ) / data["current_liabilities"]
            else:
                year_metrics["currentRatio"] = 9999.99
                year_metrics["quickRatio"] = 9999.99

            # Leverage ratios
            if data["total_assets"] != 0:
                year_metrics["debtAssetRatio"] = (
                    data["total_debt"] / data["total_assets"]
                )
                year_metrics["liabilitiesAssetRatio"] = (
                    data["total_liabilities"] / data["total_assets"]
                )
            else:
                year_metrics["debtAssetRatio"] = 9999.99
                year_metrics["liabilitiesAssetRatio"] = 9999.99
                logging.error(
                    f"⚠️ Total assets is zero  in {year}, cannot calculate debt and liabilities to asset ratios"
                )
            # Simple metrics
            # year_metrics["netIncome"] = data["net_income"]
            logging.info("year_metrics %s", year_metrics)

            year_metrics_model = YearMetrics(**year_metrics)
            return year_metrics_model
        except KeyError as e:
            logging.error(f"⚠️ Missing data for {year_int}: {str(e)}")
        except ZeroDivisionError:
            logging.error(f"⚠️ Division by zero for {year_int}")

    def calculate_metrics_per_year(self):
        # Chain of Responsibility pattern to find matching keys
        logging.info(f"bs first year: {self.balance_sheet.columns[1]}")
        # use bs year data, it is possible that cashflow has no corresponding year's data

        metrics: list[YearMetrics] = []
        for year_timestamp in self.balance_sheet.columns:
            if year_timestamp not in self.cash_flow:
                raise ValueError(f"{str(year_timestamp)} does not exists in cashflow")
            year_metric_model = self._calculate_metrics_for_year(year_timestamp)
            metrics.append(year_metric_model)

        logging.info("metrics %s", metrics)

        return metrics

    def transformer_to_metrics_per_caterogy(self, metrics_per_year) -> MetricsCategory:
        roe: list[float] = []
        debtAssetRatio: list[float] = []
        currentRatio: list[float] = []
        quickRatio: list[float] = []
        operatingCashFlowPerShare: list[float] = []
        liabilitiesAssetRatio: list[float] = []
        year: list[int] = []

        logging.info("metrics_per_year", metrics_per_year)

        for metric in metrics_per_year:
            year.append(metric.year)
            roe.append(metric.roe)
            debtAssetRatio.append(metric.debtAssetRatio)
            currentRatio.append(metric.currentRatio)
            quickRatio.append(metric.quickRatio)
            operatingCashFlowPerShare.append(metric.operatingCashFlowPerShare)
            liabilitiesAssetRatio.append(metric.liabilitiesAssetRatio)

        return MetricsCategory(
            year=year,
            roe=roe,
            debtAssetRatio=debtAssetRatio,
            currentRatio=currentRatio,
            quickRatio=quickRatio,
            operatingCashFlowPerShare=operatingCashFlowPerShare,
            liabilitiesAssetRatio=liabilitiesAssetRatio,
        )
