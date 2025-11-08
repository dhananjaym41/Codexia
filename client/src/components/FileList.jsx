"use client"

import "../styles/FileList.css"

export default function FileList({ files, onDelete }) {
  const getFileIcon = (type) => {
    const icons = {
      HTML: "🔶",
      JSX: "⚛️",
      TSX: "⚛️",
      CSS: "🎨",
      SCSS: "🎨",
    }
    return icons[type] || "📄"
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="file-list">
      <h3>Uploaded Files ({files.length})</h3>
      <div className="files-container">
        {files.map((file) => (
          <div key={file.id} className="file-item">
            <div className="file-info">
              <span className="file-icon">{getFileIcon(file.type)}</span>
              <div className="file-details">
                <p className="file-name">{file.filename}</p>
                <p className="file-meta">
                  {file.type} • {formatSize(file.size)}
                </p>
              </div>
            </div>
            <button className="btn-delete" onClick={() => onDelete(file.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
