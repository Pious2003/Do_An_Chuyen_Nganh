import React, { useState } from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";
import { MdDelete, MdHome, MdAlbum, MdMusicNote, MdAddAPhoto } from "react-icons/md";

const Admin = () => {
  const { user } = UserData();
  const {
    albums,
    songs,
    addAlbum,
    loading,
    addSong,
    addThumbnail,
    deleteSong,
  } = SongData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("");
  const [activeTab, setActiveTab] = useState("album");

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const addAlbumHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    addAlbum(formData, setTitle, setDescription, setFile);
  };

  const addSongHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("file", file);
    addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum);
  };

  const addThumbnailHandler = (id) => {
    const formData = new FormData();
    formData.append("file", file);

    addThumbnail(id, formData, setFile);
  };

  const deleteHandler = (id) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteSong(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#212121] text-white">
      {/* Header */}
      <header className="bg-[#0F0F0F] p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-500">Music Admin</h1>
          <Link
            to="/"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors text-white font-medium py-2 px-4 rounded-full"
          >
            <MdHome className="text-lg" /> Go to Homepage
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("album")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === "album" 
                ? "text-green-500 border-b-2 border-green-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MdAlbum /> Add Album
          </button>
          <button
            onClick={() => setActiveTab("song")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === "song" 
                ? "text-green-500 border-b-2 border-green-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MdMusicNote /> Add Song
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === "manage" 
                ? "text-green-500 border-b-2 border-green-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MdMusicNote /> Manage Songs
          </button>
        </div>

        {/* Add Album Form */}
        {activeTab === "album" && (
          <div className="bg-[#181818] p-8 rounded-xl shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MdAlbum className="text-green-500" /> Add New Album
            </h2>
            <form onSubmit={addAlbumHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Album Title</label>
                  <input
                    type="text"
                    placeholder="Enter album title"
                    className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                  <input
                    type="text"
                    placeholder="Enter album description"
                    className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Album Cover</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="album-cover"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    required
                  />
                  <label htmlFor="album-cover" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <MdAddAPhoto className="text-4xl text-gray-400" />
                      <span className="text-gray-400">Click to upload album cover</span>
                      <span className="text-xs text-gray-500">
                        {file ? file.name : "JPG, PNG or GIF (Recommended: 300x300px)"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-green-500 hover:bg-green-600 transition-colors rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Please Wait..." : "Add Album"}
              </button>
            </form>
          </div>
        )}

        {/* Add Song Form */}
        {activeTab === "song" && (
          <div className="bg-[#181818] p-8 rounded-xl shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MdMusicNote className="text-green-500" /> Add New Song
            </h2>
            <form onSubmit={addSongHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Song Title</label>
                  <input
                    type="text"
                    placeholder="Enter song title"
                    className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Singer</label>
                  <input
                    type="text"
                    placeholder="Enter singer name"
                    className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={singer}
                    onChange={(e) => setSinger(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <input
                  type="text"
                  placeholder="Enter song description"
                  className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Album</label>
                <select
                  className="w-full px-4 py-3 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  required
                >
                  <option value="">Choose Album</option>
                  {albums &&
                    albums.map((e, i) => (
                      <option value={e._id} key={i}>
                        {e.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Audio File</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="audio-file"
                    accept="audio/*"
                    onChange={fileChangeHandler}
                    required
                  />
                  <label htmlFor="audio-file" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <MdMusicNote className="text-4xl text-gray-400" />
                      <span className="text-gray-400">Click to upload audio file</span>
                      <span className="text-xs text-gray-500">
                        {file ? file.name : "MP3, WAV or OGG format"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-green-500 hover:bg-green-600 transition-colors rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Please Wait..." : "Add Song"}
              </button>
            </form>
          </div>
        )}

        {/* Manage Songs Section */}
        {activeTab === "manage" && (
          <div className="bg-[#181818] p-8 rounded-xl shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MdMusicNote className="text-green-500" /> Manage Songs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {songs && songs.length > 0 ? (
                songs.map((song, i) => (
                  <div key={i} className="bg-[#212121] rounded-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    {song.thumbnail ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={song.thumbnail.url}
                          alt={song.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                          onClick={() => deleteHandler(song._id)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete song"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-800 flex flex-col justify-center items-center p-4">
                        <input 
                          type="file" 
                          onChange={fileChangeHandler}
                          accept="image/*"
                          className="hidden" 
                          id={`thumbnail-${song._id}`}
                        />
                        <label 
                          htmlFor={`thumbnail-${song._id}`} 
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          <MdAddAPhoto className="text-3xl text-gray-400" />
                          <span className="text-sm text-gray-400">Add Thumbnail</span>
                        </label>
                        <button
                          onClick={() => addThumbnailHandler(song._id)}
                          className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="text-lg font-bold truncate">{song.title}</h4>
                      <p className="text-sm text-gray-400 truncate">{song.singer}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{song.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <MdMusicNote className="text-6xl mx-auto mb-4 opacity-50" />
                  <p>No songs have been added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;