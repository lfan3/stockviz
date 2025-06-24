import yfinance as yf
import pandas as pd


class French_Stock:
    def get_cac40_stocks(self):
        cac40 = yf.Tickers("^FCHI").components
        french_stocks = []
        for ticker in cac40:
            try:
                info = yf.Ticker(ticker).info
                french_stocks.append(
                    {
                        "Symbol": ticker,
                        "Name": info.get("shortName", ""),
                        "Sector": info.get("sector", ""),
                        "Industry": info.get("industry", ""),
                        "MarketCap": info.get("marketCap", None),
                    }
                )
            except Exception as e:
                print(f"get_cac40_stocks error: {str(e)}")
                return {}

        return pd.DataFrame(french_stocks)


# fs = French_Stock()
# db = fs.get_cac40_stocks()
# print(db.head())

EUROPE = yf.Market("EUROPE")


# def get_french_stock(ticker, period="1d", start="2025-05-01"):
#     """
#     Get French stock data (`.PA` suffix for Euronext Paris)
#     Example tickers:
#     - "AIR.PA" (Airbus)
#     - "SAN.PA" (Sanofi)
#     - "TTE.PA" (TotalEnergies)
#     """
#     try:
#         stock = yf.Ticker(ticker)
#         df = stock.history(period=period, start=start)
#         return df[["Open", "High", "Low", "Close", "Volume"]]
#     except Exception as e:
#         print(f"Error fetching {ticker}: {str(e)}")
#         return None

# # Example usage
# airbus_data = get_french_stock("AIR.PA")
# print(airbus_data.head())
