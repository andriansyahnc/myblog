'use client'

import { useState } from 'react'
import { genPageMetadata } from 'app/seo'

const cheatsheets = [
  {
    id: 'git',
    title: 'Git Commands',
    icon: '📦',
    category: 'git',
    sections: [
      {
        title: 'Basic Commands',
        commands: [
          { cmd: 'git init', desc: 'Initialize a new Git repository' },
          { cmd: 'git clone <url>', desc: 'Clone a repository' },
          { cmd: 'git status', desc: 'Check status of working directory' },
          { cmd: 'git add .', desc: 'Add all changes to staging' },
          { cmd: 'git commit -m "message"', desc: 'Commit staged changes' },
          { cmd: 'git push', desc: 'Push commits to remote' },
          { cmd: 'git pull', desc: 'Fetch and merge changes from remote' },
        ],
      },
      {
        title: 'Branching',
        commands: [
          { cmd: 'git branch', desc: 'List all branches' },
          { cmd: 'git branch <name>', desc: 'Create a new branch' },
          { cmd: 'git checkout <branch>', desc: 'Switch to a branch' },
          { cmd: 'git checkout -b <branch>', desc: 'Create and switch to new branch' },
          { cmd: 'git merge <branch>', desc: 'Merge branch into current branch' },
          { cmd: 'git branch -d <branch>', desc: 'Delete a branch' },
        ],
      },
      {
        title: 'Undoing Changes',
        commands: [
          { cmd: 'git reset HEAD~1', desc: 'Undo last commit (keep changes)' },
          { cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit (discard changes)' },
          { cmd: 'git revert <commit>', desc: 'Create new commit that undoes changes' },
          { cmd: 'git checkout -- <file>', desc: 'Discard changes in working directory' },
          { cmd: 'git stash', desc: 'Temporarily save changes' },
          { cmd: 'git stash pop', desc: 'Restore stashed changes' },
        ],
      },
    ],
  },
  {
    id: 'git-zsh',
    title: 'Git Zsh Shortcuts',
    icon: '⚡',
    category: 'git',
    sections: [
      {
        title: 'Basic Shortcuts',
        commands: [
          { cmd: 'ga', desc: 'git add' },
          { cmd: 'gaa', desc: 'git add --all' },
          { cmd: 'gc', desc: 'git commit' },
          { cmd: 'gcm', desc: 'git commit -m' },
          { cmd: 'gp', desc: 'git push' },
          { cmd: 'gl', desc: 'git pull' },
          { cmd: 'gst', desc: 'git status' },
          { cmd: 'gd', desc: 'git diff' },
          { cmd: 'gco', desc: 'git checkout' },
          { cmd: 'gcb', desc: 'git checkout -b' },
        ],
      },
      {
        title: 'Branch & Log',
        commands: [
          { cmd: 'gb', desc: 'git branch' },
          { cmd: 'gba', desc: 'git branch -a (all branches)' },
          { cmd: 'gbd', desc: 'git branch -d (delete branch)' },
          { cmd: 'gm', desc: 'git merge' },
          { cmd: 'glog', desc: 'git log --oneline --graph' },
          { cmd: 'glg', desc: 'git log --stat' },
          { cmd: 'glgg', desc: 'git log --graph' },
        ],
      },
      {
        title: 'Advanced Shortcuts',
        commands: [
          { cmd: 'gsta', desc: 'git stash' },
          { cmd: 'gstp', desc: 'git stash pop' },
          { cmd: 'gstl', desc: 'git stash list' },
          { cmd: 'grh', desc: 'git reset HEAD' },
          { cmd: 'grhh', desc: 'git reset --hard HEAD' },
          { cmd: 'gf', desc: 'git fetch' },
          { cmd: 'grb', desc: 'git rebase' },
          { cmd: 'gcp', desc: 'git cherry-pick' },
        ],
      },
    ],
  },
  {
    id: 'docker',
    title: 'Docker Commands',
    icon: '🐳',
    category: 'other',
    sections: [
      {
        title: 'Container Management',
        commands: [
          { cmd: 'docker ps', desc: 'List running containers' },
          { cmd: 'docker ps -a', desc: 'List all containers' },
          { cmd: 'docker run <image>', desc: 'Run a container from image' },
          { cmd: 'docker stop <container>', desc: 'Stop a running container' },
          { cmd: 'docker rm <container>', desc: 'Remove a container' },
          { cmd: 'docker exec -it <container> bash', desc: 'Execute bash in container' },
        ],
      },
      {
        title: 'Image Management',
        commands: [
          { cmd: 'docker images', desc: 'List all images' },
          { cmd: 'docker pull <image>', desc: 'Pull an image from registry' },
          { cmd: 'docker build -t <name> .', desc: 'Build image from Dockerfile' },
          { cmd: 'docker rmi <image>', desc: 'Remove an image' },
          { cmd: 'docker tag <image> <tag>', desc: 'Tag an image' },
        ],
      },
      {
        title: 'Docker Compose',
        commands: [
          { cmd: 'docker-compose up', desc: 'Start services' },
          { cmd: 'docker-compose up -d', desc: 'Start services in background' },
          { cmd: 'docker-compose down', desc: 'Stop and remove containers' },
          { cmd: 'docker-compose logs', desc: 'View logs' },
          { cmd: 'docker-compose ps', desc: 'List containers' },
        ],
      },
    ],
  },
  {
    id: 'linux',
    title: 'Linux Commands',
    icon: '🐧',
    category: 'other',
    sections: [
      {
        title: 'File Operations',
        commands: [
          { cmd: 'ls -la', desc: 'List all files with details' },
          { cmd: 'cd <directory>', desc: 'Change directory' },
          { cmd: 'pwd', desc: 'Print working directory' },
          { cmd: 'mkdir <name>', desc: 'Create directory' },
          { cmd: 'rm -rf <path>', desc: 'Remove files/directories recursively' },
          { cmd: 'cp <source> <dest>', desc: 'Copy files' },
          { cmd: 'mv <source> <dest>', desc: 'Move/rename files' },
        ],
      },
      {
        title: 'File Content',
        commands: [
          { cmd: 'cat <file>', desc: 'Display file content' },
          { cmd: 'head -n 10 <file>', desc: 'Show first 10 lines' },
          { cmd: 'tail -n 10 <file>', desc: 'Show last 10 lines' },
          { cmd: 'grep "pattern" <file>', desc: 'Search for pattern in file' },
          { cmd: 'find . -name "*.js"', desc: 'Find files by name' },
        ],
      },
      {
        title: 'System',
        commands: [
          { cmd: 'ps aux', desc: 'List all processes' },
          { cmd: 'kill <pid>', desc: 'Kill a process' },
          { cmd: 'df -h', desc: 'Show disk usage' },
          { cmd: 'top', desc: 'Display running processes' },
          { cmd: 'chmod 755 <file>', desc: 'Change file permissions' },
        ],
      },
    ],
  },
  {
    id: 'vim',
    title: 'Vim Editor',
    icon: '📝',
    category: 'other',
    sections: [
      {
        title: 'Modes',
        commands: [
          { cmd: 'i', desc: 'Insert mode (before cursor)' },
          { cmd: 'a', desc: 'Insert mode (after cursor)' },
          { cmd: 'Esc', desc: 'Return to normal mode' },
          { cmd: 'v', desc: 'Visual mode' },
          { cmd: 'V', desc: 'Visual line mode' },
        ],
      },
      {
        title: 'Navigation',
        commands: [
          { cmd: 'h j k l', desc: 'Move left, down, up, right' },
          { cmd: 'w', desc: 'Move to start of next word' },
          { cmd: 'b', desc: 'Move to start of previous word' },
          { cmd: 'gg', desc: 'Go to first line' },
          { cmd: 'G', desc: 'Go to last line' },
          { cmd: '0', desc: 'Go to start of line' },
          { cmd: '$', desc: 'Go to end of line' },
        ],
      },
      {
        title: 'Editing',
        commands: [
          { cmd: 'dd', desc: 'Delete line' },
          { cmd: 'yy', desc: 'Yank (copy) line' },
          { cmd: 'p', desc: 'Paste after cursor' },
          { cmd: 'u', desc: 'Undo' },
          { cmd: 'Ctrl + r', desc: 'Redo' },
          { cmd: ':w', desc: 'Save file' },
          { cmd: ':q', desc: 'Quit' },
          { cmd: ':wq', desc: 'Save and quit' },
          { cmd: ':q!', desc: 'Quit without saving' },
        ],
      },
    ],
  },
  {
    id: 'mysql',
    title: 'MySQL Commands',
    icon: '🗄️',
    category: 'other',
    sections: [
      {
        title: 'Database Operations',
        commands: [
          { cmd: 'SHOW DATABASES;', desc: 'List all databases' },
          { cmd: 'CREATE DATABASE name;', desc: 'Create a database' },
          { cmd: 'USE database;', desc: 'Switch to a database' },
          { cmd: 'DROP DATABASE name;', desc: 'Delete a database' },
        ],
      },
      {
        title: 'Table Operations',
        commands: [
          { cmd: 'SHOW TABLES;', desc: 'List all tables' },
          { cmd: 'DESCRIBE table;', desc: 'Show table structure' },
          { cmd: 'CREATE TABLE name (...);', desc: 'Create a table' },
          { cmd: 'DROP TABLE name;', desc: 'Delete a table' },
          { cmd: 'ALTER TABLE name ADD column ...;', desc: 'Add column' },
        ],
      },
      {
        title: 'Query Commands',
        commands: [
          { cmd: 'SELECT * FROM table;', desc: 'Select all records' },
          { cmd: 'SELECT * FROM table WHERE condition;', desc: 'Select with condition' },
          { cmd: 'INSERT INTO table VALUES (...);', desc: 'Insert record' },
          { cmd: 'UPDATE table SET column=value;', desc: 'Update records' },
          { cmd: 'DELETE FROM table WHERE condition;', desc: 'Delete records' },
        ],
      },
    ],
  },
  {
    id: 'zsh',
    title: 'Zsh Shortcuts',
    icon: '⚡',
    category: 'other',
    sections: [
      {
        title: 'Navigation Shortcuts',
        commands: [
          { cmd: 'Ctrl + A', desc: 'Move to beginning of line' },
          { cmd: 'Ctrl + E', desc: 'Move to end of line' },
          { cmd: 'Ctrl + U', desc: 'Clear line before cursor' },
          { cmd: 'Ctrl + K', desc: 'Clear line after cursor' },
          { cmd: 'Ctrl + W', desc: 'Delete word before cursor' },
          { cmd: 'Ctrl + L', desc: 'Clear screen' },
          { cmd: 'Ctrl + R', desc: 'Search command history' },
          { cmd: 'Ctrl + C', desc: 'Cancel current command' },
        ],
      },
      {
        title: 'History & Completion',
        commands: [
          { cmd: '!!', desc: 'Repeat last command' },
          { cmd: '!$', desc: 'Last argument of previous command' },
          { cmd: '!*', desc: 'All arguments of previous command' },
          { cmd: 'history', desc: 'Show command history' },
          { cmd: 'Tab', desc: 'Auto-complete command/path' },
          { cmd: 'cd -', desc: 'Go to previous directory' },
          { cmd: '~', desc: 'Home directory shortcut' },
        ],
      },
      {
        title: 'Useful Aliases',
        commands: [
          { cmd: 'alias ll="ls -la"', desc: 'Create alias for detailed list' },
          { cmd: 'alias ..="cd .."', desc: 'Quick parent directory' },
          { cmd: 'alias ...="cd ../.."', desc: 'Two levels up' },
          { cmd: 'alias g="git"', desc: 'Short git command' },
          { cmd: 'alias gs="git status"', desc: 'Quick git status' },
          { cmd: 'alias gl="git log --oneline"', desc: 'Compact git log' },
        ],
      },
      {
        title: 'Globbing & Patterns',
        commands: [
          { cmd: '*.txt', desc: 'All .txt files' },
          { cmd: '**/*.js', desc: 'All .js files recursively' },
          { cmd: 'file{1,2,3}.txt', desc: 'file1.txt, file2.txt, file3.txt' },
          { cmd: 'file[0-9].txt', desc: 'file0.txt through file9.txt' },
          { cmd: '~/.zshrc', desc: 'Zsh configuration file' },
        ],
      },
    ],
  },
  {
    id: 'regex',
    title: 'Regular Expressions',
    icon: '🔍',
    category: 'other',
    sections: [
      {
        title: 'Basic Patterns',
        commands: [
          { cmd: '.', desc: 'Any single character' },
          { cmd: '^', desc: 'Start of line' },
          { cmd: '$', desc: 'End of line' },
          { cmd: '*', desc: 'Zero or more times' },
          { cmd: '+', desc: 'One or more times' },
          { cmd: '?', desc: 'Zero or one time' },
        ],
      },
      {
        title: 'Character Classes',
        commands: [
          { cmd: '[abc]', desc: 'Any character a, b, or c' },
          { cmd: '[^abc]', desc: 'Any character except a, b, c' },
          { cmd: '[a-z]', desc: 'Any lowercase letter' },
          { cmd: '[A-Z]', desc: 'Any uppercase letter' },
          { cmd: '[0-9]', desc: 'Any digit' },
          { cmd: '\\d', desc: 'Any digit (shorthand)' },
          { cmd: '\\w', desc: 'Word character [a-zA-Z0-9_]' },
          { cmd: '\\s', desc: 'Whitespace character' },
        ],
      },
      {
        title: 'Quantifiers',
        commands: [
          { cmd: '{n}', desc: 'Exactly n times' },
          { cmd: '{n,}', desc: 'At least n times' },
          { cmd: '{n,m}', desc: 'Between n and m times' },
          { cmd: '()', desc: 'Group patterns' },
          { cmd: '|', desc: 'Alternation (OR)' },
        ],
      },
    ],
  },
]

export default function CheatSheet() {
  const [activeSheet, setActiveSheet] = useState('git')

  const currentSheet = cheatsheets.find((sheet) => sheet.id === activeSheet)

  return (
    <div className="min-h-screen pb-32">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Developer Cheatsheets
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Quick reference guides for common development tools and commands
          </p>
        </div>

        {/* Cheatsheet Content */}
        <div className="py-8">
          {currentSheet && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-4xl">
                  {currentSheet.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {currentSheet.title}
                </h2>
              </div>

              {currentSheet.sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.commands.map((command, idx) => (
                      <div
                        key={idx}
                        className="grid gap-4 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50 md:grid-cols-2"
                      >
                        <div className="font-mono text-sm font-medium text-cyan-600 dark:text-cyan-400">
                          {command.cmd}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {command.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation - Only Git Related */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {cheatsheets
              .filter((sheet) => sheet.category === 'git')
              .map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => setActiveSheet(sheet.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    activeSheet === sheet.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400'
                  }`}
                >
                  <span className="text-lg">{sheet.icon}</span>
                  <span>{sheet.title}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
