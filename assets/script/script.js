const toggleBtn = document.querySelector(".toggle-btn");
const toggleIcon = document.querySelector(".togglei");
const arrowDown = document.querySelector(".currentli");
const arrowIcon = document.querySelector(".arrow");
const selectFont = document.querySelector(".fontt-ul");
const addSanSerif = document.querySelector(".san-serif-li");
const addSerif = document.querySelector(".serif-li");
const addmono = document.querySelector(".mono-li");
const currentli = document.querySelector(".currentli");
const typeDisplay = document.querySelector(".type-display");
const fieldSet = document.querySelector(".search-field");
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const err = document.querySelector(".error");
const playSound = document.querySelector(".play-sound");
const pronounce = document.querySelector(".dictionary-pronounce");
const wordType = document.querySelector(".wtype");
const loading = document.querySelector(".error-in");
let content = document.querySelector(".content");
let dictTtxt = document.querySelector(".dict-ttxt");
let AudioDiv = document.querySelector(".audio-div");
let meaningUl = document.querySelector(".meaning-ul");
let synonymsTxt = document.querySelector(".synonyms-txt");
let wtype2 = document.querySelector(".wtype2");
//code starts here
toggleBtn.addEventListener("click", async () => {
  await document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    toggleBtn.innerHTML = `<i class="bi bi-toggle-on togglei"></i
><i class="bi bi-moon"></i>`;
  } else {
    toggleBtn.innerHTML = `              <i class="bi bi-toggle-off togglei"></i
              ><img src="./assets/images/icon-moon.svg" alt="" />
`;
  }
});

arrowDown.addEventListener("click", () => {
  arrowIcon.classList.toggle("arrow-rotate");
  selectFont.classList.toggle("dflex");
});

addSanSerif.addEventListener("click", () => {
  if (
    document.body.classList.contains("monospace") ||
    document.body.classList.contains("serif")
  ) {
    document.body.classList.add("san-serif");
    typeDisplay.textContent = "san serif";
    document.body.classList.remove("monospace");
    document.body.classList.remove("serif");
    arrowIcon.classList.toggle("arrow-rotate");
    selectFont.classList.toggle("dflex");
  }
});

addSerif.addEventListener("click", () => {
  if (
    document.body.classList.contains("monospace") ||
    document.body.classList.contains("san-serif")
  ) {
    document.body.classList.add("serif");
    typeDisplay.textContent = "serif";
    document.body.classList.remove("monospace");
    document.body.classList.remove("san-serif");
    arrowIcon.classList.toggle("arrow-rotate");
    selectFont.classList.toggle("dflex");
  }
});

addmono.addEventListener("click", () => {
  if (
    document.body.classList.contains("serif") ||
    document.body.classList.contains("san-serif")
  ) {
    document.body.classList.add("monospace");
    typeDisplay.textContent = "monospace";
    document.body.classList.remove("serif");
    document.body.classList.remove("san-serif");
    arrowIcon.classList.toggle("arrow-rotate");
    selectFont.classList.toggle("dflex");
  }
});

searchIcon.addEventListener("click", () => {
  if (searchInput.value === "") {
    if (!fieldSet.classList.contains("fieldActive")) {
      fieldSet.classList.remove("fieldActive");
      err.style.display = "block";
      fieldSet.classList.add("fieldErr");
    }
  } else {
    err.style.display = "none";
    fieldSet.classList.remove("fieldErr");
  }
});

searchInput.addEventListener("keyup", () => {
  fieldSet.classList.add("fieldActive");
  if (searchInput.value != "") {
    fieldSet.classList.remove("fieldErr");
    err.style.display = "none";
  } else {
    fieldSet.classList.remove("fieldActive");
    err.style.display = "block";
    fieldSet.classList.add("fieldErr");
    setTimeout(() => {
      err.style.display = "none";
      fieldSet.classList.remove("fieldErr");
    }, 3000);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
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
    data.map((element) => {
      let { word, phonetics, meanings, sourceUrls } = element;
      /** Iteration starts here */
      let right = phonetics.find((phonetic) => {
        let rightOut = phonetic.text !== "" && phonetic.audio !== "";
        return rightOut;
      });
      let { text, audio } = right;

      let realmean = meanings
        .map((ele) => {
          let { partOfSpeech, definitions, synonyms } = ele;

          console.log(partOfSpeech);

          let eachdefine = definitions
            .map((ele) => {
              if (!ele.example) {
                return `<li><span>${ele.definition}</span></li>`;
              } else {
                return `
              <li><span>${ele.definition}</span></li>
              <li class="example"><span>"${ele.example}"</span></li>`;
              }
              // return ele.example;
            })
            .join("");
          let eachsynonym = synonyms
            .map((ele) => {
              return `<span>${ele}</span>`;
            })
            .join("");

          return `<div class="word-div">
              <div class="word-type">
                <h3 class="wtype">${partOfSpeech}</h3>
                <div class="line"></div>
              </div>
              <h3 class="meaning">meaning</h3>
              <div class="meaning-div">
                <ul class="meaning-ul">
                ${eachdefine}
                </ul>
              </div>
              <div class="synonyms-div">
                <h3>synonyms</h3>
                <div class="synonyms-txt">
                  ${eachsynonym}
                </div>
              </div>
            </div>`;
        })
        .join("");

      content.innerHTML = `        
          <div class="dict-head">
            <div class="dict-title">
              <div class="dict-ttxt">
                <h1 class="searchword">${word}</h1>
                <h3 class="special phonetic">${text}</h3>
              </div>
              <div class="audio-div">
                <img
                  src="./assets/images/icon-play.svg"
                  alt="play sound"
                  class="play-sound"
                />
              </div>
            </div>
          </div>
          <div class="word-type-div">
          ${realmean}
          </div>


          <div class="line"></div>

          <div class="source-div">
            <h3>source</h3>
            <a href="${sourceUrls[0]}"
              >${sourceUrls[0]}
              <img src="./assets/images/icon-new-window.svg" alt=""
            /></a>
          </div>`;


      let playSound = document.querySelector(".play-sound");

      let playAudio = new Audio(audio);

      playSound.addEventListener("click", () => {
        playAudio.play();
      });
    });
  } catch (err) {
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
