#!/bin/bash

if [ ! -d "node_modules" ]; then
  yarn install --frozen-lockfile
else
  echo "node_modules loaded from cache, skipping yarn install"
fi
