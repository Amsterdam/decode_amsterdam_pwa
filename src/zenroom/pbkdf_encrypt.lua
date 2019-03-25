----- Symmetric encryption (AES-GCM/AEAD) using PBKDF2

-- This example demonstrates how to take a secret and encrypt it using
-- a single password, even a small 4 digit PIN.

secrets = JSON.decode(KEYS)

ecdh = ECDH.new()
key = ECDH.pbkdf2(ecdh, str(secrets.pin), str(secrets.salt), secrets.kdf_iterations, 32)

rng = RNG.new()
local cipher = { header = str("my header"),
				 iv = rng:octet(16) }
cipher.text, cipher.checksum =
   ECDH.encrypt(key, str(secrets.text),
					 cipher.iv, cipher.header)


output = map(cipher, hex)
print(JSON.encode(output))