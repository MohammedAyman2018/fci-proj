
export default function ({ req, app }) {
  if (process.server && !process.client) {
    // console.log(app.$axios)
    app.$axios.defaults.headers.common.cookie = req.headers.cookie
  }
}
