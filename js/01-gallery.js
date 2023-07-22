import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery"); //получаем доступ к классу gallery

let currentImageInstance = null; //создаем переменную для хранения текущего экземпляра модального окна

//==

galleryEl.addEventListener("click", handleOpenImage); //вешаем слушателя событий на клик + функцию открытия изображения

function handleOpenImage(event) {
  event.preventDefault(); //сбрасываем базовые настройки браузера

  if(event.target.className === 'gallery'){
    return;
  }

//создаем экз. модального окна через basicLightbox.create
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">`, {
      
      onShow: (instance) => {
        document.addEventListener("keydown", handleCloseImageByKey); //добавляем слушателя событий на нажатие кнопки и добавляем ф-цию закрытия изображения по Escape
      },
      onClose: (instance) => {
        document.addEventListener("keydown", handleCloseImageByKey); //добавляем слушателя событий на нажатие кнопки и добавляем ф-цию закрытия изображения по Escape
      },
    }); 

  instance.show(instance); //метод basicLightbox = показать экземпляр
  currentImageInstance = instance; //присваиваем к текущему значению экз. модального окна наш экземпляр созданный выше
}

//==

function handleCloseImageByKey(event) {
  //ф-ция закрытия изображения по Escape
  if (event.code === "Escape") {
    //условие, если код события = кнопке Escape
    closeImage(); //то вызываем ф-цию закрытия изображения
  }
}

function closeImage() {
  //ф-ция закрытия изображения
  if (currentImageInstance) {
    //условие, если currentModalInstance = true (не null)
    currentImageInstance.close(); //закрываем текущий экз. мод. окна
    currentImageInstance = null; //присваиваем нулл текущему экз. мод. окна (возвращаем в изначальное состояние)
  }
}

//==

const markup = galleryItems //создаем переменную "разметка" и через мар перебираем наш galleryItems создавая необходимые эл-ты на каждой итерации.
  .map(
    (item) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img 
                class="gallery__image" 
                src="${item.preview}" 
                alt="${item.description}"
                data-source="${item.original}" 
            />
        </a>
    </li>`
  )
  .join(""); //объединяем все в одну строки

galleryEl.insertAdjacentHTML("afterbegin", markup); //добавляем в ХТМЛ