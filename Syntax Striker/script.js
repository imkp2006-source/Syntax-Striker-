/* =========================================================
   SYNTAX STRIKER
   Dynamic Programming Crossword
   ========================================================= */


/* ================= WORD BANKS ================= */

const wordBanks = {

    c: [
        { word: "INT", clue: "A data type used for whole numbers." },
        { word: "CHAR", clue: "A data type used to store a single character." },
        { word: "FLOAT", clue: "A data type used for decimal numbers." },
        { word: "DOUBLE", clue: "A data type for double-precision decimal values." },
        { word: "VOID", clue: "Indicates that a function returns no value." },
        { word: "WHILE", clue: "A loop that repeats while a condition is true." },
        { word: "FOR", clue: "A loop commonly used when the number of iterations is known." },
        { word: "SWITCH", clue: "A selection statement used for multiple cases." },
        { word: "RETURN", clue: "Keyword used to send a value back from a function." },
        { word: "STRUCT", clue: "Used to create a custom group of variables." },
        { word: "BREAK", clue: "Keyword used to exit a loop or switch." },
        { word: "CONST", clue: "Used to declare a value that cannot be changed." }
    ],

    cpp: [
        { word: "INT", clue: "A data type used for whole numbers." },
        { word: "CHAR", clue: "A data type used for a single character." },
        { word: "FLOAT", clue: "A data type used for decimal numbers." },
        { word: "BOOL", clue: "A data type representing true or false." },
        { word: "VOID", clue: "Indicates that a function returns no value." },
        { word: "CLASS", clue: "A blueprint used to create objects." },
        { word: "VECTOR", clue: "A dynamic array provided by the C++ STL." },
        { word: "CONST", clue: "Keyword used for values that should not change." },
        { word: "WHILE", clue: "A loop that runs while a condition is true." },
        { word: "RETURN", clue: "Keyword used to return a value from a function." },
        { word: "COUT", clue: "C++ object commonly used for output." },
        { word: "CIN", clue: "C++ object commonly used for input." }
    ],

    java: [
        { word: "INT", clue: "A data type used for whole numbers." },
        { word: "CHAR", clue: "A data type used for a single character." },
        { word: "FLOAT", clue: "A data type used for decimal numbers." },
        { word: "BOOLEAN", clue: "A data type containing true or false." },
        { word: "CLASS", clue: "A blueprint for creating objects." },
        { word: "STATIC", clue: "Keyword used for members belonging to a class rather than objects." },
        { word: "PUBLIC", clue: "An access modifier that allows broad access." },
        { word: "PRIVATE", clue: "An access modifier restricting access to the class." },
        { word: "RETURN", clue: "Keyword used to return a value from a method." },
        { word: "WHILE", clue: "A loop that runs while a condition is true." },
        { word: "IMPORT", clue: "Keyword used to bring another package or class into a program." },
        { word: "STRING", clue: "A class used to represent sequences of characters." }
    ],

    python: [
        { word: "DEF", clue: "Keyword used to define a function." },
        { word: "LIST", clue: "An ordered and changeable collection." },
        { word: "TUPLE", clue: "An ordered collection that cannot be changed." },
        { word: "DICT", clue: "A collection that stores key-value pairs." },
        { word: "BOOL", clue: "A type representing True or False." },
        { word: "WHILE", clue: "A loop that continues while a condition is true." },
        { word: "FOR", clue: "A loop commonly used to iterate through items." },
        { word: "RETURN", clue: "Keyword used to send a value back from a function." },
        { word: "IMPORT", clue: "Keyword used to bring a module into a program." },
        { word: "PRINT", clue: "Function commonly used to display output." },
        { word: "CLASS", clue: "Keyword used to define a class." },
        { word: "NONE", clue: "Python's special value representing no value." }
    ],

    javascript: [
        { word: "LET", clue: "Keyword used to declare a block-scoped variable." },
        { word: "CONST", clue: "Keyword used to declare a value that cannot be reassigned." },
        { word: "VAR", clue: "Older keyword used to declare a variable." },
        { word: "FUNCTION", clue: "Keyword used to define a function." },
        { word: "RETURN", clue: "Keyword used to return a value from a function." },
        { word: "ARRAY", clue: "An object used to store multiple values in a list-like structure." },
        { word: "OBJECT", clue: "A collection of properties and values." },
        { word: "STRING", clue: "A sequence of characters." },
        { word: "BOOLEAN", clue: "A value that can be true or false." },
        { word: "CLASS", clue: "Keyword used to define a class." },
        { word: "WHILE", clue: "A loop that runs while a condition is true." },
        { word: "ASYNC", clue: "Keyword used to declare an asynchronous function." }
    ]
};


