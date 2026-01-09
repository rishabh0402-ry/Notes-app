pipeline {
    agent any

    environment {
        MONGO_URI = credentials('MONGO_URI')
        JWT_SECRET = credentials('JWT_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
