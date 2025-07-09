from app.models import MetricsCategory
from app.utils.logger import get_logger
import pandas as pd
from typing import List

logging = get_logger(__name__)

class MetricsDataExtractorCn:
    def __init__(self, data:pd.DataFrame):
        self.data = data

    def transform_data(self)->List[MetricsCategory]:
        #todo: i do not have a better idee for -- any this moment, convert None to NaN
        self.data = self.data.replace({"%": "",",":".", "--":'0'}, regex=True).apply(pd.to_numeric, errors="coerce")
        # every season's data
        season_date = self.data.columns.to_list()
        roe = self.data.loc['roe'].to_list()
        eps = self.data.loc['eps'].to_list()
        operatingCashFlowPerShare = self.data.loc['operatingCashFlowPerShare'].to_list()
        grossProfit = self.data.loc['grossProfit'].to_list()
        currentRatio = self.data.loc['currentRatio'].to_list()
        liabilitiesAssetRatio = self.data.loc['liabilitiesAssetRatio'].to_list()

        years = [date for date in season_date if '-12-' in date]
        roe_y = self.data.loc['roe'][years].to_list()
        eps_y = self.data.loc['eps'][years].to_list()
        operatingCashFlowPerShare_y = self.data.loc['operatingCashFlowPerShare'][years].to_list()
        grossProfit_y = self.data.loc['grossProfit'][years].to_list()
        currentRatio_y = self.data.loc['currentRatio'][years].to_list()
        liabilitiesAssetRatio_y = self.data.loc['liabilitiesAssetRatio'][years].to_list()
        print("year",season_date)
        # the number is in %
        yearCatMetrics =  MetricsCategory(
            time=years,
            timeType='year',
            roe=roe_y,
            eps=eps_y,
            grossProfit=grossProfit_y,
            operatingCashFlowPerShare=operatingCashFlowPerShare_y,
            currentRatio=currentRatio_y,
            liabilitiesAssetRatio=liabilitiesAssetRatio_y,
        )

        seasonMetrics = MetricsCategory(
            time=season_date,
            timeType= 'season',
            roe=roe,
            eps=eps,
            grossProfit=grossProfit,
            operatingCashFlowPerShare=operatingCashFlowPerShare,
            currentRatio=currentRatio,
            liabilitiesAssetRatio=liabilitiesAssetRatio,
        )

        return [yearCatMetrics, seasonMetrics]


    