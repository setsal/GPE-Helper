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
@click.option('-o', '--out', 'out', help='output filename', type=str, default="problems.json", show_default=True)
def main(filename, net, startY, endY, out):
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
        if data[key]['timestamp'] > datetime.datetime(startY, 1, 1).timestamp() and data[key]['timestamp'] < datetime.datetime(endY, 12, 31).timestamp():
            for problem in data[key]['problems']:
                if problem['pid'] in uniq_problems:
                    uniq_problems[problem['pid']
                                  ]['Appearance'] = uniq_problems[problem['pid']]['Appearance'] + 1
                    if (uniq_problems[problem['pid']]['LastAppearance'] < data[key]['timestamp']):
                        logging.info("PID: %d duplicate and update timestamp %s to %s",
                                     problem['pid'], uniq_problems[problem['pid']]['LastAppearance'],  data[key]['timestamp'])
                        uniq_problems[problem['pid']
                                      ]['LastAppearance'] = data[key]['timestamp']
                else:
                    uniq_problems[problem['pid']] = problem
                    uniq_problems[problem['pid']
                                  ]['LastAppearance'] = data[key]['timestamp']
                    uniq_problems[problem['pid']]['Appearance'] = 1

    logging.info('Fetch %d uniq problems', len(uniq_problems))

    # sort
    uniq_problems_sort = sorted(uniq_problems.keys())

    # dump to array json for frontend
    uniq_problems_array = []

    # follow intuition to caculate rating?
    ac_avg = 0
    onsite_avg = 0
    access_avg = 0

    for key in uniq_problems_sort:
        uniq_problems_array.append(uniq_problems[key])
        ac_avg = ac_avg + uniq_problems[key]['AcceptRate']
        onsite_avg = onsite_avg + uniq_problems[key]['onsite']
        access_avg = access_avg + uniq_problems[key]['access']

    p_len = len(uniq_problems_array)
    ac_avg = ac_avg/p_len
    onsite_avg = onsite_avg/p_len
    access_avg = access_avg/p_len

    # 就 隨直覺 其實應該要有更好的評估方法
    for problem in uniq_problems_array:
        problem['LastAppearance'] = datetime.datetime.fromtimestamp(
            problem['LastAppearance']).strftime('%Y-%m-%d')  # 順便做 懶得前端渲染轉換 :P
        rating_val = problem['AcceptRate']/ac_avg*0.8 + \
            problem['onsite']/onsite_avg*0.6 + problem['access']/access_avg*0.3
        if rating_val > 2:
            problem['rating'] = 3
        elif rating_val > 1.4:
            problem['rating'] = 2
        elif rating_val > 0.9:
            problem['rating'] = 1
        else:
            problem['rating'] = 0
        problem['favorite'] = 0  # 也是懶惰的作法 :P

    # write file
    with open(out, 'w') as outfile:
        json.dump(uniq_problems_array, outfile, indent=4)

    logging.info('Write to file %s successfully', out)


if __name__ == '__main__':
    main()
