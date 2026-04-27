---
name: Academic Portfolio Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f6073'
  primary: '#041627'
  on-primary: '#ffffff'
  primary-container: '#1a2b3c'
  on-primary-container: '#8192a7'
  inverse-primary: '#b7c8de'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#00152e'
  on-tertiary: '#ffffff'
  tertiary-container: '#002a51'
  on-tertiary-container: '#4c93e6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4fb'
  primary-fixed-dim: '#b7c8de'
  on-primary-fixed: '#0b1d2d'
  on-primary-fixed-variant: '#38485a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a4c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004883'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container_max: 1280px
  sidebar_width: 260px
---

## Brand & Style

The design system is engineered to bridge the gap between institutional rigor and contemporary digital expression. It serves two distinct audiences: the **Administrator**, who requires a focused, high-utility environment for managing academic records, and the **Public Visitor**, who engages with a vibrant, inspiring showcase of educational achievement.

The aesthetic strategy employs a dual-layered approach:
- **Admin Side:** A "Corporate Modern" style defined by structured efficiency, high-contrast utility, and a "Deep Navy" foundation that signals authority and permanence.
- **Public Frontend:** A "Glassmorphic Minimalism" style. This uses translucent layers, soft-focus backgrounds, and vibrant accents to create a sense of depth and modern sophistication, evoking a forward-thinking educational environment.

The emotional response should be one of undisputed trust and clarity, ensuring that the intellectual content remains the focal point while the container feels premium and technologically advanced.

## Colors

This design system utilizes a bifurcated color strategy to distinguish between management and presentation modes.

**Admin Palette:**
The "Deep Navy" (#1A2B3C) serves as the primary structural color, providing a stable, low-distraction backdrop for complex data. The "Slate Blue" (#3B82F6) is reserved for primary actions, progress indicators, and active navigation states.

**Public Palette:**
The frontend shifts to a lighter, more energetic spectrum. We introduce "vibrant" blue variants and white surfaces with varying opacities. The use of transparency is critical here; surfaces should never be fully opaque, allowing the background colors (soft gradients or subtle imagery) to bleed through, creating the signature glassmorphic effect. Use high-contrast "Deep Navy" only for typography on the public side to maintain readability.

## Typography

The design system relies exclusively on **Inter** to ensure maximum legibility across dense data tables and high-impact portfolio displays. 

For the **Admin side**, use `body-md` for data entries and `label-sm` for table headers and sidebar categories to maintain a disciplined, information-dense layout. 

For the **Public Frontend**, leverage `h1` and `body-lg` to create a clear visual hierarchy. Headlines should utilize tighter letter-spacing and heavier weights to command attention, while body text maintains a generous line-height to facilitate long-form reading of academic bios and project descriptions.

## Layout & Spacing

This design system uses a 12-column fluid grid system.

**Admin Layout:**
A fixed-width sidebar (260px) is anchored to the left. The main content area uses a flexible grid with 24px gutters. Data tables should span the full width of their containers, while stats cards are grouped in rows of 3 or 4.

**Public Layout:**
The frontend utilizes a centered fixed-grid (max-width 1280px) to ensure content remains digestible on ultra-wide monitors. Use `lg` and `xl` spacing increments to create "breathing room" between portfolio sections, emphasizing the minimalist aesthetic. Margins should be generous (min 48px on mobile) to prevent the glassmorphic cards from feeling cluttered.

## Elevation & Depth

Visual hierarchy is managed through two different philosophies based on the interface:

**Admin Elevation (Tonal Layers):**
Depth is created through subtle color shifts. The sidebar is the deepest layer (#1A2B3C), while the main content area sits on a slightly lighter neutral base. Modals and dropdowns use a sharp, 1px border (#3B82F6 at 20% opacity) with a medium-spread shadow to lift them from the functional surface.

**Public Elevation (Glassmorphism):**
Depth is achieved via `backdrop-filter: blur(12px)`. Surfaces are semi-transparent with a 1px white inner border to simulate the "edge" of a glass pane. Shadows are "Ambient"—extremely diffused, low-opacity (10%), and tinted with the primary blue color to avoid a "dirty" gray look. This creates a sense of light passing through the interface elements.

## Shapes

The design system adopts a **Rounded (Level 2)** shape language. This ensures that while the system feels professional and "Academic," it avoids the harshness of sharp corners.

- **Standard Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Content Cards & Modals:** 1rem (16px) corner radius.
- **Feature/Hero Cards:** 1.5rem (24px) corner radius for a softer, more modern presentation on the public side.

Pill-shaped elements are reserved strictly for status "Chips" (e.g., "Published," "Pending," "Honors") to distinguish them from actionable buttons.

## Components

**Sidebar Navigation (Admin):**
Vertical layout with a Deep Navy background. Icons should be "Slate Blue" when inactive and White with a light blue glow when active.

**Stats Cards (Admin):**
Solid white background with a subtle 1px border. The "Value" (large number) should be in Slate Blue. Include a small trend indicator (sparkline or percentage) in the bottom corner.

**Data Tables (Admin):**
Clean, borderless rows with a subtle hover state change (light gray). Headers use `label-sm` typography with a Slate Blue bottom border.

**Glassmorphic Content Cards (Public):**
The centerpiece of the frontend. Background: `rgba(255, 255, 255, 0.6)`. Border: 1px solid `rgba(255, 255, 255, 0.4)`. Backdrop blur: 12px. These cards should have a subtle scale-up animation on hover (+2%).

**Animated Carousels (Public):**
Used for showcasing project galleries. Transition should be a "fade-slide" with a 600ms easing. Navigation dots should be Slate Blue, with the active state expanding into a small pill shape.

**Buttons:**
- *Primary:* Solid Slate Blue with white text.
- *Secondary (Admin):* Ghost button with Slate Blue border.
- *Secondary (Public):* Semi-transparent white with backdrop blur and white text.

**Modals:**
Full-screen overlay with a heavy blur (20px) on the Public side; a simple 40% black overlay on the Admin side.