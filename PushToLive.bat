@echo off

echo {"date":"%date%"} > LastUpdated.json

git commit LastUpdated.json -m "Updated LastUpdated for push to live"

git push origin

git push live