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
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.t", 
              subject: "Error en el Unit Testing", 
              body: "Se ha producido un error en el Unit Testing. Por favor verifique el error."
          )
        }
      }
    }

    // stage('SonarQube FRONT Analysis') {
    //   steps {  
    //     script {
    //       nodejs('sonarqube-front') {
    //         def scanner = tool 'sonarqube-tool-scanner';
    //         withSonarQubeEnv() {
    //           dir('client') {
    //             sh "${scanner}/bin/sonar-scanner"
    //           }
    //         }
    //       }
    //     }
    //   }
    // } 

    stage("Quality Gate FRONT") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
      post {
        failure {
          mail (
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.t", 
              subject: "Deuda Incrementada Front", 
              body: "Se ha detectado un incremento en la deuda técnica del front-end. Por favor revise su código."
          )
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
              }
          }
        } 
      }
    }

    stage("Quality Gate BACK") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
      post {
        failure {
          mail (
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.t", 
              subject: "Deuda Incrementada Back", 
              body: "Se ha detectado un incremento en la deuda técnica del back-end. Por favor revise su código."
          )
        }
      }
    }

  }
}