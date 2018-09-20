#!/usr/bin/env bash

# If resetting, make sure everything is clean and well setup

if [ $1 = "reset" ]
then
  # force remove the previous container if any
  # create a clean data folder in eosio_docker to preserve block data
  echo "=== setup/reset data for eosio_docker ==="
  docker stop eosio_notechain_container || true && docker rm --force eosio_notechain_container || true
  rm -rf "./eosio_docker/data"
  mkdir -p "./eosio_docker/data"
fi


# check dependencies
./check_dependencies.sh
# start blockchain
./start_eosio_docker.sh

# start frontend react app
#./start_frontend.sh
