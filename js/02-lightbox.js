import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery"); //получаем доступ к классу gallery

const markup = galleryItems //создаем переменную "разметка" и через мар перебираем наш galleryItems создавая необходимые эл-ты на каждой итерации.
  .map(
    (item) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img 
                class="gallery__image" 
                src="${item.preview}" 
                alt="${item.description}"
            />
        </a>
    </li>`
  )
  .join(""); //объединяем все в одну строки

galleryEl.insertAdjacentHTML("afterbegin", markup); //добавляем в ХТМЛ

//==
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    });
