/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs').promises;
const matter = require('gray-matter');

/**
 * @see https://www.adamcollier.co.uk/blog/adding-an-updated-date-to-markdown-and-mdx-posts/
 */
const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv;

  mdFilePaths.forEach(async path => {
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    if (currentFrontmatter.published === true) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
        updatedOn: new Date().toISOString(),
      };
      file.data = updatedFrontmatter;
      const updatedFileContent = matter.stringify(file);
      fs.writeFile(path, updatedFileContent);
    }
  });
};

updateFrontmatter();
