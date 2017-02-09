#!/bin/bash

#To name the directory with the date
DEST=/home/jon/OSU/cs467/Capricornus---Catalyst/db_backups/$(date +%Y-%m-%d:%H:%M:%S)

#Create directory
mkdir $DEST

#Dump database into directory
mongodump -h 127.0.0.1 -d catalyst -o $DEST

#Upload directory to S3 bucket
aws s3 cp $DEST s3://catalystbackuptest/db_backups/${DEST:54:19} --recursive




