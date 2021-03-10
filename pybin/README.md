# GPE-Helper - Crawler

## Usage

基本上就是去抓資料, 寫的比較簡單, 沒做沒抓到資料或是欄位不對處理該怎麼辦

當然還有測試和效能優化:P

## Install dependencies

```
pip install -r requirements.txt
```

### 使用順序

1. crawler.py
2. genProblems.py
3. genCategory.py

genTemplate 是選用

### Cralwer - crawl the historical data from http://gpe3.acm-icpc.tw

- 產生所有考試內容之 json 檔案

  ```
  ➜ python pybin/crawler.py --help
  Usage: crawler.py [OPTIONS]

  Options:
    -s, --startY INTEGER  crawler start year  [default: 2017]
    -e, --endY INTEGER    crawler end year  [default: 2021]
    -c, --cookie TEXT     For crawling http://gpe3.acm-icpc.tw necessary cookie,
                          please login first and get the ACMICPCTW cookie value
                          [required]

    -f, --filename TEXT   customized dump filename  [default: exams.json]
    --help                Show this message and exit.
  ```

### genProblems

- 產生排序好唯一之所有題目 json 檔案 ( 需要所有考試的檔案 )

  ```
  ➜ python pybin/genProblems.py --help
  Usage: genProblems.py [OPTIONS]

  Options:
    --net / --no-net      use the online data  [default: True]
    -f, --filename TEXT   local data  [default: exams.json]
    -s, --startY INTEGER  gen file start year  [default: 2019]
    -e, --endY INTEGER    gen file end year  [default: 2021]
    -o, --out TEXT        output filename  [default: problems.json]
    --help                Show this message and exit.
  ```

### genCategory

- 由於 GPE 官網沒有分類相關細則, 所以從 zero judge 抓分類, 注意, 他會修改原本的 exams.json & problems.json

  ```
  ➜ python pybin/genCategory.py --help
  Usage: genCategory.py [OPTIONS]

  Options:
    -ef, --efilename TEXT  local exam data  [default: exams.json]
    -pf, --pfilename TEXT  local problem data  [default: problems.json]
    --help                 Show this message and exit.
  ```

### genTemplate

- 快速產生檔案模板 - for 自我練習不用一直建立檔案..

  ```
  ➜ python pybin/genTemplate.py --help
  Usage: genTemplate.py [OPTIONS]

  Options:
    --net / --no-net      use the online data  [default: True]
    -f, --filename TEXT   local data  [default: data.json]
    -s, --startY INTEGER  gen file start year  [default: 2019]
    -e, --endY INTEGER    gen file end year  [default: 2021]
    -d, --dir PATH        output dir  [required]
    --help                Show this message and exit.
  ```
