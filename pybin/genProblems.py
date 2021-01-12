import requests
import json
import click
import datetime
import logging

logging.basicConfig(level=logging.INFO,
                    format='[*] %(asctime)s %(levelname)s: %(message)s', datefmt="%Y-%m-%d %H:%M:%S")


@click.command()
@click.option('--net/--no-net', help='use the online data', default=True, show_default=True)
@click.option('-f', '--filename', 'filename', help='local data', type=str, default="data.json", show_default=True)
@click.option('-s', '--startY', 'startY', help='gen file start year', type=int, default=2019, show_default=True)
@click.option('-e', '--endY', 'endY', help='gen file end year', type=int, default=datetime.datetime.now().year, show_default=True)
@click.option('-o', '--out', 'out', help='output filename', type=str, default="problems.json", show_default=True)
def main(filename, net, startY, endY, out):
    uniq_problems = {}

    if net:
        response = requests.get(
            "https://raw.githubusercontent.com/setsal/files/main/tmp/data.json")
        data = response.json()
    else:
        with open(filename) as f:
            data = json.load(f)

    logging.info('Load data successfully')

    for key in data:
        # before 2019
        if data[key]['timestamp'] > datetime.datetime(startY, 1, 1).timestamp() and data[key]['timestamp'] < datetime.datetime(endY, 1, 1).timestamp():
            for problem in data[key]['problems']:
                uniq_problems[problem['pid']] = problem

    logging.info('Fetch %d uniq problems', len(uniq_problems))

    # sort
    uniq_problems_sort = sorted(uniq_problems.keys())

    # dump to array json for frontend
    uniq_problems_array = []
    for key in uniq_problems_sort:
        uniq_problems_array.append(uniq_problems[key])

    # write file
    with open(out, 'w') as outfile:
        json.dump(uniq_problems_array, outfile, indent=4)

    logging.info('Write to file %s successfully', out)


if __name__ == '__main__':
    main()
