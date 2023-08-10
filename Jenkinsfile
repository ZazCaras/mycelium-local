    pipeline {
        agent any
        
        stages {
            stage('Checkout') {
                steps {
                    script {
                        checkout scm
                    }
                }
            }
            
            stage('SonarQube Analysis') {
                when {
                    expression { env.BRANCH_NAME == 'main' && env.CHANGE_ID != null }
                }
                steps {
                    script {
                        dir('api') {
                            def sonarCmd = '../gradlew sonarqube' +
                                        '-Dsonar.projectKey=api' +
                                        '-Dsonar.host.url=http://localhost:9000' +
                                        '-Dsonar.token=sqp_ab6ee875deb1911a41a168b49c41630e95128b27'
                            sh sonarCmd 
                        }
                    }
                }
            }
        }
    }
