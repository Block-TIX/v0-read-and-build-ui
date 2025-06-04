import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Set up navigation data
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
    { id: "timeline", label: "Medical History", icon: "calendar" },
    { id: "upload", label: "Upload Exams", icon: "upload" },
    { id: "analysis", label: "Exam Analysis", icon: "activity" },
    { id: "insights", label: "Health Insights", icon: "heart" },
  ]

  // Initialize icons
  initializeIcons()

  // Set up navigation
  setupNavigation(navItems)

  // Set up mobile menu
  setupMobileMenu()

  // Set up theme toggle
  setupThemeToggle()

  // Set up dashboard data
  setupDashboardData()

  // Initialize charts
  initializeCharts()

  // Set up metrics tabs
  setupMetricsTabs()
})

function initializeIcons() {
  // Header icons
  setIcon("heart-icon", "heart", "w-5 h-5")
  setIcon("menu-icon", "menu", "w-5 h-5")
  setIcon("theme-icon", "moon", "w-5 h-5")
  setIcon("settings-icon", "settings", "w-5 h-5")
  setIcon("user-icon", "user", "w-5 h-5")
  setIcon("mobile-heart-icon", "heart", "w-5 h-5")
  setIcon("close-icon", "x", "w-5 h-5")

  // Dashboard icons
  setIcon("upload-icon", "upload", "w-4 h-4")
  setIcon("calendar-icon", "calendar", "w-4 h-4")
  setIcon("health-score-icon", "heart", "w-5 h-5")
  setIcon("trending-up-icon", "trending-up", "w-3 h-3")
  setIcon("big-heart-icon", "heart", "w-16 h-16")
  setIcon("check-circle-icon", "check-circle", "w-5 h-5")
  setIcon("arrow-right-icon", "arrow-right", "w-4 h-4")
  setIcon("activity-icon", "activity", "w-5 h-5")
  setIcon("file-text-icon", "file-text", "w-5 h-5")
  setIcon("insights-heart-icon", "heart", "w-5 h-5")
  setIcon("exams-arrow-icon", "arrow-right", "w-4 h-4")
  setIcon("insights-arrow-icon", "arrow-right", "w-4 h-4")
  setIcon("metrics-activity-icon", "activity", "w-5 h-5")
  setIcon("upload-action-icon", "upload", "w-6 h-6")
  setIcon("user-action-icon", "user", "w-6 h-6")
  setIcon("calendar-action-icon", "calendar", "w-6 h-6")

  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons()
  }
}

function setIcon(elementId, iconName, className) {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = '<i data-lucide="' + iconName + '" class="' + className + '"></i>'
  }
}

function setupNavigation(navItems) {
  const sidebarNav = document.getElementById("sidebar-nav")
  const mobileNav = document.getElementById("mobile-nav")
  let activeTab = "dashboard"

  if (!sidebarNav || !mobileNav) return

  // Create navigation items
  navItems.forEach((item) => {
    // Desktop nav item
    const navItem = document.createElement("button")
    navItem.className =
      "w-full flex items-center justify-start text-base font-medium h-12 px-4 rounded-md transition-all duration-200 " +
      (activeTab === item.id
        ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 shadow-sm"
        : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20")
    navItem.dataset.tab = item.id

    const iconSpan = document.createElement("span")
    iconSpan.className = "mr-3"
    iconSpan.innerHTML = '<i data-lucide="' + item.icon + '" class="w-5 h-5"></i>'

    const labelSpan = document.createElement("span")
    labelSpan.textContent = item.label

    navItem.appendChild(iconSpan)
    navItem.appendChild(labelSpan)

    if (activeTab === item.id) {
      const indicator = document.createElement("div")
      indicator.className =
        "absolute right-0 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-full shadow-lg"
      navItem.appendChild(indicator)
    }

    sidebarNav.appendChild(navItem)

    // Mobile nav item
    const mobileNavItem = navItem.cloneNode(true)
    mobileNav.appendChild(mobileNavItem)

    // Add event listeners
    navItem.addEventListener("click", () => {
      switchTab(item.id)
    })
    mobileNavItem.addEventListener("click", () => {
      switchTab(item.id)
      toggleMobileMenu()
    })
  })

  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons()
  }

  function switchTab(tabId) {
    activeTab = tabId

    // Update desktop nav
    const desktopNavItems = sidebarNav.querySelectorAll("button")
    desktopNavItems.forEach((item) => {
      if (item.dataset.tab === activeTab) {
        item.className =
          "w-full flex items-center justify-start text-base font-medium h-12 px-4 rounded-md transition-all duration-200 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 shadow-sm"

        // Add indicator
        const indicator = document.createElement("div")
        indicator.className =
          "absolute right-0 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-full shadow-lg"
        item.appendChild(indicator)
      } else {
        item.className =
          "w-full flex items-center justify-start text-base font-medium h-12 px-4 rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20"

        // Remove indicator if exists
        const existingIndicator = item.querySelector("div.absolute")
        if (existingIndicator) {
          item.removeChild(existingIndicator)
        }
      }
    })

    // Update mobile nav
    const mobileNavItems = mobileNav.querySelectorAll("button")
    mobileNavItems.forEach((item) => {
      if (item.dataset.tab === activeTab) {
        item.className =
          "w-full flex items-center justify-start text-base font-medium h-12 px-4 rounded-md transition-all duration-200 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300"
      } else {
        item.className =
          "w-full flex items-center justify-start text-base font-medium h-12 px-4 rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400"
      }
    })
  }
}

function setupMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const closeMobileMenuButton = document.getElementById("close-mobile-menu")
  const mobileMenu = document.getElementById("mobile-menu")

  if (!mobileMenuButton || !closeMobileMenuButton || !mobileMenu) return

  mobileMenuButton.addEventListener("click", toggleMobileMenu)
  closeMobileMenuButton.addEventListener("click", toggleMobileMenu)

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("open")
  }

  // Make toggleMobileMenu available globally
  window.toggleMobileMenu = toggleMobileMenu
}

function setupThemeToggle() {
  const themeToggleButton = document.getElementById("theme-toggle")
  const themeIcon = document.getElementById("theme-icon")

  if (!themeToggleButton || !themeIcon) return

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark")
    themeIcon.innerHTML = '<i data-lucide="sun" class="w-5 h-5"></i>'
  } else {
    document.documentElement.classList.remove("dark")
    themeIcon.innerHTML = '<i data-lucide="moon" class="w-5 h-5"></i>'
  }

  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons()
  }

  themeToggleButton.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      themeIcon.innerHTML = '<i data-lucide="moon" class="w-5 h-5"></i>'
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      themeIcon.innerHTML = '<i data-lucide="sun" class="w-5 h-5"></i>'
    }

    // Initialize Lucide icons if available
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons()
    }
  })
}

