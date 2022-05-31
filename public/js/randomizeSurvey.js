const numQuestions = 10; //change number if changing amount of questions
const numAnswers = 4; //change number if changing amount of answers
let numQuestionsRemaining = 10; //should equal the number in numQuestions
let questions = ["<label>What color is Mr Yee color blind to?</label> <br>",
                  "<label>What kind of car does Mr Yee drive?</label> <br>",
                  "<label>On halloween, who does Mr Yee invite as a substitute teacher?</label> <br>",
                  "<label>What University did Mr Yee attend?</label> <br>",
                  "<label>What class is Mr Yee's favorite class to teach?</label> <br>",
                  "<label>What is Mr Yee's favorite animal?</label> <br>",
                  "<label>What name does Mr Yee most commonly use for his objects when coding?</label> <br>",
                  "<label>What is Mr Yee's favorite sport?</label> <br>",
                  "<label>What is Mr. Yee's favorite food (at the time this question was asked)?</label> <br>",
                  "<label>What is Mr Yee's punishment?</label> <br>"];

let answers = [
               ["<input type=radio id=1 name=q1 value=0131304011>" + "<label for=q1>Blue-Green</label>",
                "<input type=radio id=2 name=q1 value=0440204421>" + "<label for=q1>Black-White</label>",
                "<input type=radio id=3 name=q1 value=4130304011>" + "<label for=q1>Yellow-Red</label>",
                "<input type=radio id=4 name=q1 value=0130340013>" + "<label for=q1>Yellow-Green</label>"],

               ["<input type=radio id=1 name=q2 value=0140304413>" + "<label for=q2>Toyota</label>",
                "<input type=radio id=2 name=q2 value=4130204011>" + "<label for=q2>Mercedes</label>",
                "<input type=radio id=3 name=q2 value=0131300011>" + "<label for=q2>Honda</label>",
                "<input type=radio id=4 name=q2 value=0430344021>" + "<label for=q2>Mini Cooper</label>"],

               ["<input type=radio id=1 name=q3 value=4440204011>" + "<label for=q3>Fred</label>",
                "<input type=radio id=2 name=q3 value=0130304413>" + "<label for=q3>Mr Yee's twin</label>",
                "<input type=radio id=3 name=q3 value=0130300011>" + "<label for=q3>Computer Science Man</label>",
                "<input type=radio id=4 name=q3 value=0131344021>" + "<label for=q3>Yoda</label>"],

               ["<input type=radio id=1 name=q4 value=4130304011>" + "<label for=q4>Cal State San Marcos</label>",
                "<input type=radio id=2 name=q4 value=0130200023>" + "<label for=q4>UC San Diego</label>",
                "<input type=radio id=3 name=q4 value=0431304011>" + "<label for=q4>Harvard</label>",
                "<input type=radio id=4 name=q4 value=0140344411>" + "<label for=q4>Brown University</label>"],

               ["<input type=radio id=1 name=q5 value=0430204411>" + "<label for=q5>Doesnt wanna say</label>",
                "<input type=radio id=2 name=q5 value=0130304011>" + "<label for=q5>Computer Science 2</label>",
                "<input type=radio id=3 name=q5 value=0140300013>" + "<label for=q5>Game Programming</label>",
                "<input type=radio id=4 name=q5 value=4131344021>" + "<label for=q5>Web Programming</label>"],

               ["<input type=radio id=1 name=q6 value=4140304411>" + "<label for=q6>Koala</label>",
                "<input type=radio id=2 name=q6 value=0430204011>" + "<label for=q6>Lion</label>",
                "<input type=radio id=3 name=q6 value=0131300013>" + "<label for=q6>Elephant</label>",
                "<input type=radio id=4 name=q6 value=0130344021>" + "<label for=q6>Dog</label>"],

               ["<input type=radio id=1 name=q7 value=0130300413>" + "<label for=q7>Ann</label>",
                "<input type=radio id=2 name=q7 value=0131304021>" + "<label for=q7>Jojo</label>",
                "<input type=radio id=3 name=q7 value=4140304011>" + "<label for=q7>Quadangle Bingledingle Fardillius IV</label>",
                "<input type=radio id=4 name=q7 value=0430244011>" + "<label for=q7>Fred</label>"],

               ["<input type=radio id=1 name=q8 value=0140204011>" + "<label for=q8>Golf</label>",
                "<input type=radio id=2 name=q8 value=4430304013>" + "<label for=q8>Volleyball</label>",
                "<input type=radio id=3 name=q8 value=0130300411>" + "<label for=q8>Soccer</label>",
                "<input type=radio id=4 name=q8 value=0131344021>" + "<label for=q8>Basketball</label>"],

               ["<input type=radio id=1 name=q9 value=0140204011>" +"<label for=q9>Burger</label>",
                "<input type=radio id=2 name=q9 value=4430304013>" +"<label for=q9>Miso Soup</label>",
                "<input type=radio id=3 name=q9 value=0130300411>" +"<label for=q9>Spaghetti</label>",
                "<input type=radio id=4 name=q9 value=0131344021>" +"<label for=q9>Steak</label>"],

               ["<input type=radio id=1 name=q10 value=0130300011>" + "<label for=q10>Taking you outside</label>",
                "<input type=radio id=2 name=q10 value=0140204013>" + "<label for=q10>Mr Yee's clubs</label>",
                "<input type=radio id=3 name=q10 value=4430304411>" + "<label for=q10>Mr Yee loves all punishments equally</label>",
                "<input type=radio id=4 name=q10 value=0131344021>" + "<label for=q10>Mr Yee has no punishments.</label>"]
              ];

function getQuestions(index) {
  let taken = 0;
  let answerOrder = "";
  for(let i=0;i<numAnswers;i++) {
    let tempNum = Math.floor(Math.random() * (numAnswers-taken));
    answerOrder += answers[index][tempNum];
    answers[index].splice(tempNum,1);
    taken++;
  }

  return (questions[index] + "<br>" + answerOrder + "<br><br><br>");
}

function randomQuestion(num) {
  num++;
  let tempNum = Math.floor(Math.random() * (numQuestionsRemaining));
  let returnVal = (num + ". " + getQuestions(tempNum));
  questions.splice(tempNum,1);
  answers.splice(tempNum,1);
  numQuestionsRemaining--;

  return returnVal;
}


$(document).ready(function(){
  for(let i=0;i<numQuestions;i++) {
    $("#messages").append(randomQuestion(i));
  }

});
