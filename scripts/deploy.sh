#!/bin/bash
set -e
ssh-keyscan -H $IP >>~/.ssh/known_hosts

cd -
mvn clean install
# Copy generated war files to the server
scp target/academix.war $USER_NAME@$IP:$DEPLOY_PATH
