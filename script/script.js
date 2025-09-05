const createElements=(arr)=>{
    const htmlElements=arr.map((el)=> `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
         document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn => btn.classList.remove("active"))
}
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive()
            const levelBtn = document.getElementById(`level-btn-${id}`);
            levelBtn.classList.add("active")
            displayLevelWord(data.data);
        });
}
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();

    displayWordDetails(details.data);

}
// {
//     "word": "Grateful",
//     "meaning": "কৃতজ্ঞ",
//     "pronunciation": "গ্রেটফুল",
//     "level": 3,
//     "sentence": "I am grateful for your help.",
//     "points": 3,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "thankful",
//         "appreciative",
//         "obliged"
//     ],
//     "id": 7
// }

const displayWordDetails = (word) => {
    const detailBox=document.getElementById("details-container");
    detailBox.innerHTML=`
    <div class="space-y-1">
                    <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="space-y-1">
                    <h2 class="font-bold">Meaning</h2>
                    <p class="bangla-font font-semibold">${word.meaning}</p>
                </div>
                <div class="space-y-1">
                    <h2 class="font-bold">Example</h2>
                    <p class="">${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-semibold bangla-font pb-1" >সমার্থক শব্দ গুলো</h2>
                   <div>${createElements(word.synonyms)}</div>
                </div>`
    document.getElementById("my_modal_5").showModal();
    
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center bangla-font space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-400 font-medium text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>`
        manageSpinner(false)
        return;

    }

    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <div class="text-2xl font-medium bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick= "pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
    })
    manageSpinner(false)
}
const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const div = document.createElement("div")
        div.innerHTML = `
         <button id="level-btn-${lesson.level_no}" 
         onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
         <img src="./assets/fa-book-open.png" alt="">Lesson - ${lesson.level_no}</button>`

        levelContainer.append(div);
    })


}
loadLesson()

document.getElementById("btn-search").addEventListener("click", ()=>{
    removeActive();
    const input=document.getElementById("input-search").value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(json => {
            const allWords=json.data;
            const filterWords=allWords.filter((word)=>word.word.toLowerCase().includes(input));
            displayLevelWord(filterWords);
        });
})