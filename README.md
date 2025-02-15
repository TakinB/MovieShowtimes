# About

This repository is a web app created by me using the following technolgies.
The app uses a free API to get the movies that are currently playing.

## Technologies used:

1. React
1. Vite (used to create the React App)
1. Tailwind CSS [removed]
1. use-query
1. Gen AI API (OpenAI)

# Developer's Guide

## How to get this running on your machine:

Please follow these steps to make this app running on your local machine.

1.  Get API access to a movie API provider.

- I have tried two different API provider

  - https://developer.themoviedb.org/

  - https://developer.movieglu.com/

        Unfortunately the second provider did not have thorough documentations and I didn't manage to make it work. So I used the first proder.

2.  Create an account on https://developer.themoviedb.org/

    1.1. After verifying your email,log in to your account

    1.2. Navigate to Profile -> Settings -> API

    1.3. Copy the API Access Token

1.  Rename .env.example file to .env
1.  Paste your token in the .env file (This is gitignored so won't be commited.)
1.  Log in to OpenAI and add credit to your billing account and generate an API key.
1.  PAste that key in the .env file as well.
1.  Make sure you have Node installed. [Here](https://github.com/nvm-sh/nvm) is a guide how to install it using nvm.
1.  on the root directory run:
    `npm install`
1.  After the packages are installed, run:
    `npm run dev`
1.  The previous step, opens the app on `http://localhost:5173/`
1.  Please report any bugs in the documentation or the code to me, I'd love to make this better!

## Folder structure:

```
---src
    |_components
    |
    |_helpers
        |_MovieAPIHelper
        |_OpenAiHelper
        |_fakeAPI
```

- src

  - **components**: This is the folder containing all the components (jsx and css)
  - **helpers**
    - **MovieAPIHelper**: This is the service helpers for movie API which returns a useQuery
    - **OpenAiHelper**: This is the services helpers for OpenAI API which returns a useQuery
    - **fakeAPI**: this is a fake json payload which will be appended to the api response in ListView.jsx. This adds the movie "Fight Club" to the list of movies. The reason for adding a customised payload to existing API response is that there are more reviews for older movies and LLM has a historical knowledge around them (less likely that the LLM response will be hollucination for a demo)
