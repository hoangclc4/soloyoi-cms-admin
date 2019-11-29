#!/bin/bash
TASK_ID=$(aws ecs list-tasks --cluster $AWS_ECS_CLUSTER --desired-status RUNNING --family $AWS_TASK_FAMILY_APP | egrep "task" | tr "/" " " | tr "[" " " |  awk '{print $2}' | sed 's/"$//')

echo $TASK_ID

aws ecs stop-task --cluster $AWS_ECS_CLUSTER --task $TASK_ID

sleep 20
exit 0