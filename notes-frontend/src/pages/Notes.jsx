import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchNotes();
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
    }
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notes]);

  /* ---------------- FETCH NOTES ---------------- */
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ADD NOTE ---------------- */
  const addNote = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      setShowAddModal(false);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  /* ---------------- DELETE NOTE (FIXED) ---------------- */
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  /* ---------------- FAVORITES ---------------- */
  const toggleFavorite = (noteId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(noteId)
      ? newFavorites.delete(noteId)
      : newFavorites.add(noteId);

    setFavorites(newFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(newFavorites))
    );
  };

  /* ---------------- DATE FORMAT ---------------- */
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  /* ---------------- CARD COLORS ---------------- */
  const cardColors = [
    "#FFF9C4",
    "#FFE0B2",
    "#E1BEE7",
    "#C5E1A5",
    "#BBDEFB",
    "#FFCCBC",
  ];

  const getCardColor = (index) => cardColors[index % cardColors.length];

  /* ---------------- UI ---------------- */
  return (
    <div className="notes-page">
      {/* Sidebar */}
      <div className="notes-sidebar">
        <div className="sidebar-logo">📝</div>
        <button
          className="add-button"
          onClick={() => setShowAddModal(true)}
          title="Add new note"
        >
          +
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="notes-main-content">
        <div className="notes-header-section">
          <h1 className="notes-title">Notes</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="notes-grid">
          {loading ? (
            <p className="empty-text">Loading notes...</p>
          ) : filteredNotes.length === 0 ? (
            <p className="empty-text">
              {searchQuery
                ? "No notes found."
                : "No notes yet. Create one!"}
            </p>
          ) : (
            filteredNotes.map((note, index) => (
              <div
                key={note._id}
                className="note-card"
                style={{ backgroundColor: getCardColor(index) }}
              >
                <h3 className="note-card-title">
                  {note.title || "Untitled"}
                </h3>
                <p className="note-card-description">
                  {note.content || "No content"}
                </p>
                <div className="note-card-footer">
                  <span className="note-date">
                    {formatDate(note.createdAt)}
                  </span>
                  <button
                    className="note-action-btn"
                    onClick={() => deleteNote(note._id)}
                  >
                    ⋮
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>New Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <textarea
              placeholder="Take a note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
            />
            <div className="modal-actions">
              <button onClick={addNote}>Save</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
