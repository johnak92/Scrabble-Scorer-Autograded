// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }



function initialPrompt() {
    let wordToScore = input.question("Let's play some scrabble! Enter a word:");
    return wordToScore;
}

let newPointStructure = transform(oldPointStructure);
function transform(oldPointStructure){
   let newObject = {};
   for (let pointValue in oldPointStructure) {
      for (let index = 0; index < oldPointStructure[pointValue].length; index++){
   newObject[(oldPointStructure[pointValue][index]).toLowerCase()] = Number(pointValue)
      
      }
   }
 
   return newObject 
};

let simpleScorer = (userInput) => {
   return userInput.length;
};



let vowelBonusScorer = (userInput) => {
   let score = 0;
   for (let index = 0; index < userInput.length; index++){
      let acceptedVowels = ["A", "E", "I", "O", "U"]
      if (acceptedVowels.includes(userInput[index].toUpperCase())){
         score += 3;
         
      } else {
         score += 1;
      }

   } 
   return score;
};


let scrabbleScorer = (userInput) => {
   let score = 0;
   for (let index = 0; index < userInput.length; index++){
      let letter = userInput[index].toLowerCase();
      newPointStructure[letter];
      score += newPointStructure[letter];
   }
   return score;
}


const scoringAlgorithms = [
   { name: "Simple Score", 
     description: "Each letter is worth 1 point.", 
     scorerFunction: simpleScorer},
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Classic Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   },
];

function scorerPrompt(wordToScore) {
   const desiredScoringMethod = input.question("Which scoring algorithm would you like to use?: \n0 - Simple Score\n1 - Vowel Bonus\n2 - Classic Scrabble\n Enter 0, 1, 2: ")
      if (desiredScoringMethod === "0"){
         console.log("Score for " + `${wordToScore}` +  ": " + scoringAlgorithms[0].scorerFunction(wordToScore))
         return scoringAlgorithms[0].scorerFunction;
      } else if (desiredScoringMethod === "1") {
         console.log("Score for " + `${wordToScore}` +  ": " + scoringAlgorithms[1].scorerFunction(wordToScore))
         return scoringAlgorithms[0].scorerFunction;
      } else if (desiredScoringMethod === "2") {
         console.log("Score for " + `${wordToScore}` +  ": " + scoringAlgorithms[2].scorerFunction(wordToScore))
         return scoringAlgorithms[0].scorerFunction;
      }
}


function runProgram() {
   let wordToScore = initialPrompt();
   scorerPrompt(wordToScore);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
