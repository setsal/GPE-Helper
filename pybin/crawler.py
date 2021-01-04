import requests
import click
import datetime
import logging
import json
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO,
                    format='[*] %(asctime)s %(levelname)s: %(message)s', datefmt="%Y-%m-%d %H:%M:%S")

# necessary cookie
cookies = {}


def parseCid(startY, endY, cookies):
    r = requests.get(
        "http://gpe3.acm-icpc.tw/onlinecontests.php?inactive=&tab=", cookies=cookies)
    soup = BeautifulSoup(r.text, "html.parser")
    table = soup.find('table', {'class': 'list sortable'})

    # bypass first row
    trs = table.find_all('tr')[1:]

    # store the cids & exams information
    rows = {}

    # parse all cid
    for tr in trs:

        # store per exam information
        row = {}

        # Parse the examInfo
        examInfo = tr.find_all('td')

        # time, Name, cid
        examTime = examInfo[0].text.strip()
        examTimeStamp = datetime.datetime.strptime(
            examTime, "%Y-%m-%d").timestamp()
        examYear = int(examTime.split('-')[0])
        examName = examInfo[4].text.strip()
        cid = int(examInfo[4].find_all('a')[0]['href'].split('cid=')[1])

        if (examYear >= startY and examYear <= endY):
            # append to rows list
            row['timestamp'] = examTimeStamp
            row['examTime'] = examTime
            row['examName'] = examName
            rows[cid] = row
    return rows


def parseExam(cid):
    logging.info('Crawling cid: %d exam', cid)
    url = "http://gpe3.acm-icpc.tw/problemlist.php?tab=&onlinetest=&cid={}".format(
        cid)
    r = requests.get(url, cookies=cookies)
    soup = BeautifulSoup(r.text, "html.parser")
    table = soup.find('table', {'class': 'sortable'})

    # bypass first row
    trs = table.find_all('tr')[1:]

    # store the cids & exams information
    problems = {}

    # parse each problem
    for tr in trs:
        # store per exam information
        problem = {}

        # Parse the problem
        problemInfo = tr.find_all('td')

        problemInfoId = problemInfo[4].find_all('a')[0]['href'].split('&id=')[
            1]  # problem id 有可能為 string...所以不轉型
        problemName = problemInfo[0].text.strip()
        problemSubs = int(problemInfo[1].text.strip())
        problemACs = int(problemInfo[4].text.strip())
        problemAcceptRate = float(problemInfo[2].text.strip())
        problemOnSite = int(problemInfo[7].text.strip())
        problemAccess = int(problemInfo[8].text.strip())

        # append to rows list
        problem['name'] = problemName
        problem['subs'] = problemSubs
        problem['ACs'] = problemACs
        problem['AcceptRate'] = problemAcceptRate
        problem['onsite'] = problemOnSite
        problem['access'] = problemAccess
        problems[problemInfoId] = problem
    return problems


@click.command()
@click.option('-s', '--startY', 'startY', help='crawler start year', type=int, default=2017, show_default=True)
@click.option('-e', '--endY', 'endY', help='crawler end year', type=int, default=datetime.datetime.now().year, show_default=True)
@click.option('-c', '--cookie', 'cookie', help='For crawling http://gpe3.acm-icpc.tw necessary cookie, please login first and get the ACMICPCTW cookie value', type=str, required=True)
@click.option('-f', '--filename', 'filename', help='customized dump filename', type=str, default="data.json", show_default=True)
def main(startY, endY, cookie, filename):
    # input year validate
    if (startY > datetime.datetime.now().year or endY > datetime.datetime.now().year or endY < startY):
        raise click.UsageError(
            "Invalid year range from {} to {}".format(startY, endY))

    logging.info('Parse the cid from %d to %d', startY, endY)

    # necessary cookies
    cookies['ACMICPCTW'] = cookie

    # Parse cid
    data = parseCid(startY, endY, cookies)
    logging.info('Parse cids successfully, total of %d exams', len(data))

    # Parse each exam information
    for key in data:
        data[key]['problems'] = parseExam(key)

    # write file
    with open(filename, 'w') as outfile:
        json.dump(data, outfile, indent=4)
    logging.info('Write to file %s successfully', filename)


if __name__ == '__main__':
    main()
