pipeline {
  agent any
  stages {
    stage('check code') {
      steps {
        git(url: 'https://github.com/RShabbir53/my-nodejs-service.git', branch: 'main')
      }
    }

    stage('list') {
      steps {
        sh 'ls -la'
      }
    }

    stage('build') {
      steps {
        sh 'npm install'
      }
    }

    stage('run') {
      steps {
        sh 'node server.js'
      }
    }

  }
}