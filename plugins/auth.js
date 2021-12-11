export default function ({ $auth }) {
  if (!$auth.loggedIn) {
    return
  }

  const name = $auth.user.name
  console.log(name)
}
