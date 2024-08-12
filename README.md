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
   git clone https://github.com/esairfan/Gemini-Clone.git
    
## Usage

- **Expand/Collapse Sidebar**: Click the menu icon to toggle the sidebar.
- **Start New Chat**: Click the "New Chat" button to start a new chat session.
- **Load Previous Prompts**: Click on recent prompts in the sidebar to load them.

## Customization

- **Assets**: Update icons and images in the assets directory and adjust paths in `SideBar.js`.
- **Styling**: Modify `SideBar.css` and `main.css` to change colors, fonts, and layout.
- **Context**: Extend the Context in `SideBar.js` for additional state or functionality.

## Responsive Design

- **1000px Width**: Adjustments to avoid scrolling and ensure content fits without overflow.
- **800px Width**: Further adjustments to optimize layout and fit content.
- **600px Width and Below**: Sidebar is hidden to maximize the main content area on smaller screens.

## License

This project is licensed under the Apache License. See the LICENSE file for more details.

## Contact

- **Email**: [ibrahimirfan815@gmail.com](mailto:your.email@example.com)

