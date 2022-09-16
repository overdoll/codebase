#!/bin/bash
set -e
echo "generating grpc mocks for all services"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../

mockery --name StingClient --dir applications/sting/proto --output libraries/testing_tools/mocks --structname MockStingClient
mockery --name RingerClient --dir applications/ringer/proto --output libraries/testing_tools/mocks --structname MockRingerClient
mockery --name ParleyClient --dir applications/parley/proto --output libraries/testing_tools/mocks --structname MockParleyClient
mockery --name LoaderClient --dir applications/loader/proto --output libraries/testing_tools/mocks --structname MockLoaderClient
mockery --name HadesClient --dir applications/hades/proto --output libraries/testing_tools/mocks --structname MockHadesClient
mockery --name EvaClient --dir applications/eva/proto --output libraries/testing_tools/mocks --structname MockEvaClient
mockery --name CarrierClient --dir applications/carrier/proto --output libraries/testing_tools/mocks --structname MockCarrierClient
mockery --name MediaCallbackClient --dir libraries/media/proto --output libraries/testing_tools/mocks --structname MockMediaCallbackClient
