'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting () {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'secondparam',
        message: 'secondparam',
        default: (session) => {
          console.log(session)
          this.kek = session
          return session.name
        }
      }
    ])
    this.log('answers', JSON.stringify(answers))
    this.log('appname', answers.name)
  }

  installingDependencies () {
    this.npmInstall(
      []
    )
  }
}
