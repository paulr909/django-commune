[![Python Version](https://img.shields.io/badge/python-3.9-brightgreen.svg)](https://python.org)
[![Django Version](https://img.shields.io/badge/django-4.0.1-brightgreen.svg)](https://djangoproject.com)
[![React Version](https://img.shields.io/badge/react-17.0.2-brightgreen.svg)](https://reactjs.org/)

# Django Commune Project with React Frontend

## Django 4.0.1, DRF, CRUD, JWT auth, React, Redux.

### React Frontend with Hooks.

Run your app in a Virtual Environment: [http://python-guide-ru.readthedocs.io/en/latest/dev/virtualenvs.html](http://python-guide-ru.readthedocs.io/en/latest/dev/virtualenvs.htm)

Install the requirements:
```
pip install -r requirements.txt
```

Run the development server:
```
python manage.py runserver
```
Run Tests with Coverage:
```
python manage.py test
```

API available @ [http://127.0.0.1:8000/api/articles](http://127.0.0.1:8000/api/articles)

Swagger API @ [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)

# React Redux Frontend

Install React, Redux:
```
npm i
```

Run development build:
```
npm start
```

Run production build:
```
npm run build
```

Serve production build:
```
serve -s build
```

Run End-to-end tests with Cypress:
```
npm run cypress:open
```