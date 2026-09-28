from pymavlink import mavutil

connection = mavutil.mavlink_connection(
    "udpin:127.0.0.1:14550"
)

print("MAVLink receiver started...")
print("Waiting for telemetry...")

while True:
    message = connection.recv_match(blocking=True)

    if message:
        message_type = message.get_type()

        if message_type == "SYS_STATUS":
            battery = message.battery_remaining
            print(f"Drone 1 | Battery: {battery}%")

        elif message_type == "GLOBAL_POSITION_INT":
            latitude = message.lat / 10**7
            longitude = message.lon / 10**7
            altitude = message.alt / 1000

            vx = message.vx / 100
            vy = message.vy / 100
            vz = message.vz / 100

            speed = (vx**2 + vy**2 + vz**2) ** 0.5

            print(
                f"Drone 1 | "
                f"GPS: ({latitude:.4f}, {longitude:.4f}) | "
                f"Altitude: {altitude:.1f} m | "
                f"Speed: {speed:.2f} m/s"
            )