# LOCAL ALTERNATIVE FOR TASK 10 (no IBM Cloud account needed)

This runs the SAME Tekton pipeline locally. The image is built by the pipeline,
pushed to a local registry, and deployed into a local Kubernetes cluster. The
final screenshot is real evidence of a pipeline-built image being deployed.

## Prerequisites (install on your machine)

    docker --version
    kind --version
    kubectl version --client
    tkn version

If missing: install Docker Desktop, then:

    # Windows (PowerShell, with winget)
    winget install Kubernetes.kind
    winget install Kubernetes.kubectl
    choco install tektoncd-cli -y

## 1. Start a local registry and kind cluster

    docker run -d --restart=always -p 5000:5000 --name kind-registry registry:2
    kind create cluster --name tax-calculator --config local/kind-config.yaml
    docker network connect kind kind-registry

## 2. Install Tekton in the cluster

    kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
    kubectl wait --for=condition=available --timeout=300s deployment --all -n tekton-pipelines

## 3. Make the GitHub repo readable by the pipeline

The `git-clone-tax` task clones your repo. Pick ONE:

- Temporarily set the repo to Public, run the pipeline, then set it back to
  Private; or
- Add a GitHub PAT secret to the clone task and reference it in the Pipeline.

## 4. Apply the pipeline resources

    kubectl apply -f tekton/build-pvc.yaml
    kubectl apply -f tasks.yaml
    kubectl apply -f tekton/task-git-clone.yaml
    kubectl apply -f local/task-build-push-local.yaml
    kubectl apply -f tekton/task-deploy.yaml
    kubectl apply -f pipeline.yaml
    kubectl apply -f local/service-nodeport.yaml

`local/task-build-push-local.yaml` replaces the Kaniko task with one that pushes
to the local HTTP registry (`--insecure`). It keeps the same task name so the
pipeline does not need changing.

## 5. Run the pipeline

    kubectl create -f local/run-local.yaml
    tkn pipelinerun logs -f

The steps will be: clone -> npminstall -> tests -> build -> deploy.

## 6. Capture the real Task 10 evidence

    kubectl get deployment tax-calculator -o jsonpath='{.spec.template.spec.containers[0].image}'
    kubectl rollout status deployment/tax-calculator
    kubectl get pods -l app=tax-calculator
    tkn pipelinerun list
    curl -I http://localhost:8080/

Expected image line:

    localhost:5000/tax-calculator:latest

Open http://localhost:8080 in a browser. Screenshot the browser page together
with the terminal output above and save it as:

    ../project-3 answers/10-final-output.png

That replaces the watermarked sample and is genuine evidence that the image
built by the Tekton pipeline was deployed and serves the Tax Calculator page.

## 7. Cleanup (optional)

    kind delete cluster --name tax-calculator
    docker rm -f kind-registry
