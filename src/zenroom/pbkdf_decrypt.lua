----- Symmetric encryption (AES-GCM/AEAD) using PBKDF2

-- This example demonstrates how to take a secret and encrypt it using
-- a single password, even a small 4 digit PIN.

secrets = JSON.decode(KEYS)

ecdh = ECDH.new()
key = ECDH.pbkdf2(ecdh, str(secrets.pin), str(secrets.salt), secrets.kdf_iterations, 32)

-- receiver's stage
-- pin is again provided, kdf is ran so secret key is there

data = JSON.decode(DATA)
cipher = map(data, hex)

local decode = { header = cipher.header }
decode.text, decode.checksum =
   ECDH.decrypt(key, cipher.text,
                     cipher.iv, cipher.header)

-- print(cipher.checksum, decode.checksum)

-- this needs to be checked, can also be in the host application
-- if checksums are different then the data integrity is corrupted
assert(decode.checksum == cipher.checksum)

-- print(decode.header:str()
print(decode.text:str())