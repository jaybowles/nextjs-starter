#!/usr/bin/env bash
set -o errexit

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v npm)" ]; then
    echo ""
    echo -e "\033[0;31m[Error with Exception]\033[0m"
    echo "Please make sure Docker and Node.js are installed"
    echo ""
    echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
    echo "Install Node.js: https://nodejs.org/en/"
    echo ""
    exit
fi

# download eosio/eos-dev:v1.2.5 image
echo "=== pull eosio/eos-dev image v1.2.5 from docker hub ==="
docker pull eosio/eos-dev:v1.2.5

# set up node_modules for frontend
# echo "=== npm install packpage for frontend react app ==="
# change directory to ./frontend
# cd "./frontend"
# npm install
