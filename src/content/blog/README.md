# Blog Content Management

This directory contains all blog posts for the website. Blog posts are written in MDX format, which allows you to use both Markdown and React components.

## Adding a New Blog Post

### Step 1: Create the MDX File

Create a new `.mdx` file in this directory with a URL-friendly filename (e.g., `my-awesome-post.mdx`). The filename will become the URL slug.

Example content:

```mdx
# My Awesome Post Title

Your introduction paragraph goes here.

## Section Heading

More content with **bold text** and *italic text*.

- List item 1
- List item 2
- List item 3

### Subsection

You can include code:

`inline code` or code blocks:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

And much more!
```

### Step 2: Add Post Metadata

Open `src/lib/blog.ts` and add your post's metadata to the `blogPostsMetadata` array:

```typescript
{
  slug: 'my-awesome-post',           // Must match filename (without .mdx)
  title: 'My Awesome Post Title',    // Display title
  description: 'A brief description of the post for previews',
  date: '2025-04-13',                // Publication date (YYYY-MM-DD)
  author: 'Rodney Gainous Jr.',      // Author name
  tags: ['category1', 'category2'],  // Tags for categorization
  published: true,                   // Set to false to hide the post
}
```

### Step 3: Test Your Post

1. Run `npm run dev` to start the development server
2. Navigate to `http://localhost:8080/blog` to see your post in the list
3. Click on your post to view the full content
4. Make sure everything looks good!

### Step 4: Commit and Deploy

1. Commit your changes to Git
2. Push to GitHub
3. The site will automatically deploy via Vercel

## MDX Features

MDX supports:
- All standard Markdown syntax
- React components (can be added as needed)
- Custom styling via Tailwind CSS classes
- Code syntax highlighting
- And more!

## Tips

- Keep URLs short and descriptive (the slug becomes the URL)
- Write engaging descriptions for the blog listing page
- Use tags to help organize content by topic
- Set `published: false` for drafts you want to keep in the repo but not show on the site
- Blog posts are sorted by date (newest first)

## Managing Posts

### Editing a Post
1. Edit the `.mdx` file directly
2. Update metadata in `src/lib/blog.ts` if title, description, or tags changed
3. Commit and push changes

### Deleting a Post
1. Delete the `.mdx` file
2. Remove the entry from `blogPostsMetadata` in `src/lib/blog.ts`
3. Commit and push changes

### Hiding a Post (without deleting)
Set `published: false` in the post's metadata in `src/lib/blog.ts`

## Need Help?

The blog system uses:
- **MDX** for content authoring
- **React Router** for routing
- **Framer Motion** for animations
- **Tailwind CSS** for styling

Refer to the existing blog posts for examples!
