let counter = 0;

function updateCounter() {
    document.querySelector("#counter").innerText = counter;
}

//Increments/decrements the counter each time the respective Plus/Minus is clicked

document.querySelector("#minus").addEventListener("click", () => {
    counter = counter === 0 ? 0 : counter - 1;
    updateCounter();
});

document.querySelector("#plus").addEventListener("click", () => {
    counter++;
    updateCounter();
});

//Like button writes to the UL class "likes" and orders each like by a data-num 

const likesEl = document.querySelector('.likes');
likesEl.style.display = 'flex';
likesEl.style.flexDirection = 'column';
const likes = new Map();

document.querySelector("#heart").addEventListener("click", () => {
    let count = likes.get(counter) ?? 0;
    count += 1;
    likes.set(counter, count);

    let li = likesEl.querySelector(`[data-key="${counter}"]`)
    if (!li) {
        li = document.createElement('LI');
        likesEl.appendChild(li);
    }

    li.dataset.key = counter;
    li.dataset.value = count;
    li.style.order = counter;
    li.textContent = `${counter}: ${count} likes`
});

//form
const formEl = document.querySelector("#comment-form");
document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(formEl));
    const commentEl = document.createElement("p");
    commentEl.textContent = formData.comment;
    document.querySelector(".comments").appendChild(commentEl);
    formEl.reset();
})

//Increments the counter every second when the page is loaded

const pauseEl = document.querySelector('#pause');
let interval = null;

const start = () => {
    interval = setInterval(() => {
        counter++;
        updateCounter();
    }, 1000)
    pauseEl.textContent = 'pause';
    Array.from(document.querySelectorAll('#minus,#plus,#heart'))
        .forEach(button => { button.disabled = false })
}
const pause = () => {
    clearInterval(interval);
    interval = null;
    pauseEl.textContent = 'resume';
    Array.from(document.querySelectorAll('#minus,#plus,#heart'))
        .forEach(button => { button.disabled = true })
}

pauseEl.addEventListener('click', () => {
    if (interval) {
        pause()
    } else {
        start()
    }
})

start();


