import os

PLC_IP = '127.0.0.1/2'
# PLC_IP = '192.168.1.10/0'
# PLC_IP = '192.168.2.252/2'

log_folder = "C:/HMI_datalog"
if not os.path.exists(log_folder):
    os.makedirs(log_folder)
