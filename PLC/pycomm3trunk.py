from pycomm3 import LogixDriver
import threading
import time
import os
import csv


class PlcTruckConnection:
    """
    Class which managing communication between a PLC and HMI
    """

    def __init__(self, plc_ip, log_folder_path) -> None:
        self.ip = plc_ip
        self.plc = None
        self.max_time_reconnection = 0
        self.plc = LogixDriver(self.ip)
        self.plc.open()
        self.lock = threading.Lock()
        self.last_val = {}
        self.plc_read_log = f"{log_folder_path}/plc_read_log.csv"
        self.plc_write_log = f"{log_folder_path}/plc_write_log.csv"

    def reconnect(self):
        start_time = time.time()
        attemps_plc_reconnection = 0
        while True:
            
            try:
                self.plc = LogixDriver(self.ip)
                self.plc.open()
                end_time = time.time()
                elapsed_time = end_time - start_time
                if elapsed_time > self.max_time_reconnection:
                    self.max_time_reconnection = round(elapsed_time, 1)
                print(
                    f"PLC reconnected , No.of attemps = {attemps_plc_reconnection}, Time taken for reconnection = {round(elapsed_time, 1)}"
                )
                # print("Max Reconnection time: ", self.max_time_reconnection)
                # print("Attemps_plc_reconnection: ", attemps_plc_reconnection)
                break
            except Exception as err:
                print(f"PLC Reconnection failed: {str(err)}. Retrying.....")
                attemps_plc_reconnection += 1

    def read(self, tag):
        try:
            with self.lock:
                val = self.plc.read(tag)
            if (tag not in self.last_val) or (self.last_val[tag] != val.value):
                self.last_val[tag] = val.value
                self.log_plc_read(tag, val.value)
            return val
        except Exception as err:
            print(f"Error: {str(err)}")
            self.reconnect()

    def write(self, *tags):
        try:
            with self.lock:
                self.plc.write(*tags)
            try:
                for tag, value in tags:
                    self.log_plc_write(tag, value)
            except ValueError:
                if len(tags) == 2:
                    self.log_plc_write(tags[0], tags[1])
        except Exception as err:
            print(f"Error: {str(err)}")
            self.reconnect()
            self.write(*tags)

    def log_plc_read(self, tag, value):
        log = {
            "Time": time.time(),
            "tag": tag,
            "Value": value
        }
        is_new_file = not os.path.exists(self.plc_read_log)
        with open(self.plc_read_log, 'a', newline='') as csvfile:
            fieldnames = log.keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if is_new_file:
                writer.writeheader()
            writer.writerow(log)

    def log_plc_write(self, tag, value):
        log = {
            "Time": time.time(),
            "tag": tag,
            "Value": value
        }
        is_new_file = not os.path.exists(self.plc_write_log)
        with open(self.plc_write_log, 'a', newline='') as csvfile:
            fieldnames = log.keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if is_new_file:
                writer.writeheader()
            writer.writerow(log)
