pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh 'docker-compose run app npm test -- --watchAll=false'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker-compose down --volumes --remove-orphans'
            }
        }

    }
}
