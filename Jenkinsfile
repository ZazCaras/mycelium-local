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
              def result
              withSonarQubeEnv('sonarqube') {
                  dir('api') {
                    sh "./gradlew sonar"
                    def rutaSonar = 'http://sonarqube:9000'
                    def project = "gradlew"
                    def response = "${rutaSonar}/api/measures/component?component=${project}&metricKeys=sqale_index"
                    result = sh(script: "curl -s ${rutaSonar}/api/qualitygates/project_status?projectKey=${project}", returnStdout: true).trim()
                  }
                  if (result == 'PASSED') {
                      echo "El análisis de SonarQube PASÓ."
                      mail (
                          to: "ddvallejoj@gmail.com", 
                          subject: "Sonar Success", 
                          body: "ola"
                      )
                  } else {
                      echo "El análisis de SonarQube FALLÓ."
                      mail (
                          to: "ddvallejoj@gmail.com", 
                          subject: "Sonar Failed", 
                          body: "ola"
                      )
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