function setupDashboardData() {
  // Set last updated date
  const lastUpdatedElement = document.getElementById("last-updated-date")
  if (lastUpdatedElement) {
    lastUpdatedElement.textContent = new Date().toLocaleDateString()
  }

  // Set up biomarkers
  const biomarkersData = [
    { name: "Cholesterol", value: 180, normal: 200, unit: "mg/dL" },
    { name: "Blood Sugar", value: 95, normal: 100, unit: "mg/dL" },
    { name: "Blood Pressure", value: 125, normal: 120, unit: "mmHg" },
    { name: "Resting HR", value: 68, normal: 75, unit: "bpm" },
    { name: "BMI", value: 24.5, normal: 25, unit: "" },
  ]

  const biomarkersContainer = document.getElementById("biomarkers-container")
  if (!biomarkersContainer) return

  biomarkersData.forEach((marker) => {
    const percentage = (marker.value / marker.normal) * 100
    const isNormal = percentage <= 100

    const markerDiv = document.createElement("div")
    markerDiv.className = "space-y-3"

    const headerDiv = document.createElement("div")
    headerDiv.className = "flex items-center justify-between"

    const leftDiv = document.createElement("div")
    leftDiv.className = "flex items-center gap-3"

    const indicatorDiv = document.createElement("div")
    indicatorDiv.className = "w-3 h-3 rounded-full shadow-sm " + (isNormal ? "bg-emerald-500" : "bg-amber-500")

    const nameSpan = document.createElement("span")
    nameSpan.className = "font-medium"
    nameSpan.textContent = marker.name

    const badgeSpan = document.createElement("span")
    badgeSpan.className = isNormal
      ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
      : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400"
    badgeSpan.textContent = isNormal ? "Normal" : "Elevated"

    leftDiv.appendChild(indicatorDiv)
    leftDiv.appendChild(nameSpan)
    leftDiv.appendChild(badgeSpan)

    const valueSpan = document.createElement("span")
    valueSpan.className = "font-bold text-lg"
    valueSpan.innerHTML = marker.value + ' <span class="text-sm font-normal text-gray-500">' + marker.unit + "</span>"

    headerDiv.appendChild(leftDiv)
    headerDiv.appendChild(valueSpan)

    const progressDiv = document.createElement("div")
    progressDiv.className = "relative"

    const progressContainer = document.createElement("div")
    progressContainer.className = "progress-container"

    const progressBar = document.createElement("div")
    progressBar.className = "progress-bar " + (isNormal ? "progress-normal" : "progress-attention")
    progressBar.style.width = percentage + "%"

    const progressOverlay = document.createElement("div")
    progressOverlay.className = "progress-overlay"

    progressContainer.appendChild(progressBar)
    progressContainer.appendChild(progressOverlay)
    progressDiv.appendChild(progressContainer)

    const targetDiv = document.createElement("div")
    targetDiv.className = "text-xs text-gray-500 dark:text-gray-400"
    targetDiv.textContent = "Target: ≤ " + marker.normal + " " + marker.unit

    markerDiv.appendChild(headerDiv)
    markerDiv.appendChild(progressDiv)
    markerDiv.appendChild(targetDiv)

    biomarkersContainer.appendChild(markerDiv)
  })

  // Set up recent exams
  const recentExams = [
    {
      id: 1,
      type: "Blood Test",
      date: "2024-05-15",
      status: "analyzed",
      trend: "improved",
    },
    {
      id: 2,
      type: "Chest X-Ray",
      date: "2024-04-28",
      status: "analyzed",
      trend: "stable",
    },
    {
      id: 3,
      type: "Cardiac Stress Test",
      date: "2024-04-10",
      status: "analyzed",
      trend: "attention",
    },
  ]

  const recentExamsContainer = document.getElementById("recent-exams-container")
  if (!recentExamsContainer) return

  recentExams.forEach((exam) => {
    const examDiv = document.createElement("div")
    examDiv.className =
      "p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-200"

    const headerDiv = document.createElement("div")
    headerDiv.className = "flex items-center justify-between mb-2"

    const titleH3 = document.createElement("h3")
    titleH3.className = "font-medium"
    titleH3.textContent = exam.type

    const badgeSpan = document.createElement("span")
    let badgeClass, badgeIcon

    switch (exam.trend) {
      case "improved":
        badgeClass =
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
        badgeIcon = '<i data-lucide="trending-up" class="w-4 h-4 mr-1"></i>'
        break
      case "attention":
        badgeClass =
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        badgeIcon = '<i data-lucide="trending-down" class="w-4 h-4 mr-1"></i>'
        break
      default:
        badgeClass =
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        badgeIcon = '<i data-lucide="activity" class="w-4 h-4 mr-1"></i>'
    }

    badgeSpan.className = badgeClass
    badgeSpan.innerHTML = badgeIcon + '<span class="capitalize">' + exam.trend + "</span>"

    headerDiv.appendChild(titleH3)
    headerDiv.appendChild(badgeSpan)

    const dateDiv = document.createElement("div")
    dateDiv.className = "flex items-center text-sm text-gray-600 dark:text-gray-400"
    dateDiv.innerHTML =
      '<i data-lucide="calendar" class="w-4 h-4 mr-1"></i>' +
      new Date(exam.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

    examDiv.appendChild(headerDiv)
    examDiv.appendChild(dateDiv)

    recentExamsContainer.appendChild(examDiv)
  })

  // Set up health insights
  const healthInsights = [
    {
      id: 1,
      title: "Excellent Vitamin D Levels",
      description: "Your vitamin D levels are optimal, which supports bone health and immune function.",
      type: "positive",
    },
    {
      id: 2,
      title: "Consider Reducing Sodium Intake",
      description: "Your sodium levels are slightly elevated. Consider reducing salt in your diet.",
      type: "recommendation",
    },
    {
      id: 3,
      title: "Monitor Blood Pressure",
      description: "Your blood pressure is trending upward. Consider more frequent monitoring.",
      type: "monitoring",
    },
  ]

  const healthInsightsContainer = document.getElementById("health-insights-container")
  if (!healthInsightsContainer) return

  healthInsights.forEach((insight) => {
    const insightDiv = document.createElement("div")
    insightDiv.className =
      "p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
    insightDiv.dataset.insightId = insight.id

    const contentDiv = document.createElement("div")
    contentDiv.className = "flex items-start gap-3"

    let iconClass, iconHtml
    switch (insight.type) {
      case "positive":
        iconClass = "p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 shadow-sm"
        iconHtml = '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>'
        break
      case "recommendation":
        iconClass = "p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-sm"
        iconHtml = '<i data-lucide="file-text" class="w-5 h-5 text-blue-600"></i>'
        break
      case "monitoring":
        iconClass = "p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 shadow-sm"
        iconHtml = '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600"></i>'
        break
    }

    const iconDiv = document.createElement("div")
    iconDiv.className = iconClass
    iconDiv.innerHTML = iconHtml

    const textDiv = document.createElement("div")
    textDiv.className = "flex-1"

    const headerDiv = document.createElement("div")
    headerDiv.className = "flex items-center justify-between"

    const titleH3 = document.createElement("h3")
    titleH3.className = "font-medium"
    titleH3.textContent = insight.title

    const toggleButton = document.createElement("button")
    toggleButton.className = "h-8 w-8 p-0 bg-transparent border-none cursor-pointer"
    toggleButton.innerHTML = '<i data-lucide="chevron-down" class="h-4 w-4"></i>'
    toggleButton.addEventListener("click", () => {
      toggleInsight(insight.id)
    })

    headerDiv.appendChild(titleH3)
    headerDiv.appendChild(toggleButton)

    const descriptionP = document.createElement("p")
    descriptionP.className = "text-sm text-gray-600 dark:text-gray-400 mt-2 hidden insight-description"
    descriptionP.textContent = insight.description

    textDiv.appendChild(headerDiv)
    textDiv.appendChild(descriptionP)

    contentDiv.appendChild(iconDiv)
    contentDiv.appendChild(textDiv)

    insightDiv.appendChild(contentDiv)

    healthInsightsContainer.appendChild(insightDiv)
  })

  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons()
  }

  function toggleInsight(id) {
    const insightDiv = document.querySelector('[data-insight-id="' + id + '"]')
    if (!insightDiv) return

    const description = insightDiv.querySelector(".insight-description")
    const toggleButton = insightDiv.querySelector("button")

    if (description.classList.contains("hidden")) {
      description.classList.remove("hidden")
      toggleButton.innerHTML = '<i data-lucide="chevron-up" class="h-4 w-4"></i>'
    } else {
      description.classList.add("hidden")
      toggleButton.innerHTML = '<i data-lucide="chevron-down" class="h-4 w-4"></i>'
    }

    // Initialize Lucide icons if available
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons()
    }
  }
}

