#!/usr/bin/env bash

# Generates graphQL schemas from proto files
protoc --gql_out=paths=source_relative:./hades/schemas -I=. -I=./books/proto ./books/proto/*.proto
protoc --gql_out=paths=source_relative:./hades/schemas -I=. -I=./holders/proto ./holders/proto/*.proto