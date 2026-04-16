import sys
from remove_bg import remove_bg

input_file = sys.argv[1]
output_file = sys.argv[2]
remove_bg(input_file, output_file)
