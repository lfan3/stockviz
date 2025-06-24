## get started with uv

mkdir stock-scanner && cd stock-scanner
uv venv .venv # Create virtual environment
source .venv/bin/activate # On Windows: .venv\Scripts\activate
$ ruff format .

use pydantic for data type verification
uv pip install --force-reinstall -e . // reinstall with pyproject.toml

## project structure
- backendFastapi/ handle all uv functionalities
- backendFastapi/app handle all fastapi functionalities

## fastapi , run the command in app/ folder
uv add fastapi --extra standard
uv run fastapi dev

learn: isna vs
pd.isna(signle value)
for series
