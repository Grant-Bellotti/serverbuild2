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
               ["<input type=radio id=1 name=q1 value=1>" + "<label for=q1>1</label>",
                "<input type=radio id=2 name=q1 value=2>" + "<label for=q1>2</label>",
                "<input type=radio id=3 name=q1 value=3>" + "<label for=q1>3</label>",
                "<input type=radio id=4 name=q1 value=4>" + "<label for=q1>4</label>"],

               ["<input type=radio id=1 name=q2 value=1>" + "<label for=q2>1</label>",
                "<input type=radio id=2 name=q2 value=2>" + "<label for=q2>2</label>",
                "<input type=radio id=3 name=q2 value=3>" + "<label for=q2>3</label>",
                "<input type=radio id=4 name=q2 value=4>" + "<label for=q2>4</label>"],

               ["<input type=radio id=1 name=q3 value=1>" + "<label for=q3>1</label>",
                "<input type=radio id=2 name=q3 value=2>" + "<label for=q3>2</label>",
                "<input type=radio id=3 name=q3 value=3>" + "<label for=q3>3</label>",
                "<input type=radio id=4 name=q3 value=4>" + "<label for=q3>4</label>"],

               ["<input type=radio id=1 name=q4 value=1>" + "<label for=q4>1</label>",
                "<input type=radio id=2 name=q4 value=2>" + "<label for=q4>2</label>",
                "<input type=radio id=3 name=q4 value=3>" + "<label for=q4>3</label>",
                "<input type=radio id=4 name=q4 value=4>" + "<label for=q4>4</label>"],

               ["<input type=radio id=1 name=q5 value=1>" + "<label for=q5>1</label>",
                "<input type=radio id=2 name=q5 value=2>" + "<label for=q5>2</label>",
                "<input type=radio id=3 name=q5 value=3>" + "<label for=q5>3</label>",
                "<input type=radio id=4 name=q5 value=4>" + "<label for=q5>4</label>"],

               ["<input type=radio id=1 name=q6 value=1>" + "<label for=q6>1</label>",
                "<input type=radio id=2 name=q6 value=2>" + "<label for=q6>2</label>",
                "<input type=radio id=3 name=q6 value=3>" + "<label for=q6>3</label>",
                "<input type=radio id=4 name=q6 value=4>" + "<label for=q6>4</label>"],

               ["<input type=radio id=1 name=q7 value=1>" + "<label for=q7>1</label>",
                "<input type=radio id=2 name=q7 value=2>" + "<label for=q7>2</label>",
                "<input type=radio id=3 name=q7 value=3>" + "<label for=q7>3</label>",
                "<input type=radio id=4 name=q7 value=4>" + "<label for=q7>4</label>"],

               ["<input type=radio id=1 name=q8 value=1>" + "<label for=q8>1</label>",
                "<input type=radio id=2 name=q8 value=2>" + "<label for=q8>2</label>",
                "<input type=radio id=3 name=q8 value=3>" + "<label for=q8>3</label>",
                "<input type=radio id=4 name=q8 value=4>" + "<label for=q8>4</label>"],

               ["<input type=radio id=1 name=q9 value=1>" +"<label for=q9>1</label>",
                "<input type=radio id=2 name=q9 value=2>" +"<label for=q9>2</label>",
                "<input type=radio id=3 name=q9 value=3>" +"<label for=q9>3</label>",
                "<input type=radio id=4 name=q9 value=4>" +"<label for=q9>4</label>"],

               ["<input type=radio id=1 name=q10 value=1>" + "<label for=q10>1</label>",
                "<input type=radio id=2 name=q10 value=2>" + "<label for=q10>2</label>",
                "<input type=radio id=3 name=q10 value=3>" + "<label for=q10>3</label>",
                "<input type=radio id=4 name=q10 value=4>" + "<label for=q10>4</label>"]
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
