const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}

const removeActive = () => {
    const lessonBtn=document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn=> btn.classList.remove("active"))
}
const loadLevelWord = (id) => {
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
    }

    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <div class="text-2xl font-medium bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
    })
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