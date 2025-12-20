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
                    sh 'docker build -t $DOCKERHUB_USERNAME/my-react-frontend:latest -f Dockerfile.frontend .'

                    // Backend build
                    sh 'docker build -t $DOCKERHUB_USERNAME/firebase-backend:latest ./backend'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                    sh 'docker push $DOCKERHUB_USERNAME/my-react-frontend:latest'
                    sh 'docker push $DOCKERHUB_USERNAME/firebase-backend:latest'
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
