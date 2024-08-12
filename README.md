# Gemini Clone Feature

## Overview

The **Gemini Clone Feature** is a component designed to replicate the functionality of Gemini, a feature-rich chatbot interface. This component allows users to interact with a conversational AI, manage chat sessions, view previous prompts, and more, all within a sleek and user-friendly sidebar interface.

## Features

- **Interactive Sidebar**: A collapsible sidebar that provides quick access to recent prompts, chat history, and other key functions.
- **New Chat Session**: Start a new chat session with a single click.
- **Load Previous Prompts**: Easily access and load previous chat prompts from the sidebar.
- **User-Friendly Interface**: The interface is designed to be intuitive and responsive, with smooth animations and a modern design.
- **Responsive Design**: The layout adapts to different screen sizes, ensuring a consistent user experience across all devices.

## Components

### 1. `SideBar.js`
- **Functionality**: This React component manages the sidebar, including toggling its visibility, displaying recent prompts, and providing access to help, activities, and settings.
- **State Management**: Utilizes the `useState` hook to manage the extended/collapsed state of the sidebar.
- **Context**: Uses React's `useContext` hook to interact with global state or functions passed down through a `Context` provider.

### 2. `SideBar.css`
- **Styling**: Contains all the CSS necessary to style the sidebar and its contents. It includes responsive design elements to ensure the sidebar functions well on different screen sizes.
- **Animations**: Includes keyframe animations for smooth transitions when toggling the sidebar.

### 3. `main.css`
- **Main Content Styling**: Styles the main content area where chat interactions happen. Includes responsive adjustments to ensure content fits well within different screen sizes, particularly at 1000px and 800px widths.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gemini-clone.git
