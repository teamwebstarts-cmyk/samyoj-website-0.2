---
name: samyoj-whatsapp-crm-ui
description: >
  Design and redesign Samyoj WhatsApp Automation & CRM interfaces using the
  established Samyoj product UI/UX system. Use this skill for any Samyoj screen,
  feature, workflow, component, dashboard, drawer, modal, form, list, table,
  preview, or responsive layout. Always ground decisions in the provided product
  documentation, existing implementation, and existing Samyoj visual language.
  Never invent unrelated features or create a separate theme.
---

# Samyoj WhatsApp CRM UI Skill

## Purpose

Create interfaces that feel like one coherent Samyoj product even when the
feature changes completely.

Samyoj is a WhatsApp Automation & CRM platform. The UI should feel:

- clean
- calm
- trustworthy
- practical
- friendly
- premium
- task-focused

The core principle is:

> Show less, but make every visible thing useful.

Every screen should help the user answer:

1. What am I looking at?
2. What is the current state?
3. What can I do here?
4. What should I do next?

---

# 1. SOURCE OF TRUTH

When redesigning or creating any Samyoj interface, use this order:

1. Product documentation
2. Existing implementation/code
3. Existing Samyoj screenshots/components
4. Established Samyoj UI patterns
5. Only then, design judgment

Do not design from a screenshot alone.

The screenshot tells you how Samyoj looks.
The documentation tells you what the feature means and what it is allowed to do.

Do not silently invent functionality that is not supported by the documentation
or existing product behavior.

When the documentation and screenshot differ, do not invent a compromise.
Use the documented product behavior as the functional source of truth and
preserve the established visual language.

---

# 2. HARD PRODUCT RULE

Do not make every feature look like a separate application.

Calls, Inbox, AI Bots, Campaigns, Templates, Automations, Orders, Contacts,
Reports, and Settings must feel like the same product.

Reuse the same:

- navigation shell
- typography
- spacing rhythm
- border treatment
- radius language
- primary action style
- status system
- card treatment
- side-panel behavior
- empty-state behavior
- responsive behavior
- preview language

Only the information architecture changes according to the user's task.

---

# 3. VISUAL SYSTEM

## 3.1 Surfaces

Prefer:

- white primary surfaces
- very light gray / mint-tinted page backgrounds
- subtle green-tinted active surfaces
- very light secondary surfaces

Avoid:

- dark enterprise dashboards
- heavy gradients
- strong glassmorphism
- large glowing surfaces
- overly decorative backgrounds

## 3.2 Primary brand language

Samyoj green is the main action/accent family.

Use green for:

- primary buttons
- selected navigation
- active states
- healthy/successful states
- live/ready indicators
- positive confirmation

Secondary colors should be restrained.

Use amber for:

- waiting
- scheduled
- caution

Use rose/red for:

- failed
- rejected
- missed
- destructive actions

Use blue/purple sparingly for secondary categories or supporting information.

Never create a feature-specific color theme unless explicitly required by the documentation.

---

# 4. TYPOGRAPHY

Use the existing application font stack and established Samyoj sizing.

Typical hierarchy:

- page title: strong, compact
- section title: medium/strong
- body text: readable and restrained
- helper text: smaller and muted
- table/list metadata: compact

Do not make application copy feel like a marketing landing page.

Application copy should be direct and useful.

---

# 5. PRODUCT SHELL

Desktop generally uses:

- persistent left navigation
- quiet top utility bar
- main content workspace

Navigation grouping commonly follows:

Main
- Dashboard
- Inbox
- Calls
- AI Bots
- Automations
- Campaigns
- Templates
- Orders
- Contacts

Support
- Tickets
- Reports

Account
- Team
- Billing
- Settings

Do not redesign the sidebar for every feature.

## Active navigation

Use:

- soft green background
- green icon
- green label
- subtle active indicator
- consistent rounding

## Top utility bar

Normally contains:

- page identity
- Help Center
- global search
- notifications
- account/profile control

Keep this area visually quiet.

---

# 6. PAGE HEADER

Every main page should establish its identity quickly.

Pattern:

Title
Short purpose statement
Optional status
Optional primary action

Examples:

Calls
Voice calls are live

AI Bots
Smart auto-replies for WhatsApp

Campaigns
Plan, send, and monitor campaigns

Templates
Create and manage approved templates for campaigns and outreach

Do not add long promotional copy to operational screens.

---

# 7. CORE LAYOUT PATTERNS

Use a small set of proven compositions.

## 7.1 Operational workspace

Use:

List → Workspace → Details

Examples:

Calls:
call list → transcript/live call → customize/details

Inbox:
conversation list → conversation → details

Templates:
template list → template detail/edit → preview/details

## 7.2 Configuration workspace

Use:

navigation → configuration → preview/help

## 7.3 Guided workflow

Use:

step indicator → current step → supporting summary

Examples:

Campaign:
Message → Audience → Review & Send

Template:
Create → Review → Submit

AI Bot:
Personality → Train → Voice/People → Try

