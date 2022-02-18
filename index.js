/*
var puzzleObject = {};
const solutionObject = {};

fetch("puzzle.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    puzzleObject = { ...puzzleObject, ...data };
  });

fetch("solution.json")
  .then((response) => response.json())
  .then((data) => {
    Object.assign(solutionObject, data);
  });

console.log(puzzleObject);

const test = {
  cars: 1,
};
console.log(test);
*/

const puzzleObject = {
  lines: [
    {
      indentations: 0,
      tokens: [
        {
          text: "(",
          type: "operator",
        },
        {
          text: "print",
          type: "built-in-function",
        },
        {
          text: " + ",
          type: "operator",
        },
        {
          text: ")",
          type: "operator",
        },
        {
          text: "str({input})",
          type: "built-in-function",
        },
        {
          text: "{input}",
        },
      ],
    },
    {
      indentations: 0,
      tokens: [
        {
          text: " = ",
          type: "operator",
        },
        {
          text: "{input}",
        },
        {
          text: "count",
          type: "user-defined-variable",
        },
      ],
    },
    {
      indentations: 0,
      tokens: [
        {
          text: "0",
          type: "number",
        },
        {
          text: " = ",
          type: "operator",
        },
        {
          text: "count",
          type: "user-defined-variable",
        },
      ],
    },
    {
      indentations: 0,
      tokens: [
        {
          text: "while",
          type: "keyword",
        },
        {
          text: "{input}",
        },
        {
          text: ":",
          type: "operator",
        },
      ],
    },
  ],
};

const solutionObject = {
  lines: [
    {
      indentations: 0,
      tokens: [
        {
          text: "count",
          type: "user-defined-variable",
        },
        {
          text: " = ",
          type: "operator",
        },
        {
          text: "0",
          type: "number",
        },
      ],
    },
    {
      indentations: 0,
      tokens: [
        {
          text: "while",
          type: "keyword",
        },
        {
          text: "{input}",
        },
        {
          text: ":",
          type: "operator",
        },
      ],
    },
    {
      indentations: 1,
      tokens: [
        {
          text: "print",
          type: "built-in-function",
        },
        {
          text: "(",
          type: "operator",
        },
        {
          text: "{input}",
        },
        {
          text: " + ",
          type: "operator",
        },
        {
          text: "str({input})",
          type: "built-in-function",
        },
        {
          text: ")",
          type: "operator",
        },
      ],
    },
    {
      indentations: 1,
      tokens: [
        {
          text: "count",
          type: "user-defined-variable",
        },
        {
          text: " = ",
          type: "operator",
        },
        {
          text: "{input}",
        },
      ],
    },
  ],
};

const puzzleSection = document.querySelector(".puzzle-section");

puzzleObject.lines.forEach((elem, index) => {
  //create each line
  const line = document.createElement("div");
  line.className = "line";
  line.dataset.indentation = 0;

  //append tokens to each line
  puzzleObject.lines[index].tokens.forEach((elem) => {
    const token = document.createElement("div");
    token.className = "token";
    token.dataset.text = elem.text;
    token.dataset.type = elem.type;
    token.textContent = elem.text;
    line.append(token);
  });

  puzzleSection.appendChild(line);
});
