# todo-list

'DNL challenge'

This is a simple Todo List application built with Vue.js 3. It allows users to manage their tasks using CRUD operations (Create, Read, Update, Delete).

API Integration: The application uses the Todo API provided by [DummyJSON](https://dummyjson.com/docs/todos) as its backend.

## Features

- Create new tasks
- Filter tasks based on search text and state
- Preserve tasks state when reloading
- Read and display existing tasks
- Update task status and details
- Delete tasks

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/The-best-cse/vue-todo-list.git
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

## Project Structure

```
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ base.css
│  │  ├─ logo.svg
│  │  └─ main.css
│  ├─ components
│  │  ├─ DeleteSingleTodo.vue
│  │  ├─ EditSingleTodo.vue
│  │  ├─ FilterTodoList.vue
│  │  ├─ MessageDisplay.vue
│  │  ├─ NewTodo.vue
│  │  ├─ TodoList.vue
│  │  └─ __tests__
│  │     ├─ DeleteSingleTodo.spec.js
│  │     ├─ EditSingleTodo.spec.js
│  │     ├─ FilterTodoList.spec.js
│  │     ├─ NewTodo.spec.js
│  │     └─ TodoList.spec.js
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ stores
│  │  ├─ __tests__
│  │  │  └─ Todo.spec.js
│  │  └─ todo.js
│  ├─ utils
│  │  ├─ apiErrorHandler.js
│  │  ├─ axiosInstance.js
│  │  └─ messagesComposition.js
│  └─ views
│     └─ HomeView.vue
├─ tailwind.config.js
├─ vite.config.js
└─ vitest.config.js

```

- `assets`: Contains static assets like images or styles.
- `components`: Contains Vue components. In this case, TodoList.vue is the main component.
- `views`: Contains Vue views. In this case, HomeView.vue is the main view.
- `stores`: Contains Pinia stores. In this case, TodoStore todo.js is the main store.
- `router`: Contains app routes.
- `App.vue`: The main application component.
- `main.js`: Entry point to the application.

## Dependencies

- [Vue.js](https://vuejs.org/)
- [Vite.js](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/core-concepts/actions.html)
- [Axios](https://github.com/axios/axios)
- [Vitest](https://vitest.dev/)
- [Tailwindcss](https://tailwindcss.com/)

## Customize Configuration

See Configuration Reference >> [Vite](https://vitejs.dev/config/) for Vue CLI configuration options.

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
