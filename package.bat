@echo off
rmdir /s /q dist
mkdir dist
robocopy /E js dist/js
robocopy /E images dist/images
robocopy /E css dist/css
copy index.html dist