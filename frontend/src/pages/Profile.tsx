import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../lib/token";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewPost({ title: "", content: "" });
      setShowForm(false);
      fetchProfile(); // Refresh posts
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 px-4">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border flex items-center gap-6">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.user.name}`}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.user.name}</h1>
          <p className="text-gray-700"><strong>Email:</strong> {user.user.email}</p>
          <p className="text-gray-700"><strong>Bio:</strong> {user.user.bio || "No bio added"}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Post
          </button>
        </div>

        {user.posts?.length ? (
          <ul className="space-y-4">
            {user.posts.map((post: any) => (
              <li
                key={post.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No posts yet.</p>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block font-medium">Content</label>
                <textarea
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full border rounded p-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
