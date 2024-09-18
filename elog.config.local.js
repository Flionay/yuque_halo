module.exports = {
  write: {
    platform: 'yuque-pwd',
    yuque: {
      token: process.env.YUQUE_TOKEN,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
    },
    "yuque-pwd": {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      linebreak: false
    }
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs',
      filename: 'title',
      format: 'markdown',
      frontMatter: {
        enable: true,
        exclude: ['description']
      },
      formatExt: process.env.LOCAL_JS
    }
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './images',
      pathFollowDoc: true,
    }
  }
}
