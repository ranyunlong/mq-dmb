#!/usr/bin/env sh

set -eu

IMAGE_NAME="${IMAGE_NAME:-dmb-develop-build}"
TARGET_DIR="${TARGET_DIR:-/www/wwwroot/dmb-develop.geckoai.cn}"

echo "Building image: ${IMAGE_NAME}"
docker build -t "${IMAGE_NAME}" .

echo "Publishing dist to: ${TARGET_DIR}"
mkdir -p "${TARGET_DIR}"
docker run --rm -v "${TARGET_DIR}:/app/dist" "${IMAGE_NAME}"

echo "Done."