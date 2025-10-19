from datetime import datetime

def calculate_risk_score(protocol):
    """
    Calculate risk score based on history and volume.
    Example logic: average of last 3 scores + volume impact
    """
    history = protocol.get("history", [])
    volume_history = protocol.get("volume_history", [])
    
    if not history or not volume_history:
        return 0  # Default risk score
    
    avg_score = sum(history[-3:]) / min(len(history[-3:]), 3)
    volume_factor = 0
    
    # If latest volume is much higher than average, increase risk slightly
    if len(volume_history) >= 2:
        avg_volume = sum(volume_history[:-1]) / max(len(volume_history[:-1]), 1)
        latest_volume = volume_history[-1]
        if latest_volume > 1.2 * avg_volume:
            volume_factor = 5
    
    risk_score = int(avg_score + volume_factor)
    risk_score = min(max(risk_score, 0), 100)  # Clamp between 0-100
    return risk_score

def determine_severity(risk_score):
    if risk_score >= 75:
        return "HIGH"
    elif risk_score >= 40:
        return "MEDIUM"
    else:
        return "LOW"

# -----------------------------
# Test block
# -----------------------------
if __name__ == "__main__":
    # Example protocol
    example_protocol = {
        "name": "AAVE",
        "symbol": "AAVE",
        "history": [32, 34, 35, 36],
        "volume_history": [10000, 12000, 11500, 13000]
    }

    score = calculate_risk_score(example_protocol)
    severity = determine_severity(score)
    print(f"Protocol: {example_protocol['name']}")
    print(f"Risk Score: {score}")
    print(f"Severity: {severity}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
