from app.data_aquisition import YahooFinanceClient
from pathlib import Path

analyse_folder = Path(__file__).parent.parent.parent.parent

class PriceService():
    def __init__(self, ticker):
        self.yhclient = YahooFinanceClient(ticker)
        self.ticker = ticker

    def get_daily_price(self, saveCsv=False):
        data = self.yhclient.get_price_data('1y','1d')
        data.reset_index("Date", inplace=True)
        data.columns = data.columns.droplevel(1)
        if saveCsv:
            data.to_csv(f"{analyse_folder}/analyse/price_{self.ticker}.csv", index=False)

        