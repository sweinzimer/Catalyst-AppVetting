#!/bin/bash

#Delete local directory that is 30 days old
arr=($(ls))
rm -r ${arr[29]}

#Delete S3 backup that is 30 days old
arr=($(aws s3 ls s3://catalystbackuptest/db_backups/))
aws s3 rm s3://catalystbackuptest/db_backups/${arr[29]:0:19} --recursive