## 7.4 Detail page

Use:

header → important status → core content → contextual actions → secondary info

Do not convert every workflow into a dashboard.

---

# 8. CARDS

Cards organize meaningful concepts.

Use a card for:

- audience summary
- training status
- call settings
- campaign progress
- template preview
- bot identity
- delivery summary
- important warnings

Card language:

- subtle border
- soft radius
- soft shadow
- clear header
- supporting text
- restrained spacing

Do not nest cards excessively.

Do not create a card for every input field.

---

# 9. TABLES

Use tables when users compare many records.

Typical columns:

- object
- status
- category/type
- audience/owner
- progress/metadata
- actions

Rows should be compact.

Each row should quickly answer:

- What is this?
- What state is it in?
- What metadata matters?
- What can I do?

Use:

- icon/avatar
- object name
- one-line preview
- status
- concise metadata
- actions

Desktop table → mobile stacked card.

Never force normal users into horizontal scrolling.

---

# 10. STATUS SYSTEM

Status must be readable even without color.

Common states:

- Ready
- Live
- Draft
- Scheduled
- Running
- Paused
- Completed
- Failed
- Rejected
- Pending
- Missed
- Cancelled

Use text + color.

General mapping:

Green:
healthy/live/ready/approved/successful

Neutral:
inactive/completed/general

Amber:
waiting/scheduled/warning

Red/rose:
failed/rejected/missed/destructive

Do not invent a new status color language for each feature.

---

# 11. PRIMARY ACTIONS

Each screen should have one obvious primary action.

Examples:

- New campaign
- Create bot
- Save changes
- Continue
- Review & send
- Send now
- Submit for review
- Test send

Primary action:

- Samyoj green
- clear label
- visually stronger than nearby actions

Secondary actions remain quieter.

Do not create five visually dominant buttons.

## Destructive actions

Examples:

- Delete
- End call
- Cancel campaign

These should be clearly destructive but not visually aggressive.

---

# 12. FORMS

Use:

Section heading
Short explanation
Field
Helper/example
Validation

Field pattern:

Label
Helper text
Input/control
Validation

Explain requirements before the user makes mistakes.

Do not expose technical language when a normal-language explanation works.

Prefer:

- How should I speak?
- Train your AI
- Connect a person
- What should happen when the team is busy?
- Question customers ask
- Your answer

Avoid default-path exposure of:

- system prompt
- RAG
- embeddings
- temperature
- tool-call configuration
- provider plumbing

Advanced controls belong in More/Advanced.

---

# 13. DRAWERS / SIDE PANELS

Use side panels when editing an object without leaving context.

Common examples:

- New AI bot
- Edit bot
- New template
- Edit template
- New campaign
- Campaign detail

Pattern:

Header
Subtitle
Scrollable body
Persistent footer

Footer may contain:

Cancel
Save / Continue / Submit

or:

Delete
Cancel
Save changes

Background should dim subtly.

User should retain context of the underlying page.

On mobile, side panels become full-width sheets.

Primary actions must remain reachable above the safe area.

---

# 14. PREVIEW-FIRST THINKING

When the feature changes something customer-facing, show the result.

Use contextual previews for:

- WhatsApp messages
- template messages
- AI replies
- voice/call experiences
- campaign content

The preview should answer:

> What will my customer actually see/hear?

Use realistic examples.

Keep preview close to the configuration.

---

# 15. GUIDED WORKFLOWS

Use steps only when each step represents a real decision.

Good:

Campaign:
1. Message
2. Audience
3. Review & Send

Template:
1. Create
2. Review
3. Submit

AI Bot:
1. Personality
2. Train
3. Voice
4. People
5. Try

Step indicators should clearly communicate:

- completed
- current
- upcoming

Do not create unnecessary wizard steps.

---

# 16. EMPTY STATES

An empty state should teach, not merely report absence.

Preferred structure:

- icon/illustration
- clear title
- one-sentence explanation
- up to 3 useful steps
- primary CTA

Example:

No AI bots yet

An AI bot can reply to customers automatically — even when you are offline.

1. Create a bot
2. Add business information and FAQs
3. Turn it on

Do not make empty states visually louder than the actual product.

---

# 17. SETUP STATES

Incomplete setup should not permanently dominate the workspace.

Use a compact setup banner when possible:

Setup incomplete
2/4 required steps done

Actions:

Set up
View steps

When the feature is ready, remove the setup wall.

If the setup flow is complex, open it in a drawer/sheet.

---

# 18. SEARCH & FILTERS

Search belongs near the data it controls.

Use plain language.

Examples:

- Search bots...
- Search templates...
- Search campaigns or templates...
- Search name or phone...

For small filter sets prefer pills/chips:

All
Live
Missed
AI
Human

Less-common filters belong in:

Filters
More
Overflow

Avoid presenting many dropdowns simultaneously without a strong reason.

---

# 19. METADATA

Only show metadata that helps a decision.

Good:

- AI · 03:28
- Inbound · 12:32 PM
- 12,458 recipients
- Quality: High
- English (US)

