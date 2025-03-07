import Root from "./components/ui/root/Root";
import Home from "./components/views/home/Home";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import Playlist from "./components/views/playlist/Playlist";
import AddPlaylist from "./components/views/add-playlist/AddPlaylist";
import AddSong from "./components/views/add-song/AddSong";
import Edit from "./components/views/edit/Edit";
import ProtectedRoute from "./components/ui/protected-route/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "login/", element: <Login /> },
      { path: "register/", element: <Register /> },
      { path: "playlist/:id/", element: <Playlist /> },
      { path: "playlist/add/", element: <ProtectedRoute element={<AddPlaylist />} /> },
      { path: "playlist/:id/add-song/", element: <ProtectedRoute element={<AddSong />} /> },
      { path: "playlist/:id/edit/", element: <ProtectedRoute element={<Edit />} /> },
    ],
  },
];

export default routes;
