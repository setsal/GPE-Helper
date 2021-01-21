import requests
import json
import click
import datetime
import logging

logging.basicConfig(level=logging.INFO,
                    format='[*] %(asctime)s %(levelname)s: %(message)s', datefmt="%Y-%m-%d %H:%M:%S")


@click.command()
@click.option('--net/--no-net', help='use the online data', default=True, show_default=True)
@click.option('-f', '--filename', 'filename', help='local data', type=str, default="exams.json", show_default=True)
@click.option('-s', '--startY', 'startY', help='gen file start year', type=int, default=2019, show_default=True)
@click.option('-e', '--endY', 'endY', help='gen file end year', type=int, default=datetime.datetime.now().year, show_default=True)
@click.option('-d', '--dir', 'dir', help='output dir', type=click.Path(exists=True, dir_okay=True), required=True)
def main(filename, net, startY, endY, dir):
    uniq_problems = {}

    if net:
        response = requests.get(
            "https://raw.githubusercontent.com/setsal/GPE-Helper/master/frontend/public/exams.json")
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

    for key in uniq_problems:
        with open(dir + '/' + uniq_problems[key]['name'] + '.cpp', 'w') as out_file:
            out_file.write("/*\n")
            out_file.write('\tProblem: ' + uniq_problems[key]['name'] + '\n')
            out_file.write('\tsubs: ' + str(uniq_problems[key]['subs']))
            out_file.write(', ACs: ' + str(uniq_problems[key]['ACs']))
            out_file.write(', AcceptRate: ' +
                           str(uniq_problems[key]['AcceptRate']))
            out_file.write(', onsite: ' + str(uniq_problems[key]['onsite']))
            out_file.write(
                ', access: ' + str(uniq_problems[key]['access']) + '\n')
            out_file.write(
                '\n\tLink: ' + "https://gpe3.acm-icpc.tw/showproblemtab.php?probid=" + key + "&cid=5\n")
            out_file.write("*/")

    logging.info('Write to folder %s successfully', dir)


if __name__ == '__main__':
    main()
