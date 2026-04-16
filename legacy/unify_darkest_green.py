import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Promotional Banner background and text color
html = html.replace('bg-[#426444]', 'bg-darkestGreen')
html = html.replace('text-[#426444]', 'text-darkestGreen')

# 2. Update Why Choose Us (bottom split and text)
html = html.replace('bg-[#426444]', 'bg-darkestGreen') # Redundant but safe
html = html.replace('text-[#426444]', 'text-darkestGreen') # Redundant but safe
html = html.replace('border-[#426444]/10', 'border-darkestGreen/10')
html = html.replace('text-[#426444]/80', 'text-darkestGreen/80')

# 3. Update Testimonial section arch color
html = html.replace('bg-[#598457]', 'bg-darkestGreen')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Unified all green accents to darkestGreen (#1A2E1C)")
