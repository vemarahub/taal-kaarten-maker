# Dutch Time Practice Component

## Overview
An interactive component for learning Dutch time expressions with visual analog clock and multiple-choice questions.

## Features

### 🕐 Analog Clock Display
- Visual representation of time with hour and minute hands
- Clear hour markers (1-12)
- Responsive SVG-based design

### 📚 Two Learning Modes

#### Practice Mode
- Shows the correct Dutch time expression
- Audio pronunciation using Web Speech API
- Educational information about Dutch time rules
- Generate new random times for practice

#### Quiz Mode
- Multiple choice questions (4 options)
- Score tracking with percentage
- Immediate feedback with correct/incorrect indicators
- Audio pronunciation for correct answers

### 🎯 Dutch Time Rules Covered

#### Basic Hours
- `een uur` (1:00)
- `twaalf uur` (12:00)

#### Quarter Hours
- `kwart over` (:15)
- `half` (:30) - **Important: refers to the NEXT hour!**
- `kwart voor` (:45)

#### Five-Minute Intervals
- `vijf over` (:05)
- `tien over` (:10)
- `vijf voor half` (:25)
- `vijf over half` (:35)
- `tien over half` (:40)
- `tien voor` (:50)
- `vijf voor` (:55)

### 🔊 Audio Features
- Text-to-speech pronunciation in Dutch (nl-NL)
- Adjustable speech rate for clarity
- Works with browsers that support Web Speech API

### 📱 Responsive Design
- Mobile-friendly layout
- Grid-based responsive design
- Touch-friendly buttons

## Technical Implementation

### Components Used
- React functional component with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React icons
- Custom UI components (Card, Button)

### Key Functions
- `generateDutchTime()`: Converts hours/minutes to Dutch expressions
- `generateRandomTime()`: Creates random practice times
- `generateOptions()`: Creates multiple choice options
- `AnalogClock`: SVG-based clock component

### Time Generation Logic
- Hours: 1-12 (random)
- Minutes: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 (common intervals)
- Special handling for "half" expressions (refers to next hour)

## Usage

The component is integrated into the Misc page (`/misc`) and can be accessed by:
1. Clicking the "Oefenen met tijd" button in the Time card
2. Scrolling to the Time Practice section

## Browser Compatibility

- Modern browsers with ES6+ support
- Web Speech API for audio (optional feature)
- SVG support for clock display