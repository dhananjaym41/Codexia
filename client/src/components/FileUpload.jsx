"use client"

import { useState } from "react"
import "../styles/FileUpload.css"

export default function FileUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (selectedFiles) => {
    const supportedExtensions = ["html", "jsx", "tsx", "css", "scss", "js", "ts"]
    const validFiles = selectedFiles.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase()
      return supportedExtensions.includes(ext)
    })

    if (validFiles.length === 0) {
      alert("No valid files selected. Supported: HTML, JSX, TSX, CSS, SCSS, JS, TS")
      return
    }

    onUpload(validFiles)
  }

  const handleFolderSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  return (
    <div className="file-upload">
      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <h3>📁 Upload Files or Folder</h3>
          <p>Drag and drop files here or click to select</p>
          <p className="file-types">Supported: HTML, JSX, TSX, CSS, SCSS, JS, TS</p>
        </div>
      </div>

      <div className="upload-buttons">
        <input
          type="file"
          id="file-input"
          multiple
          accept=".html,.jsx,.tsx,.css,.scss,.js,.ts"
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          style={{ display: "none" }}
        />
        <input
          type="file"
          id="folder-input"
          webkitdirectory="true"
          directory="true"
          onChange={handleFolderSelect}
          style={{ display: "none" }}
        />
        <button className="btn btn-secondary" onClick={() => document.getElementById("file-input").click()}>
          Select Files
        </button>
        <button className="btn btn-secondary" onClick={() => document.getElementById("folder-input").click()}>
          Select Folder
        </button>
      </div>
    </div>
  )
}
