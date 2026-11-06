import re

with open('src/data/municipalities-database.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
entry_spans = []
i = 0
while i < len(lines):
    if lines[i].strip() == '{':
        j = i + 1
        while j < len(lines) and lines[j].strip() == '':
            j += 1
        if j < len(lines) and 'id:' in lines[j]:
            depth = 0
            start = i
            for k in range(i, len(lines)):
                for ch in lines[k]:
                    if ch == '{': depth += 1
                    elif ch == '}': depth -= 1
                if depth == 0:
                    entry_spans.append((start, k))
                    i = k + 1
                    break
            else:
                i += 1
            continue
    i += 1

missing_forms = []
corrupt = []
for start, end in entry_spans:
    entry = '\n'.join(lines[start:end+1])
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", entry)
    name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", entry)
    if not id_match or not name_match:
        continue
    iid = id_match.group(1)
    name = name_match.group(1)
    if re.search(r"urls:\s*null", entry):
        continue
    main_match = re.search(r"main:\s*['\"](https?://[^'\"]+)['\"]", entry)
    has_forms = bool(re.search(r"forms:\s*", entry))
    if main_match and not has_forms:
        missing_forms.append((iid, name, main_match.group(1)))

print(f'Still missing forms URL: {len(missing_forms)}')
for iid, name, url in missing_forms:
    print(f'  {iid} | {name} | {url}')

if not missing_forms:
    print('All municipalities with main URLs now have forms URLs!')
