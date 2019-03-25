data = read_json(DATA)
keys = read_json(KEYS)

header = msgunpack(base64(data.header))

internal_key = ECDH.new()
internal_key:private(base64(keys.private))

payload = decrypt(internal_key, base64(header.pub_key), map(data, base64))

print(JSON.encode(msgunpack(payload.text)))
