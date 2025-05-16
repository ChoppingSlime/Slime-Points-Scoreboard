import json
import sys
from pathlib import Path

DATA_FILE = Path("data.json")

def load_data():
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

def update_score(name, delta):
    data = load_data()
    for entry in data:
        if entry["name"].lower() == name.lower():
            entry["points"] += delta
            break
    else:
        data.append({"name": name, "points": delta})
    data.sort(key=lambda x: -x["points"])
    save_data(data)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: update_score.py [+/-points] Name")
        sys.exit(1)

    try:
        points = int(sys.argv[1])
        name = sys.argv[2]
        update_score(name, points)
        print(f"Updated {name}'s score by {points}.")
    except ValueError:
        print("Invalid number format for points.")
        sys.exit(1)
