![Bitbucket Pipelines](https://img.shields.io/bitbucket/pipelines/paulrogers/django-commune/master)
[![Python Version](https://img.shields.io/badge/python-3.9-brightgreen.svg)](https://python.org)
[![Django Version](https://img.shields.io/badge/django-4.0.2-brightgreen.svg)](https://djangoproject.com)
[![React Version](https://img.shields.io/badge/react-17.0.2-brightgreen.svg)](https://reactjs.org/)

# Django Commune Project with React Frontend

## Django 4.0.1, DRF, CRUD, JWT auth, React, Redux.

### React Frontend with Hooks.

Run your app in a Virtual Environment: [http://python-guide-ru.readthedocs.io/en/latest/dev/virtualenvs.html](http://python-guide-ru.readthedocs.io/en/latest/dev/virtualenvs.htm)

Install the requirements:
```shell
pip install -r requirements.txt
```shell
Run the development server:
```shell
python manage.py runserver
```shell
Run Tests with Coverage:
```shell
python manage.py test
```

API available @ [http://127.0.0.1:8000/api/articles](http://127.0.0.1:8000/api/articles)

Swagger API @ [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)

# React Redux Frontend

Install React, Redux:
```shell
npm i
```

Run development build:
```shell
yarn start
```

Run production build:
```shell
yarn run build
```

Serve production build:
```shell
serve -s build
```

Run e2e tests with Cypress:
```shell
yarn cypress open
```

Run headless browser e2e tests with Cypress:
```shell
yarn cypress run
```


