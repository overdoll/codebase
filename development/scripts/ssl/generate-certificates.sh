openssl genrsa -des3 -out myCA.key 2048
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem
openssl genrsa -out overdoll.test.key 2048
openssl req -new -key overdoll.test.key -out overdoll.test.csr
openssl x509 -req -in overdoll.test.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out overdoll.test.crt -days 825 -sha256 -extfile overdoll.ext