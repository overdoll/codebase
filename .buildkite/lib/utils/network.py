import socket

import requests
import time

from . import exception


def wait_for_port(host, port, timeout=5.0, check_ready=True):
    """Wait until a port starts accepting TCP connections.
    Args:
        port (int): Port number.
        host (str): Host address on which the port should exist.
        timeout (float): In seconds. How long to wait before raising errors.
    Raises:
        TimeoutError: The port isn't accepting connection after time specified in `timeout`.
    """
    start_time = time.perf_counter()
    while True:
        try:
            with socket.create_connection((host, port), timeout=3):
                if check_ready:
                    req = requests.get("http://" + host + ":" + str(port) + "/readyz")
                    if req.text == "ok":
                        break
                else:
                    break
        except OSError as ex:
            time.sleep(0.5)
            if time.perf_counter() - start_time >= timeout:
                print(ex)
                raise exception.BuildkiteException(
                    "Waited too long for the port {} on host {} to start accepting connections.".format(port, host))
