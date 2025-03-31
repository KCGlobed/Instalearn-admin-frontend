import React, { useState } from "react";

const EditNewsForm = ({ onAddNews }) => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNews({ title, source, description, url, imageUrl, date: new Date().toLocaleString() });
    setTitle("");
    setSource("");
    setDescription("");
    setUrl("");
    setImageUrl("");
  };

  return (
    <div className="container mt-4">
      <h2 className="fs-5">Edit News</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fs-6">Title</label>
          <input type="text" className="form-control form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fs-6">Source</label>
          <input type="text" className="form-control form-control-sm" value={source} onChange={(e) => setSource(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fs-6">Description</label>
          <textarea className="form-control form-control-sm" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label fs-6">Article URL</label>
          <input type="url" className="form-control form-control-sm" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fs-6">Image URL</label>
          <input type="url" className="form-control form-control-sm" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm w-100">Update News</button>
      </form>
    </div>
  );
};

export default EditNewsForm;
