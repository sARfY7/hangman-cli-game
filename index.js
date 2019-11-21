const chalk = require("chalk");
const fs = require("fs");
const rl = require("readline");
const log = console.log;

input = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const words = [
  "ward",
  "challenge",
  "affect",
  "correspond",
  "sow",
  "Europe",
  "environment",
  "rack",
  "unrest",
  "deliver",
  "biography",
  "pilot",
  "fault",
  "difficulty",
  "royalty",
  "strange",
  "shift",
  "impulse",
  "style",
  "rider",
  "form",
  "possible",
  "bait",
  "chalk",
  "tank",
  "communication",
  "disturbance",
  "cower",
  "achieve",
  "long",
  "integration",
  "voice",
  "application",
  "hall",
  "resource",
  "choke",
  "curve",
  "bless",
  "heroin",
  "express",
  "retirement",
  "difficult",
  "shark",
  "advertise",
  "robot",
  "adopt",
  "location",
  "relax",
  "boat",
  "mail",
  "chimpanzee",
  "choose",
  "cold",
  "retain",
  "fist",
  "cabin",
  "misplace",
  "identity",
  "fluctuation",
  "fine",
  "pioneer",
  "banquet",
  "strap",
  "proclaim",
  "sweater",
  "conservation",
  "initiative",
  "ivory",
  "criminal",
  "highlight",
  "cell",
  "spare",
  "carrot",
  "rich",
  "blonde",
  "glimpse",
  "workshop",
  "ridge",
  "introduction",
  "pursuit",
  "cup",
  "personal",
  "discover",
  "respect",
  "throne",
  "summit",
  "grief",
  "margin",
  "overcharge",
  "plagiarize",
  "money",
  "steep",
  "live",
  "intermediate",
  "hot",
  "immune",
  "please",
  "unlawful",
  "dozen"
];

const consoleWidth = process.stdout.columns;

const printSplash = n => {
  const splash = fs.readFileSync(`./splash/splash${n}.txt`, {
    encoding: "utf-8"
  });
  log(splash);
};

const generateRandomWord = maxValue => {
  return words[Math.floor(Math.random() * maxValue)];
};

const concealWord = word => {
  let concealedWord = "";
  for (let i = 0; i < word.length; i++) {
    concealedWord += "-";
  }
  return concealedWord;
};

const replaceAt = (string, index, replace) => {
  return string.substring(0, index) + replace + string.substring(index + 1);
};

const prettyPrint = string => {
  let prettyString = "";
  for (let i = 0; i < string.length; i++) {
    prettyString += ` ${string[i]} `;
  }
  return prettyString;
};

const checkCharacter = (char, word, concealedWord) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === char) {
      concealedWord = replaceAt(concealedWord, i, char);
    }
  }
  return concealedWord;
};

const printError = err => {
  log(chalk.bgRed.black(err));
};

const printToCenter = (string, addRestOfTheSpaces = true) => {
  const stringLength = string.length;
  let newString = "";
  for (let i = 0; i < (consoleWidth - stringLength) / 2; i++) {
    newString += " ";
  }
  newString += string;
  if (addRestOfTheSpaces) {
    const end = stringLength % 2 == 0 ? consoleWidth : consoleWidth - 1;
    for (
      let i = (consoleWidth - stringLength) / 2 + stringLength;
      i < end;
      i++
    ) {
      newString += " ";
    }
  }
  return newString;
};

const startGame = () => {
  let word = generateRandomWord(words.length).toLowerCase();
  let concealedWord = concealWord(word);
  let usedUpChars = [];
  let tries = 0;
  console.clear();
  printSplash(tries);
  log(chalk.bgYellow.black(printToCenter(prettyPrint(concealedWord))));
  input.setPrompt(printToCenter("Guess Word: ", false));
  input.prompt();
  input.on("line", data => {
    console.clear();
    if (data.length > 1) {
      printSplash(tries);
      printError(
        printToCenter(
          "TOO_MANY_CHARACTERS_ERROR: Enter one character at a time."
        )
      );
      log(chalk.bgWhite.black(printToCenter(`Used Chars: ${usedUpChars}`)));
      log(chalk.bgYellow.black(printToCenter(prettyPrint(concealedWord))));
      return input.prompt();
    } else if (data.length === 0) {
      printSplash(tries);
      printError(printToCenter("NO_CHARACTER_ERROR: Enter a character."));
      log(chalk.bgWhite.black(printToCenter(`Used Chars: ${usedUpChars}`)));
      log(chalk.bgYellow.black(printToCenter(prettyPrint(concealedWord))));
      return input.prompt();
    } else if (usedUpChars.indexOf(data) !== -1) {
      printSplash(tries);
      printError(
        printToCenter(
          "CHARACTER_ALREADY_GUESSED_ERROR: Enter a different character."
        )
      );
      log(chalk.bgWhite.black(printToCenter(`Used Chars: ${usedUpChars}`)));
      log(chalk.bgYellow.black(printToCenter(prettyPrint(concealedWord))));
      return input.prompt();
    } else if (tries === 6 && word.indexOf(data) === -1) {
      console.clear();
      printSplash(tries + 1);
      log(chalk.bgMagenta.black(printToCenter("GAME OVER")));
      process.exit(0);
    }
    if (word.indexOf(data) === -1) {
      tries += 1;
    }
    usedUpChars.push(data);
    printSplash(tries);
    log(chalk.bgWhite.black(printToCenter(`Used Chars: ${usedUpChars}`)));
    concealedWord = checkCharacter(data, word, concealedWord);
    if (concealedWord.indexOf("-") === -1) {
      console.clear();
      printSplash(tries);
      log(chalk.bgGreen.black(printToCenter("You Guessed it right.")));
      process.exit(0);
    }
    log(chalk.bgYellow.black(printToCenter(prettyPrint(concealedWord))));
    input.prompt();
  });
};

startGame();
