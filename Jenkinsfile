pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'fatimarafaqat'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/FatimaRafaqat/react-firebase-login.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Frontend build (project root)
                    bat 'docker build -t %DOCKERHUB_USERNAME%/my-react-frontend:latest -f Dockerfile.frontend .'

                    // Backend build
                    bat 'docker build -t %DOCKERHUB_USERNAME%/firebase-backend:latest ./backend'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    bat 'echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_USERNAME% --password-stdin'
                    bat 'docker push %DOCKERHUB_USERNAME%/my-react-frontend:latest'
                    bat 'docker push %DOCKERHUB_USERNAME%/firebase-backend:latest'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KUBECONFIG')]) {
                    bat '''
                    kubectl get nodes
                    kubectl apply -f k8s/
                    '''
                }
            }
        }    
    }

    post {
        success {
            echo '✅ Docker images built & pushed successfully!'
        }
        failure {
            echo '❌ Docker build/push failed!'
        }
    }
}
