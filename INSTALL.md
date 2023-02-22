# Installation Guide
> This is the **Installation Guide** file for [superbet-bot]([https://github.com/suriyaa/keylogger](https://github.com/marian010/superbet-bot)).

## Requirements
  - Node.js (tested on v16.15.1)
  - git command-line tools
  - A text editor (i.e [VSCode](https://code.visualstudio.com/))
  - Google Chrome
  - A Discord account & a discord bot
  - A SuperBet account

## Install Node.js

- Install [Node.js](https://nodejs.org/en/download)
- Test your Node.js installation: First open a terminal (in Windows, you can do `WIN + R` then type `cmd` and hit `ENTER`), then type `node -v` and you should see something like `v16.15.1`.

## Install git

- Install [git](https://git-scm.com/downloads)
- Test your git installation: First open a terminal (in Windows, you can do `WIN + R` then type `cmd` and hit `ENTER`), then type `git --version` and you should see something like `git version 2.30.0.windows.2`.


# Getting started

1. Clone this repository using git

- Open a terminal (in Windows, you can do `CTRL + R` then type `cmd` and hit `ENTER`)
- Enter the following:

`git clone https://github.com/marian010/superbet-bot.git`

2. Make sure you are in the bot directory within the terminal

`cd superbet-bot`

3. Install the Node.js dependencies

`npm install`

4. Copy .env.example file as .env using:

`cp .env.example .env`

5. [Create and Invite your discord bot](https://discordpy.readthedocs.io/en/stable/discord.html)

6. Using a text editor (or using the terminal `nano .env`), edit the .env file with your details

7. Run the bot

Once you've configured the bot, you can run it

`node index.js` OR `npm run start`

8. Spin the wheel using `/spin` command
