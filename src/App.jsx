import { Route, Routes } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNoteForm';
import NotesList from './features/notes/NotesList';
import EditUser from './features/users/EditUser';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id/edit" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id/edit" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;