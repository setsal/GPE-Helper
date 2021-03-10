import requests
import json
import click
import datetime
import logging
requests.packages.urllib3.disable_warnings()

logging.basicConfig(level=logging.INFO,
                    format='[*] %(asctime)s %(levelname)s: %(message)s', datefmt="%Y-%m-%d %H:%M:%S")


@click.command()
def main():

    session = requests.Session()

    url = "https://gpe3.acm-icpc.tw/checkpasswd.php"

    data = {
        "login": "guest",
        "passwd": "guest"
    }
    r = session.post(url, data=data, verify=False)
    cookieJar = session.cookies

    for cookie in cookieJar:
        if (cookie.name == "ACMICPCTW"):
            print(cookie.value)
            return

    raise RuntimeError('Can not get cookie')


if __name__ == '__main__':
    main()
