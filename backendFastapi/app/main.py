from fastapi import FastAPI, HTTPException

# from services.fundamental.fundamental import Fundamental
from app.services import FinancialAnalysisFacade, PriceService, CSVImportStatusDatabaseService
from app.models import FundamentalMetrics
from fastapi.responses import JSONResponse

from app.utils.logger import setup_logging, get_logger

from fastapi.middleware.cors import CORSMiddleware


setup_logging()
logging = get_logger(__name__)

app = FastAPI(debug=True)

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/fundamental/{ticker}", response_model=FundamentalMetrics)
def read_fundamental_ratio(ticker: str) -> FundamentalMetrics:
    fa = FinancialAnalysisFacade()
    try:
        if not ticker or not ticker.strip():
            raise HTTPException(
                status_code=400, detail="Ticker symbol is required and cannot be empty"
            )
        # todo ticker init
        matrix = fa.full_analysis(ticker)
        if matrix is None:
            raise HTTPException(
                status_code=404, detail=f"Could not analyze ticker {ticker}"
            )
        logging.info("read_fundamental_ratio result %s", matrix)
        return matrix

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/fundamental/chinese/{ticker}")
def read_fundamental_ratio_cn(ticker: str):
    fa = FinancialAnalysisFacade()
    csv_status_table_service =  CSVImportStatusDatabaseService()
    try:
        if not ticker or not ticker.strip():
            raise HTTPException(
                status_code=400, detail="Ticker symbol is required and cannot be empty"
            )
        existes = csv_status_table_service.check_csv_status(ticker)
        print("exisit",existes)
        if existes:
            return fa.csv_result(ticker)
        else:
            return JSONResponse({
                "status_code":405, 
                "detail":"we have no this ticker's csv yet"
            }
                
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/price/{ticker}")
def down_load_daily_price(ticker: str):
    ps = PriceService(ticker)
    ps.get_daily_price()


