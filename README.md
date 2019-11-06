# Decode Amsterdam PWA

The Decode Amsterdam project provides a prototype to kick start a Digital Identity.

In this repository you'll find the source code to the PWA (Progressive Web App) that has two main functions.
First of all it is used as a wallet to store personal information. Secondly a request to disclose this personal information can be generated.

**Important note:**
This project was created as a proof of concept prototype. There for it was never meant to be used on a large scale but for demonstration purposes only.
  
The Decode Amsterdam project excites of two other parts which are needed to take full potential of this app:

* [Passport Scanner](https://github.com/Amsterdam/decode_passport_scanner) (Reading a Dutch passport and transferring its data to this PWA)
* [Session Manager](https://github.com/Amsterdam/decode_session_manager) (Managing sessions for onboarding and disclosure)

### Requirements

- Docker
- docker-compose
- node v8.10.0
- nvm (optional)

### Run for development

1) Get Decode Session Manager code into stack folder
```
$ git clone https://github.com/Amsterdam/decode_session_manager
```

2) Build PWA for development
```
$ npm install (only tested with node v8.10.0)
$ npm run builddev
```

4) Run docker compose dev file
```
$ docker-compose up -d
```

5) Interact with web app at http://localhost:8080
