# homework28_react

## 1. В чём разница между контролируемыми и неконтролируемыми компонентами?

Неконтролируемые компоненты похожи на HTML-формы, они запомнят то, что вводил пользователь, но вот значения придется "вытаскивать" (пишут, что с помощью рефов, но мы помним, что рефы без особой надобности использовать не стоит). Поэтому лучше использовать контролируемые компоненты.
Их плюс в том, что формы могут незамедлительно реагировать на изменения. Достигается это засчет двустороннего связывания состояния со значением, которое находится в форме.
А контролируемым называют, т.к. мы всегда можем изменить значение компонента, изменив состояние.

## 2. Есть ли смысл использовать метод `shouldComponentUpdate()` в `PureComponent`?

Я не знаю почему, но у меня опускаются руки и не хочется выполнять домашку, когда я вижу так много вопросов, связанные с классовыми компонентами. Я понимаю, что это можно объяснить тем, что если вдруг мне попадется нечто такое, я должна буду понять, что это и как с этим разобраться. Но хотелось бы сначала хотя бы хорошо с функциональными компонентами подружиться. Пока у меня каша в голове. И полное нежелание выполнять какие-либо задания(((( Сорри накопилось

По сути вопроса:.
React запускает метод shouldComponentUpdate в начале отрисовки компонента и получает от этого метода "ответ" или продолжить процесс, или запрет на продолжение.
Я так поняла, что PureComponent появился позже shouldComponentUpdate. И нацелен он на то, чтобы проивзести сравнение значений по умолчанию. Следовательно, shouldComponentUpdate можно не добавлять, отслеживание изменений все равно должно произойти.

## 3. Будет ли перерисовываться данный компонент?   
    
    ```jsx
    class PureComponent extends React.PureComponent {
      state = { 
        item: {
    			count:0
    		},
      }
      
      handleClick= () =>  {
        const item = this.state.item;
        item.count = this.state.item.count ++ ;
        this.setState({item});
      }
      render() {
        return <h2>{this.state.item.count}</h2>
      }
    }
    ```

Думаю да. При обновлении count изменится свойсво объекта, React посчитает, что состояние изменилось и компонент надо перерисовать.
    
## 4. Что будет, если чекбоксу не передать свойство '`checked`'?

Полагаю, что в таком случае у чекбокса будет значение по умолчанию, т.е. он будет неотмеченный. 

## 5. В чём главное преимущество использования `PureComponent`?

Главное - в автоматической оптимизации производительности компонентов.
При каждом обновлении компонента, PureComponent автоматически выполняет поверхностное(!!!) сравнение свойств предыдущих и новых значений. Если значения свойств не изменились, PureComponent предотвращает дальнейшую перерисовку (рендеринг) компонента.


## 6. Что будет, если компоненту `input` передать метод `onChange`, но не передать `value`? А что будет, если компоненту `input` передать `value`, но не передать метод `onChange`?

1. Мне кажется, что в этом случае при вводе текста в поле `input`, его значение не будет отражаться в состоянии компонента, а значит будет несогласованность между состоянием компонента и значением, отображаемым в `input`.

2. Здесь мне кажется, поле `input` будет некотролируемым, значит не будет доступа к значению и не будет возможности им управлять.

## 7. Как сделать из обычного `select` список с несколькими выбранными значениями (мультиселект)?

Для этого нужно использовать атрибут multiple (чтобы указать, что это мультиселект) и обрабатывать событие onChange для выбора и отмены выбора элементов.

Тогда селект может выглядеть так:
<select multiple value={selectedOptions} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}

При этом потребуется использовать хук useState, чтобы создать состояние selectedOptions, в котором будут храниться выбранные значения списка. Кроме того, надо создать массив options, в котором будут перечислены варианты для выбора. Например:
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

На onChange должен отрабатывать метод handleSelectChange. Он фильтрует выбранные значения из options и обновляет состояние selectedOptions с помощью setSelectedOptions.

Пример:
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setSelectedOptions(selectedValues);
  };

## 8. Напишите пример валидации текстового поля на React, чтобы оно было не пустым.

const MyInput = () => {
  const [textValue, setTextValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleChange = (e) => {
    setTextValue(e.target.value);
    setErrorText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Если поле пустое

    if (textValue.trim() === '') {
      setErrorText('Поле не может быть пустым');
      return;
    }

    // Если валидация пройдена успешна - нужный блок кода

    // После отправки форма очищается
    setTextValue('');
    setErrorText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={textValue}
        onChange={handleChange}
        placeholder="Текст"
      />
      {errorText && <p>{errorText}</p>}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MyInput;

## 9. Приведите пример простейшей формы логина на сторонних компонентах (Formic, Material или Bootstrap на ваш выбор).

import { Formik, Form, Field, ErrorMessage } from 'formik';

// Определяем начальные значения полей формы
const LoginForm = () => {
  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values) => {
    // Действия при отправке формы
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label>Email:</label>
          <Field type="email" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <Field type="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;

