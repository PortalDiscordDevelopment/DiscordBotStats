@REM configuration options
@echo off
set dirname=%cd%
title Discord Bots Stats
color 0b

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



git clone https://github.com/PortalDiscordDevelopment/DiscordBotStats .

echo Finished updating to latest git version.

call node ./models/setup.js

:loop

call node .

call node ./models/format.js

set "HH=%time:~0,2%"
set "MM=%time:~3,2%"
set /A "loopTime=(%HH% + 1) %% 24"
echo script finished, running again at %loopTime%:%MM% %date%

timeout /t 3600

goto loop