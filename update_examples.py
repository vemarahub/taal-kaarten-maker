#!/usr/bin/env python3
import csv
import re

# Read the current CSV file
with open('/workspaces/taal-kaarten-maker/public/vocabulary.csv', 'r', encoding='utf-8') as file:
    content = file.read()

# Split into lines and process
lines = content.strip().split('\n')
updated_lines = []

# Keep the header
updated_lines.append(lines[0])

# Process each line
for line in lines[1:]:
    parts = line.split(',')
    if len(parts) >= 4:
        dutch = parts[0]
        english = parts[1] 
        topic = parts[2]
        section = parts[3]
        
        # Add example if not present
        if len(parts) == 4:
            # Generate simple example
            example = f"Ik gebruik '{dutch}' in een zin."
            updated_lines.append(f"{line},{example}")
        else:
            updated_lines.append(line)
    else:
        updated_lines.append(line)

# Write back to file
with open('/workspaces/taal-kaarten-maker/public/vocabulary.csv', 'w', encoding='utf-8') as file:
    file.write('\n'.join(updated_lines))

print("Updated vocabulary.csv with examples")