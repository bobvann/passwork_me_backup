# passwork_me_backup

Interactive script to backup all passwork.me

usage: ./backup.sh

will ask interactively for e-mail and password

prints to stdout only result (info message are on stderr)

so it may be easily used as

./backup.sh > passwork.me.backup.json

work in progress for command line username and password.


PLEASE NOTE:
obtained data is still crypted using the secret word.

As stated on passwork.me website:

- Open a new session using openSession
- Load all data using getData
- Ask user for his secrect word
- Decrypt group password (using the secrect word) groups[X].passwordCrypted
- Decrypt data (using group password) groups[X].folders[Y].passwords[Z].cryptedPassword
