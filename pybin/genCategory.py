import requests
import json
import click
import datetime
import logging
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO,
                    format='[*] %(asctime)s %(levelname)s: %(message)s', datefmt="%Y-%m-%d %H:%M:%S")


@click.command()
@click.option('-ef', '--efilename', 'efilename', help='local exam data', type=str, default="exams.json", show_default=True)
@click.option('-pf', '--pfilename', 'pfilename', help='local problem data', type=str, default="problems.json", show_default=True)
def main(efilename, pfilename):

    p_dict = {}

    with open(efilename) as f:
        edata = json.load(f)

    with open(pfilename) as f:
        pdata = json.load(f)

    logging.info('Load problem data successfully')

    # crawl category from zero judge
    for problem in pdata:
        # 抓分類
        logging.info('Crawling pid: %s exam', problem['name'])
        tags = []
        url = "https://zerojudge.tw/Problems"
        r = requests.get(
            url, {"searchword": problem['name'].split(': ')[1][0:7]})  # 寬鬆一點搜尋
        soup = BeautifulSoup(r.text, "html.parser")

        soup_tags = soup.find('span', {'class': 'tag'})
        if (soup_tags and soup_tags.find_all("a")):
            for tag in soup_tags.find_all("a"):
                tags.append(tag.text)
        problem['category'] = tags
        p_dict[problem['pid']] = tags

    # update exam data
    logging.info('Updating data...')
    for key in edata:
        for problem in edata[key]['problems']:
            if (problem['pid'] in p_dict):
                problem['category'] = p_dict[problem['pid']]
            else:
                problem['category'] = []

    # write exam file
    with open(efilename, 'w') as outfile:
        json.dump(edata, outfile, indent=4)

    # write problem file
    with open(pfilename, 'w') as outfile:
        json.dump(pdata, outfile, indent=4)

    logging.info('Write to file successfully')


if __name__ == '__main__':
    main()
