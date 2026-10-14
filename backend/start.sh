#!/bin/sh
set -eu

trustdir=$(mktemp -d)

keytool -importcert -noprompt \
  -alias aiven-ca \
  -file /etc/secrets/ca.pem \
  -keystore "$trustdir/aiven.p12" \
  -storetype PKCS12 \
  -storepass changeit

exec java \
  -Djavax.net.ssl.trustStore="$trustdir/aiven.p12" \
  -Djavax.net.ssl.trustStoreType=PKCS12 \
  -Djavax.net.ssl.trustStorePassword=changeit \
  -jar /app/app.jar