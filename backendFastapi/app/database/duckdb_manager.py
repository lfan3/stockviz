from typing import Optional, Any, Dict, List
import duckdb
from datetime import datetime
import pandas as pd
from contextlib import contextmanager
from pathlib import Path
from app.utils import get_logger


mainDB = Path(__file__).parent.parent.parent / "data" / "main.duckdb"
logger = get_logger(__name__)


class DuckDBManager:
    def __init__(self, database: str = str(mainDB), read_only:bool= False):
        self.database = database
        self.read_only = read_only

    @contextmanager
    def _get_database(self):
        """Yield a connection with automatic cleanup."""
        conn = duckdb.connect(database=self.database, read_only=self.read_only)
        try:
            yield conn
        finally:
            conn.close()

    def execute(self, query:str, params: Optional[dict]=None)->duckdb.DuckDBPyConnection:
        with self._get_database() as conn:
            return conn.execute(query, parameters=params or {}).fetch_df()
    # condition = "id = %(id)s AND status = %(status)s"
    # condition_params = {"id": 123, "status": "active"}
    def clear_all_tables(self):
        #  -- Excludes views/system tables
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema='main' AND table_type='BASE TABLE'"
        with self._get_database() as conn:
            tables = conn.execute(query).fetch_df()
            for table in tables['table_name']:
                logger.info(f"delete talbe {table}")
                conn.execute(f"DROP TABLE IF EXISTS {table}")

    def delete_table(self, table:str):
        query = f"DROP TABLE IF EXISTS {table}"
        with self._get_database() as conn:
            conn.execute(query)

    def update(self,table:str, updates:Dict[str, any], condition:str, condition_params:Optional[Dict]=None, return_updated:bool=False)->Optional[pd.DataFrame]:
        updatetime = datetime.now()
        updates['updatetime'] = updatetime

        set_clause = ",".join([f"{k} = %({k})" for k in updates.keys()])
        query = f"""
            UPDATE {table} 
            SET {set_clause}
            WHERE {condition}
        """
        # new
        with self._get_database() as conn:
            result = conn.execute(
                query,
                parameters={**updates, **condition_params}
            )
            return result.fetch_df() if return_updated else None

    
    
