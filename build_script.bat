@echo off
cd /d "C:\work\kitusnezu.worktrees\copilot-worktree-2026-03-26T18-34-04"
echo === Running npm ci ===
npm ci
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo npm ci failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
echo.
echo === npm ci succeeded, running npm run build ===
npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo npm run build failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
echo.
echo === Build completed successfully ===
