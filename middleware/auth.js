export default function ({ store, redirect }) {
  if (!store.state.auth.is_authorized) {
    return redirect('/login');
  }
}
