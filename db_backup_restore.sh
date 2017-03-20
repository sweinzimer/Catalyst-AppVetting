#!/bin/bash

cd db_backups

aws s3 cp s3://catalystnwbackup/db_backups . --recursive

folder=$1

mongorestore /home/ubuntu/Capricornus---Catalyst/db_backups/$folder/catalyst -h 35.164.54.173:51150 -u catalystAdmin -p "LtVu9v@8&h5^%6bSVFf2AUEf" --authenticationDatabase admin -d catalyst
