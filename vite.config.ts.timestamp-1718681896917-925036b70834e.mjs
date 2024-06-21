// vite.config.ts
import { telefunc } from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/telefunc/dist/cjs/node/vite/index.js";
import ssr from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/vike/dist/esm/node/plugin/index.js";
import react from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/vite/dist/node/index.js";
import { fileURLToPath } from "node:url";
import commonjs from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/vite-plugin-commonjs/dist/index.mjs";
import devServer from "file:///C:/Users/gabri/Projects/super-app-vike/node_modules/@hono/vite-dev-server/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/gabri/Projects/super-app-vike/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    devServer({
      entry: "server-entry.ts",
      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/
      ],
      injectClientScript: false
    }),
    react({}),
    ssr({}),
    telefunc(),
    commonjs()
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./", __vite_injected_original_import_meta_url))
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnYWJyaVxcXFxQcm9qZWN0c1xcXFxzdXBlci1hcHAtdmlrZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2FicmlcXFxcUHJvamVjdHNcXFxcc3VwZXItYXBwLXZpa2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dhYnJpL1Byb2plY3RzL3N1cGVyLWFwcC12aWtlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdGVsZWZ1bmMgfSBmcm9tIFwidGVsZWZ1bmMvdml0ZVwiO1xyXG5pbXBvcnQgc3NyIGZyb20gXCJ2aWtlL3BsdWdpblwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcclxuaW1wb3J0IGNvbW1vbmpzIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21tb25qc1wiO1xyXG5pbXBvcnQgZGV2U2VydmVyIGZyb20gXCJAaG9uby92aXRlLWRldi1zZXJ2ZXJcIjtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRkZXZTZXJ2ZXIoe1xyXG5cdFx0XHRlbnRyeTogXCJzZXJ2ZXItZW50cnkudHNcIixcclxuXHJcblx0XHRcdGV4Y2x1ZGU6IFtcclxuXHRcdFx0XHQvXlxcL0AuKyQvLFxyXG5cdFx0XHRcdC8uKlxcLih0c3x0c3h8dnVlKSgkfFxcPykvLFxyXG5cdFx0XHRcdC8uKlxcLihzP2Nzc3xsZXNzKSgkfFxcPykvLFxyXG5cdFx0XHRcdC9eXFwvZmF2aWNvblxcLmljbyQvLFxyXG5cdFx0XHRcdC8uKlxcLihzdmd8cG5nKSgkfFxcPykvLFxyXG5cdFx0XHRcdC9eXFwvKHB1YmxpY3xhc3NldHN8c3RhdGljKVxcLy4rLyxcclxuXHRcdFx0XHQvXlxcL25vZGVfbW9kdWxlc1xcLy4qLyxcclxuXHRcdFx0XSxcclxuXHJcblx0XHRcdGluamVjdENsaWVudFNjcmlwdDogZmFsc2UsXHJcblx0XHR9KSxcclxuXHRcdHJlYWN0KHt9KSxcclxuXHRcdHNzcih7fSksXHJcblx0XHR0ZWxlZnVuYygpLFxyXG5cdFx0Y29tbW9uanMoKSxcclxuXHRdLFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaW5kOiBcIkBcIixcclxuXHRcdFx0XHRyZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9cIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcblx0XHRcdH0sXHJcblx0XHRdLFxyXG5cdH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThTLFNBQVMsZ0JBQWdCO0FBQ3ZVLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZUFBZTtBQU51SyxJQUFNLDJDQUEyQztBQU85TyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFFUCxTQUFTO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Q7QUFBQSxNQUVBLG9CQUFvQjtBQUFBLElBQ3JCLENBQUM7QUFBQSxJQUNELE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDUixJQUFJLENBQUMsQ0FBQztBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLE1BQzFEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
