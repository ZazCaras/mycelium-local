pipeline {
  agent any
  stages {
    stage('SCM') {
      steps { 
          checkout scm
        }
      }
    stage("Unit Testing") {
      steps {
        script {
          dir('api') {
            sh "./gradlew test"
          }
        }
      } 
    }
    stage('SonarQube Analysis') {
      steps {
          script {
              withSonarQubeEnv('sonarqube') {
                  dir('api') {
                      sh "./gradlew sonar"
                  }
              }
          }
      }
    }
  }
  post {
    always {
        mail (
            to: "ddvallejoj@gmail.com", 
            subject: "Jenkins", 
            body: "end"
        )
    }
  }
}