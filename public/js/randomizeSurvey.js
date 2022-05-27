const numQuestions = 10; //change number if changing amount of questions
const numAnswers = 4; //change number if changing amount of answers
let numQuestionsRemaining = 10; //should equal the number in numQuestions
let questions = ["<label>What is beef?</label> <br>",
                  "<label>What is chicken?</label> <br>",
                  "<label>What is pork?</label> <br>",
                  "<label>How good is beef?</label> <br>",
                  "<label>How good is chicken?</label> <br>",
                  "<label>How good is pork?</label> <br>",
                  "<label>Where is beef eaten?</label> <br>",
                  "<label>Where is chicken eaten?</label> <br>",
                  "<label>Where is pork eaten?</label> <br>",
                  "<label>How much do you like eating?</label> <br>"];

let answers = [
               ["<input type=radio id=1 name=q1 value=0131304011>" + "<label for=q1>0</label>",
                "<input type=radio id=2 name=q1 value=0440204421>" + "<label for=q1>0</label>",
                "<input type=radio id=3 name=q1 value=4130304011>" + "<label for=q1>0</label>",
                "<input type=radio id=4 name=q1 value=0130340013>" + "<label for=q1>4</label>"],

               ["<input type=radio id=1 name=q2 value=0140304413>" + "<label for=q2>0</label>",
                "<input type=radio id=2 name=q2 value=4130204011>" + "<label for=q2>0</label>",
                "<input type=radio id=3 name=q2 value=0131300011>" + "<label for=q2>0</label>",
                "<input type=radio id=4 name=q2 value=0430344021>" + "<label for=q2>4</label>"],

               ["<input type=radio id=1 name=q3 value=4440204011>" + "<label for=q3>0</label>",
                "<input type=radio id=2 name=q3 value=0130304413>" + "<label for=q3>0</label>",
                "<input type=radio id=3 name=q3 value=0130300011>" + "<label for=q3>0</label>",
                "<input type=radio id=4 name=q3 value=0131344021>" + "<label for=q3>4</label>"],

               ["<input type=radio id=1 name=q4 value=4130304011>" + "<label for=q4>0</label>",
                "<input type=radio id=2 name=q4 value=0130200023>" + "<label for=q4>0</label>",
                "<input type=radio id=3 name=q4 value=0431304011>" + "<label for=q4>0</label>",
                "<input type=radio id=4 name=q4 value=0140344411>" + "<label for=q4>4</label>"],

               ["<input type=radio id=1 name=q5 value=0430204411>" + "<label for=q5>0</label>",
                "<input type=radio id=2 name=q5 value=0130304011>" + "<label for=q5>0</label>",
                "<input type=radio id=3 name=q5 value=0140300013" + "<label for=q5>0</label>",
                "<input type=radio id=4 name=q5 value=4131344021>" + "<label for=q5>4</label>"],

               ["<input type=radio id=1 name=q6 value=4140304411>" + "<label for=q6>0</label>",
                "<input type=radio id=2 name=q6 value=0430204011>" + "<label for=q6>0</label>",
                "<input type=radio id=3 name=q6 value=0131300013>" + "<label for=q6>0</label>",
                "<input type=radio id=4 name=q6 value=0130344021>" + "<label for=q6>4</label>"],

               ["<input type=radio id=1 name=q7 value=0130300413>" + "<label for=q7>0</label>",
                "<input type=radio id=2 name=q7 value=0131304021>" + "<label for=q7>0</label>",
                "<input type=radio id=3 name=q7 value=4140304011>" + "<label for=q7>0</label>",
                "<input type=radio id=4 name=q7 value=0430244011>" + "<label for=q7>4</label>"],

               ["<input type=radio id=1 name=q8 value=0140204011>" + "<label for=q8>0</label>",
                "<input type=radio id=2 name=q8 value=4430304013>" + "<label for=q8>0</label>",
                "<input type=radio id=3 name=q8 value=0130300411>" + "<label for=q8>0</label>",
                "<input type=radio id=4 name=q8 value=0131344021>" + "<label for=q8>4</label>"],

               ["<input type=radio id=1 name=q9 value=0140204011>" +"<label for=q9>0</label>",
                "<input type=radio id=2 name=q9 value=4430304013>" +"<label for=q9>0</label>",
                "<input type=radio id=3 name=q9 value=0130300411>" +"<label for=q9>0</label>",
                "<input type=radio id=4 name=q9 value=0131344021>" +"<label for=q9>4</label>"],

               ["<input type=radio id=1 name=q10 value=0130300011>" + "<label for=q10>0</label>",
                "<input type=radio id=2 name=q10 value=0140204013" + "<label for=q10>0</label>",
                "<input type=radio id=3 name=q10 value=4430304411>" + "<label for=q10>0</label>",
                "<input type=radio id=4 name=q10 value=0131344021>" + "<label for=q10>4</label>"]
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
