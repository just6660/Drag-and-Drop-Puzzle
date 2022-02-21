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
    //create each line
    const line = document.createElement("div");
    line.className = "line";
    line.dataset.indentation = 0;
    solutionSection.appendChild(line.cloneNode());

    //append tokens to each line
    puzzleObject.lines[index].tokens.forEach((elem, index1) => {
      const token = document.createElement("div");
      token.className = "token draggable";
      token.setAttribute("draggable", "true");
      token.dataset.text = elem.text;
      token.dataset.type = elem.type;
      token.textContent = elem.text;
      token.id = `${index}, ${index1}`;
      line.append(token);
    });
    puzzleSection.appendChild(line);
  });
  const arr = Array.from(puzzleSection.children);
  const arr1 = Array.from(solutionSection.children);
  for (let i = 0; i < 4; i++) {
    new Sortable(arr[i], {
      group: "nested",
      group: "shared",
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.9,
    });

    new Sortable(arr1[i], {
      group: "nested",
      group: "shared",
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.9,
    });
  }
})();
