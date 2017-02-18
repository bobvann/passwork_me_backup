# passwork_me_backup

passwork_me_backup is a tool to backup your entire collection of passwords from passwork.me

Since passwords are stored encrypted on the server, it is composed by two tools:

- backup.sh: downloads the passwords from passwork.me servers
- decrypter.sh: decrypts the passwords using AES algorithm

# backup.sh

Dowloads passwords from server and returns a JSON on the stdout.

**DEPENDENCIES:** bash and curl

Usage:
```sh
$ backup.sh [e-mail password]
```
You can both:
- not pass any parameter: the script will interactively ask you for e-mail address and password
- pass e-mail address and password on the command line

**PLEASE NOTE:** if you pass credentials on the command line, they can be seen on the process list and on the shell history! Use with care!

As said, backup.sh will write on the stdout. To save the dump just redirect to a file
```sh
$ backup.sh my.email@example.com Gr34atP4ssw0rd! > passwords.backup.json
```

# decrypter.sh

Since passwords are stored AES-encrypted on passwork servers, you need to decrypt them client side. We strongly suggest to decrypt them only when needed, and to store backups encrypted.

**DEPENDENCIES:** bash, node (no extra module)

Usage:
```sh
$ decrypter.sh input_file output_file
```

Secret key will be requested interactively. You CANNOT pass the secret key as a parameter. This is because you do not need to automate decryption. Please keep backups encrypted.