/* ================= SETTINGS ================= */

const languageNames = {
    c: "C",
    cpp: "C++",
    java: "Java",
    python: "Python",
    javascript: "JavaScript"
};

let currentPuzzle = null;
let currentLanguage = "c";
let currentWidth = 9;
let currentHeight = 9;
let score = 0;
let activeWord = null;


/* ================= SIZE OPTIONS ================= */

function createSizeOptions() {

    const width = document.getElementById("width");
    const height = document.getElementById("height");

    for (let size = 5; size <= 15; size++) {

        const widthOption = document.createElement("option");
        widthOption.value = size;
        widthOption.textContent = size;

        const heightOption = document.createElement("option");
        heightOption.value = size;
        heightOption.textContent = size;

        width.appendChild(widthOption);
        height.appendChild(heightOption);
    }

    width.value = "9";
    height.value = "9";
}

createSizeOptions();


/* ================= START GAME ================= */

function startGame() {

    currentLanguage = document.getElementById("language").value;
    currentWidth = Number(document.getElementById("width").value);
    currentHeight = Number(document.getElementById("height").value);

    currentPuzzle = generateCrossword(
        currentLanguage,
        currentWidth,
        currentHeight
    );

    if (!currentPuzzle) {

        alert(
            "Unable to generate a crossword of this size. " +
            "Please try a larger grid."
        );

        return;
    }

    score = 0;
    activeWord = null;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    document.getElementById("languageDisplay").textContent =
        languageNames[currentLanguage];

    document.getElementById("sizeDisplay").textContent =
        `${currentWidth} × ${currentHeight}`;

    document.getElementById("score").textContent = score;

    document.getElementById("gameDescription").textContent =
        "Fill in the correct programming terms using the clues below.";

    renderCrossword();
    renderClues();

    setMessage("Enter your answers and check them.");
}


/* ================= GENERATE CROSSWORD ================= */

function generateCrossword(language, width, height) {

    const bank = wordBanks[language];

    if (!bank) return null;

    const usableWords = bank
        .filter(item => item.word.length <= Math.max(width, height))
        .map(item => ({
            word: item.word.toUpperCase(),
            clue: item.clue
        }));

    if (usableWords.length === 0) {
        return null;
    }

    let bestPuzzle = null;
    let bestCount = 0;

    for (let attempt = 0; attempt < 400; attempt++) {

        const result = attemptGeneration(
            usableWords,
            width,
            height
        );

        if (!result) continue;

        if (result.words.length > bestCount) {

            bestPuzzle = result;
            bestCount = result.words.length;
        }

        const target = Math.min(
            10,
            usableWords.length
        );

        if (bestCount >= target) {
            break;
        }
    }

    if (!bestPuzzle) {
        return null;
    }

    assignNumbers(bestPuzzle);

    return bestPuzzle;
}


/* ================= GENERATION ATTEMPT ================= */

function attemptGeneration(words, width, height) {

    const grid = Array.from(
        { length: height },
        () => Array(width).fill(null)
    );

    const shuffled = [...words];

    shuffle(shuffled);

    shuffled.sort(
        (a, b) => b.word.length - a.word.length
    );

    const placedWords = [];

    /* First word */

    const first = shuffled[0];

    const firstPlacement =
        getRandomFirstPlacement(
            first.word,
            width,
            height
        );

    if (!firstPlacement) {
        return null;
    }

    placeWord(
        grid,
        first,
        firstPlacement.row,
        firstPlacement.col,
        firstPlacement.direction
    );

    placedWords.push({
        ...first,
        row: firstPlacement.row,
        col: firstPlacement.col,
        direction: firstPlacement.direction
    });


    /* Remaining words */

    for (let i = 1; i < shuffled.length; i++) {

        const wordData = shuffled[i];

        const candidates =
            findCandidates(
                grid,
                wordData.word,
                width,
                height
            );

        if (candidates.length === 0) {
            continue;
        }

        candidates.sort(
            (a, b) => b.crossings - a.crossings
        );

        const topCandidates =
            candidates.slice(
                0,
                Math.min(8, candidates.length)
            );

        const selected =
            topCandidates[
                Math.floor(
                    Math.random() *
                    topCandidates.length
                )
            ];

        placeWord(
            grid,
            wordData,
            selected.row,
            selected.col,
            selected.direction
        );

        placedWords.push({
            ...wordData,
            row: selected.row,
            col: selected.col,
            direction: selected.direction
        });
    }

    return {
        grid,
        words: placedWords
    };
}




