/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig
const ContentSecurityPolicy = ``
module.exports = {
  async headers() {
    return [
        {
            source: '/(.*)',
            headers: [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload'
                },
                {
                  key: 'X-Frame-Options',
                  value: 'SAMEORIGIN'
                },
                {
                  key: 'Content-Security-Policy',
                  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
                },
                {
                  key: 'Referrer-Policy',
                  value: 'origin-when-cross-origin'
                },
                {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff'
                },
                {
                  key: 'Access-Control-Allow-Origin',
                  value: '*'
                }
            ]
        }
    ]
  }
}