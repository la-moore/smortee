При написании кода на JavaScript для Веба доступно большое количество API. Ниже приведён список всех
интерфейсов (то есть, типов объектов), которые вы можете использовать при разработке веб-приложения или сайта.
Узнать больше о доступных методах можно в документации от [Mozilla](https://developer.mozilla.org/ru/docs/Web/API). 
Например:

- API-интерфейс DOM (Document Object Model) позволяет вам манипулировать HTML и CSS, создавать, удалять и изменять HTML, динамически применять новые стили к вашей странице и т. д.. Каждый раз, когда вы видите всплывающее окно на странице или какое-то новое содержимое, Как мы видели выше в нашем простом демо), например, это DOM в действии.
- API геолокации извлекает географическую информацию. Так Google Maps может найти ваше местоположение и нанести его на карту.
- API Canvas и WebGL позволяют создавать анимированные 2D и 3D-графики. Люди делают некоторые удивительные вещи, используя эти веб-технологии - см. Chrome Experiments и webglsamples.
- Аудио и видео API, такие как HTMLMediaElement и WebRTC, позволяют делать действительно интересные вещи с мультимедиа, такие как проигрывание аудио и видео прямо на веб-странице, или захватывать видео с веб-камеры и отображать его на Чужой компьютер (попробуйте наш простой демонстрационный снимок, чтобы понять идею)

## Global
Глобальные функции которые можно вызвать напрямую.

| Методы    | Описание                                                                                      |
|-----------|-----------------------------------------------------------------------------------------------|
| alert()   | [диалоговое окно](https://developer.mozilla.org/ru/docs/Web/API/Window/alert)                 |
| confirm() | [диалоговое окно (OK и Cancel)](https://developer.mozilla.org/ru/docs/Web/API/Window/confirm) |
| prompt()  | [диалоговое окно (ввод текста)](https://developer.mozilla.org/ru/docs/Web/API/Window/prompt)  |

## Console
Объект Console служит для доступа к средствам отладки браузера.

| Методы     | Описание                                                                                |
|------------|-----------------------------------------------------------------------------------------|
| clear()    | [очистка консоли](https://developer.mozilla.org/ru/docs/Web/API/Console/clear)          |
| count()    | [количество вызовов](https://developer.mozilla.org/ru/docs/Web/API/Console/count)       |
| log()      | [вывод информации](https://developer.mozilla.org/ru/docs/Web/API/Console/log)           |
| info()     | [информационное сообщение](https://developer.mozilla.org/ru/docs/Web/API/Console/info)  |
| warn()     | [предупреждающее сообщение](https://developer.mozilla.org/ru/docs/Web/API/Console/warn) |
| error()    | [сообщение об ошибке](https://developer.mozilla.org/ru/docs/Web/API/Console/error)      |

## Window
Интерфейс окна содержит данные об окне в котором выполняется код и предоставляет доступ для работы с этим окном.

| Параметры    | Описание                                                                             |
|--------------|--------------------------------------------------------------------------------------|
| .history     | [история](https://developer.mozilla.org/ru/docs/Web/API/Window/history)              |
| .innerHeight | [высота экрана](https://developer.mozilla.org/ru/docs/Web/API/Window/innerHeight)    |
| .innerWidth  | [ширина экрана](https://developer.mozilla.org/ru/docs/Web/API/Window/innerWidth)     |
| .location    | [URL документа](https://developer.mozilla.org/ru/docs/Web/API/Window/location)       |
| .scrollY     | [сдвиг по вертикаи](https://developer.mozilla.org/ru/docs/Web/API/Window/scrollY)    |
| .scrollX     | [сдвиг по горизонтале](https://developer.mozilla.org/ru/docs/Web/API/Window/scrollX) |

| Методы     | Описание                                                                   |
|------------|----------------------------------------------------------------------------|
| blur()     | [убирать фокус](https://developer.mozilla.org/ru/docs/Web/API/Window/blur) |
| close()    | [закрыть окно](https://developer.mozilla.org/ru/docs/Web/API/Window/close) |
| print()    | [печать](https://developer.mozilla.org/ru/docs/Web/API/Window/print)       |
| scrollTo() | [прокрутка](https://developer.mozilla.org/ru/docs/Web/API/Window/scrollTo) |

## Document
Интерфейс документа служит точкой входа для работы с содержимым веб-страницы.

| Параметры | Описание                                                                              |
|-----------|---------------------------------------------------------------------------------------|
| .doctype  | [типа документа](https://developer.mozilla.org/ru/docs/Web/API/Document/doctype)      |
| .title    | [заголовок страницы](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) |

| Методы           | Описание                                                                                    |
|------------------|---------------------------------------------------------------------------------------------|
| getElementById() | [возвращает элемент](https://developer.mozilla.org/ru/docs/Web/API/Document/getElementById) |
| querySelector()  | [возвращает элемент](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelector)  |
| getSelection()   | [выделенный текст](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelector)    |
