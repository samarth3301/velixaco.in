import re

def polish_dark_theme(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Base background adjustments
    content = content.replace('body { background-color: #F7F8F0; }', 'body { background-color: #1A2E1C; }')
    content = content.replace('bg-[#F7F8F0]', 'bg-darkestGreen')
    content = content.replace('bg-softBeige', 'bg-darkestGreen')
    
    # Text changes
    content = content.replace('text-darkestGreen', 'text-[#F4F4EB]')
    content = content.replace('text-deepGreen', 'text-[#F4F4EB]')
    content = content.replace('text-gray-900', 'text-[#F4F4EB]')
    content = content.replace('text-gray-800', 'text-[#F4F4EB]')
    content = content.replace('text-gray-600', 'text-[#F4F4EB]/70')
    content = content.replace('text-gray-500', 'text-[#F4F4EB]/60')
    content = content.replace('text-gray-400', 'text-[#F4F4EB]/40')
    
    # Card backgrounds
    content = content.replace('bg-white/40', 'bg-white/5')
    content = content.replace('bg-white/60', 'bg-white/5')
    content = content.replace('bg-white/80', 'bg-white/5')
    content = content.replace('bg-white', 'bg-[#F4F4EB]/10')
    
    # Borders
    content = content.replace('border-gray-200', 'border-white/10')
    content = content.replace('border-gray-300', 'border-white/30')
    content = content.replace('border-white/60', 'border-white/10')
    
    # Specific buttons back to solid
    content = content.replace('bg-[#F4F4EB]/10 border-2', 'bg-transparent border-2')
    content = content.replace('text-[#F4F4EB]/10', 'text-white') # accidental replace fix
    
    with open(filepath, 'w') as f:
        f.write(content)

polish_dark_theme('product.html')

