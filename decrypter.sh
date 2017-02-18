#!/bin/bash
echoerr() { echo "$@" 1>&2; }

echoerr "Passwork.me backup decrypter"

if [[ "$#" -ne "2" ]]
then
  echoerr "usage: decrypter.sh input_file output_file"

  exit 1
fi


echoerr -n "Secret key: "
read -s SECRET
echoerr ""


/usr/bin/env node decrypter/index.js $SECRET $1 $2
