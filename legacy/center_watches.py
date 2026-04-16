import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Change items-end to items-center and object-bottom to object-center for product containers
html = html.replace('items-end justify-center', 'items-center justify-center')
html = html.replace('object-bottom group-hover:scale-110', 'object-center group-hover:scale-110')
# Also remove any specific h-[95%] that might be pushing things if they are already centered
html = html.replace('h-[95%] object-contain', 'h-[85%] object-contain')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Update product.html
with open('product.html', 'r', encoding='utf-8') as f:
    p_html = f.read()

p_html = p_html.replace('items-end justify-center', 'items-center justify-center')
p_html = p_html.replace('object-bottom group-hover:scale-110', 'object-center group-hover:scale-110')
p_html = p_html.replace('h-[75%] max-h-[75%]', 'h-[80%] max-h-[80%]')

with open('product.html', 'w', encoding='utf-8') as f:
    f.write(p_html)

print("Centered all watches in product cards across index.html and product.html")
