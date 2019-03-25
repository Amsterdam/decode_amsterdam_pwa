server_keys = read_json(KEYS)

curve = "ed25519"
user_key = ECDH.keygen(curve)

payload = {}
payload['data'] = DATA

header = {}
-- user public key is added in order for server to check signature
header['pub_key'] = user_key:public():base64()

-- payload is encrypted with server public key so only server can read it with own private key
-- header is signed? so server can check it with added public key? 
output = encrypt(user_key, base64(server_keys.public), msgpack(payload), msgpack(header))
output = map(output, O.to_base64)
output.zenroom = VERSION
output.encoding = 'base64'
output.curve = curve

print(JSON.encode(output))
