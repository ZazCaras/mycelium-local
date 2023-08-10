node {
  stage('SCM') {
    checkout scm
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