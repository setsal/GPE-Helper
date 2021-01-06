import requests
import json
import click
import datetime

@click.command()
@click.option('--net/--no-net', help='use the online data', default=True, show_default=True)
@click.option('-f', '--filename', 'filename', help='local data', type=str, default="data.json", show_default=True)
@click.option('-s', '--startY', 'startY', help='gen file start year', type=int, default=2019, show_default=True)
@click.option('-e', '--endY', 'endY', help='gen file end year', type=int, default=datetime.datetime.now().year, show_default=True)
@click.option('-d', '--dir', 'dir', help='output dir', type=click.Path(exists=True, dir_okay=True), required=True)
def main(filename, net, startY, endY, dir):
    uniq_problem = {}
    
    if net:
        response = requests.get("https://raw.githubusercontent.com/setsal/files/main/tmp/data.json")
        data = response.json()
    else:
        with open(filename) as f:
            data = json.load(f)

    for key in data:
        if data[key]['timestamp'] > datetime.datetime(startY, 1, 1).timestamp() and data[key]['timestamp'] < datetime.datetime(endY, 1, 1).timestamp():  # before 2019
            for pkey in data[key]['problems']:
                uniq_problem[pkey] = data[key]['problems'][pkey]

    for key in uniq_problem:
        with open( dir + '/' + uniq_problem[key]['name'] + '.cpp', 'w') as out_file:
            out_file.write("/*\n")   
            out_file.write('\tProblem: ' + uniq_problem[key]['name'] + '\n')   
            out_file.write('\tsubs: ' + str(uniq_problem[key]['subs']))
            out_file.write(', ACs: ' + str(uniq_problem[key]['ACs']))
            out_file.write(', AcceptRate: ' + str(uniq_problem[key]['AcceptRate']))
            out_file.write(', onsite: ' + str(uniq_problem[key]['onsite']))
            out_file.write(', access: ' + str(uniq_problem[key]['access']) + '\n')
            out_file.write('\n\tLink: ' + "https://gpe3.acm-icpc.tw/showproblemtab.php?probid=" + key + "&cid=5\n" )
            out_file.write("*/")


if __name__ == '__main__':
    main()