function initializeCharts() {
  // Check if Chart.js is available
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded, skipping chart initialization")
    return
  }

  // Health Score Chart
  const healthScoreData = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 75 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 82 },
    { month: "May", score: 85 },
    { month: "Jun", score: 83 },
    { month: "Jul", score: 87 },
    { month: "Aug", score: 89 },
  ]

  const healthScoreCanvas = document.getElementById("health-score-chart")
  if (healthScoreCanvas) {
    const healthScoreCtx = healthScoreCanvas.getContext("2d")

    const healthScoreGradient = healthScoreCtx.createLinearGradient(0, 0, 0, 200)
    healthScoreGradient.addColorStop(0, "rgba(16, 185, 129, 0.8)")
    healthScoreGradient.addColorStop(1, "rgba(20, 184, 166, 0.1)")

    new Chart(healthScoreCtx, {
      type: "line",
      data: {
        labels: healthScoreData.map((d) => d.month),
        datasets: [
          {
            label: "Health Score",
            data: healthScoreData.map((d) => d.score),
            borderColor: "#10b981",
            backgroundColor: healthScoreGradient,
            borderWidth: 2,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 50,
            max: 100,
            grid: {
              color: "rgba(209, 250, 229, 0.3)",
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#111827",
            bodyColor: "#374151",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            padding: 10,
            titleFont: {
              size: 14,
              weight: "bold",
            },
            bodyFont: {
              size: 12,
            },
          },
        },
      },
    })
  }

  // Cholesterol Chart
  const cholesterolCanvas = document.getElementById("cholesterol-chart")
  if (cholesterolCanvas) {
    const cholesterolCtx = cholesterolCanvas.getContext("2d")

    const cholesterolGradient = cholesterolCtx.createLinearGradient(0, 0, 0, 300)
    cholesterolGradient.addColorStop(0, "rgba(16, 185, 129, 0.8)")
    cholesterolGradient.addColorStop(1, "rgba(20, 184, 166, 0.6)")

    new Chart(cholesterolCtx, {
      type: "bar",
      data: {
        labels: ["Total", "HDL", "LDL", "Triglycerides"],
        datasets: [
          {
            label: "Value",
            data: [180, 55, 110, 120],
            backgroundColor: cholesterolGradient,
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              color: "rgba(209, 250, 229, 1)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#111827",
            bodyColor: "#374151",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            padding: 10,
            callbacks: {
              afterLabel: (context) => {
                const normals = ["< 200", "> 40", "< 100", "< 150"]
                return "Normal range: " + normals[context.dataIndex]
              },
            },
          },
        },
      },
    })
  }
}

function setupMetricsTabs() {
  const tabs = document.querySelectorAll(".metrics-tab")
  const contents = document.querySelectorAll(".metrics-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => {
        t.classList.remove("active")
      })

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all content
      contents.forEach((c) => {
        c.classList.add("hidden")
        c.classList.remove("active")
      })

      // Show content for active tab
      const activeContent = document.getElementById(tab.dataset.tab + "-content")
      if (activeContent) {
        activeContent.classList.remove("hidden")
        activeContent.classList.add("active")
      }
    })
  })
}
