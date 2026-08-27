import os
import re

app_dir = r"e:\LIVEWIRE DIGITAL SOLUTIONS\Bossert-Immobilien\src\app"

container_pattern = re.compile(
    r'(<section className="[^"]*?(?:px-6 md:px-10|px-6)[^"]*?">)\s*<div className="(?:max-w-\[1400px\]|max-w-\[1200px\]|max-w-7xl)\s+mx-auto([^"]*)">',
    re.DOTALL
)

import_pattern = re.compile(r'(import .*? from ".*?";\n)')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if no match
    if not container_pattern.search(content):
        return

    # Add import if missing
    if 'import PageContainer' not in content:
        # Find last import
        imports = list(import_pattern.finditer(content))
        if imports:
            last_import = imports[-1]
            content = content[:last_import.end()] + 'import PageContainer from "@/components/ui/PageContainer";\n' + content[last_import.end():]

    # Replace container openings
    def replace_opening(match):
        section_tag = match.group(1)
        # Remove the padding from section tag since PageContainer will handle it
        section_tag = re.sub(r'px-6 md:px-10\s*', '', section_tag)
        section_tag = re.sub(r'px-6\s*', '', section_tag)
        
        extra_classes = match.group(2).strip()
        if extra_classes:
            return f'{section_tag}\n        <PageContainer className="{extra_classes}">'
        return f'{section_tag}\n        <PageContainer>'

    new_content = container_pattern.sub(replace_opening, content)
    
    # We also need to fix closing tags. 
    # This is tricky with Regex because of nested divs.
    # Since we can't easily do it perfectly with Regex, we will just print files that need manual attention.
    
    if new_content != content:
        print(f"Needs update: {filepath}")

for root, _, files in os.walk(app_dir):
    for f in files:
        if f == "page.tsx":
            process_file(os.path.join(root, f))
