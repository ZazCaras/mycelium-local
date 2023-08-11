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
      post {
        failure {
          mail (
              to: "jflores@unis.edu.gt", 
              subject: "Unit Testing Fallado", 
              body: "end"
          )
        }
      }
    }

    stage('SonarQube FRONT Analysis') {
      steps {  
        script {
          nodejs('sonarqube-front') {
            def scanner = tool 'sonarqube-tool-scanner';
            withSonarQubeEnv() {
              dir('client') {
                sh "${scanner}/bin/sonar-scanner"
              }
            }
          }
        }
      }
    } 

    stage("Quality Gate FRONT") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
      post {
        failure {
          mail (
              to: "jflores@unis.edu.gt", 
              subject: "Deuda Incrementada Front", 
              body: "end"
          )
        }
      }
    }

    // stage('SonarQube BACK Analysis') {
    //   steps {
    //       script {
    //           def result
    //           withSonarQubeEnv('sonarqube') {
    //             dir('api') {
    //               sh "./gradlew sonar"
    //           }
    //       }
    //     }
    //   }
    // }

    // stage("Quality Gate BACK") {
    //   steps {
    //     timeout(time: 1, unit: 'HOURS') {
    //       waitForQualityGate abortPipeline: true
    //     }
    //   }
    //   post {
    //     failure {
    //       mail (
    //           to: "jflores@unis.edu.gt, 
    //           subject: "Deuda Incrementada Back", 
    //           body: "end"
    //       )
    //     }
    //   }
    // }

  }
}