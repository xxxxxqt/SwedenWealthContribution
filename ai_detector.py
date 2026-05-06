#!/usr/bin/env python3
"""
Academic AI Detector v3 — calibrated against a real human LiU thesis.

Background
----------
An earlier version penalised academic vocabulary, transition connectors, and
nominalisations. Testing on FULLTEXT01.pdf (a genuine LiU master's thesis)
showed it scored 64%, because human academic writing naturally uses those same
features. The three features that actually separate human from AI academic
writing are:

  1. Within-paragraph sentence-length CV (60 pts)
       AI text has very uniform rhythm WITHIN each paragraph (CV < 0.40).
       Human academic writing varies sentence length more (CV > 0.46).

  2. Formulaic sentence-opener density (30 pts)
       AI text starts 60-70 % of sentences with The/This/In/For/It/However …
       Human academic text starts 45-50 % with those words; the rest begin
       with researcher names, concepts, verbs, or specific facts.

  3. Self-referential phrase density (10 pts)
       AI text over-uses "this thesis / this approach / this design / the
       proposed …" (≥ 0.5 per 100 words).
       Human academic text uses those phrases less (≈ 0.2–0.35 per 100 words).

Calibration
-----------
  FULLTEXT01.pdf (real LiU thesis)  → 17 %  (Likely human-written)
  Original AI-generated text         → 73 %  (Likely AI-generated)
"""

import re, math, sys

# ---------------------------------------------------------------------------
# Patterns
# ---------------------------------------------------------------------------

SELF_REF = [
    "this thesis", "this paper", "this study", "this work",
    "this approach", "this method", "this technique", "this tool",
    "this design", "this framework", "this model", "this system",
    "this section", "this chapter", "this representation", "this choice",
    "this strategy", "this encoding", "this mapping", "this formula",
    "the present", "the proposed", "the aforementioned",
    "the following", "the above", "the latter", "the former",
    "the current approach", "the described", "the resulting",
]

FORMULAIC_OPENERS_RE = re.compile(
    r'^(?:The\b|This\b|In\b|For\b|A\b|An\b|It\b|'
    r'However\b|Moreover\b|Furthermore\b|Additionally\b|'
    r'As\b|By\b|Although\b|When\b|While\b|Both\b|These\b|'
    r'Such\b|Each\b|All\b|One\b|Because\b|'
    r'Therefore\b|Thus\b|Hence\b|Consequently\b|'
    r'Research\b|Studies\b|Several\b|Many\b|Most\b)',
    re.I,
)

# ---------------------------------------------------------------------------
# Prose extraction
# ---------------------------------------------------------------------------

def extract_paragraphs(raw):
    blocks = re.split(r'\n{2,}', raw)
    paras = []
    for block in blocks:
        lines = block.strip().splitlines()
        good = []
        for line in lines:
            s = line.strip()
            if not s:
                continue
            if re.match(r'^[=\-]{5,}$', s): continue
            if re.match(r'^\[\d+\]', s): continue
            if re.match(r'^\d+\.\s+[A-Z]', s): continue
            if re.match(r'^\d+\.\d+\s+', s): continue
            if re.match(r'^\d+\.[A-Z]\s+', s): continue
            if re.match(r'^(THESIS ADDITIONS|Visualization of Wealth|Kairui Li)', s): continue
            if (len(s.split()) < 12 and
                    not re.search(r'[.!?]\s*$', s) and
                    not re.search(r'\b(?:the|a|an|is|are|was|this|that|of|in|for)\b', s, re.I)):
                continue
            good.append(s)
        combined = ' '.join(good).strip()
        if len(combined.split()) >= 40:
            paras.append(combined)
    return paras

# ---------------------------------------------------------------------------
# Feature computation
# ---------------------------------------------------------------------------

def split_sentences(text):
    segs = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in segs if len(s.strip().split()) >= 5]

def wc(text):
    return len(re.findall(r'\b[a-zA-Z]+\b', text))

def feat_uniformity(paras):
    """
    Average within-paragraph sentence-length CV.
    AI:    CV < 0.40  (uniform rhythm)
    Human: CV > 0.46  (varied rhythm)
    Calibrated: FULLTEXT01.pdf scores 0.469
    """
    cvs = []
    for para in paras:
        sents = split_sentences(para)
        if len(sents) < 3:
            continue
        lengths = [wc(s) for s in sents]
        mean = sum(lengths) / len(lengths)
        if mean == 0:
            continue
        std = math.sqrt(sum((l - mean)**2 for l in lengths) / len(lengths))
        cvs.append(std / mean)
    return sum(cvs) / len(cvs) if cvs else 0.5

def feat_openers(paras):
    """
    Fraction of sentences starting with a formulaic word.
    AI:    > 60 %
    Human: < 50 %
    Calibrated: FULLTEXT01.pdf scores 46.8 %
    """
    total_s, formulaic = 0, 0
    for para in paras:
        for sent in split_sentences(para):
            total_s += 1
            if FORMULAIC_OPENERS_RE.match(sent):
                formulaic += 1
    return formulaic / total_s * 100 if total_s else 50

