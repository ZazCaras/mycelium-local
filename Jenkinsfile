    pipeline {
        agent any
        
        stages {
            stage('scm') {
                steps {
                    script {
                        checkout scm
                    }
                }
            }
            
            stage('SonarQube Analysis') {
                withSonarQubeEnv() {
                sh "./gradlew sonar"
                }
            }
        }
    }
