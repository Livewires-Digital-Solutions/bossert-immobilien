import os
import re

app_dir = r"e:\LIVEWIRE DIGITAL SOLUTIONS\Bossert-Immobilien\src\app"

import_pattern = re.compile(r'(import .*? from ".*?";\n)')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    pattern = re.compile(r'(<section[^>]*?className="[^"]*?(?:px-6 md:px-10|px-6 md:px-12|px-6)[^"]*?"[^>]*>)\s*(<div[^>]*?className="(?:max-w-\[\d+px\]|max-w-7xl)\s+mx-auto([^"]*)"[^>]*>)')
    
    matches = list(pattern.finditer(content))
    
    if not matches:
        return

    for match in matches:
        section_tag = match.group(1)
        div_tag = match.group(2)
        
        new_section_tag = re.sub(r'\s*px-6 md:px-10\s*', ' ', section_tag)
        new_section_tag = re.sub(r'\s*px-6 md:px-12\s*', ' ', new_section_tag)
        new_section_tag = re.sub(r'\s*px-6\s*', ' ', new_section_tag)
        new_section_tag = new_section_tag.replace('  ', ' ')
        
        original_matched = match.group(0)
        
        extra_classes = match.group(3).strip()
        
        if extra_classes:
            new_matched = f'{new_section_tag}\n        <PageContainer className="{extra_classes}">'
        else:
            new_matched = f'{new_section_tag}\n        <PageContainer>'
            
        content = content.replace(original_matched, new_matched)

    closing_pattern = r'        </div>\n      </section>'
    new_closing = r'        </PageContainer>\n      </section>'
    content = content.replace(closing_pattern, new_closing)
    
    # Also handle another indentation level if present
    closing_pattern2 = r'      </div>\n    </section>'
    new_closing2 = r'      </PageContainer>\n    </section>'
    content = content.replace(closing_pattern2, new_closing2)

    if 'import PageContainer' not in content:
        imports = list(import_pattern.finditer(content))
        if imports:
            last_import = imports[-1]
            content = content[:last_import.end()] + 'import PageContainer from "@/components/ui/PageContainer";\n' + content[last_import.end():]

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

for root, _, files in os.walk(app_dir):
    for f in files:
        if f.endswith(".tsx"):
            process_file(os.path.join(root, f))
