let symn = document.querySelectorAll(".symn");
symn.forEach((ele) => {
  ele.addEventListener("click", async () => {
    const fetching = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${ele.textContent}`
    );
    let data = await fetching.json();
    console.log(data);
    console.log(fetching);
    data.map((element) => {
      let { word, phonetics, meanings, sourceUrls } = element;
      /** Iteration starts here */
      let right = phonetics.findLast((phonetic) => {
        let rightOut = phonetic.text !== "" && phonetic.audio !== "";

        return rightOut;
      });
      let text, audio;
      if (right) {
        text = right.text;
        audio = right.audio;
      } else {
        text = "";
        audio = "https://api.dictionaryapi.dev/media";
      }

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
              return `<span class="symn">${ele}</span>`;
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

      searchInput.value = ele.textContent;
      let playAudio = new Audio(audio);

      playSound.addEventListener("click", () => {
        playAudio.play();
      });
      
    });
  });
});
