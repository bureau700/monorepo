#!/bin/bash

docker-compose up --build --abort-on-container-exit --exit-code-from test test
