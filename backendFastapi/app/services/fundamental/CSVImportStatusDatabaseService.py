from duckdb import table
from app.database import DuckDBManager,sql_create_table_cn_com_imp_status, table_cn_company_import_status  # Adjust import path as needed
from pathlib import Path

mainDB = Path(__file__).parent.parent.parent / "data" / "main.duckdb"

class CSVImportStatusDatabaseService:
    def __init__(self, db_manager: DuckDBManager = None):
        """
        Initialize with optional DuckDBManager dependency.
        Creates default manager if none provided.
        """
        self.db_manager = db_manager or DuckDBManager()
  
    def check_csv_status(self, ticker:str)->bool:
        params = {
            'ticker': ticker
        }
        query = f"""
        SELECT EXISTS (
            SELECT 1 FROM {table_cn_company_import_status}  WHERE ticker = $ticker
        ) AS ticker_exists
        """
      
        result = self.db_manager.execute(query, params)

        return result['ticker_exists'].iloc[0]

