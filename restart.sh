#! /bin/sh

dirname="/home/dave/Projects/Capricornus---Catalyst"
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

sudo service mongod stop
sudo service mongod start

sudo forever stop bin/www
sudo forever start bin/www
