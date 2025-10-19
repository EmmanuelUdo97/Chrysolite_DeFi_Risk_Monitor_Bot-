import requests
import os
from io import BytesIO
import matplotlib.pyplot as plt

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

# Map protocol symbols to emojis
COIN_EMOJIS = {
    "BTC": "₿",
    "ETH": "Ξ",
    "AAVE": "🅰️",
    "UNI": "🆄",
    "LINK": "🔗",
    "SNX": "⚡",
    # Add more coins here
}

# Determine severity and recommendation
def get_severity_info(risk_score):
    if risk_score >= 75:
        return "HIGH", "🔴", "Consider reducing exposure!"
    elif risk_score >= 40:
        return "MEDIUM", "🟡", "Monitor closely."
    else:
        return "LOW", "🟢", "Safe."

def send_telegram_alert(protocol):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram token or chat ID not set. Alert not sent.")
        return

    risk_score = protocol.get("risk_score", 0)
    timestamp = protocol.get("timestamp")
    symbol = protocol.get("symbol", "").upper()
    coin_emoji = COIN_EMOJIS.get(symbol, "🪙")

    # Determine severity & recommendation
    severity, severity_emoji, recommendation = get_severity_info(risk_score)

    # Trend indicator
    history = protocol.get("history", [])
    if len(history) >= 2:
        trend_emoji = "⬆️" if history[-1] > history[-2] else "⬇️" if history[-1] < history[-2] else "➖"
    else:
        trend_emoji = "➖"

    # Compose Telegram message
    message = (
        f"{severity_emoji} *DeFi Alert* {coin_emoji}\n"
        f"*Protocol:* {protocol.get('name')} ({symbol})\n"
        f"*Risk Score:* {risk_score} {trend_emoji}\n"
        f"*Severity:* {severity}\n"
        f"*Recommendation:* {recommendation}\n"
        f"*Timestamp:* {timestamp}"
    )

    volume = protocol.get("volume_history", [])

    try:
        if history:
            # Graph color based on severity
            color_map = {"HIGH": "red", "MEDIUM": "orange", "LOW": "green"}
            line_color = color_map[severity]

            # Generate mini graph
            plt.figure(figsize=(4,2))
            plt.plot(history, marker='o', color=line_color, label='Risk Score')
            if volume:
                plt.plot(volume, marker='x', color='blue', label='Volume')
            plt.title(f"{coin_emoji} {symbol} Risk & Volume")
            plt.tight_layout()

            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            plt.close()

            # Send photo with caption
            files = {'photo': ('graph.png', buf, 'image/png')}
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendPhoto"
            payload = {"chat_id": TELEGRAM_CHAT_ID, "caption": message, "parse_mode": "Markdown"}
            requests.post(url, data=payload, files=files)
        else:
            # Text-only fallback
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"}
            requests.post(url, json=payload)

        print(f"Telegram alert sent for {protocol.get('name')} ({severity})")
    except Exception as e:
        print(f"Error sending Telegram alert: {e}")


# -----------------------------
# Test block
# -----------------------------
if __name__ == "__main__":
    example_protocols = [
        {
            "name": "AAVE",
            "symbol": "AAVE",
            "risk_score": 78,
            "timestamp": "2025-10-18 16:45:00",
            "history": [70, 72, 75, 78],
            "volume_history": [10000, 12000, 11500, 13000]
        },
        {
            "name": "Ethereum",
            "symbol": "ETH",
            "risk_score": 55,
            "timestamp": "2025-10-18 16:50:00",
            "history": [50, 52, 54, 55],
            "volume_history": [20000, 21000, 21500, 22000]
        },
        {
            "name": "Bitcoin",
            "symbol": "BTC",
            "risk_score": 32,
            "timestamp": "2025-10-18 16:55:00",
            "history": [30, 31, 32, 32],
            "volume_history": [50000, 51000, 50500, 50800]
        }
    ]

    for protocol in example_protocols:
        send_telegram_alert(protocol)
