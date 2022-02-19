
export default function ({ req, app }) {
  if (process.server && !process.client) {
    app.$axios.defaults.headers.common.cookie = req.headers.cookie
  }
}
