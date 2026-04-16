import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Best Sellers section
start_bs = html.find('<!-- BEST SELLERS SECTION -->')
end_bs = html.find('<!-- PROMOTIONAL BANNER SECTION -->')
bs_html = html[start_bs:end_bs]
bs_html = bs_html.replace('bg-darkestGreen', 'bg-[#F7F8F0]', 1) # Only outer section
bs_html = bs_html.replace('text-[#F4F4EB]', 'text-darkestGreen')
bs_html = bs_html.replace('bg-white/5', 'bg-white shadow-sm hover:shadow-md')
bs_html = bs_html.replace('text-white/40', 'text-gray-500')
html = html[:start_bs] + bs_html + html[end_bs:]

# We will leave Promo Banner as dark green since it's a solid banner and looks good.

# 3. Why Choose Us section
start_wcu = html.find('<!-- WHY CHOOSE US SECTION -->')
end_wcu = html.find('<!-- TESTIMONIAL SECTION -->')
if start_wcu != -1 and end_wcu != -1:
    wcu_html = html[start_wcu:end_wcu]
    wcu_html = wcu_html.replace('bg-darkestGreen', 'bg-[#F7F8F0]')
    wcu_html = wcu_html.replace('text-[#F4F4EB]', 'text-darkestGreen')
    wcu_html = wcu_html.replace('bg-white/5', 'bg-white shadow-sm border border-gray-100')
    wcu_html = wcu_html.replace('text-white/70', 'text-gray-500')
    html = html[:start_wcu] + wcu_html + html[end_wcu:]

# 4. Testimonial section
start_test = html.find('<!-- TESTIMONIAL SECTION -->')
end_test = html.find('<!-- HERO SECTION: SUBSCRIBE')
if start_test != -1 and end_test != -1:
    test_html = html[start_test:end_test]
    test_html = test_html.replace('bg-darkestGreen overflow-hidden', 'bg-[#F7F8F0] overflow-hidden')
    test_html = test_html.replace('bg-white/5', 'bg-white border border-gray-100')
    test_html = test_html.replace('text-[#F4F4EB]', 'text-darkestGreen')
    test_html = test_html.replace('text-white/60', 'text-gray-400')
    test_html = test_html.replace('text-white/70', 'text-gray-500')
    test_html = test_html.replace('bg-white/50', 'bg-gray-100')
    test_html = test_html.replace('bg-darkestGreen rounded-tl', 'bg-deepGreen/5 rounded-tl')
    html = html[:start_test] + test_html + html[end_test:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Restored index.html section colors to softBeige")
