const fs = require('fs').promises;
const matter = require('gray-matter');

/**
 * Inspired by Adam
 * @see https://www.adamcollier.co.uk/blog/adding-an-updated-date-to-markdown-and-mdx-posts/
 */
const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv;

  mdFilePaths.forEach(async path => {
    const now = new Date().toISOString();

    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    // update last modified date
    if (currentFrontmatter.published === true) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
      };

      if (!currentFrontmatter.created) {
        updatedFrontmatter.created = now;
      } else {
        updatedFrontmatter.modified = now;
      }
      file.data = updatedFrontmatter;

      const updatedFileContent = matter.stringify(file);
      fs.writeFile(path, updatedFileContent);
    }
  });
};

updateFrontmatter();
