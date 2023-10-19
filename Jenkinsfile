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
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
              subject: "Error en el Unit Testing", 
              body: "Se ha producido un error en el Unit Testing. Por favor verifique el error."
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
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
              subject: "Deuda Incrementada Back", 
              body: "Se ha detectado un incremento en la deuda técnica del back-end. Por favor revise su código."
          )
        }
      }
    }

    stage("Build BACK") {
      steps {
        sh "podman build -t local-registry:5000/mycelium-local_api:main -f Dockerfile.prod ./api"
      }
      post {
        failure {
          mail (
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
              subject: "Falla en la etapa de -build-", 
              body: "No se ha podido completar el build del back-end."
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

    // stage("Quality Gate FRONT") {
    //   steps {
    //     timeout(time: 1, unit: 'HOURS') {
    //       waitForQualityGate abortPipeline: true
    //     }
    //   }
    //   post {
    //     failure {
    //       mail (
    //           to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
    //           subject: "Deuda Incrementada Front", 
    //           body: "Se ha detectado un incremento en la deuda técnica del front-end. Por favor revise su código."
    //       )
    //     }
    //   } 
    // }

    stage("Build FRONT") {
      steps {
        sh "podman build -t local-registry:5000/mycelium-local_client:main -f Dockerfile.prod ./client"
      }
      post {
        failure { 
          mail (
              to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
              subject: "Falla en la etapa de -build-", 
              body: "No se ha podido completar el build del front-end."
          )
        }
      }
    }

    // stage("Podman push") {
    //   steps {
    //     script {
    //       sh "podman push local-registry:5000/mycelium-local_api:main"
    //       sh "podman push local-registry:5000/mycelium-local_client:main"
    //     }
    //   }
    //   post {
    //     failure { 
    //       mail (
    //           to: "jflores@unis.edu.gt, dvallejo@unis.edu.gt", 
    //           subject: "Falla en la etapa de -Podman push-", 
    //           body: "No se han podido subir los cambios al docker Registry."
    //       )
    //     }
    //   }
    // } 
 
    //   stage("Deploy") {
    //     steps {
    //       sshPublisher(
    //         failOnError: true, 
    //         publishers: [
    //           sshPublisherDesc(
    //             configName: "mainpc",
    //             //configName: devpc,
    //             //configName: uatpc,
    //             transfers: [
    //               sshTransfer (
    //                 execCommand: 'docker compose pull && docker compose up -d',
    //                 execTimeout: 3600000
    //               )
    //             ]
    //           )
    //         ]
    //       )
    //     }
    //   }
 
  }
}