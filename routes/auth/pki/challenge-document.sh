#!/usr/bin/bash

DIR=$PWD/routes/auth

# Generate challenge document
echo "Creating challenge"
dd if=/dev/urandom of=$DIR/pki/document.data bs=500 count=1

RES=$?

if [ "$RES" -eq 1 ]
then
  echo "Challenge-document creation failed"
  exit 1
elif [ "$RES" -eq 0 ]
then
  echo "Challenge-documment creation success"
  exit 0
else
  echo $RES
  exit 1
fi
