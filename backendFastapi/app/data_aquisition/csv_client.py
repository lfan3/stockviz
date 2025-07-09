from pathlib import Path
import pandas as pd
from app.core import ROW_ALIASES_CN

from app.utils import get_logger


logger = get_logger(__name__)
data_aquisition_folder = Path(__file__).parent.parent.parent.joinpath('data','data_pool')
print("data_aqui", data_aquisition_folder)


class CSVClient:
    def __init__(self):
        pass
    def get_financial_data(self,ticker:int | str):
        try:
            filename = f"{str(ticker)}_main_report.csv"
            filePath = data_aquisition_folder.joinpath(filename)
            logger.info(f"xtl filepath: {filePath}")
            df =  pd.read_csv(filePath, sep=";")
            terms = list(ROW_ALIASES_CN.values())[:6]
            df.set_index('科目\时间', inplace=True)
            df.rename(index=ROW_ALIASES_CN, inplace=True)
            return df.loc[terms]        
        except Exception as e:
            logger.error(f"get_financial_data {ticker} error: ", e)


