#!/bin/bash

echoerr() { echo "$@" 1>&2; }

OPENURL="https://passwork.me/api2/openSession"
DATAURL="https://passwork.me/api2/getData"

echoerr "Passwork.me backup"

EMAIL=""
PASSWORD=""

if [[ "$#" -eq "2" ]]
then
	EMAIL=$1
	PASSWORD=$2
else
	echoerr -n "E-mail: "
	read EMAIL
	echoerr -n "Password: "
	read -s PASSWORD
	echoerr ""
fi


echo $EMAIL
echo $PASSWORD

exit 0

echoerr "Processing"

RESP=$(curl -sS --data "email=$EMAIL&password=$PASSWORD" $OPENURL)

CHECKF=${RESP:13:5}


if [ "$CHECKF" == "false" ]
then
	echo "Wrong email/password"
	exit 1
fi

echoerr "Authentication successfull"

CODE=$( echo $RESP | cut -d'"' -f 6  )

curl --data "session=$CODE" $DATAURL
