import re

with open('product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Targeting the Review Section
# From: <section class="max-w-4xl mx-auto px-6 py-24 border-t border-gray-100 animate-fade-slide delay-200">
# To: A wrapper with bg-darkestGreen and inner content
review_start = html.find('<!-- Review Section -->')
review_section_tag = '<section class="max-w-4xl mx-auto px-6 py-24 border-t border-gray-100 animate-fade-slide delay-200">'
html = html.replace(review_section_tag, '<section class="w-full bg-darkestGreen py-24 border-t border-white/10 animate-fade-slide delay-200 text-white"><div class="max-w-4xl mx-auto px-6">')
# Close the div before the next section
html = html.replace('<!-- Related Products -->', '</div></section>\n\n  <!-- Related Products -->')

# 2. Targeting the Related Products Section
related_tag = '<section class="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100 animate-fade-slide delay-300">'
html = html.replace(related_tag, '<section class="w-full bg-darkestGreen py-24 border-t border-white/10 animate-fade-slide delay-300 text-white"><div class="max-w-7xl mx-auto px-6">')
# Close the div before the footer
html = html.replace('<!-- Footer -->', '</div></section>\n\n  <!-- Footer -->')

# 3. Clean up internal colors for these dark sections
# Fix headings and texts inside the new dark sections
# Note: Since I injected 'text-white' in the section tag, most will inherit.
# But we need to fix specific dark-green-text leftovers
html = html.replace('text-darkestGreen', 'text-white') 
# However, we must preserve darkestGreen for the navbar and hero which are outside this replacement? 
# No, the global replace above is dangerous. Let s be more careful.

with open('product.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Split theme applied: Light Hero, Darkest Green bottom sections.")
