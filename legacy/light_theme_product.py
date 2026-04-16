import re

with open('product.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Base Colors & Style
content = content.replace('background-color: #1A2E1C;', 'background-color: #F7F8F0;')
content = content.replace('text-[#F4F4EB]', 'text-darkestGreen')
content = content.replace('bg-darkestGreen', 'bg-softBeige') # for ambient layers
content = content.replace('bg-white/[0.02]', 'bg-deepGreen/[0.03]')
content = content.replace('bg-white/[0.03]', 'bg-deepGreen/[0.04]')

# 2. Navbar
content = content.replace('bg-softBeige/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5', 'bg-softBeige/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border-b border-deepGreen/5')
content = content.replace('hover:text-white', 'hover:text-deepGreen')
content = content.replace('bg-[#F4F4EB]', 'bg-darkestGreen') # for navbar underline

# 3. Info Card
content = content.replace('bg-white/5 backdrop-blur-2xl border border-white/10', 'bg-white/40 backdrop-blur-2xl border border-white/60')
content = content.replace('text-white/50', 'text-gray-500')
content = content.replace('text-white/40', 'text-gray-400')
content = content.replace('text-white/70', 'text-gray-600')
content = content.replace('bg-white/10', 'bg-deepGreen/5')
content = content.replace('border-white/20', 'border-gray-300/50')
content = content.replace('border-white/5', 'border-gray-200')

# 4. Buttons (Flip to green)
# Add to Cart button
content = content.replace('bg-softBeige text-darkestGreen rounded-full font-bold text-lg', 'bg-darkestGreen text-white rounded-full font-bold text-lg')
# Submit Review button
content = content.replace('bg-softBeige text-darkestGreen px-14 py-5 rounded-full font-bold text-lg', 'bg-darkestGreen text-white px-14 py-5 rounded-full font-bold text-lg')
# Quantity selector buttons
content = content.replace('hover:bg-white/10 transition-all text-xl font-medium text-darkestGreen', 'hover:bg-white transition-all text-xl font-medium text-darkestGreen')

# 5. Reviews Form
content = content.replace('bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/5', 'bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white')
content = content.replace('text-white/30', 'text-gray-300')
content = content.replace('text-white/40', 'text-gray-400')
content = content.replace('text-white/60', 'text-gray-500')
content = content.replace('bg-white/5 border border-white/10 rounded-[24px]', 'bg-white border-2 border-gray-200 rounded-[24px]')
content = content.replace('bg-white/5 border border-white/10 rounded-full', 'bg-white border-2 border-gray-200 rounded-full')
content = content.replace('checked:bg-softBeige', 'checked:bg-darkestGreen')

# 6. Related Products
content = content.replace('bg-white/5 backdrop-blur-sm rounded-[32px]', 'bg-white backdrop-blur-sm rounded-[32px]')
content = content.replace('border-white/5', 'border-gray-100')
content = content.replace('hover:border-white/20', 'hover:border-gray-200')

# Save
with open('product.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Product page converted to light theme with green buttons.")