function getRandomFirstPlacement(
    word,
    width,
    height
) {

    const placements = [];

    if (word.length <= width) {

        for (
            let row = 0;
            row < height;
            row++
        ) {

            for (
                let col = 0;
                col <= width - word.length;
                col++
            ) {

                placements.push({
                    row,
                    col,
                    direction: "across"
                });
            }
        }
    }

    if (word.length <= height) {

        for (
            let row = 0;
            row <= height - word.length;
            row++
        ) {

            for (
                let col = 0;
                col < width;
                col++
            ) {

                placements.push({
                    row,
                    col,
                    direction: "down"
                });
            }
        }
    }

    if (placements.length === 0) {
        return null;
    }


    const centerRow = (height - 1) / 2;
    const centerCol = (width - 1) / 2;

    placements.sort((a, b) => {

        const distanceA =
            Math.abs(a.row - centerRow) +
            Math.abs(a.col - centerCol);

        const distanceB =
            Math.abs(b.row - centerRow) +
            Math.abs(b.col - centerCol);

        return distanceA - distanceB;
    });

    return placements[
        Math.floor(
            Math.random() *
            Math.min(placements.length, 20)
        )
    ];
}



function findCandidates(
    grid,
    word,
    width,
    height
) {

    const candidates = [];

    for (let row = 0; row < height; row++) {

        for (let col = 0; col < width; col++) {

            const existing = grid[row][col];

            if (!existing) continue;

            for (let index = 0; index < word.length; index++) {

                if (word[index] !== existing) {
                    continue;
                }

                /* Try across */

                const acrossRow = row;
                const acrossCol = col - index;

                if (
                    canPlaceWord(
                        grid,
                        word,
                        acrossRow,
                        acrossCol,
                        "across",
                        true,
                        width,
                        height
                    )
                ) {

                    candidates.push({
                        row: acrossRow,
                        col: acrossCol,
                        direction: "across",
                        crossings: countCrossings(
                            grid,
                            word,
                            acrossRow,
                            acrossCol,
                            "across"
                        )
                    });
                }


                /* Try down */

                const downRow = row - index;
                const downCol = col;

                if (
                    canPlaceWord(
                        grid,
                        word,
                        downRow,
                        downCol,
                        "down",
                        true,
                        width,
                        height
                    )
                ) {

                    candidates.push({
                        row: downRow,
                        col: downCol,
                        direction: "down",
                        crossings: countCrossings(
                            grid,
                            word,
                            downRow,
                            downCol,
                            "down"
                        )
                    });
                }
            }
        }
    }

    return candidates;
}




function canPlaceWord(
    grid,
    word,
    row,
    col,
    direction,
    requireCrossing,
    width,
    height
) {

    let crossings = 0;

    for (let i = 0; i < word.length; i++) {

        const r =
            direction === "down"
                ? row + i
                : row;

        const c =
            direction === "across"
                ? col + i
                : col;


        /* Boundary */

        if (
            r < 0 ||
            r >= height ||
            c < 0 ||
            c >= width
        ) {
            return false;
        }


        /* Existing letter */

        if (grid[r][c]) {

            if (grid[r][c] !== word[i]) {
                return false;
            }

            crossings++;
        }
    }


    if (
        requireCrossing &&
        crossings === 0
    ) {
        return false;
    }


    /*
       Check cells immediately before
       and after the word.
    */

    const beforeRow =
        direction === "down"
            ? row - 1
            : row;

    const beforeCol =
        direction === "across"
            ? col - 1
            : col;

    const afterRow =
        direction === "down"
            ? row + word.length
            : row;

    const afterCol =
        direction === "across"
            ? col + word.length
            : col;


    if (
        beforeRow >= 0 &&
        beforeRow < height &&
        beforeCol >= 0 &&
        beforeCol < width &&
        grid[beforeRow][beforeCol]
    ) {
        return false;
    }

    if (
        afterRow >= 0 &&
        afterRow < height &&
        afterCol >= 0 &&
        afterCol < width &&
        grid[afterRow][afterCol]
    ) {
        return false;
    }


    /*
       Prevent words from touching side-by-side
       without actually crossing.
    */

    for (let i = 0; i < word.length; i++) {

        const r =
            direction === "down"
                ? row + i
                : row;

        const c =
            direction === "across"
                ? col + i
                : col;


        if (grid[r][c]) {
            continue;
        }


        if (direction === "across") {

            if (
                r > 0 &&
                grid[r - 1][c]
            ) {
                return false;
            }

            if (
                r < height - 1 &&
                grid[r + 1][c]
            ) {
                return false;
            }

        } else {

            if (
                c > 0 &&
                grid[r][c - 1]
            ) {
                return false;
            }

            if (
                c < width - 1 &&
                grid[r][c + 1]
            ) {
                return false;
            }
        }
    }

    return true;
}


