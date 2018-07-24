#!/bin/bash

# Clone Test Unit
git clone https://github.com/theme-suka/hexo-theme-unit-test.git suka-theme-test --depth=5
cd suka-theme-test
#~/suka-theme-test
rm -rf .git

# Install dependencies
npm i
# Install Themes
git clone https://github.com/SukkaW/hexo-theme-suka themes/suka
cd themes/suka
#~/suka-theme-test/theme/suka
#git checkout -t origin/canary
#git pull
rm -rf .git

# Theme config import
cd ..
#~/suka-theme-test/theme
cd ..
#~/suka-theme-test
cp -i _config.theme.yml themes/suka/_config.yml
