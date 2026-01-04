#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP format using sharp
 * 
 * Usage: pnpm optimize-images
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const IMAGE_DIR = 'public/static/images'
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png']
const WEBP_QUALITY = 85
const AVIF_QUALITY = 80

async function getImages(dir) {
  const files = await readdir(dir)
  const images = []

  for (const file of files) {
    const filePath = join(dir, file)
    const stats = await stat(filePath)

    if (stats.isFile() && SUPPORTED_FORMATS.includes(extname(file).toLowerCase())) {
      images.push(filePath)
    }
  }

  return images
}

async function optimizeImage(imagePath) {
  const ext = extname(imagePath)
  const name = basename(imagePath, ext)
  const dir = imagePath.substring(0, imagePath.lastIndexOf('/'))
  const webpPath = join(dir, `${name}.webp`)
  const avifPath = join(dir, `${name}.avif`)

  console.log(`Optimizing ${imagePath}...`)

  try {
    const originalSize = (await stat(imagePath)).size

    // Generate WebP
    await sharp(imagePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath)
    
    const webpSize = (await stat(webpPath)).size
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(2)
    
    console.log(`✓ Created WebP: ${webpPath}`)
    console.log(`  Saved ${webpSavings}% (${(originalSize / 1024).toFixed(2)}KB → ${(webpSize / 1024).toFixed(2)}KB)`)

    // Generate AVIF
    await sharp(imagePath)
      .avif({ quality: AVIF_QUALITY })
      .toFile(avifPath)
    
    const avifSize = (await stat(avifPath)).size
    const avifSavings = ((originalSize - avifSize) / originalSize * 100).toFixed(2)
    
    console.log(`✓ Created AVIF: ${avifPath}`)
    console.log(`  Saved ${avifSavings}% (${(originalSize / 1024).toFixed(2)}KB → ${(avifSize / 1024).toFixed(2)}KB)\n`)
  } catch (error) {
    console.error(`✗ Failed to optimize ${imagePath}:`, error.message)
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')

  try {
    const images = await getImages(IMAGE_DIR)
    console.log(`Found ${images.length} images to optimize\n`)

    for (const image of images) {
      await optimizeImage(image)
    }

    console.log('✨ Image optimization complete!')
    console.log('\n💡 Tip: Next.js will automatically serve WebP/AVIF when supported by the browser.')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
