#!/bin/bash
# Clone Test Unit
git clone https://github.com/theme-suka/hexo-theme-unit-test.git suka-theme-test --depth=5
cd suka-theme-test
#~/suka-theme-test
rm -rf .git

# Install dependencies
npm i hexo
npm i
# Install Themes
git clone https://github.com/SukkaW/hexo-theme-suka.git themes/suka
cd themes/suka
#~/suka-theme-test/themes/suka
#git checkout -t origin/canary
#git pull
rm -rf .git
npm i --production

# Theme config import
cd ..
#~/suka-theme-test/themes
cd ..
#~/suka-theme-test
\cp -f _config.theme.yml themes/suka/_config.yml
