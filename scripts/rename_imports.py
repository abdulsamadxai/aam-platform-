import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content.replace('@/lib/mock-data', '@/lib/api')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('.'):
    for name in files:
        if name.endswith('.ts') or name.endswith('.tsx'):
            filepath = os.path.join(root, name)
            replace_in_file(filepath)
