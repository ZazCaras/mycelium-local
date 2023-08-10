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
    stage('SonarQube FRONT Analysis') {
      steps {
        script {
          nodejs('sonarqube-front') {
            def scanner = tool 'sonarqube-tool-scanner';
            dir('client') {
              withSonarQubeEnv() {
                sh "${scanner}/bin/sonar-scanner"
              }
            }
          }
        }
      }
    }

    stage('SonarQube BACK Analysis') {
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
                      mail (
                          to: "ddvallejoj@gmail.com", 
                          subject: "Deuda Técnica Reducida", 
                          body: "ola"
                      )
                  } else {
                      mail (
                          to: "ddvallejoj@gmail.com", 
                          subject: "Duda Técnica Incrementada", 
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