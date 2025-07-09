from app.database.duckdb_manager import DuckDBManager

class DBClient:
    def __init__(self, dbManger):
        self.dbManager = dbManger

    def check_ticker_existance(self, ticker)->bool:
        query ="""
            SELECT id from cn_company_import_status
            WHERE ticker=%(ticker)
        """
        params = {
            ticker: ticker
        }
        self.dbManager.execute(query, params)
