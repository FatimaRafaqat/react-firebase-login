pipeline {

    agent any   // run on your local Jenkins agent

    environment {
        // Add your Vercel token here (or set it from Jenkins > Credentials)
        VERCEL_TOKEN = credentials('vercel-token')
        // If you want to use a normal env variable instead:
        // VERCEL_TOKEN = "${env.VERCEL_TOKEN}"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                bat """
                    npx vercel --prod --yes ^
                    --token=%VERCEL_TOKEN%
                """
            }
        }
    }
}