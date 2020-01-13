#!/bin/bash
./deploy/ecs-deploy  --region $AWS_ECS_REGION --cluster $AWS_ECS_CLUSTER --service-name $AWS_ECS_SERVICE --image $AWS_ECR_URI/prd-cms-soloyoi:admin

sleep 20
exit 0