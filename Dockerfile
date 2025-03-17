FROM registry.docker.ir/python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

# نصب پیش‌نیازهای psycopg2
RUN apt-get update \
    && apt-get install -y postgresql postgresql-contrib libpq-dev gcc python3-dev

COPY requirements.txt /code/
RUN pip install -r requirements.txt --no-cache-dir
RUN pip install psycopg2-binary

COPY . /code/
