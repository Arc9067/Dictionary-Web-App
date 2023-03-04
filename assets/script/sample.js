window.addEventListener("DOMContentLoaded", async () => {
  //   content.innerHTML = `          <div class="error-in">
  //             <h1>😕</h1>
  //             <h3>no definitions found</h3>
  //             <p>
  //               Sorry pal, we couldn't find definitions for the word you were
  //               looking for. You can try the search again at later time or head to
  //               the web instead.
  //             </p>
  //           </div>
  // `;
  const amazingWords = [
    "Time",
    "Person",
    "Year",
    "Way",
    "Day",
    "Thing",
    "Man",
    "World",
    "Life",
    "Hand",
    "Part",
    "Child",
    "Eye",
    "Woman",
    "Place",
    "Work",
    "Week",
    "Case",
    "Point",
    "Government",
    "Company",
    "Number",
    "Group",
    "Problem",
    "Fact",
    "Idea",
    "System",
    "Program",
    "Question",
    "Night",
    "Home",
    "Job",
    "Action",
    "Office",
    "Door",
    "Line",
    "End",
    "Member",
    "Law",
    "Car",
    "City",
    "Community",
    "Name",
    "President",
    "Team",
    "Minute",
    "Idea",
    "Air",
    "Teacher",
  ];
  const randomWords =
    amazingWords[Math.floor(Math.random() * amazingWords.length)];

  try {
    const fetching = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWords}`
    );
    const data = await fetching.json();
    let { word, phonetic, phonetics } = await data[0];
    console.log(word);
    console.log(phonetic);
    let sourceUrl = await data[0].sourceUrls;
    let meanings = await data[0].meanings;
    let meaningpart = await meanings[0];
    let { partOfSpeech, definitions, synonyms } = meaningpart;
    let audio = phonetics[0].audio;
    console.log(audio);
    // let isverb = data[0].meanings[1].partOfSpeech;
    // let defi = data[0].meanings[1].definitions;

    searchInput.value = word;
    playSound.addEventListener("click", () => {
      let playAudio = new Audio(audio);
      playAudio.play();
    });

    meanings.map((ele) => {
      let { partOfSpeech, definitions } = ele;
      console.log(partOfSpeech);
      console.log(definitions);
      definitions.forEach((defin) => {
        console.log(defin.definition);
        console.log(defin.example);
      });
    });

    /* setting up */
    if (phonetic && word) {
      dictTtxt.innerHTML = `<h1 class="searchword">${word}</h1>
                <h3 class="special phonetic">${phonetic}</h3>
`;
    } else {
      dictTtxt.innerHTML = `<h1 class="searchword">${word}</h1>`;
    }
    if (!audio) {
      AudioDiv.innerHTML = ``;
    }
    if (partOfSpeech) {
      wordType.textContent = partOfSpeech;
      // console.log(partOfSpeech);
    }
    if (definitions) {
      let worddefini = definitions
        .map((ele) => {
          return `<li><span>${ele.definition}</span></li>`;
        })
        .join("");
      meaningUl.innerHTML = worddefini;
    }
    if (synonyms) {
      let wordsyn = synonyms
        .map((ele) => {
          return `<span>${ele}</span>`;
        })
        .join("");
      synonymsTxt.innerHTML = wordsyn;
    } else {
      synonymsTxt.innerHTML = word;
    }
    // if (isverb) {
    //   wtype2.textContent = isverb;
    // }
    // console.log(defi);
  } catch (err) {
    // console.log("something happeed");
    content.innerHTML = `          <div class="error-in">
            <h1>😕</h1>
            <h3>no definitions found</h3>
            <p>
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
`;
    console.log(err);
  }
});
