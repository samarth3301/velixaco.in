import re

def update_html_theme(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Homepage replacements
    content = content.replace('bg-softBeige', 'bg-darkestGreen')
    content = content.replace('bg-[#EFEFEF]', 'bg-white/5')
    content = content.replace('text-deepGreen', 'text-[#F4F4EB]')
    content = content.replace('text-gray-900', 'text-[#F4F4EB]')
    content = content.replace('border-gray-200', 'border-white/10')
    content = content.replace('border-black', 'border-white/20')
    content = content.replace('text-gray-500', 'text-white/60')
    content = content.replace('text-gray-600', 'text-white/70')
    content = content.replace('text-gray-400', 'text-white/40')
    
    # Specific navbar or footer fixes if needed, but the homepage nav is text-white mostly now.
    
    with open(filepath, 'w') as f:
        f.write(content)

update_html_theme('index.html')
update_html_theme('product.html')

