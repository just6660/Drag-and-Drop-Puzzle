//remove indent class and try to disable the indent from moving around
(async () => {
  //read in the json files for puzzle and solution
  const puzzleObject = await fetch("./puzzle.json").then((response) =>
    response.json()
  );
  const solutionObject = await fetch("./solution.json").then((response) =>
    response.json()
  );

  //select the puzzle and solution html sections
  const puzzleSection = document.querySelector(".puzzle-section");
  const solutionSection = document.querySelector(".solution-section");
  //create the puzzle using the data from puzzleObject
  puzzleObject.lines.forEach((elem, index) => {
    //create each line for puzzleSection
    const line = document.createElement("div");
    line.className = "line";
    line.dataset.indentation = 0;

    //make lines for the solutionSection
    const solutionLine = line.cloneNode();
    //allow for indentation using nested class
    solutionLine.className = "line nested";
    const indentDiv = document.createElement("div");
    indentDiv.className = "nested indent-nested";
    /*
    const nestedDiv = document.createElement("div");
    indentDiv.className = "indent";
    */
    //nestedDiv.className = "nested indent-nested";
    //indentDiv.appendChild(nestedDiv);
    solutionLine.appendChild(indentDiv);
    solutionSection.appendChild(solutionLine);

    //append tokens to each line
    puzzleObject.lines[index].tokens.forEach((elem, index1) => {
      const token = document.createElement("div");
      token.className = "token";
      token.dataset.text = elem.text;
      token.dataset.type = elem.type;
      token.textContent = elem.text;
      line.append(token);
    });
    puzzleSection.appendChild(line);
  });
  //create an array of the lines from puzzleSection and solutionSection
  const arr = Array.from(puzzleSection.children);

  //make drag and drop functionality using sortableJS
  for (let i = 0; i < arr.length; i++) {
    new Sortable(arr[i], {
      group: "shared",
      group: "nested",
      animation: 350,
      fallbackOnBody: true,
      swapThresold: 0.65,
    });
  }
  let indentHidden = false;
  const nested = document.querySelectorAll(".nested");
  const nestedLines = document.getElementsByClassName("line nested");
  const indentElements = document.getElementsByClassName("indent-nested");
  for (let i = 0; i < nested.length; i++) {
    new Sortable(nested[i], {
      group: "shared",
      group: "nested",
      animation: 150,
      fallbackOnBody: true,
      invertSwap: true,
      swapThreshold: 0.65,
      onChange: (evt) => {
        //if the last element from an indent is removed, then the line is no longer indented
        for (let i = 0; i < indentElements.length; i++) {
          if (indentElements[i].childElementCount == 0) {
            nestedLines[i].dataset.indentation = 0;
          }
        }
      },
      onAdd: (evt) => {
        for (let i = 0; i < indentElements.length; i++) {
          //changes line data-indentation to 1 if it is indented
          if (
            evt.to == indentElements[i] ||
            indentElements[i].childElementCount > 0
          ) {
            nestedLines[i].dataset.indentation = 1;
          }
          //don't allow user to indent if the line has more than 1 child and it is not indented
          if (
            nestedLines[i].childElementCount > 1 &&
            nestedLines[i].dataset.indentation == 0
          ) {
            indentElements[i].classList.add("hide");
          }
          //if the line is already indented, force the next element to be indented too
          if (
            evt.to == nestedLines[i] &&
            nestedLines[i].dataset.indentation == 1
          ) {
            indentElements[i].appendChild(evt.item);
          }
        }
      },
      onChoose: (evt) => {
        for (let i = 0; i < indentElements.length; i++) {
          if (nestedLines[i].childElementCount == 2) {
            indentElements[i].classList.remove("hide");
          }
        }
      },
      onUnchoose: (evt) => {
        for (let i = 0; i < indentElements.length; i++) {
          if (
            nestedLines[i].childElementCount > 1 &&
            nestedLines[i].dataset.indentation == 0
          ) {
            indentElements[i].classList.add("hide");
          }
        }
      },
    });
  }

  //check solution
  const submitBtn = document.querySelector(".submit-btn");
  const testSolution = {
    lines: [],
  };
  submitBtn.addEventListener("click", () => {
    testSolution.lines.splice(0, testSolution.lines.length);
    for (let i = 0; i < nestedLines.length; i++) {
      let lineObject = {};
      let tokensArr = [];
      let tempTokensArr = [];
      let tokenParent = nestedLines;
      lineObject["indentations"] = parseFloat(
        nestedLines[i].dataset.indentation
      );
      if (lineObject["indentations"] == 1) {
        tokenParent = indentElements;
      }
      let index = 0;
      while (tokenParent[i].children[index] != undefined) {
        if (tokenParent[i].children[index].classList == "token") {
          tempTokensArr.push(tokenParent[i].children[index]);
        }
        index++;
      }
      for (let i = 0; i < tempTokensArr.length; i++) {
        let tempObject = {};
        tempObject["text"] = tempTokensArr[i].dataset.text;
        if (tempTokensArr[i].dataset.type != "undefined")
          tempObject["type"] = tempTokensArr[i].dataset.type;
        tokensArr.push(tempObject);
      }

      lineObject["tokens"] = tokensArr;
      testSolution.lines.push(lineObject);
    }
    console.log(JSON.stringify(testSolution));
    console.log(JSON.stringify(solutionObject));
    if (JSON.stringify(testSolution) === JSON.stringify(solutionObject))
      console.log("Yes");
    else console.log("no");
  });
})();