/* ================= COUNT CROSSINGS ================= */

function countCrossings(
    grid,
    word,
    row,
    col,
    direction
) {

    let count = 0;

    for (
        let i = 0;
        i < word.length;
        i++
    ) {

        const r =
            direction === "down"
                ? row + i
                : row;

        const c =
            direction === "across"
                ? col + i
                : col;

        if (grid[r][c]) {
            count++;
        }
    }

    return count;
}


/* ================= PLACE WORD ================= */

function placeWord(
    grid,
    wordData,
    row,
    col,
    direction
) {

    const word = wordData.word;

    for (
        let i = 0;
        i < word.length;
        i++
    ) {

        const r =
            direction === "down"
                ? row + i
                : row;

        const c =
            direction === "across"
                ? col + i
                : col;

        grid[r][c] = word[i];
    }
}


/* =========================================================
   IMPORTANT:
   STANDARD CROSSWORD NUMBERING
   ========================================================= */

function assignNumbers(puzzle) {

    const startCells = new Map();

    /*
       Find every word's starting position.
       If Across and Down begin at the same cell,
       they receive the SAME number.
    */

    for (const word of puzzle.words) {

        const key =
            `${word.row}-${word.col}`;

        if (!startCells.has(key)) {

            startCells.set(
                key,
                startCells.size + 1
            );
        }

        word.number =
            startCells.get(key);
    }

    /*
       Sort numbers according to normal crossword
       top-to-bottom, left-to-right order.
    */

    const sortedStarts =
        [...startCells.entries()]
            .sort((a, b) => {

                const [ar, ac] =
                    a[0].split("-").map(Number);

                const [br, bc] =
                    b[0].split("-").map(Number);

                if (ar !== br) {
                    return ar - br;
                }

                return ac - bc;
            });

    const numberMap = new Map();

    sortedStarts.forEach(
        ([key], index) => {

            numberMap.set(
                key,
                index + 1
            );
        }
    );

    /*
       Apply the final standard numbers.
    */

    for (const word of puzzle.words) {

        const key =
            `${word.row}-${word.col}`;

        word.number =
            numberMap.get(key);
    }

    puzzle.numberMap = numberMap;
}


/* ================= RENDER CROSSWORD ================= */

function renderCrossword() {

    const crossword =
        document.getElementById("crossword");

    crossword.innerHTML = "";

    crossword.style.gridTemplateColumns =
        `repeat(${currentWidth}, 1fr)`;


    for (
        let row = 0;
        row < currentHeight;
        row++
    ) {

        for (
            let col = 0;
            col < currentWidth;
            col++
        ) {

            const letter =
                currentPuzzle.grid[row][col];


            /* BLACK / BLOCK CELL */

            if (!letter) {

                const block =
                    document.createElement("div");

                block.className = "block";

                crossword.appendChild(block);

                continue;
            }


            /* NORMAL CELL */

            const cell =
                document.createElement("div");

            cell.className =
                "crossword-cell";


            /* Check whether this cell starts a word */

            const startingWords =
                currentPuzzle.words.filter(
                    word =>
                        word.row === row &&
                        word.col === col
                );


            if (startingWords.length > 0) {

                const number =
                    document.createElement("span");

                number.className =
                    "cell-number";

                number.textContent =
                    startingWords[0].number;

                cell.appendChild(number);
            }


            /* INPUT */

            const input =
                document.createElement("input");

            input.type = "text";

            input.maxLength = 1;

            input.autocomplete = "off";

            input.dataset.row = row;
            input.dataset.col = col;

            input.dataset.answer = letter;


            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .toUpperCase()
                            .replace(/[^A-Z]/g, "");

                    clearCellHighlights();

                    const words =
                        getWordsAtCell(
                            row,
                            col
                        );

                    if (words.length > 0) {

                        /*
                           If the cell belongs to multiple
                           words, keep the currently active
                           direction if possible.
                        */

                        let selected =
                            words.find(
                                word =>
                                    activeWord &&
                                    word.number ===
                                    activeWord.number &&
                                    word.direction ===
                                    activeWord.direction
                            );

                        if (!selected) {
                            selected = words[0];
                        }

                        highlightWord(selected);
                    }
                }
            );


            input.addEventListener(
                "focus",
                function () {

                    const words =
                        getWordsAtCell(
                            row,
                            col
                        );

                    if (words.length === 0) {
                        return;
                    }

                    let selected =
                        words.find(
                            word =>
                                activeWord &&
                                word.number ===
                                activeWord.number &&
                                word.direction ===
                                activeWord.direction
                        );

                    if (!selected) {
                        selected = words[0];
                    }

                    highlightWord(selected);
                }
            );


            cell.appendChild(input);

            crossword.appendChild(cell);
        }
    }
}


