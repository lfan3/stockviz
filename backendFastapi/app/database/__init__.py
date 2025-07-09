from .duckdb_manager import DuckDBManager
from .scripts import sql_create_table_cn_com_imp_status, sql_create_table_companies_group, table_companies_group,table_cn_company_import_status

def init_db():
    dbManager = DuckDBManager()
    dbManager.clear_all_tables()
    dbManager.execute(sql_create_table_companies_group)

# init_db()