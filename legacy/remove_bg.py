import rembg
import os

def remove_bg(img_path, out_path):
    print(f"Processing {img_path}...")
    with open(img_path, "rb") as input_file:
        input_data = input_file.read()
    
    subject = rembg.remove(input_data)
    
    with open(out_path, "wb") as output_file:
        output_file.write(subject)
    print(f"Saved to {out_path}")

base_path = "/home/parth/Projects/Velixaco.in/images1/"
out_base = "/home/parth/Projects/Velixaco.in/"

# Process the specific 4 watches for the Hero section
watches = ["3.jpeg", "4.jpeg", "5.jpeg", "7.jpeg"]
for img_name in watches:
    input_p = os.path.join(base_path, img_name)
    output_p = os.path.join(out_base, f"hero_{img_name.replace('.jpeg', '.png')}")
    remove_bg(input_p, output_p)