/* ================= RENDER CLUES ================= */

function renderClues() {

    const across =
        document.getElementById("acrossClues");

    const down =
        document.getElementById("downClues");

    across.innerHTML = "";
    down.innerHTML = "";


    const acrossWords =
        currentPuzzle.words
            .filter(
                word =>
                    word.direction === "across"
            )
            .sort(
                (a, b) =>
                    a.number - b.number
            );


    const downWords =
        currentPuzzle.words
            .filter(
                word =>
                    word.direction === "down"
            )
            .sort(
                (a, b) =>
                    a.number - b.number
            );


    acrossWords.forEach(
        word => {

            across.appendChild(
                createClueElement(word)
            );
        }
    );


    downWords.forEach(
        word => {

            down.appendChild(
                createClueElement(word)
            );
        }
    );


    document.getElementById(
        "wordCount"
    ).textContent =
        `${currentPuzzle.words.length} words`;
}


/* ================= CREATE CLUE ================= */

function createClueElement(word) {

    const clue =
        document.createElement("div");

    clue.className =
        "clue";

    clue.dataset.number =
        word.number;

    clue.dataset.direction =
        word.direction;


    clue.innerHTML = `
        <span class="clue-number">
            ${word.number}.
        </span>
        <span class="clue-text">
            ${word.clue}
        </span>
    `;


    /*
       THIS IS THE IMPORTANT PART:
       Clicking the clue highlights the exact
       sequence of blocks belonging to it.
    */

    clue.addEventListener(
        "click",
        () => {

            highlightWord(word);

            const cells =
                getWordCells(word);

            if (cells.length > 0) {

                const firstInput =
                    cells[0].querySelector("input");

                if (firstInput) {
                    firstInput.focus();
                }
            }
        }
    );


    return clue;
}


/* ================= GET WORD CELLS ================= */

function getWordCells(word) {

    const crossword =
        document.getElementById("crossword");

    const cells = [];

    for (
        let i = 0;
        i < word.word.length;
        i++
    ) {

        const row =
            word.direction === "down"
                ? word.row + i
                : word.row;

        const col =
            word.direction === "across"
                ? word.col + i
                : word.col;

        const input =
            crossword.querySelector(
                `input[data-row="${row}"][data-col="${col}"]`
            );

        if (input) {
            cells.push(
                input.parentElement
            );
        }
    }

    return cells;
}


/* ================= WORDS AT CELL ================= */

function getWordsAtCell(row, col) {

    return currentPuzzle.words.filter(
        word => {

            for (
                let i = 0;
                i < word.word.length;
                i++
            ) {

                const r =
                    word.direction === "down"
                        ? word.row + i
                        : word.row;

                const c =
                    word.direction === "across"
                        ? word.col + i
                        : word.col;

                if (
                    r === row &&
                    c === col
                ) {
                    return true;
                }
            }

            return false;
        }
    );
}


/* ================= HIGHLIGHT WORD ================= */

