#!/bin/bash
PATH='/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin'
#To name the directory with the date
DEST=/home/ubuntu/Capricornus---Catalyst/db_backups/$(date +\%Y-\%m-\%d:\%H:\%M:\%S)

#Create directory
mkdir $DEST

#Dump database into directory
mongodump -h 35.164.54.173:51150 -u catalystAdmin -p "LtVu9v@8&h5^%6bSVFf2AUEf" --authenticationDatabase admin -d catalyst -o $DEST

#Upload directory to S3 bucket
aws s3 cp $DEST s3://catalystnwbackup/db_backups/${DEST:47:19} --recursive




