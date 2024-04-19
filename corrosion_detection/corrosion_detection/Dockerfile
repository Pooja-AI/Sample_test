FROM python:3.10

WORKDIR /app
COPY . .

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["app.py"]