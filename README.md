# Decode Amsterdam PWA

The Decode Amsterdam project provides a prototype to kick start a (primitive) Digital Identity.

In this repository you'll find the source code to the PWA (Progressive Web App) that has two main functions.
First of all it is used as a wallet to store personal information. Secondly a request to disclose this personal information can be generated.

**Important note:**
This project was created as a proof of concept prototype. There for it was never meant to be used on a large scale but for demonstration purposes only.
  
The Decode Amsterdam project excites of two other parts which are needed to take full potential of this app:

* [Passport Scanner](https://github.com/Amsterdam/decode_passport_scanner) (Reading a Dutch passport and transferring its data to this PWA)
* [Session Manager](https://github.com/Amsterdam/decode_session_manager) (Managing sessions for onboarding and disclosure)


## Project setup

In order the run this project locally and request an attribute disclosure or initialize a digital identity you first need to run a [Session Manager](https://github.com/Amsterdam/decode_session_manager). The location to this Session Manager can be set up using the `VUE_APP_API` variable in the `.env.development` file.

When this is setup you can further setup the project:

```
npm install
```

Run the project locally:

```
npm run serve
```

Build for production:
```
npm run build
```