def feat_self_ref(text_lower, total_words):
    """
    Self-referential phrase density per 100 words.
    AI:    > 0.50 / 100 w  ("this thesis/approach/design" repeated)
    Human: < 0.35 / 100 w
    Calibrated: FULLTEXT01.pdf scores 0.35
    """
    count = sum(text_lower.count(p) for p in SELF_REF)
    return count / total_words * 100 if total_words else 0

# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

def s_uniformity(v):   # 60 pts max
    """Low CV = AI (uniform). High CV = human (varied)."""
    if v < 0.28: return 60
    if v < 0.36: return 52   # original AI text (0.356) → 52
    if v < 0.42: return 35
    if v < 0.48: return 12   # FULLTEXT01.pdf (0.469) → 12
    if v < 0.55: return 5
    return 0

def s_openers(v):      # 30 pts max
    """High formulaic-opener % = AI."""
    if v > 75: return 30
    if v > 65: return 22
    if v > 58: return 12     # original AI text (62.6 %) → 12
    if v > 50: return 5
    return 0                  # FULLTEXT01.pdf (46.8 %) → 0

def s_self_ref(v):     # 10 pts max
    """High self-referential density = AI."""
    if v > 0.8: return 10
    if v > 0.5: return 9     # original AI text (0.60) → 9
    if v > 0.3: return 5     # FULLTEXT01.pdf (0.35) → 5
    if v > 0.1: return 2
    return 0

MAX_PTS = {'uniformity': 60, 'openers': 30, 'self_ref': 10}

def analyze(filepath):
    with open(filepath, 'r', encoding='utf-8') as fh:
        raw = fh.read()
    paras = extract_paragraphs(raw)
    prose = ' '.join(paras)
    prose_lower = prose.lower()
    words = re.findall(r'\b[a-z]+\b', prose_lower)
    total = len(words)

    feats = {
        'uniformity': feat_uniformity(paras),
        'openers':    feat_openers(paras),
        'self_ref':   feat_self_ref(prose_lower, total),
        'word_count': total,
        'para_count': len(paras),
    }
    bd = {
        'uniformity': s_uniformity(feats['uniformity']),
        'openers':    s_openers(feats['openers']),
        'self_ref':   s_self_ref(feats['self_ref']),
    }
    score = min(sum(bd.values()), 100)
    return feats, score, bd

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def bar(val, mx, w=28):
    f = int(round(val / mx * w)) if mx else 0
    return '[' + '#' * f + '.' * (w - f) + ']'

def verdict(score):
    if score >= 70: return "LIKELY AI-GENERATED"
    if score >= 45: return "POSSIBLY AI-GENERATED"
    if score >= 25: return "MIXED / UNCERTAIN"
    return "LIKELY HUMAN-WRITTEN"

if __name__ == '__main__':
    filepath = sys.argv[1] if len(sys.argv) > 1 else 'thesis_chapter4_additions.txt'
    feats, score, bd = analyze(filepath)

    ROWS = [
        ('Within-para sentence uniformity (CV)',
         f'{feats["uniformity"]:.3f}',
         'AI < 0.40 ; human > 0.46 (FULLTEXT01: 0.469)',
         'uniformity'),
        ('Formulaic sentence-opener density',
         f'{feats["openers"]:.1f}%',
         'AI > 58 % ; human < 50 % (FULLTEXT01: 46.8 %)',
         'openers'),
        ('Self-referential phrase density',
         f'{feats["self_ref"]:.2f} /100w',
         'AI > 0.50 ; human < 0.35 (FULLTEXT01: 0.35)',
         'self_ref'),
    ]

    print()
    print('=' * 68)
    print('  ACADEMIC AI DETECTOR v3  (calibrated against real LiU thesis)')
    print('=' * 68)
    print(f'  File : {filepath}')
    print(f'  Prose words : {feats["word_count"]}   Paragraphs : {feats["para_count"]}')
    print()
    print(f'  {"Feature":<42} {"Value":>10}  {"Score":>7}')
    print('  ' + '-' * 64)

    for label, measured, note, key in ROWS:
        pts = bd[key]
        mx  = MAX_PTS[key]
        print(f'  {label:<42} {measured:>10}  {pts:>3}/{mx:<3}  {bar(pts, mx, 16)}')
        print(f'  {"":42}   {note}')
        print()

    print('  ' + '=' * 64)
    print(f'  AI-GENERATED LIKELIHOOD : {score}%   {bar(score, 100, 30)}')
    print(f'  VERDICT : {verdict(score)}')
    print('  ' + '=' * 64)
    print()
    print('  Calibration baseline:')
    print('  FULLTEXT01.pdf (real LiU thesis) → 17 %  (Likely human-written)')
    print('  Original AI draft of this file   → 73 %  (Likely AI-generated)')
    print()
