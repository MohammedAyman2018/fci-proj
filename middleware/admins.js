export default function ({ redirect, app, route }) {
  const adminRoutes = ['/dashboard/stores', '/dashboard/stores/requests', '']
  const token = app.$axios.defaults.headers.common['x-auth-token']
  if (!token) { return redirect('/login') }
  const userRole = token.split(',')[0]
  const haveAccess = ['owner', 'admin'].includes(userRole)
  if (!haveAccess || (userRole === 'owner' && adminRoutes.includes(route.path))) {
    redirect('/error')
  } else {
    return true
  }
}

