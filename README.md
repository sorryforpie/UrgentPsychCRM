Patient Matter CRM - built for psychiatrists or small teams of them.
prompt: Design a full-screen, ultra-minimal, premium CRM interface for psychiatrists or small teams of them. Focus on layout, spacing, typography, and aesthetic — not placeholder content. Use a 2-column structure where needed, consistent visual rhythm, soft shadows, and large touch targets. Every screen should feel polished and deliberate, with a native app-like feel.

UI Style:
• Apple-like calm aesthetic with subtle gradients or shadows
• Color palette: neutral background (#F9FAFB or similar), dark text (#1A1A1A), elegant accent color (deep indigo or forest green)
• Typography: Use Inter or SF Pro, bold headlines (24–32px), medium labels, fine secondary text
• Spacing: Generous padding (24–40px), consistent vertical rhythm
• Cards: Rounded corners (2xl), hover shadows, light dividers inside
• Icons: Lucide or Feather-style line icons, clean and consistent

Screens to Create (A collapsible left sidebar will link to each page below):

Dashboard Overview Screen
Prioritize clear info hierarchy, use modular card layout. Full-width nav bar, left sidebar, and responsive grid cards.

Matters List View
Design a clean, sortable table or card view with filters and batch actions. No clutter, inline status pills and icons.

Matter Detail Page
Split layout: left summary pane + right tabbed content (overview, documents, billing, etc.). Make each section collapsible or scrollable with smooth UX.

Patient Directory
Grid or table with minimal data preview. Use avatars, clean rows, search bar with filters, and subtle hover states.

Patient Profile Page
Focus on hierarchy and separation of metadata, activity timeline, and related items. Emphasize clean layout, mobile-first card stacks.

Referral Management Centre
With upload button, file preview cards, meant to have sortable sub-files (create new folder function) for sorting outpatient referrals to other specialties or clinics, button with function for apply referral to [searchable patient database] that proceeds to auto-populate a referral document (you don't need to build this functionality in yet, will be GenAI coded later)

Community Resource Management Centre
With upload button, file preview cards, and allows selection of multiple resources with a "print on page" button.

Document Management Page for patients
Grid/folder UI with upload button, file preview cards, and version controls. Add spacing for drag-and-drop zones.

Calendar View
Monthly view with swipable weeks, color-coded badges, and expandable cards for events. Soft grid lines and calm palette.

Time Tracking / Billing Screen
Modern toggle or timer UI with dropdowns, sliders, and clean invoice cards. Emphasize clarity of action buttons.

Patient Portal View (Read-Only)
Simpler read-only design with locked fields, visual timelines, and downloadable resources. Use card components with icons and visual status bars.

Settings Page
Design with grouped sections, clean toggles, permission badges, and minimal icon usage. Consistent padding and form field hierarchy.


## Database Setup

This project uses Prisma with a local SQLite database. To initialize the database and run migrations:

```bash
npm install
npx prisma migrate dev --name init
```

The generated SQLite database is stored in `prisma/dev.db` which is ignored from version control.
