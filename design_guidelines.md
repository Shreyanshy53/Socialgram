# Design Guidelines: Instagram-like Social Media Platform

## Design Approach: Reference-Based (Instagram)

Drawing primary inspiration from Instagram's proven social media design patterns, with adaptations for the specific feature set. Focus on content-first presentation, clean visual hierarchy, and familiar interaction patterns that users already understand.

**Key Principles:**
- Content is king: Images and posts take visual priority
- Familiar patterns: Leverage Instagram's proven UX conventions
- Clean, minimal chrome: UI doesn't compete with user content
- Mobile-first responsive design

---

## Typography

**Font Family:** Inter or DM Sans via Google Fonts CDN
- **Display/Headers:** Font weight 700, sizes: text-2xl to text-4xl
- **Body/Posts:** Font weight 400-500, sizes: text-sm to text-base
- **Captions/Meta:** Font weight 400, text-xs to text-sm
- **Usernames:** Font weight 600, text-sm to text-base (distinctive in feeds)
- **Buttons/CTAs:** Font weight 600, text-sm

---

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: gap-4, gap-6, gap-8
- Card margins: mb-6, mb-8
- Icon spacing: mr-2, ml-2

**Container Strategy:**
- Feed: max-w-2xl mx-auto (centered, Instagram-width feed)
- Profile: max-w-4xl mx-auto (wider for grid layout)
- Messages: max-w-6xl mx-auto (two-column chat layout)
- Explore: max-w-7xl mx-auto (multi-column grid)

---

## Component Library

### Navigation
**Top Navigation Bar:**
- Fixed top position, full-width with max-w-6xl inner container
- Height: h-16
- Logo left, search center, icons right (home, explore, messages, notifications, profile)
- Icon size: w-6 h-6, use Heroicons outline style
- Border bottom: subtle divider

### Post Card (Feed Item)
**Structure:**
- Header: Profile image (w-8 h-8 rounded-full), username, timestamp, options menu
- Image: Full-width, aspect-square or aspect-video
- Actions bar: Like (heart), comment (chat bubble), share icons - spacing gap-4
- Like count: Bold text-sm, "X likes"
- Caption: Username in bold + caption text, text-sm
- Comments preview: "View all X comments" link, show 2 latest
- Spacing: p-4 for text areas

### Profile Header
**Layout:**
- Two-column on desktop (profile image left, stats/bio right)
- Single column on mobile
- Profile image: w-32 h-32 md:w-40 md:h-40, rounded-full, border-4
- Stats row: Posts/Followers/Following counts, grid-cols-3, text-center
- Bio: max-w-md, text-sm
- Action buttons: Follow/Unfollow/Edit Profile, full-width on mobile

### Profile Grid
- grid-cols-3 gap-1 (tight Instagram-style grid)
- Each item: aspect-square, cursor-pointer
- Hover overlay: Like/comment counts with semi-transparent backdrop

### Explore Page
- grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1
- Mixed aspect ratios for variety: some square, some portrait
- Trending section at top with larger featured posts

### Chat Interface
**Two-Column Layout (md and up):**
- Left sidebar: Conversation list, w-80 to w-96, scrollable
- Right panel: Active conversation, flex-1
- Message bubbles: Sender right (self), recipient left
- Bubble styling: Sender has subtle background, recipient minimal/outline
- Input bar: Fixed bottom, full-width with send button
- Online status: Small green dot on profile images

### Notifications
**Dropdown or Page:**
- List items with profile image, notification text, timestamp
- Different icon indicators: heart (like), chat (comment), user-plus (follow)
- Unread: slightly emphasized background
- Avatar: w-10 h-10 rounded-full
- Spacing: py-3 px-4 per item

### Forms (Create Post, Edit Profile)
**Modal or Full Page:**
- Image preview: aspect-square, max-h-96
- Caption textarea: min-h-24, resize-none
- Upload button: Prominent, centered when no image
- Cancel/Submit buttons: Bottom right, gap-2

### Stories (Optional Enhancement)
- Horizontal scroll row at feed top
- Circular avatars with gradient ring for unviewed
- w-16 h-16 profile images

---

## Responsive Breakpoints

**Mobile (default):**
- Single column layouts
- Bottom navigation alternative (optional)
- Full-width posts and components

**Tablet (md: 768px):**
- Introduce two-column layouts (chat, explore)
- Wider max-widths
- Side-by-side profile header

**Desktop (lg: 1024px):**
- Full multi-column grids
- Persistent sidebars
- Hover states become prominent

---

## Interactions & States

**Minimal Animations:**
- Like button: Simple scale on click (scale-110)
- Follow button: Instant state change with subtle transition
- Modal entry: Fade in (opacity transition)
- NO scroll-triggered animations
- NO complex page transitions

**Interactive States:**
- Buttons: Clear hover with slight opacity/background change
- Links: Underline on hover for text links
- Cards: Subtle shadow lift on hover (explore/profile grids)
- Input focus: Visible border or ring focus state

---

## Images

**Hero/Welcome (if needed for marketing page):**
- Large hero image: Collage of sample posts/user interface
- Full-width, h-96 to h-screen
- CTA overlay with blurred background button

**Throughout Application:**
- User profile images: Always circular, consistent sizes
- Post images: Maintain aspect ratios, full post width
- Placeholder images: Use gradient or icon when no image uploaded
- Lazy loading for feed images

**Image Specifications:**
- Profile uploads: Square, min 400x400px
- Post uploads: Max 1080px width (Instagram standard)
- Explore thumbnails: 400x400px optimal

---

## Accessibility

- Semantic HTML: Use proper heading hierarchy (h1, h2, h3)
- ARIA labels on icon-only buttons
- Focus indicators on all interactive elements
- Alt text required for all user-uploaded images
- Keyboard navigation: Tab through posts, Enter to open/interact
- Color contrast: Ensure text meets WCAG AA standards

---

## Icon Library

**Heroicons (outline style) via CDN:**
- Home, MagnifyingGlass, ChatBubbleLeft, Bell, User (navigation)
- Heart, ChatBubble, PaperAirplane (post actions)
- Cog, EllipsisHorizontal (settings/options)
- PlusCircle (create post)
- UserPlus, UserMinus (follow/unfollow)

This design creates a familiar, content-focused social experience with Instagram's proven patterns while supporting all requested features with clean, responsive layouts.