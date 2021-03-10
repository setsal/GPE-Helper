#!/bin/sh

echo "[*] Execute update script"

# Use Guest cookie
# ACMICPCTW=$(python pybin/getGuestCookie.py)
ACMICPCTW=$(curl --silent -X POST --data "login=guest&passwd=guest" --output /dev/null --insecure --cookie-jar - https://gpe3.acm-icpc.tw/checkpasswd.php | tail -n 1 | awk '{print $7}')
echo "Get cookie" $ACMICPCTW

# Crawler.py
echo "[*] Execute cralwer.py"
python pybin/crawler.py -c $ACMICPCTW -s 2018 -f frontend/public/exams.json

# genProblems.py
echo "[*] Execute genProblems.py"
python pybin/genProblems.py --no-net -f frontend/public/exams.json -o frontend/public/problems.json

# getCategory.py
echo "[*] Execute getCategory.py"
python pybin/genCategory.py -ef frontend/public/exams.json -pf frontend/public/problems.json

# Commit & push file
git add *.*
git commit -m "Update data at `date '+%b %d  %H:%M'`"
git push