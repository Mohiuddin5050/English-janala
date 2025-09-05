const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data));

}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <div class="text-2xl font-medium bangla-font">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
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
         <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson - ${lesson.level_no}</button>`

        levelContainer.append(div);
    })


}
loadLesson()