# todo-list

'DNL challenge'

This is a simple Todo List application built with Vue.js 3. It allows users to manage their tasks using CRUD operations (Create, Read, Update, Delete).

API Integration: The application uses the Todo API provided by [DummyJSON](https://dummyjson.com/docs/todos) as its backend.

## Features

- Create new tasks
- Read and display existing tasks
- Update task status and details
- Delete tasks

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/'CHANGE ME'/vue-todo-list.git
   cd vue-todo-list
   ```
2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Compiles and hot-reloads for development:**

   ```sh
   npm run dev
   ```

4. **Open your browser:**
   Visit http://localhost:PORT to view the app.

## Project Structure 'CHANGE ME'

src/
|-- assets/
├── [assets]
├── ├── base.css
├── ├── logo.svg
├── └── main.css
├── [components]
├── ├── HelloWorld.vue
├── ├── TheWelcome.vue
├── ├── TodoList.vue
├── ├── WelcomeItem.vue
├── ├── [__tests__]
├── ├── └── HelloWorld.spec.js
└── [icons]
├── ├── ├── IconCommunity.vue
├── ├── ├── IconDocumentation.vue
├── ├── ├── IconEcosystem.vue
├── ├── ├── IconSupport.vue
├── ├── ├── IconTooling.vue
├── main.js
├── [router]
└── ├── index.js
├── [stores]
├── ├── [__tests__]
└── ├── ├──Todo.spec.js
├── ├── counter.js
└── ├── todo.js
├── [utils]
├── ├── apiErrorHandler.js
└── ├── axiosInstance.js
└── [views]
├── ├── AboutView.vue
└── ├── HomeView.vue

.`assets`: Contains static assets like images or styles.
.`components`: Contains Vue components. In this case, TodoList.vue is the main component.
.`App.vue`: The main application component.
.`main.js`: Entry point to the application.

## Dependencies 'CHANGE ME'

Vue.js: https://vuejs.org/
Vite.js: https://vitejs.dev/
Vue Router: https://router.vuejs.org/
Pinia: https://pinia.vuejs.org/core-concepts/actions.html
Axios: https://github.com/axios/axios
Vitest: https://vitest.dev/

## Customize Configuration

See Configuration Reference >> `https://vitejs.dev/config/` for Vue CLI configuration options.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

