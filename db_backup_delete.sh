#!/bin/bash
PATH='/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin'
#Delete local directory that is 30 days old
cd /home/ubuntu/Capricornus---Catalyst/db_backups
arrLocal=($(ls))


#Delete S3 backup that is 30 days old
arrRemote=($(aws s3 ls s3://catalystnwbackup/db_backups/))
aws s3 rm s3://catalystnwbackup/db_backups/${arrRemote[1]:0:22} --recursive

sudo rm -r ${arrLocal[0]}
