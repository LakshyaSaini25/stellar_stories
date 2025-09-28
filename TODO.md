# AI Tutor Chat Overflow Fix - Task Progress

## Current Work
Fixing the overflow issue in the AI Course Tutor chatbot where messages spill out of the container after 2-3 chats, hiding the input field and affecting the webpage layout. The issue stems from fixed heights and improper flex layout in FloatingGeminiChat.tsx and CourseGeminiChat.tsx.

## Key Technical Concepts
- Tailwind CSS for responsive layout and flexbox.
- React components with dynamic sizing using max-height and flex properties.
- ScrollArea component from shadcn/ui for scrollable message area.

## Relevant Files and Code
- **stellar_stories-frontend/src/components/FloatingGeminiChat.tsx**
  - Current: Fixed height h-[600px] for open state, no flex on Card.
  - Changes: Add flex flex-col to Card, change open state to w-96 max-h-[80vh] h-auto overflow-hidden.
- **stellar_stories-frontend/src/components/CourseGeminiChat.tsx**
  - Current: ScrollArea with flex-1 but no h-0, CardContent with flex-1 flex flex-col.
  - Changes: Ensure ScrollArea has h-0 flex-1 for proper expansion, confirm overflow-y-auto.

## Problem Solving
- Issue: Fixed height causes overflow beyond viewport; ScrollArea not taking remaining space properly.
- Solution: Use viewport-relative max-height, flexbox for dynamic sizing, ensure ScrollArea grows to fill available space minus header/input.

## Pending Tasks and Next Steps
1. [ ] Update FloatingGeminiChat.tsx: Add flex flex-col to Card className, modify open state class to 'w-96 max-h-[80vh] h-auto overflow-hidden', adjust content div to flex-1 instead of fixed calc height.
   - "User confirmed the plan to fix AI tutor chat overflow by updating FloatingGeminiChat.tsx layout."
2. [ ] Update CourseGeminiChat.tsx: Add h-0 to ScrollArea className to make it flex-1 properly with overflow-y-auto.
   - "Next, ensure ScrollArea in CourseGeminiChat.tsx uses h-0 flex-1 for correct scrolling behavior."
3. [ ] Test the changes: Run dev server, open Dashboard, toggle dark mode, open AI chat, send 5-10 messages to verify scrolling, input visibility, no overflow to page.
   - "After edits, test on Dashboard page: open chat, send messages, check minimized/open states in light/dark mode."
4. [ ] If issues persist, iterate on CSS (e.g., adjust padding/margins) or add media queries for mobile.
   - "Verify no spillover to webpage; if needed, refine with additional Tailwind classes."

Last updated: After user confirmation to proceed with plan.
