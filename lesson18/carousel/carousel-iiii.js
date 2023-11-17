// объявление переменной с Элементми (Картинками) - тип данных Массив - c ccылыками на Элементы. Если не вынести данные отдельно, то они могу обновлятсья и поступать из других Источников, в т.ч с Сервера.
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

// Функция 1
let updateIndicators = () => {
    let arrFromCollection = Array.from($indicatorsContainer.children);

    // выяcнение в какую сторону будут сдвигаться слайд
    // ловим target (Элемент куда кликнули) в event - Сlickhandler-ом и дальше обращаемся через Classlist и проверяем contains, есть у того, на что кликнули класс - Кнопка (prev или next)

    // $indicatorsContainer.children.forEach((elem)=> {

    arrFromCollection.forEach((elem, index) => {
        // elem.className = 'dot'
        // if (index === currentImg)
        //     elem.className = 'dot active'

        // elem.className = (index === currentImg) ? 'dot active' : 'dot'

        elem.className = 'dot ' + (index === currentImg ? 'active' : '');
    });
};

// Функция 2
let controlsClickHandler = (e) => {
    console.dir(e.target.classList.contains('prev'));

    //Зацикливание

    // если такой класс - кнопка есть, идет проверка, какая из них была нажата, для понимания в какую сторону двигать и исходя из этого удаляет или вычетаем ширину
    if (e.target.classList.contains('prev')) {
        if (translate !== 0) {
            translate += itemWidth;
        } else {
            if (loop) translate = (imgQuantity - 1) * itemWidth * -1;
        }
    } else if (e.target.classList.contains('next')) {
        //перемотка
        if ((imgQuantity - 1) * itemWidth !== -translate) {
            translate -= itemWidth;
        } else {
            if (loop) translate = 0;
        }
    }

    currentImg = Math.abs(translate / itemWidth);
    console.log('index' + +currentImg);

    // вызоd функции 1, отвечающий за обработку индикаторов
    updateIndicators();

    // тут применяем сдвиг - translate
    $carouselContainer.style.transform = 'translateX(' + translate + 'px)';

    // что делаем, когда получаем клик
    // $carouselContainer.style.transform='translateX(-'+ itemWidth + 'px)'
    // // itemWidth += 600
    // itemWidth *= 2
};

// $controlElements.forEach((element) => {
//     // тут происходят итерации цикла forEach - перебор Массива - controlElements
//     element.addEventListener(
//         'click',
//         controlsClickHandler // вызовы функции 2, отвечающий за обработку индикаторов
//     );
// });


// Глобальная Функция 3 - Создает и вставляет template (Шаблон HTML. Без Реакций на События) 
// Создает (Инициализацирует) Карусель, которая принимает 3 параметра: elemId ('carousel') - идентификатор Контейнера, Ссылки на Элементы (Картинки), количество Элементов (Картинки). 
// const createCarusel = (elemeId, counter, images) => {
const createCarusel = (elemeId, images) => {
    // const $mainContainer = document.getElementById('carousel')

    const $mainContainer = document.getElementById(elemeId);

    // создание в DOM Элемента (не строка) - carousel-controls
    const $controlElements = document.createElement('div');
    $controlElements.className = 'carousel-controls';
    $controlElements.innerHTML = `
        <div class="controls prev"><</div>
        <div class="controls next">></div>
    `;

    // const $carouselContainer = document.querySelector('.carousel-container');

    const $carouselContainer = document.createElement('div');
    $carouselContainer.className = 'carousel-container';
    // проход циклом по Массиву Элементов (Ссылок) с Картинками, где в item - записывается каждая Ссылка
    for (let item of images) {
        // создание Элемента
        let $imgContainer = document.createElement('div');
        // назначение класса Созданнмоу Элементу
        $imgContainer.className = 'carousel-item';
        // добавленеия Элемента в DOM (одинаковые Картинки)
        $imgContainer.innerHTML = '<img src="' + item + '" alt="">';
        // $imgContainer.innerHTML += $imgContainer
        // добавение carouselContainer в imgContainer
        $carouselContainer.append($imgContainer);
    }

    //$mainContainer.innerHTML = template
    $mainContainer.append($carouselContainer); // добавления в главный Контейнер - carouselContainer - Блока с Картинками
    $mainContainer.append($controlElements); // добавление в главный Контейнер - carousel-controls - Блока с Кнопками

    let arrFromCollection = Array.from($indicatorsContainer.children)

    $controlElements.children.forEach((element) => {
            // тут происходят итерации цикла forEach - перебор Массива - controlElements
            element.addEventListener(
                'click', controlsClickHandler);
        });

};

// передача сюда Аргумента - класс (идентификатор) Элемента
// createCarusel('carousel-1', counter);
// // а также, передача сюда Аргументов - Элементов ссылок на Картинки.
// createCarusel('carousel-1', 'img1', 'img2', 'img3');
createCarusel('carousel-1', images);
