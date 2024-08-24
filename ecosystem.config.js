module.exports = {
  apps: [
    {
      name: 'dara-back',
      exec_mode: 'cluster',
      instances: '1',
      script: './index.js'
    }
  ]
}