Do not expose implementation details in the normal workflow:

- provider names
- raw API identifiers
- codec data
- SDP
- internal IDs
- backend state names

unless the documentation specifically says the user needs them.

---

# 20. ANALYTICS

Analytics are secondary.

Do not turn every feature into a KPI wall.

Use compact summaries where useful:

- Total calls
- Answered
- Missed
- Avg duration
- Total recipients
- Delivered
- Read
- Failed

Detailed charts belong in:

- Insights
- Reports
- View results
- Analytics

The primary workspace should remain task-focused.

---

# 21. AI UX

AI should feel accessible to a business owner.

Configure AI using business language.

Preferred:

- Friendly helper
- Professional
- Sales assist
- Custom
- Train your AI
- Connect a person
- Try it

Avoid exposing engineering terminology in the main path.

AI should visibly connect to both:

- WhatsApp chat
- WhatsApp voice

so the user understands there is one product brain.

---

# 22. WHATSAPP-FIRST UX

Samyoj is WhatsApp-first.

Whenever the user configures a customer-facing feature, prioritize:

- customer message
- business response
- actual WhatsApp appearance
- customer context
- template preview
- voice/call outcome

Do not make users guess what the customer experience will look like.

---

# 23. RESPONSIVE BEHAVIOR

Desktop:

- persistent navigation
- multi-column workspace
- tables
- drawers
- detail rails

Mobile:

- compact navigation
- stacked cards
- full-screen sheets
- list XOR detail where appropriate
- vertically stacked forms
- primary actions near the current task
- no normal horizontal scrolling

Do not simply shrink the desktop layout.

Recompose it for mobile.

---

# 24. ACCESSIBILITY

Important controls should have comfortable hit areas.

Never rely on color alone.

Statuses should have text.

Icon-only buttons need accessible labels.

Destructive actions must be clearly identified.

Drawers and modals should support:

- keyboard navigation
- focus handling
- escape behavior where appropriate

---

# 25. MOTION

Motion should communicate state.

Allowed:

- subtle live pulse
- drawer fade/slide
- transcript appearance
- light state transitions

Avoid:

- KPI count-up animation
- constant pulsing
- decorative floating motion
- excessive transitions

---

# 26. STATES EVERY IMPORTANT FEATURE NEEDS

Think through:

- loading
- empty
- ready
- success
- warning
- error
- partial success
- permission/read-only
- unavailable dependency

Errors should explain:

1. What happened?
2. Why does it matter?
3. What can the user do next?

Never expose raw backend errors in the primary user experience.

---

# 27. PROGRESSIVE DISCLOSURE

Primary screen:

show only:
- state
- important object/context
- primary action
- next action
- important warnings

Secondary:

- metadata
- analytics
- history
- less common actions

Advanced:

- technical configuration
- provider configuration
- raw settings
- developer-oriented controls

Use:

- tabs
- More
- Advanced
- details rail
- drawers
- expandable sections

to keep the default experience simple.

---

# 28. FEATURE-SPECIFIC DESIGN EXAMPLES

## Calls

Pattern:

Call list → call stage → customize/details

Primary focus:

- who called
- state
- transcript
- next action

Do not create a telecom-admin dashboard.

## AI Bots

Pattern:

Bot overview → create/edit drawer → Personality → Train → Voice/People → Try

Primary focus:

- bot status
- business behavior
- knowledge
- customer-facing response

## Campaigns

Pattern:

Campaign overview → Message → Audience → Review & Send → delivery monitoring

Primary focus:

- what is being sent
- who receives it
- when it sends
- delivery state

## Templates

Pattern:

Template library → Create → Review → Submit → Pending/Approved detail → Test/Use

Primary focus:

- approved message structure
- status
- quality
- WhatsApp preview
- reuse

---

# 29. DESIGN REVIEW CHECKLIST

Before finalizing any Samyoj screen, check:

## Product

- Is every visible feature documented or already implemented?
- Did I invent anything?
- Is the primary user goal obvious?
- Is the next action obvious?

## Information

- Is the most important information first?
- Did I remove redundant information?
- Are advanced controls hidden appropriately?

## Visual

- Does it look like Samyoj?
- Is the green action language consistent?
- Are borders/radii/shadows consistent?
- Are statuses consistent?

## Interaction

- Is the primary action obvious?
- Are destructive actions clear?
- Are search and filters easy to find?
- Does the workflow require unnecessary clicks?

## Preview

- Can the user see what the customer will experience where relevant?

## Responsive

- Does desktop use the right workspace pattern?
- Does mobile become a real mobile composition instead of a squeezed desktop layout?

## Accessibility

- Are statuses understandable without color?
- Are icon actions labeled?
- Are actions easy to tap?

---

# 30. FINAL DESIGN PRINCIPLE

The target feeling is:

"One calm workspace for WhatsApp operations."

Not:

"Many disconnected dashboards."

A new Samyoj screen should feel familiar even when the feature is completely different.

The user learns the interaction language once and reuses it everywhere.
