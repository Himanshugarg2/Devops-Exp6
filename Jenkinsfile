pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'himanshugarg2004'   
        DOCKERHUB_CREDS = 'DockerCred'
        BUILD_TAG = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo 'Building Docker images for both microservices...'
                    bat "docker build -t %DOCKERHUB_USER%/user-service:%BUILD_TAG% ./services/user-service"
                    bat "docker build -t %DOCKERHUB_USER%/order-service:%BUILD_TAG% ./services/order-service"
                }
            }
        }

        stage('Login to Docker Hub & Push Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        echo 'Logging in to Docker Hub...'
                        bat """
                        echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                        """

                        echo 'Pushing Docker images to Docker Hub...'
                        bat "docker push %DOCKERHUB_USER%/user-service:%BUILD_TAG%"
                        bat "docker push %DOCKERHUB_USER%/order-service:%BUILD_TAG%"
                    }
                }
            }
        }

        stage('Deploy Services via Docker Compose') {
            steps {
                script {
                    echo 'Deploying microservices using Docker Compose...'
                    
                    bat "docker-compose down || exit 0"
                   
                    bat "docker-compose up -d"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo ' Verifying microservices endpoints...'
                    bat "ping -n 6 127.0.0.1 >NUL"
                    bat "curl http://localhost:3001/health"
                    bat "curl http://localhost:3002/health"
                }
            }
        }
    }

    post {
        success {
            echo " Pipeline completed successfully! Microservices deployed and verified."
        }
        failure {
            echo " Pipeline failed — check Jenkins console output for error details."
        }
    }
}
