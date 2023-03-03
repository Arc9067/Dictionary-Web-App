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

let content = document.querySelector(".content");
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
  let isverb = data[0].meanings[1].partOfSpeech;
  let defi =  data[0].meanings[1].definitions;

  searchInput.value = word;
  content.innerHTML = `          <div class="dict-head">
            <div class="dict-title">
              <div class="dict-ttxt">
                <h1 class="searchword">${word}</h1>
                <h3 class="special phonetic">${phonetic}</h3>
              </div>
              <div class="audio-div">
                <audio
                  src="${audio}"
                  controls
                  class="dictionary-pronounce"
                ></audio>
                <img
                  src="./assets/images/icon-play.svg"
                  alt="play sound"
                  class="play-sound"
                />
              </div>
            </div>
          </div>
          <div class="word-type">
            <h3 class="wtype">${partOfSpeech}</h3>
            <div class="line"></div>
          </div>

          <h3 class="meaning">meaning</h3>

          <div class="meaning-div">
            <ul class="meaning-ul">
              <li>
                <span>
                  (etc.) A set of keys used to operate a typewriter, computer
                  etc.
                </span>
              </li>
              <li>
                <span>
                  A component of many instruments including the piano, organ,
                  and harpsichord consisting of usually black and white keys
                  that cause different tones to be produced when struck.
                </span>
              </li>
              <li>
                <span>
                  A device with keys of a musical keyboard, used to control
                  electronic sound-producing devices which may be built into or
                  separate from the keyboard device.
                </span>
              </li>
              <li>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Iusto, et?
                </span>
              </li>
            </ul>
          </div>
          <div class="synonyms-div">
            <h3>synonyms</h3>
            <div class="synonyms-txt">
              <span>electronic keyboard</span>
            </div>
          </div>
          <div class="word-type">
            <h3 class="wtype">${isverb}</h3>
            <div class="line"></div>
          </div>
          <h3 class="meaning">meaning</h3>
          <div class="verb-example">
            <ul class="example-ul">
              <li><span>To type on a computer keyboard.</span></li>
              <li>
                <span
                  >“Keyboarding is the part of this job I hate the most.”</span
                >
              </li>
              <li><span>To type on a computer keyboard.</span></li>
              <li>
                <span
                  >“Keyboarding is the part of this job I hate the most.”</span
                >
              </li>
            </ul>
          </div>

          <div class="line"></div>

          <div class="source-div">
            <h3>source</h3>
            <a href="${sourceUrl}"
              >${sourceUrl}
              <img src="./assets/images/icon-new-window.svg" alt=""
            /></a>
          </div>

          <!-- <div class="error-in">
            <h1>😕</h1>
            <h3>no definitions found</h3>
            <p>
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div> -->
        </section>
      </div>
`;
  playSound.addEventListener("click", async () => {
    alert("h");

    let playAudio = await new Audio(audio);
    playAudio.play();
  });
});

playSound.addEventListener("click", () => {
  alert("helo");
  let playAudio = new Audio(
    "https://api.dictionaryapi.dev/media/pronunciations/en/hand-uk.mp3"
  );
  playAudio.play();

  pronounce.play();
});
