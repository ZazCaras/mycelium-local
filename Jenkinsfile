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
                def rutaSonar = 'http://sonarqube:9000'
                  def project = "client"
                  def response = "${rutaSonar}/api/measures/component?component=${project}&metricKeys=sqale_index"
                  result = sh(script: "curl -s ${rutaSonar}/api/qualitygates/project_status?projectKey=${project}", returnStdout: true).trim()
                
                if (result == 'PASSED') {
                    mail (
                        to: "ddvallejoj@gmail.com", 
                        subject: "FRONT Mejorado", 
                        body: "Front"
                    )
                } else {
                    mail (
                        to: "ddvallejoj@gmail.com", 
                        subject: "FRONT Incrementado", 
                        body: "Front"
                    )
                }
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
                          subject: "BACK Mejorado", 
                          body: "Back"
                      )
                  } else {
                      mail (
                          to: "ddvallejoj@gmail.com", 
                          subject: "BACK Incrementado", 
                          body: "Back"
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
          subject: "Jenkins Finalizado", 
          body: "end"
      )
    }
  }
}