#!/bin/bash
# Init git
mkdir ./deploy-git
cd ./deploy-git
#~/suka-theme-test/deploy-git
git init
git config --global push.default matching
git config --global user.email "isukkaw@gmail.com"
git config --global user.name "SukkaW"
# Clone remote
git remote add origin https://${GitHubKEY}@github.com/theme-suka/demo.git --depth=5
git pull
rm -rf ./*
cp -rf ../public/* ./
git add --all .
git commit -m "Travis Auto Tester for hexo-theme-suka"
git push --quiet --force https://${GitHubKEY}@github.com/theme-suka/demo.git