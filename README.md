# NCTU GPE Analysis

NCTU GPE 歷史出題狀況資料 & 頻率分析

個人小專案統計 GPE 歷史出題狀況

Repo 預設提供 2017 以後的資料, 視情況擴充 0 - 0

## Usage

基本上就是去抓資料, 寫的比較簡單, 沒做沒抓到資料或是欄位不對處理該怎麼辦 

當然還有測試:P

### Cralwer - crawl the historical data from http://gpe3.acm-icpc.tw

+ 產生所有考試內容之 json 檔案

  ```
  ➜ python pybin/crawler.py --help
  Usage: crawler.py [OPTIONS]

  Options:
    -s, --startY INTEGER  crawler start year  [default: 2017]
    -e, --endY INTEGER    crawler end year  [default: 2021]
    -c, --cookie TEXT     For crawling http://gpe3.acm-icpc.tw necessary cookie,
                          please login first and get the ACMICPCTW cookie value
                          [required]

    -f, --filename TEXT   customized dump filename  [default: data.json]
    --help                Show this message and exit.
  ```

### genTemplate

+ 快速產生檔案模板 - for 自我練習不用一直建立檔案..

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

### genProblems

+ 產生排序好唯一之所有題目 json 檔案 ( 需要所有考試的檔案 )

  ```
  ➜ python pybin/genProblems.py --help
  Usage: genProblems.py [OPTIONS]

  Options:
    --net / --no-net      use the online data  [default: True]
    -f, --filename TEXT   local data  [default: data.json]
    -s, --startY INTEGER  gen file start year  [default: 2019]
    -e, --endY INTEGER    gen file end year  [default: 2021]
    -o, --out TEXT        output filename  [default: problems.json]
    --help                Show this message and exit.
  ```

### Analysis & Calculation

待開發, 預計做個很簡單網頁, 排序最高出題之類的