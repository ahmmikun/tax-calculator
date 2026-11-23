# Tax Calculator - Final Project

Node.js/Express Tax Calculator with Jasmine unit tests, a Dockerfile, IBM Cloud
Kubernetes manifests and a Tekton pipeline.

## Run locally

    npm install
    npm test
    npm start

Open http://localhost:3000 and try `/tax?income=1000`.

## Build and run in Docker

    docker build -t tax-calculator:latest .
    docker run -d --name tax-calculator -p 8080:80 tax-calculator:latest
    curl -I http://localhost:8080/

## Push to IBM Cloud Container Registry

    ibmcloud cr login
    docker tag tax-calculator:1.0 <REGION>.icr.io/<CR_NAMESPACE>/tax-calculator:1.0
    docker push <REGION>.icr.io/<CR_NAMESPACE>/tax-calculator:1.0

## Deploy to IBM Cloud Kubernetes Service

    ibmcloud ks cluster config --cluster <CLUSTER_NAME>
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl get pods -l app=tax-calculator
    kubectl get svc tax-calculator

## Run the Tekton pipeline

See `tekton/icr-secret.txt` for registry credentials, then:

    kubectl apply -f tekton/build-pvc.yaml
    kubectl apply -f tekton/task-git-clone.yaml
    kubectl apply -f tekton/task-test.yaml
    kubectl apply -f tekton/task-build-push.yaml
    kubectl apply -f tekton/task-deploy.yaml
    kubectl apply -f tekton/pipeline.yaml
    tkn pipeline start tax-calculator-pipeline \
      -p repo-url=https://github.com/<GITHUB_USER>/<GITHUB_REPO>.git \
      -p image=<REGION>.icr.io/<CR_NAMESPACE>/tax-calculator \
      -p tag=latest \
      -w name=shared-workspace,claimName=build-pvc \
      -s default --showlog

## Submission answers

`final-project-answers.txt` contains all answers in text form. Individual text
answers and output templates are in `evidence/01-*.txt` through `evidence/10-*.txt`,
plus `evidence/part-a-plan.txt`, `evidence/github-urls.txt` and
`evidence/submission-checklist.txt`. Replace placeholders with your real values
and include the 10 screenshots described there.
