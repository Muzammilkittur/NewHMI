from fastapi import APIRouter
from ..config import PLC_IP, log_folder
from ..pycomm3trunk import PlcTruckConnection
from pydantic import BaseModel
from datetime import datetime
import os

router = APIRouter()

plc = PlcTruckConnection(PLC_IP, log_folder)


# --------------------------Get Alarms PLC----------------------------------------------------------------------------

alarm_timestamps = {}
alarm_log = []
previous_values = {}

# Function to load tag names, descriptions, and associated string tags from the text file
def load_tags(file_path):
    tags = {}
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split('|')
            tag = parts[0].strip() if len(parts) > 0 else ''
            description = parts[1].strip() if len(parts) > 1 else ''
            string_tag1 = parts[2].strip() if len(parts) > 2 else ''
            string_tag2 = parts[3].strip() if len(parts) > 3 else ''
            tags[tag] = {
                "description": description,
                "string_tag1": string_tag1,
                "string_tag2": string_tag2
            }
    return tags

# Path to the tags.txt file
file_path = os.path.join(os.path.dirname(__file__), 'tags.txt')
tag_descriptions = load_tags(file_path)

@router.get("/alarms")
def get_alarms():
    global previous_values
    
    for tag, info in tag_descriptions.items():
        value = plc.read(tag).value
        if tag not in previous_values:
            previous_values[tag] = value
        
        # Log the alarm only when the value changes from 0 to 1
        if value == 1 and previous_values[tag] == 0:
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            string_tag1 = info["string_tag1"]
            description = info["description"]
            string_tag2 = info["string_tag2"]
            
            if string_tag1:
                string_value1 = plc.read(string_tag1).value
                string_value2 = plc.read(string_tag2).value
                full_description = f"{string_value1 or ''} - {description} {string_value2 or ''}"
            else:
                full_description = description

            alarm_log.append({
                "tag": tag,
                "name": full_description,
                "timestamp": current_time
            })
        
        previous_values[tag] = value
    
    return alarm_log

@router.post("/clear_logs")
def clear_logs():
    global alarm_log, alarm_timestamps, previous_values
    alarm_log = []
    alarm_timestamps = {}
    previous_values = {tag: 0 for tag in tag_descriptions.keys()}
    return {"message": "Logs cleared"}


# --------------------------End - Alarms PLC----------------------------------------------------------------------------



