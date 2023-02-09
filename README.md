# SuperBet Wheel Spin Bot

A simple [superbet.ro wheel spin](https://superbet.ro) bot that spins the wheel and generates an image of the winnings.

### Prerequisites

- Node.js (tested on v16.15.1)
- git command-line tools
- A text editor (i.e [VSCode](https://code.visualstudio.com/))
- Google Chrome
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

5. Using a text editor (or using the terminal `nano .env`), edit the .env file with your account credentials

6. Run the bot

Once you've configured the bot, you can run it

`npm run spin`

## Built With

  - [Node.js]((https://nodejs.org/en/))
  - [Puppeteer]((https://pptr.dev/))


Have fun!
