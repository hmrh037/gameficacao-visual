@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo   Atualizando playlists e publicando as musicas nas TVs...
echo ============================================================
echo.
node gerar-playlists.js
if errorlevel 1 (
  echo ERRO: o Node nao foi encontrado. Avise o suporte.
  pause
  exit /b 1
)
echo.
git add -A
git commit -m "Atualiza musicas/playlists"
git push
echo.
echo ============================================================
echo   PRONTO! Agora recarregue as TVs (Ctrl+F5) para pegarem
echo   a playlist/musicas novas.
echo ============================================================
pause
