#!/bin/sh

echo "[*] Execute update script"

# Use Guest cookie
# ACMICPCTW=$(python pybin/getGuestCookie.py)
ACMICPCTW=$(curl --silent -X POST --data "login=guest&passwd=guest" --output /dev/null --insecure --cookie-jar - https://gpe3.acm-icpc.tw/checkpasswd.php | tail -n 2 | head -n 1 | awk '{print $7}')
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

echo "[*] Execute genQuestionSnapshot.py"
python3 pybin/genQuestionSnapshot.py -f frontend/public/exams.json -o frontend/public/question_snapshots

# Commit & push file
echo -n "Push to gitub repo (y/n)? "  # make some check
read answer
if [ "$answer" != "${answer#[Yy]}" ] ;then
    git add .
    git commit -m "Update data at `date '+%b %d  %H:%M'`"
    git push
    echo "Success"
else
    echo "Abort Git Push"
fi
