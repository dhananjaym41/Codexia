"use client"

import { useState } from "react"
import HomePage from "./pages/HomePage.jsx"
import ProjectDetail from "./pages/ProjectDetail.jsx"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const navigateTo = (page, projectId = null) => {
    setCurrentPage(page)
    if (projectId) {
      setSelectedProjectId(projectId)
    }
  }

  return (
    <div className="app">
      {currentPage === "home" && (
        <HomePage
          onSelectProject={(id) => {
            navigateTo("detail", id)
          }}
        />
      )}
      {currentPage === "detail" && selectedProjectId && (
        <ProjectDetail projectId={selectedProjectId} onBack={() => navigateTo("home")} />
      )}
    </div>
  )
}

export default App
