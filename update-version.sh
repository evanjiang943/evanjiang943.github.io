#!/bin/bash

# Script to update CSS version for cache busting
# Usage: ./update-version.sh

# Get current timestamp for version
VERSION=$(date +%s)

echo "Updating CSS version to: $VERSION"

# Update all HTML files with new version
sed -i '' "s/styles\.css?v=[0-9.]*/styles.css?v=$VERSION/g" *.html

echo "Updated version in all HTML files"
echo "Don't forget to commit and push your changes!"
