from pydantic import BaseModel, Field


class YearMetrics(BaseModel):
    year: int = Field(..., description="Year of the financial metrics")
    roe: float = Field(0.0, description="Return on equity for the year")
    debtAssetRatio: float = Field(0.0, description="Debt to asset ratio for the year")
    currentRatio: float = Field(0.0, description="Current ratio for the year")
    quickRatio: float = Field(0.0, description="Quick ratio for the year")
    operatingCashFlowPerShare: float = Field(
        0.0, description="Operating cash flow per share for the year"
    )
    liabilitiesAssetRatio: float = Field(
        0.0, description="Liabilities to asset ratio for the year"
    )


class MetricsCategory(BaseModel):
    """
    A collection of financial metrics organized by year.
    Each field contains a list of annual values in chronological order.
    """

    roe: list[float] = Field(
        ...,
        description="list of Return on Equity values (Net income/Shareholders' equity) as percentages",
    )
    debtAssetRatio: list[float] = Field(
        ...,
        description="list of Debt-to-Asset ratios (Total debt/Total assets) as decimals",
    )
    currentRatio: list[float] = Field(
        ..., description="list of Current ratios (Current assets/Current liabilities)"
    )
    quickRatio: list[float] = Field(
        ...,
        description="list of Quick ratios ((Current assets - Inventory)/Current liabilities)",
    )
    operatingCashFlowPerShare: list[float] = Field(
        ...,
        description="list of Operating cash flow per share values (Operating cash flow/Outstanding shares)",
    )
    liabilitiesAssetRatio: list[float] = Field(
        ...,
        description="list of Liabilities-to-Asset ratios (Total liabilities/Total assets) as decimals",
    )
    year: list[int] = Field(
        ..., description="list of fiscal years corresponding to the metric values"
    )


class FundamentalMetrics(BaseModel):
    ticker: str = Field(..., description="Stock ticker symbol")
    companyName: str = Field(..., description="Name of the company")
    metrics: list[YearMetrics] = Field(
        ..., description="list of financial metrics for each year"
    )
    metrics_cat: MetricsCategory = Field(
        ..., description="financial metrics for each category"
    )

    # Adds example data to the OpenAPI/Swagger documentation (useful for FastAPI).
    class Config:
        json_schema_extra = {
            "example": {
                "ticker": "AAPL",
                "companyName": "Apple Inc.",
                "metrics": [
                    {
                        "year": 2023,
                        "totalAssets": 351.00,
                        "totalLiabilities": 287.91,
                        "debtAssetRatio": 0.82,
                        "currentRatio": 1.07,
                        "quickRatio": 0.88,
                        "operatingCashFlowPerShare": 5.67,
                    }
                ],
                "metrics_cat": {
                    "roe": [12.5, 14.2, 15.7],
                    "debtAssetRatio": [0.42, 0.38, 0.35],
                    "currentRatio": [1.8, 1.9, 2.1],
                    "quickRatio": [1.2, 1.3, 1.4],
                    "operatingCashFlowPerShare": [3.50, 3.75, 4.20],
                    "liabilitiesAssetRatio": [0.55, 0.52, 0.50],
                    "year": [2020, 2021, 2022],
                },
            }
        }


class CompanyInfo(BaseModel):
    companyName: str = Field(..., description="Name of the company")
