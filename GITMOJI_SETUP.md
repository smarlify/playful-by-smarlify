# Gitmoji & Conventional Commits Setup

## Overview
This project uses Gitmoji and Conventional Commits for consistent, meaningful commit messages.

## Setup
- **Git Hook**: `prepare-commit-msg` hook installed in `.git/hooks/`
- **TypeScript**: Global type declarations for `window.trackEvent` function
- **GA Events**: Comprehensive Google Analytics event tracking across all apps

## Gitmoji Reference
Common Gitmoji used in this project:

- ✨ `feat`: introduce new features
- 🐛 `fix`: fix a bug
- 📝 `docs`: add or update documentation
- 🎨 `style`: add or update the UI and style files
- ♻️ `refactor`: refactor code
- ⚡ `perf`: improve performance
- ✅ `test`: add, update, or pass tests
- 🔧 `config`: add or update configuration files
- 🚀 `deploy`: deploy stuff
- 📈 `analytics`: add or update analytics or track code

## Conventional Commit Format
```
<gitmoji> <type>(<scope>): <description>
```

### Examples:
- `✨ feat(auth): add OAuth2 login`
- `🐛 fix(api): resolve user validation error`
- `📝 docs(readme): update installation guide`
- `🎨 style(ui): improve button hover effects`
- `♻️ refactor(utils): simplify date formatting`
- `📈 analytics(ga): add event tracking for user interactions`

## Usage
The git hook will automatically prompt for commit messages with Gitmoji suggestions based on staged files.

### Manual Usage:
```bash
git commit -m "✨ feat(component): add new feature"
git commit -m "🐛 fix(bug): resolve issue"
git commit -m "📝 docs(readme): update documentation"
```

## Google Analytics Events Added
All apps now track comprehensive user interactions:

### _Playful App Events:
- `game_play_click` - Game play button clicks
- `game_card_click` - Game card clicks
- `github_link_click` - GitHub link clicks
- `share_button_click` - Share button clicks
- `copy_link_click` - Copy link actions
- `social_share_click` - Social media shares
- `featured_game_click` - Featured game clicks
- `submit_game_click` - Game submission clicks
- `contact_us_click` - Contact us clicks
- `buy_coffee_click` - Coffee donation clicks
- `crypto_donation_click` - Crypto donation clicks

### _Smarlify.co App Events:
- `nav_click` - Navigation clicks
- `header_cta_click` - Header CTA clicks
- `hero_cta_click` - Hero section CTA clicks
- `service_learn_more_click` - Service learn more clicks
- `investment_asset_click` - Investment asset clicks
- `founder_email_click` - Founder email clicks
- `founder_social_click` - Founder social media clicks
- `footer_email_click` - Footer email clicks
- `footer_social_click` - Footer social media clicks

### _DavidNekovar.cz App Events:
- `nav_click` - Navigation clicks
- `hero_cta_click` - Hero CTA clicks
- `contact_method_click` - Contact method clicks
- `contact_social_click` - Contact social media clicks
- `project_click` - Project link clicks
- `cv_download` - CV download events
- `newsletter_subscribe_click` - Newsletter subscription clicks
- `footer_link_click` - Footer link clicks
- `footer_legal_click` - Legal page clicks

## TypeScript Support
Global type declarations added to `src/types/global.d.ts`:
```typescript
declare global {
  interface Window {
    trackEvent?: (eventName: string, parameters?: Record<string, unknown>) => void;
  }
}
```

This ensures TypeScript compatibility for the `window.trackEvent` function used across all components.

## Files Modified
- All component files with user interactions
- `index.html` files with GA setup
- `src/types/global.d.ts` for TypeScript support
- `.git/hooks/prepare-commit-msg` for Gitmoji integration
