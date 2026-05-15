/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		root: __dirname,
	},
	images: {
		qualities: [75, 80],
	},
}

module.exports = nextConfig
