#!/usr/bin/env python3
import csv
import io

# Meaningful A2-level examples for common Dutch words
examples = {
    # Topic 2 - Shopping continued
    'chips': 'Ik koop chips voor het feestje.',
    'denken': 'Ik denk dat de winkel dicht is.',
    'dicht': 'De supermarkt is nu dicht.',
    'fietsen': 'Ik ga fietsen naar de winkel.',
    'half': 'Het is half acht.',
    'internet': 'Ik zoek op internet.',
    'keuken': 'Ik kook in de keuken.',
    'laat': 'Het is al laat.',
    'leeg': 'Mijn koelkast is leeg.',
    'liggen': 'De sleutels liggen op tafel.',
    'maandag': 'Op maandag werk ik.',
    'open': 'De winkel is open.',
    'openingstijden': 'Wat zijn de openingstijden?',
    "'s avonds": "'s Avonds kook ik eten.",
    "'s middags": "'s Middags ga ik boodschappen doen.",
    "'s morgens": "'s Morgens drink ik koffie.",
    "'s nachts": "'s Nachts slaap ik.",
    "'s ochtends": "'s Ochtends lees ik de krant.",
    'snel': 'Ik loop snel naar huis.',
    'tot': 'De winkel is open tot 8 uur.',
    'uur': 'Het is 3 uur.',
    'weten': 'Ik weet het niet.',
    'zak': 'Ik heb een zak appels.',
    
    # Topic 3 - Social conversations
    'alles': 'Alles gaat goed.',
    'beterschap': 'Beterschap! Ik hoop dat je snel beter bent.',
    'bezig': 'Ik ben bezig met koken.',
    'broer': 'Mijn broer woont in Utrecht.',
    'daar': 'Daar staat mijn auto.',
    'druk': 'Ik heb het erg druk.',
    'een beetje': 'Ik spreek een beetje Nederlands.',
    'eindelijk': 'Eindelijk is het weekend!',
    'groet': 'Groet je familie van mij.',
    'lekker': 'Het eten is lekker.',
    'lopen': 'Ik ga lopen in het park.',
    'moeder': 'Mijn moeder belt me elke dag.',
    'morgen': 'Morgen ga ik werken.',
    'paracetamol': 'Ik neem paracetamol tegen hoofdpijn.',
    'prima': 'Het gaat prima met mij.',
    'steeds': 'Het regent steeds.',
    'vervelend': 'Dat is vervelend voor je.',
    'vriend': 'Mijn vriend komt vanavond.',
    'vriendin': 'Mijn vriendin is erg aardig.',
    'waarom': 'Waarom ben je zo laat?',
    'warm': 'Het is warm vandaag.',
    'weer': 'Het weer is mooi.',
    'worden': 'Ik word moe.',
    'ziek': 'Ik ben ziek.',
    'zo': 'Zo doe je dat.',
    'zon': 'De zon schijnt.',
    'zus': 'Mijn zus heeft twee kinderen.',
    
    # More examples for other common words
    'bezoek': 'We krijgen bezoek.',
    'binnenkomen': 'Kom binnen!',
    'drinken': 'Wil je iets drinken?',
    'eruitzien': 'Je ziet er goed uit.',
    'geven': 'Kan je me het zout geven?',
    'horen': 'Ik hoor muziek.',
    'huilen': 'Het kind begint te huilen.',
    'jas': 'Doe je jas aan.',
    'jongen': 'Die jongen is mijn zoon.',
    'klein': 'Ons huis is klein.',
    'koffie': 'Ik drink graag koffie.',
    'lachen': 'We lachen veel samen.',
    'lief': 'Wat een lief kind.',
    'melk': 'Ik doe melk in mijn thee.',
    'moe': 'Ik ben moe.',
    'slapen': 'Ik ga slapen.',
    'suiker': 'Wil je suiker in je koffie?',
    'thee': 'Ik drink thee.',
    'zelf': 'Ik doe het zelf.',
    'zitten': 'Kom zitten.',
    'zonder': 'Ik drink koffie zonder suiker.',
    'zwart': 'Ik heb een zwarte kat.',
    
    # Default example for any word not in the dictionary
    'default': 'Ik leer het woord "{word}".'
}

def get_example(dutch_word):
    """Get an appropriate example for a Dutch word"""
    if dutch_word in examples:
        return examples[dutch_word]
    else:
        return examples['default'].format(word=dutch_word)

# Read the CSV file
with open('/workspaces/taal-kaarten-maker/public/vocabulary.csv', 'r', encoding='utf-8') as file:
    content = file.read()

# Parse CSV manually to handle commas in examples
lines = content.strip().split('\n')
updated_lines = []

# Process header
header = lines[0]
if 'example' not in header:
    header += ',example'
updated_lines.append(header)

# Process each data line
for line in lines[1:]:
    if not line.strip():
        continue
        
    # Split on comma but be careful with commas in examples
    parts = []
    current_part = ''
    in_quotes = False
    
    for char in line:
        if char == '"':
            in_quotes = not in_quotes
            current_part += char
        elif char == ',' and not in_quotes:
            parts.append(current_part.strip())
            current_part = ''
        else:
            current_part += char
    
    if current_part:
        parts.append(current_part.strip())
    
    if len(parts) >= 4:
        dutch = parts[0].replace('"', '').strip()
        english = parts[1].replace('"', '').strip()
        topic = parts[2].replace('"', '').strip()
        section = parts[3].replace('"', '').strip()
        
        # Check if example already exists
        if len(parts) >= 5 and parts[4].strip() and not parts[4].strip().startswith('Ik gebruik het woord'):
            # Keep existing meaningful example
            example = parts[4].replace('"', '').strip()
        else:
            # Generate new meaningful example
            example = get_example(dutch)
        
        # Rebuild the line
        new_line = f'{dutch},{english},{topic},{section},{example}'
        updated_lines.append(new_line)

# Write the updated content back
with open('/workspaces/taal-kaarten-maker/public/vocabulary.csv', 'w', encoding='utf-8') as file:
    file.write('\n'.join(updated_lines))

print(f"Updated {len(updated_lines)-1} vocabulary entries with meaningful examples")