#!/bin/bash
echo -e "Building app..."
ng build --base-href

echo -e "Deploying app..."
scp -r part-finder-app/ pi@raspberrypi:/var/lib/tomcat8/webapps