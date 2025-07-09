# only for chineses stock
table_cn_company_import_status = "cn_company_import_status"
table_companies_group = "companies_group"

# todo: ticker should be unique + sequence

sql_create_table_cn_com_imp_status = f"""
    CREATE SEQUENCE IF NOT EXISTS id_sequence;
    CREATE TABLE IF NOT EXISTS {table_cn_company_import_status} (
    id INTEGER DEFAULT nextval('id_sequence') PRIMARY KEY,
    ticker VARCHAR UNIQUE,
    createtime TIMESTAMP DEFAULT current_timestamp,
    updatetime TIMESTAMP DEFAULT current_timestamp
    )
"""
# mix for chinese and other countries, for traking the last visited companis and also for grouping the company and give some commoent on certain companies
sql_create_table_companies_group = f"""
    CREATE SEQUENCE IF NOT EXISTS id_serial;
    CREATE TABLE IF NOT EXISTS {table_companies_group}(
        id INTEGER DEFAULT nextval('id_serial') PRIMARY KEY,
        ticker VARCHAR UNIQUE,
        companyname VARCHAR(20),
        groupname VARCHAR(20),
        comments VARCHAR,
        createtime TIMESTAMP DEFAULT current_timestamp,
        updatetime TIMESTAMP DEFAULT current_timestamp
    )
"""

