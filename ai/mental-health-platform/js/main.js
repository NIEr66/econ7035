// Main JavaScript for the Mental Health Platform

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize pricing calculator
  initPricingCalculator();
  
  // Initialize health points progress
  initHealthPoints();
  
  // Initialize upload functionality
  initUploadArea();
  
  // Initialize scroll effects
  initScrollEffects();
});

// Animation initialization
function initAnimations() {
  // Add fade-in animation to elements with specific class
  const fadeElements = document.querySelectorAll('.animate-fade-in');
  
  // Add intersection observer to trigger animations when elements are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
  });
}

// Pricing calculator functionality
function initPricingCalculator() {
  const savingsProgress = document.querySelector('.savings-progress');
  const savingsAmount = document.querySelector('.savings-amount');
  
  if (savingsProgress && savingsAmount) {
    // Default values - would come from actual data in a real implementation
    let traditionalCost = 3200; // Example: 4 visits at $800 each
    let platformCost = 2000;    // Example: Platform service for same treatment
    let savings = traditionalCost - platformCost;
    let savingsPercentage = (savings / traditionalCost) * 100;
    
    // Update the UI
    savingsProgress.style.width = savingsPercentage + '%';
    savingsAmount.textContent = `You've saved $${savings}`;
    
    // Add animation effect to make the progress bar grow
    setTimeout(() => {
      savingsProgress.style.width = savingsPercentage + '%';
    }, 500);
  }
}

// Health points functionality
function initHealthPoints() {
  const pointsBar = document.querySelector('.points-bar');
  const pointsTotal = document.querySelector('.points-total');
  
  if (pointsBar && pointsTotal) {
    // Default values - would come from user data in a real implementation
    let currentPoints = 750;
    let goalPoints = 1000;
    let percentage = (currentPoints / goalPoints) * 100;
    
    // Update the UI
    pointsTotal.textContent = currentPoints;
    
    // Add animation effect to make the progress bar grow
    setTimeout(() => {
      pointsBar.style.width = percentage + '%';
    }, 500);
  }
}

// File upload area functionality
function initUploadArea() {
  const uploadArea = document.querySelector('.upload-area');
  const fileInput = document.querySelector('#file-upload');
  
  if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('active');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('active');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('active');
      
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileUpload(e.dataTransfer.files);
      }
    });
    
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        handleFileUpload(fileInput.files);
      }
    });
  }
}

// Handle file upload
function handleFileUpload(files) {
  // This would handle the actual file upload in a real implementation
  // For now, just show a success message
  const uploadText = document.querySelector('.upload-text');
  
  if (uploadText) {
    const originalText = uploadText.textContent;
    uploadText.textContent = `${files.length} file(s) selected. Upload successful!`;
    
    // Award points for data contribution
    awardHealthPoints(25);
    
    // Reset text after a delay
    setTimeout(() => {
      uploadText.textContent = originalText;
    }, 3000);
  }
}

// Award health points to the user
function awardHealthPoints(points) {
  const pointsTotal = document.querySelector('.points-total');
  const pointsBar = document.querySelector('.points-bar');
  
  if (pointsTotal && pointsBar) {
    // Get current points
    let currentPoints = parseInt(pointsTotal.textContent, 10);
    let goalPoints = 1000; // This would come from settings in a real implementation
    
    // Add new points
    currentPoints += points;
    
    // Update display with animation
    let displayPoints = parseInt(pointsTotal.textContent, 10);
    const interval = setInterval(() => {
      displayPoints += 1;
      pointsTotal.textContent = displayPoints;
      
      if (displayPoints >= currentPoints) {
        clearInterval(interval);
      }
    }, 20);
    
    // Update progress bar
    let percentage = (currentPoints / goalPoints) * 100;
    pointsBar.style.width = percentage + '%';
    
    // Notify user
    showNotification(`You earned ${points} health points!`);
  }
}

// Show a notification message
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Scroll effects
function initScrollEffects() {
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Cost comparison calculator
function calculateComparison(traditionalPrice, platformPrice) {
  const savings = traditionalPrice - platformPrice;
  const savingsPercentage = (savings / traditionalPrice) * 100;
  
  return {
    savings,
    savingsPercentage,
    platformPrice,
    traditionalPrice
  };
}

// Create AI assessment report (placeholder function)
function generateAIReport(userData) {
  // In a real implementation, this would call an API to generate a report
  console.log('Generating AI report for user data:', userData);
  
  // For demo purposes, simulate a delay and return a success message
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'AI assessment report generated successfully',
        recommendHospitalVisit: userData.severity > 7,
        severityScore: userData.severity,
        recommendedActions: [
          'Daily mood tracking',
          'Weekly check-in with therapist',
          'Mindfulness practice for 10 minutes daily'
        ]
      });
    }, 2000);
  });
}

// Blockchain data tracking simulation (placeholder function)
function trackDataUsage(dataId, researcherId) {
  // In a real implementation, this would interact with a blockchain system
  const timestamp = new Date().toISOString();
  
  console.log(`Data usage tracked on blockchain: Data ID ${dataId} accessed by Researcher ID ${researcherId} at ${timestamp}`);
  
  return {
    status: 'success',
    transactionId: 'tx_' + Math.random().toString(36).substr(2, 9),
    timestamp
  };
} 