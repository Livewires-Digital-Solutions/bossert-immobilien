import os
import re

app_dir = r"e:\LIVEWIRE DIGITAL SOLUTIONS\Bossert-Immobilien\src\app"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    
    # We want to replace max-w-7xl, max-w-6xl, max-w-[1200px], max-w-[1100px], max-w-[1000px] 
    # with max-w-[1400px] when followed by mx-auto
    
    # Regex to match class="... max-w-[XXXXpx] mx-auto ..."
    # But only if it's not a text-center block, though usually those are 700px/800px.
    
    # 1. max-w-[1000px] to max-w-[1300px]
    content = re.sub(r'max-w-\[1[0-3]\d{2}px\]\s+mx-auto', 'max-w-[1400px] mx-auto', content)
    
    # 2. max-w-7xl (1280px), max-w-6xl (1152px)
    content = re.sub(r'max-w-[67]xl\s+mx-auto', 'max-w-[1400px] mx-auto', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

for root, _, files in os.walk(app_dir):
    for f in files:
        if f.endswith(".tsx"):
            process_file(os.path.join(root, f))
