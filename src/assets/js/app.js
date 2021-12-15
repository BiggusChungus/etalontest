// Выполнить после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Использовать строгий режим
  "use strict";

  // Предотвратить нежелательные анимации во время загрузки страницы
  function preventAnimationsBeforeLoad() {
    document.body.classList.remove("beforeLoad");
  }

  preventAnimationsBeforeLoad();

  // Ленивая загрузка
  const lazyContent = new LazyLoad({
    // Использовать нативную загрузку, если возможно
    use_native: true,
  });

  // Скролл к нужной секции
  function scrollToSection() {
    // Получить все элементы, которые должны скроллить к секциям
    const elements = document.querySelectorAll(".scrollToSection");

    // Проверяем коллекцию на пустоту
    if (elements.length > 0) {
      // Перебираем каждый элемент коллекции
      for (let element of elements) {
        // Прослушиваем событие клик
        element.addEventListener("click", function () {
          // Получает id целевой секции - точка назначения
          const id = element.getAttribute("data-scroll");

          // Скрол к цели
          document.getElementById(id).scrollIntoView({
            behavior: "smooth",
          });
        });
      }
    }
  }

  scrollToSection();

  // Блок вопросы и ответы, раскрывающиеся вопросы и ответы
  function sectionQA() {
    // Получить все элементы заголовки
    const questionTitles = document.querySelectorAll(".question-title");
    // Проверяем коллекцию на пустоту
    if (questionTitles.length > 0) {
      // Проходим циклом по каждому элементу в коллекции
      for (let questionTitle of questionTitles) {
        // Получить родителя текущего элемента - обертку вопроса и ответа
        let question = questionTitle.parentElement;
        // Прослушиваем событие клик по заголовку
        questionTitle.addEventListener("click", function () {
          // Переключаем состояние обертки
          question.classList.toggle("opened");
        });
      }
    }
  }

  sectionQA();
});
