import json
from collections import defaultdict, Counter

def analyze_tag_patterns(filename="technical_flashcards_complete_v2.json"):
    """Analyze all tag patterns to understand the structure."""
    
    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Track tags by position
    position_tags = defaultdict(set)
    all_unique_tags = set()
    tag_lengths = Counter()
    
    # Collect all tags by position
    for obj in data:
        tags = obj.get("tags", [])
        tag_lengths[len(tags)] += 1
        
        for i, tag in enumerate(tags):
            position_tags[i].add(tag)
            all_unique_tags.add(tag)
    
    print(f"Analyzing {len(data)} technical questions...")
    print(f"Total unique tags: {len(all_unique_tags)}")
    print("\nTag array length distribution:")
    for length, count in sorted(tag_lengths.items()):
        print(f"  {length} tags: {count} questions")
    
    print("\n" + "="*80)
    print("TAGS BY POSITION")
    print("="*80)
    
    for position in sorted(position_tags.keys()):
        print(f"\nPOSITION {position} ({len(position_tags[position])} unique values):")
        print("-" * 50)
        
        # Sort tags for easier reading
        sorted_tags = sorted(position_tags[position])
        for tag in sorted_tags:
            print(f"  {tag}")
    
    print("\n" + "="*80)
    print("PATTERN ANALYSIS")
    print("="*80)
    
    # Analyze patterns for "Reported in" tags
    reported_in_tags = [tag for tag in all_unique_tags if "reported in" in tag.lower()]
    print(f"\nTags containing 'Reported in': {len(reported_in_tags)}")
    for tag in sorted(reported_in_tags):
        print(f"  {tag}")
    
    # Look for potential "Type" categories
    print(f"\nPotential Type categories (Position 1 tags that don't contain 'reported'):")
    pos1_non_reported = [tag for tag in position_tags[1] if "reported" not in tag.lower()]
    for tag in sorted(pos1_non_reported):
        print(f"  {tag}")
    
    print(f"\nPotential Type categories (Position 2 tags):")
    for tag in sorted(position_tags[2]) if 2 in position_tags else []:
        print(f"  {tag}")
    
    # Sample some records to see patterns
    print(f"\n" + "="*80)
    print("SAMPLE TAG PATTERNS")
    print("="*80)
    
    for i, obj in enumerate(data[:10]):
        tags = obj.get("tags", [])
        print(f"\nSample {i+1}: {len(tags)} tags")
        for j, tag in enumerate(tags):
            print(f"  [{j}] {tag}")

if __name__ == "__main__":
    analyze_tag_patterns()