# Plan: Hover States & Blog List Redesign

## Overview

Redesign the hover interaction pattern and blog listing layout to create a more polished terminal-style experience.

---

## Part 1: Full-Width Highlight Hover Effect

### Goal
Replace the current subtle background change (`hover:bg-zinc-900/30`) with a full-width horizontal highlight bar (like a terminal selection).

### Reference
Image 1 shows a purple/blue translucent bar that spans the full width when hovering a row.

### Design Specs
- Full-width highlight bar (edge to edge, ignoring container padding)
- Color: `bg-cyan-500/20` (cyan theme)
- Smooth transition (150-200ms)
- No border-radius (sharp edges for terminal aesthetic)
- Text stays readable (no color change needed, the bar does the work)

### Components to Update

| Component | File | Current Hover | Notes |
|-----------|------|---------------|-------|
| BlogView list items | `src/components/BlogView.tsx` | `hover:bg-zinc-900/30` | Apply new effect |
| ProjectsView list items | `src/components/ProjectsView.tsx` | `hover:bg-zinc-900/30` | Apply new effect |
| DashboardView blog items | `src/components/DashboardView.tsx` | None | Add new effect |
| ProjectCard | `src/components/cards/ProjectCard.tsx` | `hover:bg-zinc-900/30` | Apply new effect |
| WorkExperienceCard | `src/components/cards/WorkExperienceCard.tsx` | None | Skip (not clickable) |

### Implementation Approach

**Option A: Tailwind classes directly**
- Use `hover:bg-purple-500/20` with negative margins to extend full-width
- Add `mx-[-1rem] px-4` pattern to extend beyond container

**Option B: Create shared HoverRow component**
- Extract to `src/components/ui/HoverRow.tsx`
- Wrapper component that handles the full-width highlight
- Reusable across all list items
- Keeps styling consistent

**Recommended: Option B** - Follows DRY principle, single source of truth

---

## Part 2: Blog List View Redesign

### Goal
Simplify the blog listing to a clean two-column layout: title (left) + date (right).

### Reference
Image 2 shows:
- Title on the left (lowercase, clean)
- Date on the right (muted color, `mon dd, yyyy` format)
- Generous vertical spacing between rows
- No descriptions, no tags in the list
- Full-width hover highlight on each row

### Design Specs
- Layout: `flex justify-between items-center`
- Title: Normal weight (not bold), white/light color
- Date: Muted gray, right-aligned, formatted as `jan 21, 2023`
- Row padding: `py-3` or similar
- Full-width hover effect (from Part 1)
- Click entire row to navigate

### Current vs New

| Element | Current | New |
|---------|---------|-----|
| Title | Bold, large | Normal weight, standard size |
| Date | Below title | Right-aligned, same row |
| Description | Shown | Hidden (only on detail page) |
| Tags | Shown | Hidden (only on detail page) |
| Hover | Subtle bg change | Full-width highlight bar |

### Files to Modify
- `src/components/BlogView.tsx` - Main blog listing
- `src/components/DashboardView.tsx` - Blog preview on home (should match)

---

## Part 3: Consistency Checklist

Ensure the new patterns are applied everywhere:

- [ ] Blog listing (`/blog`)
- [ ] Projects listing (`/projects`) - hover only, keep cards
- [ ] Home page blog preview
- [ ] Home page projects preview
- [ ] ~~Work experience cards~~ (skipped - not clickable)

---

## Implementation Order

1. **Create HoverRow component** - Foundation for the new hover effect (cyan)
2. **Update BlogView** - Apply new list layout (title + date) + hover
3. **Update DashboardView blog section** - Match blog list style
4. **Update ProjectsView** - Apply hover effect (keep card layout)
5. **Update ProjectCard** - Apply hover effect
6. **Test all pages** - Ensure consistency
7. **Mobile responsive check** - Verify hover works on touch (or gracefully degrades)

---

## Decisions (Confirmed)

1. **Projects layout**: Keep current card layout (don't switch to simple list)
2. **Date format**: Lowercase `jan 21, 2023`
3. **Hover color**: Cyan (`cyan-500/20`)
4. **Work experience cards**: Skip hover (not clickable)

---

## Risks & Considerations

- **ASCII art headers**: Must not apply hover effect to these
- **Mobile**: Touch devices don't have hover - ensure layout still looks good
- **Accessibility**: Ensure focus states match hover states for keyboard navigation
- **Full-width effect**: May need container restructuring if current padding doesn't allow negative margins

---

## Success Criteria

- [ ] Hovering any list item shows full-width highlight bar
- [ ] Blog list is simplified: title left, date right
- [ ] Hover effect is consistent across all interactive lists
- [ ] No visual regressions on mobile
- [ ] Build passes with no errors
