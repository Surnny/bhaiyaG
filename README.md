# 📚 EduHub - Educational Management System

A modern, responsive web application built with React for managing educational content, videos, and user authentication. Features a beautiful dark/light theme interface with comprehensive admin controls.

## 🌟 Features

### 🔐 Authentication System
- **Secure Login/Signup** with bcrypt password hashing
- **User blocking system** for admin moderation
- **Email validation** and duplicate prevention
- **Responsive design** with glass-morphism effects
- **Password visibility toggle** for better UX

### 📖 Notes Management
- **Multi-class support** (Class 7-10)
- **Categorized notes** (Detail Notes, Class Notes, Mind Maps)
- **Google Drive integration** for file storage
- **Admin controls** for adding/deleting content
- **Beautiful card-based interface** with hover animations

### 🎬 Video Library
- **YouTube video embedding** with automatic URL normalization
- **Class-wise video organization**
- **Responsive video player** with aspect ratio preservation
- **Admin video management** (add/delete functionality)
- **Empty state handling** with call-to-action buttons

### 🎨 UI/UX Features
- **Modern gradient designs** with premium aesthetics
- **Dark/Light theme support** with smooth transitions
- **Responsive layout** optimized for all devices
- **Micro-animations** and hover effects
- **Glass-morphism** and backdrop blur effects
- **Interactive loading states** and visual feedback

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework

### Authentication & Security
- **bcryptjs** - Password hashing and encryption
- **Firebase Realtime Database** - Backend data storage
- **Local Storage** - Client-side session management

### Development
- **Vite** - Fast build tool and dev server
- **ES6+ JavaScript** - Modern JavaScript features

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project setup

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_DATABASE_URL=https://your-firebase-project.firebaseio.com
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Realtime Database
   - Set up the database structure (see Database Schema below)
   - Update the database URL in your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🗄️ Database Schema

### Firebase Realtime Database Structure
```json
{
  "users": {
    "0": {
      "email": "user@example.com",
      "password": "$2a$10$hashedPasswordHere"
    }
  },
  "blocks": {
    "0": {
      "email": "blocked@example.com"
    }
  },
  "notes": {
    "class7": {
      "detailNotes": [
        {
          "title": "Chapter 1 - Introduction",
          "url": "https://drive.google.com/file/d/..."
        }
      ],
      "classNotes": [...],
      "mindMaps": [...]
    },
    "class8": {...},
    "class9": {...},
    "class10": {...}
  },
  "videos": {
    "class7": [
      {
        "title": "Math Lesson 1",
        "url": "https://www.youtube.com/embed/videoId"
      }
    ],
    "class8": [...],
    "class9": [...],
    "class10": [...]
  }
}
```

## 👥 User Roles & Permissions

### Admin Users
- **Email whitelist**: `ayush25.kandari@gmail.com`, `sphsinghpharswan@gmail.com`
- **Permissions**:
  - Add/delete notes and videos
  - Access to all admin controls
  - Content management across all classes

### Regular Users
- **Permissions**:
  - View notes and videos
  - Access all educational content
  - Cannot modify content

## 🎨 Component Architecture

### Core Components

#### `Login.jsx`
- Handles user authentication
- bcrypt password verification
- User blocking checks
- Responsive form with validation

#### `Signup.jsx`
- New user registration
- Password hashing before storage
- Duplicate email prevention
- Admin contact for blocked users

#### `Notes.jsx`
- Multi-class note management
- Three categories of notes
- Google Drive integration
- Admin CRUD operations

#### `Videos.jsx`
- YouTube video embedding
- Class-wise organization
- URL normalization for different YouTube formats
- Responsive video grid layout

#### `NotFound.jsx`
- Custom 404 error page
- Entertainment video integration
- Conditional navigation based on user status
- Engaging error messaging

## 🎯 Key Features Detail

### Authentication Flow
1. **User Registration**: Email validation → Password hashing → Database storage
2. **Login Process**: Credential verification → Block check → Session creation
3. **Session Management**: LocalStorage-based user persistence

### Content Management
- **Notes**: Support for Google Drive links with categorization
- **Videos**: YouTube URL normalization (supports watch URLs, embed URLs, and iframe codes)
- **Admin Controls**: Contextual add/delete buttons for authorized users

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid systems** for different screen sizes
- **Touch-friendly interfaces** for mobile devices
- **Optimized typography** and spacing

## 🔧 Configuration

### Environment Variables
```env
# Firebase Configuration
VITE_DATABASE_URL=https://your-project.firebaseio.com

# Optional: Add other environment variables as needed
```

### Firebase Rules (Recommended)
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      ".indexOn": ["email"]
    }
  }
}
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes with proper testing
4. Commit with descriptive messages
5. Push and create a pull request

### Code Style Guidelines
- Use ES6+ features and modern JavaScript
- Follow React best practices and hooks patterns
- Maintain consistent Tailwind CSS class naming
- Add comments for complex logic
- Test across different devices and browsers

## 📱 Browser Support

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

#### Firebase Connection Issues
```javascript
const DATABASE_URL = "https://project-name-default-rtdb.firebaseio.com"
```

#### Authentication Problems
- Verify admin email addresses in the code
- Check password hashing implementation
- Ensure proper error handling

#### Video Embedding Issues
- Verify YouTube URL formats are supported
- Check iframe permissions and CORS policies
- Test with different video privacy settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors & Maintainers

- **Admin Contact**: sphsinghpharswan@gmail.com
- **Technical Lead**: ayush25.kandari@gmail.com

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Firebase** for the robust backend infrastructure

## 📈 Future Enhancements

### Planned Features
- [ ] **Real-time notifications** for new content
- [ ] **Advanced search functionality** across notes and videos
- [ ] **User progress tracking** and analytics
- [ ] **Mobile app** with React Native
- [ ] **Offline support** with service workers
- [ ] **Multi-language support** for international users
- [ ] **Advanced admin dashboard** with statistics
- [ ] **Bulk content upload** functionality

### Technical Improvements
- [ ] **Unit and integration testing** with Jest/Testing Library
- [ ] **Progressive Web App** (PWA) features
- [ ] **Performance optimization** with code splitting
- [ ] **Accessibility improvements** (WCAG compliance)
- [ ] **SEO optimization** for better discoverability

---

**Made with ❤️ for education and learning**

For support or questions, please contact the development team or create an issue in the repository.