@REM configuration options
@echo off
set dirname=%cd%
title MultiBotProcessor
color 0b

echo Looking for data/tokens.js...

if exist "%dirname%\data\tokens.js" (
    echo Found %dirname%\data\tokens.js file.
) else (
    echo Couldn't find tokens.js in %dirname%\data, make sure this file is located in %dirname%\data and named tokens.js, opening file explorer.
    cd data
    explorer .
    pause
    exit
)

echo Checking for Node...

where node.exe >nul 2>&1 && set "node=true" || set "node=false"

if "%node%" == "true" (
    for /F %%F in ('node -v') do echo Using node version %%F
) else (
    echo Node not installed, quiting...
    pause
    exit
)

echo Checking for Git

where git.exe  >nul 2>&1 && set "git=true" || set "git=false"

if "%git%" == "true" (
    for /F %%F in ('git -v') do echo Using git version %%F
) else (
    echo Git not installed, quiting...
    pause
    exit
)

echo Updating to latest git version...

git reset HEAD --hard

git init
git remote add origin https://github.com/PortalDiscordDevelopment/MultiBotRunner
git pull --set-upstream origin main
cls

echo Finished updating to latest git version.
echo Installing dependencies...

call npm i
call npm audit fix -f
cls
call npm audit fix -f
cls

echo Finished installing dependencies.
echo Funding credits...

call npm fund 
cls

echo Finished funding.
echo Building files...

call npx prettier --write .
cls

echo Finished building files.
echo Starting script...

start https://portaldiscorddevelopment.github.io/MultiBotRunner/

:loop
call node .

echo Updating data log...
call npx prettier --write data/data.json

git add data/data.json
git commit -m "Data log update"
git push origin main

echo Updated data log!
cls


echo.
echo.
echo.
echo.
echo.
echo.
echo.
echo.
echo.
@echo off

set "HH=%time:~0,2%"
set "MM=%time:~3,2%"
set /A "loopTime=(%HH% + 1) %% 24"
echo script finished, running again at %loopTime%:%MM% %date%

timeout /t 60

goto loop