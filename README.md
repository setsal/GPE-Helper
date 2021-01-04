# NCTU GPE Analysis

NCTU GPE 歷史出題狀況資料 & 頻率分析

個人小專案統計 GPE 歷史出題狀況

Repo 預設提供 2017 以後的資料, 視情況擴充 0 - 0

## Usage

### Cralwer - crawl the historical data from http://gpe3.acm-icpc.tw

```
➜ python pybin/crawler.py --help
Usage: crawler.py [OPTIONS]

Options:
  -f, --fromY INTEGER  crawler start year  [default: 2017]
  -t, --toY INTEGER    crawler end year  [default: 2021]
  -c, --cookie TEXT    For crawling http://gpe3.acm-icpc.tw necessary cookie,
                       please login first and get the ACMICPCTW cookie value
                       [required]

  --help               Show this message and exit.
```

基本上就是去抓資料, 寫的比較簡單, 沒做沒抓到資料或是欄位不對處理該怎麼辦 :P

### Analysis & Calculation

待開發, 預計做個很簡單網頁, 排序最高出題之類的