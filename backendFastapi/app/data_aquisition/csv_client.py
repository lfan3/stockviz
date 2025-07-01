from pathlib import Path
import pandas as pd
from app.models.fundamental_model import YearMetrics, FundamentalMetrics, CompanyInfo
from app.core import ROW_ALIASES_CN

from app.utils import get_logger


logger = get_logger(__name__)
data_aquisition_folder = Path(__file__).parent.parent.joinpath('data_pool')


class CSVClient:
    def __init__(self):
        pass
    def get_financial_data(self,ticker:int | str):
        try:
            filename = f"{str(ticker)}_main_report.csv"
            filePath = data_aquisition_folder.joinpath(filename)
            logger.info(f"xtl filepath: {filePath}")
            df =  pd.read_csv(filePath, sep=";")
            keys = ROW_ALIASES_CN.keys()
            # logger.info("colums", df.columns.to_list(), df['科目\时间'])
            df.set_index('科目\时间', inplace=True)
            df.rename(index=ROW_ALIASES_CN, inplace=True)
            logger.info("index", df.index.to_list())
            
            # data = data[["净资产收益率","净利润"]]
            # data.rename(columns=ROW_ALIASES_CN)
        except Exception as e:
            logger.error(f"get_financial_data {ticker} error: ", e)


