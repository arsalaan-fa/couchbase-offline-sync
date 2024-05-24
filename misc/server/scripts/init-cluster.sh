#!/bin/bash

couchbase-cli cluster-init \
  --cluster-name couchbase-cluster-dev \
  --cluster-username $ADMIN_USERNAME \
  --cluster-password $ADMIN_PASSWORD \
  --services data,index,query \
  --cluster-ramsize 512 \
  --cluster-index-ramsize 256