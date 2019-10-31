# SSH Keys

SSH requires *authentication*: proving who you are to the remote server that you are logging into (or copying to/from using SFTP). 

Typically, we authenticate with *passwords*. But passwords are annoying
for many reasons. To be good, they have to be long and (somewhat) complex
(though see this wonderful [XKCD cartoon about
passwords](https://xkcd.com/936/) which I have completely adopted).

In this course, we'll be working remotely, so we'll have to SSH and SCP
to/from our local machine and the remote server (tempest) many times
during an editing session, and consequently have to authenticate many
times. Visual Studio Code will help with this, but it still requires
multiple authentications.

Our goal with this reading is to understand how to streamline this process. We may never have to type our password again!

## Concepts of Public Key Cryptography

The technique we will used is based on [Public Key
Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). If
you are curious, you should read more about it in that Wikipedia
page. Here are the basic highlights:

* cryptographic keys are generated in *pairs*
* one is the *public* key, which is okay to share with others, and
* the other is the *private* (or *secret*) key, which should never be
shared with anyone.
* each key can decrypt what the other has encrypted, and *only* that key
can decrypt what the other has encrypted.

Public key cryptography can be used for either *encryption* or for
*authentication*. We will use it for authentication. Later in the course,
we may talk about how public key cryptography is used in encryption in the
form of HTTPS (secure HTTP).

## Authentication Using Public Keys

We're going to understand authentication using a little story about Alice
and Bob in which Alice needs to authenticate herself (prove her identity)
to Bob.

First, Alice generates an SSH key pair. 

Suppose Bob and Alice meet and Alice proves her identity in some other
fashion (maybe an ID card). She gives her *public* SSH key to Bob, who
stores it safely.

Later, possibly over a network connection, Alice needs to prove her
identity to Bob. She says "I'm Alice and I can prove it". Bob finds
Alice's public key that he previously stored, generates a random number
(called a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)), and
encrypts it with Alice's public key. He sends the encrypted random number
to Alice and dares her to decrypt it and tell him what the number was.

Alice decrypts Bob's message using her *private* (*secret*) key, which is
the only key capable of decrypting somethen encrypted with her *public*
key. She tells Bob the random number.

Bob now knows that the person who claims to be Alice has Alice's *private*
key, and therefore must really be Alice.

## Public Key for SSH

The story of Alice and Bob is exactly how we will use public key to
authenticate ourselves to the SSH server.  Here are the basic steps. We'll
do this in class together, so this is just to prepare you.

1. We will generate a key pair on our local machine using the command
`ssh-keygen` That puts a pair of files in our `~/.ssh/` directory, namely
`id_rsa` and `id_rsa.pub`
1. We will copy the the `id_rsa.pub` file to the server (tempest) using
`ssh-copy-id`:  `ssh-copy-id user@host`. We will have to use our server
password to authenticate ourselves this time.

The second step saves the public key in the `~/.ssh/authorized_keys` file
on the CS server.

From now on, you won't need to enter a password to ssh to the CS server.

## Limitations/Warnings

Protect your private key. Anyone with your private key can log into your
account on the server.

Anyone with access to the account that stores your private key will be
able to log into the server. Don't allow that to happen!

