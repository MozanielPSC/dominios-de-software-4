aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/b6y2o6i2
docker build -t find-package-api .
docker tag find-package-api:latest public.ecr.aws/b6y2o6i2/find-package-api:latest
docker push public.ecr.aws/b6y2o6i2/find-package-api:latest