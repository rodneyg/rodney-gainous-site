# Blog Management Guide

This guide explains how to manage your blog posts on the site.

## Quick Start

Your blog is now live at `/blog`! Three sample posts have been added to get you started.

## How It Works

The blog uses **MDX** (Markdown + React), similar to blogs by Sam Altman and Paul Graham. This approach gives you:

- **Full control**: Blog posts are files in your repo
- **Simple editing**: Write in Markdown (same as README files)
- **Version control**: Every change is tracked in Git
- **No database needed**: Content lives alongside your code
- **Auto-deploy**: Push to GitHub → Vercel deploys automatically

## Adding a New Blog Post

### Method 1: Via GitHub Web Interface (Easiest)

1. Go to your repo on GitHub
2. Navigate to `src/content/blog/`
3. Click "Add file" → "Create new file"
4. Name it `your-post-title.mdx`
5. Write your content in Markdown
6. Commit the file
7. Edit `src/lib/blog.ts` to add metadata:
   ```typescript
   {
     slug: 'your-post-title',
     title: 'Your Post Title',
     description: 'Brief description for previews',
     date: '2025-04-13',
     author: 'Rodney Gainous Jr.',
     tags: ['tag1', 'tag2'],
     published: true,
   }
   ```
8. Commit and push - your post is live!

### Method 2: Via Local Development

1. Clone the repo locally
2. Create a new `.mdx` file in `src/content/blog/`
3. Write your post in Markdown
4. Add metadata to `src/lib/blog.ts`
5. Run `npm run dev` to preview
6. Commit and push to deploy

## Markdown Syntax Reference

```markdown
# Main Heading

## Section Heading

### Subsection

Regular paragraph with **bold** and *italic* text.

- Bullet list item 1
- Bullet list item 2

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

`inline code`

\`\`\`javascript
// Code block with syntax highlighting
const example = "Hello, World!";
\`\`\`

> Blockquote text
```

## Managing Existing Posts

### Editing a Post
1. Edit the `.mdx` file in `src/content/blog/`
2. If changing title/description/tags, also update `src/lib/blog.ts`
3. Commit and push

### Hiding a Post (Draft Mode)
In `src/lib/blog.ts`, set `published: false` for that post

### Deleting a Post
1. Delete the `.mdx` file from `src/content/blog/`
2. Remove its entry from `src/lib/blog.ts`
3. Commit and push

## Post URLs

The filename becomes the URL:
- File: `my-awesome-post.mdx`
- URL: `https://yoursite.com/blog/my-awesome-post`

Use URL-friendly names (lowercase, hyphens instead of spaces).

## Tips for Great Blog Posts

1. **Compelling titles**: Make readers curious
2. **Strong openings**: Hook them in the first paragraph
3. **Good descriptions**: Shows in previews and social shares
4. **Relevant tags**: Helps organize content
5. **Clear structure**: Use headings to break up content
6. **Link to your projects**: Connect blog posts to your work

## Examples

Check out the three sample posts in `src/content/blog/`:
- `welcome-to-my-blog.mdx`
- `building-ai-products.mdx`
- `lessons-from-fundraising.mdx`

## Technical Details

- **Framework**: React + Vite
- **Content Format**: MDX (Markdown + JSX)
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (auto-deploy on push)

## Need Help?

Detailed documentation is in `src/content/blog/README.md`

## Admin Access

Unlike WordPress or other CMSs, there's no separate admin panel. You manage posts through:
1. **GitHub Web Interface** - Edit files directly on github.com
2. **Local Code Editor** - Clone repo, edit with VS Code/etc
3. **Git** - Full version control of all content

This "blog as code" approach gives you complete control and transparency.
