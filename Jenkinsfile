pipeline {
    agent any

    environment {
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
        PATH = "${JAVA_HOME}/bin:${PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install @angular-devkit/build-angular --save-dev
                    npm install typescript@5.4.3 --save-dev
                '''
            }
        }

        stage('Build AngularApp') {
            steps {
                sh 'ng build --configuration production --output-path=dist/angular-app'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Serve Application') {
            steps {
                sh '''
                    sudo npm install -g http-server
                    http-server dist/angular-app --port 8080 --host 0.0.0.0 --silent &
                '''
            }
        }
    }

    post {
        success {
            echo 'Application is running at http://localhost:8080'
        }
        failure {
            echo 'Build or deployment failed! Check logs.'
        }
    }
}