function highlightWord(word) {

    clearCellHighlights();

    activeWord = word;

    const cells =
        getWordCells(word);

    cells.forEach(
        cell => {

            cell.classList.add(
                "active-word"
            );
        }
    );


    /*
       Highlight corresponding clue.
    */

    document
        .querySelectorAll(".clue")
        .forEach(clue => {

            if (
                Number(clue.dataset.number) ===
                    word.number &&
                clue.dataset.direction ===
                    word.direction
            ) {

                clue.classList.add(
                    "active-clue"
                );

            } else {

                clue.classList.remove(
                    "active-clue"
                );
            }
        });
}


/* ================= CLEAR HIGHLIGHTS ================= */

function clearCellHighlights() {

    document
        .querySelectorAll(
            ".crossword-cell.active-word"
        )
        .forEach(cell => {

            cell.classList.remove(
                "active-word"
            );
        });


    document
        .querySelectorAll(".clue.active-clue")
        .forEach(clue => {

            clue.classList.remove(
                "active-clue"
            );
        });
}


/* ================= CHECK ANSWERS ================= */

function checkAnswers() {

    let correctWords = 0;
    let completed = true;


    currentPuzzle.words.forEach(
        word => {

            let correct = true;

            for (
                let i = 0;
                i < word.word.length;
                i++
            ) {

                const row =
                    word.direction === "down"
                        ? word.row + i
                        : word.row;

                const col =
                    word.direction === "across"
                        ? word.col + i
                        : word.col;


                const input =
                    document.querySelector(
                        `input[data-row="${row}"][data-col="${col}"]`
                    );


                if (!input) continue;


                const answer =
                    input.value.toUpperCase();

                const expected =
                    word.word[i];


                input.parentElement
                    .classList.remove(
                        "correct",
                        "wrong"
                    );


                if (answer === expected) {

                    input.parentElement
                        .classList.add(
                            "correct"
                        );

                } else {

                    input.parentElement
                        .classList.add(
                            "wrong"
                        );

                    correct = false;
                    completed = false;
                }
            }


            if (correct) {
                correctWords++;
            }
        }
    );


    score =
        correctWords * 10;

    document.getElementById(
        "score"
    ).textContent = score;


    if (completed) {

        setMessage(
            "🎉 Puzzle completed! Excellent work!"
        );

    } else {

        setMessage(
            `${correctWords} / ${currentPuzzle.words.length} words are correct. Keep going!`
        );
    }
}


/* ================= HINT ================= */

function showHint() {

    /*
       Find the first word that is not completely solved.
    */

    for (const word of currentPuzzle.words) {

        for (
            let i = 0;
            i < word.word.length;
            i++
        ) {

            const row =
                word.direction === "down"
                    ? word.row + i
                    : word.row;

            const col =
                word.direction === "across"
                    ? word.col + i
                    : word.col;


            const input =
                document.querySelector(
                    `input[data-row="${row}"][data-col="${col}"]`
                );


            if (!input) continue;


            if (
                input.value.toUpperCase() !==
                word.word[i]
            ) {

                input.value =
                    word.word[i];

                input.parentElement
                    .classList.add(
                        "hinted"
                    );


                highlightWord(word);


                document.getElementById(
                    "hintText"
                ).textContent =
                    `Hint: Letter ${i + 1} of ${word.number} ${word.direction} is "${word.word[i]}".`;

                return;
            }
        }
    }


    document.getElementById(
        "hintText"
    ).textContent =
        "All letters are already filled correctly!";
}


/* ================= NEW PUZZLE ================= */

function generateNewPuzzle() {

    const newPuzzle =
        generateCrossword(
            currentLanguage,
            currentWidth,
            currentHeight
        );

    if (!newPuzzle) {

        setMessage(
            "Could not generate a new puzzle. Try another size."
        );

        return;
    }

    currentPuzzle = newPuzzle;

    score = 0;
    activeWord = null;

    document.getElementById(
        "score"
    ).textContent = score;

    document.getElementById(
        "hintText"
    ).textContent =
        "Need help? Click the Hint button to reveal one letter.";

    renderCrossword();
    renderClues();

    setMessage(
        "New crossword generated!"
    );
}


/* ================= MESSAGE ================= */

function setMessage(message) {

    const element =
        document.getElementById("message");

    if (element) {
        element.textContent = message;
    }
}


/* ================= SHUFFLE ================= */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }

    return array;
}


/* ================= RESPONSIVE ================= */

window.addEventListener(
    "resize",
    () => {

        if (
            currentPuzzle &&
            !document
                .getElementById("game")
                .classList.contains("hidden")
        ) {

            renderCrossword();
        }
    }
);