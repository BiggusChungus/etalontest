// Библиотека для анимаций при скролле

// Использовать строгий режим
"use strict";

// Выполнить после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Собираем все элементы с нужным классом
  const animatedElements = document.querySelectorAll(".anim");

  // Проверяем коллекцию на пустоту
  if (animatedElements.length > 0) {
    // Получаем текущие координаты
    function calcOffset(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    }

    // Анимируем элементы
    function animateOnScroll() {
      // Перебираем коллекцию всех элементов, которые нужно анимировать
      for (let item of animatedElements) {
        // Проверить, есть ли у элемента класс который запрещает анимации
        if (item.classList.contains("noAnim")) {
          console.log(item, "Этот элемент запрещено анимировать");
        } else {
          let itemHeight = item.offsetHeight;
          let itemOffsetTop = calcOffset(item).top;
          let animationStart = 10;
          let itemPoint = window.innerHeight - itemHeight / animationStart;

          if (itemHeight > window.innerHeight) {
            itemPoint =
              window.innerHeight - window.innerHeight / animationStart;
          }

          if (
            scrollY > itemOffsetTop - itemPoint &&
            scrollY < itemOffsetTop + itemHeight
          ) {
            // Анимировать элемент, добавив класс shown
            // По умолчанию используется анимация fade, плавное изменение прозрачности
            item.classList.add("shown");
          } else if (scrollY > itemOffsetTop) {
            // Предотвратить баг с элементами выше top:0;
            item.classList.add("shown");
          } else {
            // Если есть класс infinite, анимировать бесконечно; По-умолчанию, если класса infinite нет, элемент будет анимирован только один раз
            if (item.classList.contains("infinite")) {
              item.classList.remove("shown");
            }
          }
        }
      }
    }

    // Прослушиваем событие скролл
    window.addEventListener("scroll", animateOnScroll);

    //animateOnScroll();
    // Вызвать с небольшой задежкой на случай если анимации до полной загрузки DOM заблокированы другим скриптом
    setTimeout(animateOnScroll, 50);
  }
});
