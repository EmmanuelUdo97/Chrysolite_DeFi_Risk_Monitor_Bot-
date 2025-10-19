from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import requests

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Global data storage
# -----------------------------
prices_data = {}
defi_data = []
alerts_data = []

# -----------------------------
# Helper functions
# -----------------------------
def fetch_prices():
    global prices_data
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        prices_data = requests.get(url).json()
    except Exception as e:
        prices_data = {"error": str(e)}

def fetch_defi_data():
    global defi_data
    try:
        url = "https://api.llama.fi/protocols"
        data = requests.get(url).json()
        # Keep only first 5 protocols as example
        defi_data = data[:5]
    except Exception as e:
        defi_data = [{"error": str(e)}]

def generate_alerts():
    global alerts_data
    # Example alert generation
    alerts_data = [
        {
            "name": "AAVE",
            "symbol": "AAVE",
            "risk_score": 35,
            "severity": "LOW",
            "history": [32, 34, 35, 36],
            "volume_history": [10000, 12000, 11500, 13000],
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        },
        {
            "name": "UNI",
            "symbol": "UNI",
            "risk_score": 78,
            "severity": "HIGH",
            "history": [70, 72, 75, 78],
            "volume_history": [5000, 6000, 5500, 6500],
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    ]

# -----------------------------
# API Endpoints
# -----------------------------
@app.get("/api/prices")
def get_prices():
    fetch_prices()
    return prices_data

@app.get("/api/defi-data")
def get_defi_data():
    fetch_defi_data()
    return defi_data

@app.get("/api/alerts")
def get_alerts():
    generate_alerts()
    return alerts_data

# -----------------------------
# Terminal printing for live monitoring
# -----------------------------
@app.on_event("startup")
def startup_event():
    fetch_prices()
    fetch_defi_data()
    generate_alerts()
    print("Prices:", prices_data)
    print("DeFi Data:", defi_data)
    print("Alerts:", alerts_data)
