@REM configuration options
@echo off
title MultiProcessor
color 0b


echo Updating to latest git version...

git reset HEAD --hard

git pull

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

echo Finished funding.
echo Building files...

call npx prettier --write .

echo Finished building files.
echo Starting script...

node .

@REM start opera.exe

@REM set /p name=Name:

@REM start npm start

@REM echo %name%

echo.
echo Script finished, press any key to close.
pause > nul
exit