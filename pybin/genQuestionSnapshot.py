import os
import requests
import json
import click
import logging


from lxml import etree


logging.basicConfig(
    level=logging.INFO,
    format="[*] %(asctime)s %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


@click.command()
@click.option(
    "--net/--no-net", help="use the online data", default=True, show_default=True
)
@click.option(
    "-f",
    "--filename",
    "filename",
    help="local data",
    type=str,
    default="exams.json",
    show_default=True,
)
@click.option(
    "-o",
    "--output",
    "output",
    help="output folder",
    type=str,
    default="result",
    show_default=True,
)
@click.option(
    "-fp",
    "--frontend_assets_path",
    "frontend_assets_path",
    help="assets path (html image src dir path)",
    type=str,
    default="result",
    show_default=True,
)
def main(filename: str, net: bool, output: str, frontend_assets_path: str):

    if os.path.isfile(output):
        logging.error("output folder is file not folder.")
        return
    assets_path = f"{frontend_assets_path}/assets/"
    image_path = os.path.join(output, "assets")
    question_path = os.path.join(output, "contents")
    if not os.path.exists(image_path):
        os.makedirs(image_path)
    if not os.path.exists(question_path):
        os.makedirs(question_path)

    if net:
        response = requests.get(
            "https://raw.githubusercontent.com/setsal/GPE-Helper/master/frontend/public/exams.json"
        )
        data = response.json()
    else:
        with open(filename) as f:
            data = json.load(f)

    logging.info("Load data successfully")

    session = get_session()

    if session is None:
        return

    uniq_problems = set()
    for exam_info in data.values():
        for problem_info in exam_info.get("problems", []):
            pid = problem_info.get("pid")
            if pid is None or pid in uniq_problems:
                continue
            uniq_problems.add(pid)
            question_parser(
                session=session,
                question_id=pid,
                image_path=image_path,
                content_path=question_path,
                assets_path=assets_path,
            )


def download_img(session: requests.Session, url: str, filename: str):
    req = session.get(url)
    if req.status_code != 200:
        logging.error(f"Download image assets fail : {url}")
        return None
    open(filename, "wb").write(req.content)


def question_parser(
    session: requests.Session = None,
    question_id: str = None,
    image_path: str = None,
    content_path: str = None,
    assets_path: str = None,
) -> dict:

    host_url = "https://gpe3.acm-icpc.tw"
    question_req = session.get(
        f"{host_url}/domjudge2/pct/showproblem.php",
        params={
            "probid": question_id,
            "cid": 5,  # question group id, 5 for all question group.
        },
    )

    html = question_req.text

    question_link = question_req.request.url

    result = {"content": None}

    html = html[html.find("\n") :]  # Remove first line <xml> tag

    root: "etree._Element" = etree.HTML(html)

    if root is None:
        logging.error(f"Parser error : {question_id}")
        return
    try:
        problem_content: "etree._Element" = root.xpath('//div[@id="problemtext"]')[0]
    except IndexError:
        logging.error(f"Parser error : {question_id}")
        return

    for index, img_element in enumerate(problem_content.xpath("//img")):
        img_element: "etree._Element" = img_element
        # image_filename = f"{uuid4().hex}.jpg"
        # image_filename = f"{md5(img_element.get('src'))}.jpg"

        image_filename = img_element.get("src", "").split("/")[-1]

        _image_path = os.path.join(image_path, image_filename)
        download_img(
            session=session,
            url=f"{host_url}/pct/images/{image_filename}",
            filename=_image_path,
        )

        # replace img element
        if img_element.attrib.get("src"):
            img_element.attrib["src"] = f"{assets_path}{image_filename}"

    # Remove all hyperlink avoid link fail
    for any_element in problem_content.xpath("//*[@href]"):
        del any_element.attrib["href"]

    # add hyperlink on title
    for i in problem_content.xpath("./h2/a")[:1]:
        i.attrib["href"] = question_link
        i.attrib["target"] = "_blank"

    # Remove form
    for i in problem_content.xpath("//form"):
        i.getparent().remove(i)

    # Remove script
    for i in problem_content.xpath("//script"):
        i.getparent().remove(i)

    result["content"] = etree.tostring(problem_content).decode("utf-8")
    _path = os.path.join(content_path, f"{question_id}.json")
    json.dump(result, open(_path, "w"))

    return result


def get_session() -> "requests.Session":

    session = requests.Session()
    requests.packages.urllib3.disable_warnings()

    session.verify = False
    url = "https://gpe3.acm-icpc.tw/checkpasswd.php"

    data = {"login": "guest", "passwd": "guest"}
    r = session.post(url, data=data)

    if r.status_code != 200:
        logging.info("Login Fail (Check your address in 140.113.*.* )")
        return None
    logging.info("Login Success")

    return session


if __name__ == "__main__":
    main()
