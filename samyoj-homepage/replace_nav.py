with open('E:/samyojjj/samyoj-homepage/blog.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('E:/samyojjj/samyoj-homepage/new_nav.html', 'r', encoding='utf-8') as f:
    new_nav = f.read()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<header class="_58ce83d8">' in line and start_idx == -1:
        start_idx = i
    elif '</header>' in line and start_idx != -1 and end_idx == -1:
        end_idx = i

if start_idx != -1 and end_idx != -1:
    print(f"Match found: lines {start_idx+1} to {end_idx+1}")
    new_lines = lines[:start_idx] + [new_nav + '\n'] + lines[end_idx+1:]
    with open('E:/samyojjj/samyoj-homepage/blog.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Replacement complete.")
else:
    print("Mismatch!")
    print(f"start_idx: {start_idx}, end_idx: {end_idx}")
