import fs from "fs"
import path from "path"
import postcss from "postcss"

import autoprefixer from "autoprefixer"
import postCssNested from "postcss-nested"
import cssNano from "cssnano"

const from = path.join(process.cwd(), "src/lib/pages/styles.css")
const css = fs.readFileSync(from)

const processedCss = await postcss([
  autoprefixer,
  postCssNested,
  cssNano({ preset: "default" }),
]).process(css, { from })

fs.writeFileSync(
  path.join(process.cwd(), "src/lib/pages/styles.ts"),
  `export default \`${processedCss.css}\`
// Generated by \`pnpm css\``
)
