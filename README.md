# About

This repository is a web app created by me using the following technolgies.
The app uses a free API to get the movies that are currently playing.

## Technologies used:

1. React
1. Vite (used to create the React App)
1. Tailwind CSS

# Developer Guide

Please follow these steps to make this app running on your local machine.

1.  I have tried two different API provider
    1.1. https://developer.themoviedb.org/
    1.2. https://developer.movieglu.com/

        Unfortunately the second provider did not have thorough documentations and I didn't manage to make it work. So I used the first proder.

1.  Create an account on https://developer.themoviedb.org/ and get api token.
1.  Rename .env.example file to .env
1.  Replace your token in the .env file (This is gitignored so won't be commited.)
1.  Make sure you have Node installed. [Here](https://github.com/nvm-sh/nvm) is a guide how to install it using nvm.
1.  on the root directory run:
    `npm install`
1.  After the packages are installed, run:
    `npm run dev`
1.  The previous step, opens the app on `http://localhost:5173/`
1.  Please report any bugs in the documentation or the code to me, I'd love to make this better!
