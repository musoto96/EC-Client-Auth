#!/usr/bin/bash

DIR=$PWD/routes/auth
SIG=$1

echo "Verifying signature"
openssl dgst -sha1 -verify $DIR/pki/public.pem -signature $PWD/signatureUpload/$SIG $DIR/pki/document.data

RES=$?

if [ "$RES" -eq 1 ]
then
  echo "Challenge failed"
  exit 1
elif [ "$RES" -eq 0 ]
then
  echo "Challenge passed"
  exit 0
else
  echo $RES
  exit 1
fi
