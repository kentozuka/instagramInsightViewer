module.exports = {
  images: {
    domains: ['scontent-nrt1-1.cdninstagram.com', 'scontent.cdninstagram.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
