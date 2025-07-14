const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Add navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Copy static assets
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/_includes/css": "css",
    "src/js": "js",
    "src/images": "images"
  });

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/_includes/css");
  eleventyConfig.addWatchTarget("src/js");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "liquid"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
