При написании кода на JavaScript для Веба доступно большое количество API. Ниже приведён список всех
интерфейсов (то есть, типов объектов), которые вы можете использовать при разработке веб-приложения или сайта.
Узнать больше о доступных методах можно в документации от [Mozilla](https://developer.mozilla.org/ru/docs/Web/API).

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
