#!/bin/bash

echo "Starting couchbase ..."

/entrypoint.sh couchbase-server &

echo "Waiting for couchbase to be up & ready ..."

curl --head -X GET --output /dev/null --silent --retry 30 --retry-connrefused --retry-delay 2 http://localhost:8091

echo "Couchbase is up & ready ..."

if [ ! -f /opt/couchbase/var/cluster.ready1 ]; then

  echo "Initializing cluster ..."

  touch /opt/couchbase/var/cluster.ready1

  /scripts/init.sh

fi

sleep infinity