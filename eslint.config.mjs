import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.contentlayer/**',
      'public/**',
      '.husky/**',
      'app/tag-data.json',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // New in eslint-plugin-react-hooks v7 (bundled by eslint-config-next 16).
      // Both flag legitimate, common patterns here (hydrating state from
      // localStorage/URL params on mount; a derived Set used only as a lookup).
      // Kept as warnings — visible in review — rather than rewritten, since
      // fixing them is a behavior change out of scope for a lint-tooling pass.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
  {
    // Root-level tooling configs run directly under Node as CommonJS.
    files: ['next.config.js', 'tailwind.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

export default eslintConfig
