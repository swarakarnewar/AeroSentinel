from pymavlink import mavutil
import time

connection = mavutil.mavlink_connection(
    "udpout:127.0.0.1:14550"
)

drone_id = 1

battery = 100
latitude = 18.5204
longitude = 73.8567
altitude = 100
speed = 10

print("Telemetry simulator started...")
print("Sending telemetry from Drone 1")

while True:

    # Heartbeat
    connection.mav.heartbeat_send(
        mavutil.mavlink.MAV_TYPE_QUADROTOR,
        mavutil.mavlink.MAV_AUTOPILOT_GENERIC,
        0,
        0,
        mavutil.mavlink.MAV_STATE_ACTIVE
    )

    # Battery
    connection.mav.sys_status_send(
        0,
        0,
        0,
        100,
        12000,
        500,
        battery,
        0,
        0,
        0,
        0,
        0,
        0
    )

    # GPS + altitude
    connection.mav.global_position_int_send(
        0,
        int(latitude * 10**7),
        int(longitude * 10**7),
        int(altitude * 1000),
        0,
        700,
        700,
        0,
        0
    )

    print(
        f"Drone 1 | "
        f"Battery: {battery}% | "
        f"GPS: ({latitude:.4f}, {longitude:.4f}) | "
        f"Altitude: {altitude} m | "
        f"Speed: {speed} m/s"
    )

    battery -= 1

    if battery < 0:
        battery = 100

    latitude += 0.0001
    longitude += 0.0001

    time.sleep(1)