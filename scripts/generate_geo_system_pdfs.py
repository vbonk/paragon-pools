#!/home/claude-runner/.claude/skills/geo/venv/bin/python3
"""
GEO System PDF Suite Generator
Generates 4 professional PDFs documenting the complete GEO system.

Usage:
    python3 generate_geo_system_pdfs.py [output_dir]

Outputs:
    1. GEO-System-Overview.pdf       (8-10 pages)
    2. GEO-Sales-Deck.pdf            (10-12 pages)
    3. GEO-Methodology-Guide.pdf     (15-20 pages)
    4. GEO-Technical-Reference.pdf   (20-25 pages)
"""

import sys
import os
from datetime import datetime

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, lightgrey, black, Color
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether, CondPageBreak,
)
from reportlab.graphics.shapes import (
    Drawing, Rect, String, Circle, Line, Group, Polygon,
)
from reportlab.graphics.charts.barcharts import VerticalBarChart

# ============================================================
# COLOR PALETTE
# ============================================================
PRIMARY = HexColor("#1a1a2e")
SECONDARY = HexColor("#16213e")
ACCENT = HexColor("#0f3460")
HIGHLIGHT = HexColor("#e94560")
SUCCESS = HexColor("#00b894")
SUCCESS_LIGHT = HexColor("#e6f9f3")
WARNING = HexColor("#fdcb6e")
WARNING_LIGHT = HexColor("#fef9e7")
DANGER = HexColor("#d63031")
DANGER_LIGHT = HexColor("#fde8e8")
INFO = HexColor("#0984e3")
INFO_LIGHT = HexColor("#e8f4fd")
LIGHT_BG = HexColor("#f8f9fa")
MEDIUM_BG = HexColor("#e9ecef")
TEXT_PRIMARY = HexColor("#2d3436")
TEXT_SECONDARY = HexColor("#636e72")
TEXT_LIGHT = HexColor("#b2bec3")

PAGE_W = letter[0]
PAGE_H = letter[1]
USABLE_W = PAGE_W - 100

DATE_STR = datetime.now().strftime("%B %Y")
YEAR = datetime.now().strftime("%Y")


def score_color(score):
    if score >= 80: return SUCCESS
    if score >= 60: return INFO
    if score >= 40: return WARNING
    return DANGER


def score_label(score):
    if score >= 90: return "Excellent"
    if score >= 75: return "Good"
    if score >= 60: return "Fair"
    if score >= 40: return "Poor"
    return "Critical"


# ============================================================
# SHARED STYLES
# ============================================================
def build_styles():
    """Build custom styles dict. Uses plain dict to avoid ReportLab built-in name conflicts."""
    return {
        'DocTitle': ParagraphStyle(
            'DocTitle', fontName='Helvetica-Bold', fontSize=32,
            textColor=PRIMARY, spaceAfter=6, alignment=TA_LEFT, leading=38,
        ),
        'DocSubtitle': ParagraphStyle(
            'DocSubtitle', fontName='Helvetica', fontSize=14,
            textColor=TEXT_SECONDARY, spaceAfter=20, alignment=TA_LEFT,
        ),
        'SectionHead': ParagraphStyle(
            'SectionHead', fontName='Helvetica-Bold', fontSize=20,
            textColor=PRIMARY, spaceBefore=24, spaceAfter=10, leading=24,
        ),
        'SubHead': ParagraphStyle(
            'SubHead', fontName='Helvetica-Bold', fontSize=14,
            textColor=ACCENT, spaceBefore=16, spaceAfter=6, leading=18,
        ),
        'SubHead2': ParagraphStyle(
            'SubHead2', fontName='Helvetica-Bold', fontSize=11,
            textColor=SECONDARY, spaceBefore=12, spaceAfter=4, leading=14,
        ),
        'Body': ParagraphStyle(
            'BodyCustom', fontName='Helvetica', fontSize=10,
            textColor=TEXT_PRIMARY, spaceBefore=3, spaceAfter=3,
            leading=14, alignment=TA_JUSTIFY,
        ),
        'BodyLarge': ParagraphStyle(
            'BodyLarge', fontName='Helvetica', fontSize=11,
            textColor=TEXT_PRIMARY, spaceBefore=4, spaceAfter=4,
            leading=16, alignment=TA_JUSTIFY,
        ),
        'Bullet': ParagraphStyle(
            'BulletCustom', fontName='Helvetica', fontSize=10,
            textColor=TEXT_PRIMARY, leftIndent=20, bulletIndent=8,
            spaceBefore=2, spaceAfter=2, leading=14,
        ),
        'SmallText': ParagraphStyle(
            'SmallTextCustom', fontName='Helvetica', fontSize=8,
            textColor=TEXT_SECONDARY, spaceBefore=2, spaceAfter=2,
        ),
        'Callout': ParagraphStyle(
            'Callout', fontName='Helvetica', fontSize=10,
            textColor=ACCENT, backColor=LIGHT_BG, borderPadding=12,
            spaceBefore=10, spaceAfter=10, leading=15,
        ),
        'BigNumber': ParagraphStyle(
            'BigNumber', fontName='Helvetica-Bold', fontSize=42,
            textColor=HIGHLIGHT, alignment=TA_CENTER, spaceBefore=6,
            spaceAfter=2,
        ),
        'NumberCaption': ParagraphStyle(
            'NumberCaption', fontName='Helvetica', fontSize=10,
            textColor=TEXT_SECONDARY, alignment=TA_CENTER,
            spaceBefore=0, spaceAfter=12,
        ),
        'CoverMeta': ParagraphStyle(
            'CoverMeta', fontName='Helvetica', fontSize=10,
            textColor=TEXT_SECONDARY, spaceBefore=2, spaceAfter=2,
        ),
    }


def make_table_style(header_color=PRIMARY):
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), header_color),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, lightgrey),
        ('BACKGROUND', (0, 1), (-1, -1), white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ])


def make_accent_table_style():
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, lightgrey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ])


# ============================================================
# VISUAL COMPONENTS
# ============================================================
def create_score_ring(score, label_text, color, x, y, r=38):
    g = Group()
    g.add(Circle(x, y, r, fillColor=LIGHT_BG, strokeColor=lightgrey, strokeWidth=1))
    g.add(Circle(x, y, r - 4, fillColor=color, strokeColor=None))
    g.add(Circle(x, y, r - 12, fillColor=white, strokeColor=None))
    g.add(String(x, y + 2, str(score), fontSize=22, fontName='Helvetica-Bold',
                 fillColor=TEXT_PRIMARY, textAnchor='middle'))
    g.add(String(x, y - 14, "/100", fontSize=8, fontName='Helvetica',
                 fillColor=TEXT_SECONDARY, textAnchor='middle'))
    g.add(String(x, y - r - 16, label_text, fontSize=8, fontName='Helvetica-Bold',
                 fillColor=TEXT_PRIMARY, textAnchor='middle'))
    return g


def create_bar_chart(data, labels, width=460, height=180):
    d = Drawing(width, height)
    chart = VerticalBarChart()
    chart.x = 55
    chart.y = 30
    chart.height = height - 60
    chart.width = width - 80
    chart.data = [data]
    chart.categoryAxis.categoryNames = labels
    chart.categoryAxis.labels.angle = 0
    chart.categoryAxis.labels.fontSize = 8
    chart.categoryAxis.labels.fontName = 'Helvetica'
    chart.valueAxis.valueMin = 0
    chart.valueAxis.valueMax = 100
    chart.valueAxis.valueStep = 20
    chart.valueAxis.labels.fontSize = 8
    for i, score in enumerate(data):
        chart.bars[0].fillColor = score_color(score)
    chart.bars[0].strokeColor = None
    d.add(chart)
    return d


def create_horizontal_bars(items, width=460, height=None):
    """Create horizontal bar chart from list of (label, value) tuples."""
    bar_h = 20
    gap = 8
    if height is None:
        height = len(items) * (bar_h + gap) + 20
    d = Drawing(width, height)
    bar_max = 280
    bar_x = 140
    for i, (label, value) in enumerate(items):
        y = height - 20 - i * (bar_h + gap)
        d.add(String(bar_x - 8, y + 5, label, fontSize=9, fontName='Helvetica',
                     fillColor=TEXT_PRIMARY, textAnchor='end'))
        d.add(Rect(bar_x, y, bar_max, bar_h, fillColor=LIGHT_BG, strokeColor=None))
        bw = (value / 100) * bar_max
        d.add(Rect(bar_x, y, bw, bar_h, fillColor=score_color(value), strokeColor=None))
        d.add(String(bar_x + bar_max + 8, y + 5, f"{value}%",
                     fontSize=9, fontName='Helvetica-Bold',
                     fillColor=TEXT_PRIMARY, textAnchor='start'))
    return d


def create_big_stat_row(stats, width=460):
    """Create a row of big statistics. stats = [(number, caption), ...]"""
    d = Drawing(width, 80)
    n = len(stats)
    cell_w = width / n
    for i, (num, caption) in enumerate(stats):
        cx = cell_w * i + cell_w / 2
        d.add(String(cx, 50, str(num), fontSize=32, fontName='Helvetica-Bold',
                     fillColor=HIGHLIGHT, textAnchor='middle'))
        d.add(String(cx, 30, caption, fontSize=9, fontName='Helvetica',
                     fillColor=TEXT_SECONDARY, textAnchor='middle'))
    return d


# ============================================================
# HEADER / FOOTER FACTORY
# ============================================================
def make_header_footer(doc_title):
    def header_footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(ACCENT)
        canvas.setLineWidth(2)
        canvas.line(50, PAGE_H - 40, PAGE_W - 50, PAGE_H - 40)
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(TEXT_SECONDARY)
        canvas.drawString(50, PAGE_H - 35, doc_title)
        canvas.setStrokeColor(lightgrey)
        canvas.setLineWidth(0.5)
        canvas.line(50, 40, PAGE_W - 50, 40)
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(TEXT_SECONDARY)
        canvas.drawString(50, 28, DATE_STR)
        canvas.drawRightString(PAGE_W - 50, 28, f"Page {doc.page}")
        canvas.drawCentredString(PAGE_W / 2, 28, "Confidential")
        canvas.restoreState()
    return header_footer


def build_doc(filename, doc_title):
    doc = SimpleDocTemplate(
        filename, pagesize=letter,
        topMargin=55, bottomMargin=55, leftMargin=50, rightMargin=50,
    )
    return doc, make_header_footer(doc_title)


# ============================================================
# COVER PAGE BUILDER
# ============================================================
def build_cover(elements, styles, title, subtitle, meta_lines=None):
    elements.append(Spacer(1, 120))
    elements.append(Paragraph(title, styles['DocTitle']))
    elements.append(Spacer(1, 8))
    elements.append(Paragraph(subtitle, styles['DocSubtitle']))
    elements.append(HRFlowable(width="100%", thickness=2, color=ACCENT, spaceAfter=20))
    if meta_lines:
        for line in meta_lines:
            elements.append(Paragraph(line, styles['CoverMeta']))
    elements.append(Spacer(1, 30))


def section(elements, styles, title):
    elements.append(Paragraph(title, styles['SectionHead']))
    elements.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=12))


def subsection(elements, styles, title):
    elements.append(Paragraph(title, styles['SubHead']))


def sub2(elements, styles, title):
    elements.append(Paragraph(title, styles['SubHead2']))


def body(elements, styles, text):
    elements.append(Paragraph(text, styles['Body']))


def body_large(elements, styles, text):
    elements.append(Paragraph(text, styles['BodyLarge']))


def bullet(elements, styles, text):
    elements.append(Paragraph(f"\u2022  {text}", styles['Bullet']))


def callout(elements, styles, text):
    elements.append(Paragraph(text, styles['Callout']))


def spacer(elements, h=12):
    elements.append(Spacer(1, h))


def page_break(elements):
    elements.append(PageBreak())


# ============================================================
# PDF 1: GEO SYSTEM OVERVIEW
# ============================================================
def generate_overview(output_dir):
    fname = os.path.join(output_dir, "GEO-System-Overview.pdf")
    doc, hf = build_doc(fname, "GEO System Overview")
    styles = build_styles()
    el = []

    # Cover
    build_cover(el, styles, "Generative Engine\nOptimization", "A Complete System for AI Search Visibility", [
        f"Version 1.0  |  {DATE_STR}",
        "White-Label Reference Document",
    ])

    # Big stats
    el.append(create_big_stat_row([
        ("2B+", "AI Overview Users/Mo"),
        ("800M", "ChatGPT Searches/Wk"),
        ("2-7", "Domains Cited/Query"),
        ("47%", "Brands Without GEO"),
    ]))
    page_break(el)

    # Section 1: The Paradigm Shift
    section(el, styles, "1. The Paradigm Shift")
    body_large(el, styles,
        "Search is no longer about ranking in a list of links. It is about being "
        "<b>cited as part of the answer itself</b>. AI-powered search engines "
        "now serve over 2 billion users monthly, and they cite only 2-7 domains "
        "per response. The question is no longer <i>\"Are we on page one?\"</i> "
        "but <i>\"Are we in the answer?\"</i>")
    spacer(el)
    body(el, styles,
        "Traditional SEO optimized for search engine rankings. Generative Engine "
        "Optimization (GEO) optimizes for AI citation and recommendation. The two "
        "disciplines overlap but have distinct requirements. Sites that score high "
        "on GEO metrics see <b>30-115% more visibility</b> in AI-generated responses.")
    spacer(el)
    callout(el, styles,
        "<b>New Primary Metric: Share of Model (SoM)</b> &mdash; How often your brand "
        "appears in AI-generated responses versus competitors. This replaces traditional "
        "\"share of voice\" in the AI search era.")
    spacer(el)

    # Key statistics table
    subsection(el, styles, "Evidence: What Drives AI Citations")
    stats_data = [
        ["Signal", "Impact", "Source"],
        ["Fact-to-word ratio > 1:80", "4.2x more likely cited by ChatGPT", "Incremys"],
        ["Statistics in content", "30-40% higher AI visibility", "Profound"],
        ["Semantic completeness > 8.5/10", "4.2x more cited in AI Overviews", "Wellows"],
        ["Clean H1>H2>H3 hierarchy", "2.8x more likely to be cited", "Incremys"],
        ["Strong E-E-A-T at rank #6-10", "2.3x more cited than weak #1", "Wellows"],
        ["Topic clusters + interlinking", "30% higher citation rates", "Wellows"],
        ["Domain Authority correlation", "r=0.18 (collapsed)", "Wellows"],
    ]
    t = Table(stats_data, colWidths=[180, 190, 90])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)
    body(el, styles,
        "<i>Key insight: Traditional domain authority has collapsed to just r=0.18 correlation "
        "with AI citations. Entity authority, E-E-A-T signals, and content structure now "
        "determine whether AI systems cite your content.</i>")
    page_break(el)

    # Section 2: The 6 GEO Dimensions
    section(el, styles, "2. The Six GEO Dimensions")
    body(el, styles,
        "Our GEO scoring system evaluates websites across six weighted dimensions, "
        "producing a composite score from 0-100:")
    spacer(el)

    dims_data = [
        ["Dimension", "Weight", "What It Measures"],
        ["AI Citability", "25%", "How quotable and extractable content is for AI systems"],
        ["Brand Authority", "20%", "Third-party mentions, entity recognition, review signals"],
        ["Content E-E-A-T", "20%", "Experience, Expertise, Authoritativeness, Trustworthiness"],
        ["Technical GEO", "15%", "AI crawler access, rendering, speed, llms.txt"],
        ["Schema & Structured Data", "10%", "JSON-LD markup quality and completeness"],
        ["Platform Optimization", "10%", "Presence on platforms AI models cite from"],
    ]
    t = Table(dims_data, colWidths=[130, 50, 280])
    t.setStyle(make_table_style(ACCENT))
    el.append(t)
    spacer(el)

    # Score interpretation
    interp_data = [
        ["Score", "Rating", "Interpretation"],
        ["90-100", "Excellent", "Top-tier GEO; highly likely to be cited by AI"],
        ["75-89", "Good", "Strong foundation with room for improvement"],
        ["60-74", "Fair", "Moderate presence; significant opportunities exist"],
        ["40-59", "Poor", "Weak signals; AI systems struggle to cite"],
        ["0-39", "Critical", "Largely invisible to AI search systems"],
    ]
    t = Table(interp_data, colWidths=[60, 80, 320])
    ts = make_table_style()
    ts.add('TEXTCOLOR', (1, 1), (1, 1), SUCCESS)
    ts.add('TEXTCOLOR', (1, 2), (1, 2), INFO)
    ts.add('TEXTCOLOR', (1, 3), (1, 3), WARNING)
    ts.add('TEXTCOLOR', (1, 4), (1, 4), DANGER)
    ts.add('TEXTCOLOR', (1, 5), (1, 5), DANGER)
    t.setStyle(ts)
    el.append(t)
    page_break(el)

    # Section 3: AI Platform Landscape
    section(el, styles, "3. The AI Search Platform Landscape")
    body(el, styles,
        "Each AI platform has distinct citation behaviors. Understanding these differences "
        "is critical to effective GEO strategy:")
    spacer(el)

    plat_data = [
        ["Platform", "Sources/Query", "Top Cited Domain", "Key Behavior"],
        ["ChatGPT", "~8", "Wikipedia (7.8%)", "Encyclopedic, factual, authoritative"],
        ["Perplexity", "~22", "Reddit (6.6%)", "Community-driven, recency-focused"],
        ["Google AI Overviews", "Varies", "Balanced mix", "Existing rank + E-E-A-T"],
        ["Gemini", "Varies", "Google ecosystem", "YouTube integration, structured data"],
        ["Bing Copilot", "Varies", "Bing index", "IndexNow responsive, commercial intent"],
    ]
    t = Table(plat_data, colWidths=[110, 75, 115, 160])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)
    callout(el, styles,
        "<b>Cross-platform reality:</b> .com domains account for 80.41% of all AI citations. "
        "Only 44% of citations come from owned websites; 48% come from community platforms "
        "(Reddit, YouTube, forums). Your off-site presence matters as much as your website.")
    page_break(el)

    # Section 4: The GEO Framework
    section(el, styles, "4. The Four-Phase GEO Framework")
    body(el, styles,
        "Our system follows a continuous four-phase cycle derived from search intelligence "
        "best practices:")
    spacer(el)

    phases = [
        ("1. ASSESS", "Baseline citation audit across all AI platforms. Technical crawlability "
         "analysis. Brand perception mapping. Competitive gap identification. Produces a "
         "composite GEO score with category breakdowns."),
        ("2. OPTIMIZE", "Content restructuring for AI citability. Entity authority building. "
         "Technical foundation improvements (schema, crawlers, llms.txt). "
         "Cross-platform presence expansion."),
        ("3. MEASURE", "Citation frequency tracking. Share of Model monitoring. Citation "
         "sentiment analysis. AI-referred traffic attribution via GA4. Platform-specific "
         "visibility scoring."),
        ("4. ITERATE", "Identify high-performing content for expansion. Repurpose across "
         "formats (blog, video, social). Build cross-functional workflows. Refresh "
         "cadence optimization."),
    ]
    for title, desc in phases:
        subsection(el, styles, title)
        body(el, styles, desc)
    spacer(el)
    body(el, styles,
        "<i>Foundation work (schema, content restructuring) takes 4-8 weeks. Authority "
        "building takes 3-6 months. Measurable citation improvements appear within "
        "90 days of systematic optimization.</i>")
    page_break(el)

    # Section 5: Why Now
    section(el, styles, "5. Why Now")
    body_large(el, styles,
        "The window of opportunity is closing. Currently <b>47% of brands</b> lack any "
        "deliberate GEO strategy. Early movers establish entity authority that compounds "
        "over time, making it progressively harder for competitors to catch up.")
    spacer(el)
    bullet(el, styles, "<b>AI referral traffic to SMBs grew +123%</b> in recent months (HubSpot)")
    bullet(el, styles, "<b>59% of ChatGPT searches</b> involve local intent")
    bullet(el, styles, "<b>31% of Gen Z</b> use AI platforms as their primary search tool")
    bullet(el, styles, "Mid-market brands invest <b>$75k-$150k/year</b> on GEO optimization")
    bullet(el, styles, "Enterprise brands invest <b>$250k+</b> annually")
    spacer(el)
    callout(el, styles,
        "The shift from link equity to citation authority is not a trend; it is a structural "
        "change in how information is discovered and consumed. Organizations that adapt now "
        "will define the competitive landscape for the next decade.")

    # Build
    doc.build(el, onFirstPage=hf, onLaterPages=hf)
    return fname


# ============================================================
# PDF 2: GEO SALES DECK
# ============================================================
def generate_sales_deck(output_dir):
    fname = os.path.join(output_dir, "GEO-Sales-Deck.pdf")
    doc, hf = build_doc(fname, "GEO Sales Deck")
    styles = build_styles()
    el = []

    # Cover
    build_cover(el, styles, "Is Your Business\nVisible to AI?",
        "How Generative Engine Optimization Drives Revenue in the AI Search Era", [
        f"{DATE_STR}  |  Confidential",
    ])
    el.append(create_big_stat_row([
        ("2B+", "Monthly AI Search Users"),
        ("2-7", "Sites Cited Per Query"),
        ("+123%", "AI Traffic Growth (SMBs)"),
    ]))
    page_break(el)

    # The Problem
    section(el, styles, "The Problem")
    body_large(el, styles,
        "Your customers are asking AI for recommendations. If your business is not "
        "in the answer, you are invisible to a growing majority of search traffic.")
    spacer(el)
    body(el, styles,
        "AI-powered search engines (Google AI Overviews, ChatGPT, Perplexity, Gemini) "
        "now serve billions of users. Unlike traditional search, they do not show 10 blue links. "
        "They synthesize a single answer, citing only <b>2-7 sources</b>. If you are not one "
        "of those sources, you receive zero traffic from that query.")
    spacer(el)
    callout(el, styles,
        "Traditional SEO is not enough. A site can rank #1 on Google and still be "
        "<b>completely absent</b> from AI-generated answers. Domain authority (DA) now has "
        "only a 0.18 correlation with AI citations. The rules have changed.")
    page_break(el)

    # The Solution
    section(el, styles, "The Solution: GEO")
    body(el, styles,
        "Generative Engine Optimization (GEO) is a systematic approach to making your "
        "business <b>discoverable, understandable, and citable</b> by AI search systems. "
        "Our proprietary 6-dimension audit and optimization framework targets the specific "
        "signals that AI platforms use to select sources.")
    spacer(el)

    dims = [
        ("AI Citability", 25), ("Brand Authority", 20), ("Content E-E-A-T", 20),
        ("Technical GEO", 15), ("Schema", 10), ("Platform Optimization", 10),
    ]
    el.append(create_horizontal_bars([(d[0], d[1] * 4) for d in dims]))
    spacer(el)
    body(el, styles,
        "<i>Each dimension is scored 0-100, producing a weighted composite GEO score "
        "that benchmarks your AI search readiness.</i>")
    page_break(el)

    # Case Study
    section(el, styles, "Case Study: Local Business Transformation")
    body(el, styles,
        "A family-owned pool and spa business in the Twin Cities, MN metro area "
        "migrated from Wix to a GEO-optimized platform. Results after implementation:")
    spacer(el)

    # Before/After visual
    d = Drawing(USABLE_W, 130)
    # Before ring
    d.add(create_score_ring(35, "BEFORE", DANGER, 100, 75, r=42))
    # Arrow
    ax = USABLE_W / 2
    d.add(Rect(ax - 30, 68, 60, 12, fillColor=SUCCESS, strokeColor=None))
    d.add(Polygon([ax + 30, 55, ax + 30, 93, ax + 55, 74],
                   fillColor=SUCCESS, strokeColor=None))
    d.add(String(ax, 48, "+91% improvement", fontSize=10,
                 fontName='Helvetica-Bold', fillColor=SUCCESS, textAnchor='middle'))
    # After ring
    d.add(create_score_ring(67, "AFTER (Phase 1)", INFO, USABLE_W - 100, 75, r=42))
    el.append(d)
    spacer(el)

    case_data = [
        ["Metric", "Before (Wix)", "After (GEO)", "Change"],
        ["GEO Composite Score", "35/100", "67/100", "+91%"],
        ["Schema Types", "0", "7", "+7 types"],
        ["AI Crawler Access", "0 of 9", "9 of 9", "Full access"],
        ["Blog/Educational Content", "None", "3 articles", "New"],
        ["Gallery with Alt Text", "None", "13 images", "New"],
        ["Structured Product Data", "None", "15 products", "New"],
        ["Review Schema", "None", "6 reviews + aggregate", "New"],
    ]
    t = Table(case_data, colWidths=[140, 90, 100, 80])
    ts = make_table_style()
    ts.add('TEXTCOLOR', (3, 1), (3, -1), SUCCESS)
    t.setStyle(ts)
    el.append(t)
    spacer(el)

    body(el, styles,
        "Phase 2 implementation (additional schema wiring, blog expansion, gallery) "
        "projects to push the score to <b>80-83/100 (Good)</b> within 90 days.")
    page_break(el)

    # What You Get
    section(el, styles, "What You Get")
    items = [
        ("Comprehensive GEO Audit", "6-dimension analysis across all AI platforms with composite scoring, "
         "severity-classified findings, and platform readiness ratings."),
        ("Prioritized Action Plan", "Quick wins (this week), medium-term improvements (this month), and "
         "strategic initiatives (this quarter) organized by impact and effort."),
        ("Schema & Structured Data", "Complete JSON-LD implementation covering LocalBusiness, Service, Product, "
         "Review, FAQ, HowTo, Article, and Person schemas."),
        ("Content Optimization", "Blog infrastructure, educational content, and content restructuring "
         "for maximum AI citability and E-E-A-T signals."),
        ("Technical Infrastructure", "AI crawler access configuration, llms.txt, sitemap optimization, "
         "and rendering improvements for AI system compatibility."),
        ("Measurement Framework", "Ongoing citation tracking, Share of Model monitoring, and "
         "AI-referred traffic attribution setup."),
    ]
    for title, desc in items:
        subsection(el, styles, title)
        body(el, styles, desc)
    page_break(el)

    # ROI
    section(el, styles, "The ROI of GEO")
    body(el, styles,
        "GEO is not a cost center; it is a competitive moat that compounds over time:")
    spacer(el)
    bullet(el, styles, "AI referral traffic to small businesses grew <b>+123%</b> in recent months")
    bullet(el, styles, "Pages with strong E-E-A-T at rank #6-10 get cited <b>2.3x more</b> than #1 pages with weak authority")
    bullet(el, styles, "Content with fact density > 1:80 is <b>4.2x more likely</b> to be cited")
    bullet(el, styles, "Foundation work produces measurable results within <b>90 days</b>")
    bullet(el, styles, "Entity authority compounds: early movers create barriers to competitor entry")
    spacer(el)
    callout(el, styles,
        "<b>The opportunity window is now.</b> 47% of brands lack any GEO strategy. "
        "Those who act first establish the entity authority and citation patterns "
        "that AI systems will reference for years to come.")
    page_break(el)

    # Investment
    section(el, styles, "Investment Tiers")
    tier_data = [
        ["Tier", "Scope", "Timeline", "Ideal For"],
        ["Foundation", "GEO audit + quick wins + schema", "4-8 weeks", "Businesses new to GEO"],
        ["Growth", "Foundation + content strategy + blog", "3-6 months", "Businesses ready to invest"],
        ["Authority", "Growth + cross-platform + PR + ongoing", "6-12 months", "Market leadership goals"],
    ]
    t = Table(tier_data, colWidths=[70, 160, 80, 150])
    t.setStyle(make_accent_table_style())
    el.append(t)
    spacer(el)
    body(el, styles,
        "<i>Industry benchmarks: Mid-market brands invest $75k-$150k/year on GEO. "
        "Enterprise brands invest $250k+ annually. Our system delivers enterprise-grade "
        "methodology at accessible price points.</i>")
    spacer(el, 30)

    # CTA
    callout(el, styles,
        "<b>Next Step:</b> Request a complimentary GEO audit of your website. "
        "See exactly where you stand, what your competitors are doing, and what "
        "it would take to get your business into the AI answer.")

    doc.build(el, onFirstPage=hf, onLaterPages=hf)
    return fname


# ============================================================
# PDF 3: GEO METHODOLOGY GUIDE
# ============================================================
def generate_methodology(output_dir):
    fname = os.path.join(output_dir, "GEO-Methodology-Guide.pdf")
    doc, hf = build_doc(fname, "GEO Methodology Guide")
    styles = build_styles()
    el = []

    # Cover
    build_cover(el, styles, "GEO Methodology\nGuide",
        "Complete Audit Framework, Scoring System & Platform Strategies", [
        f"Version 1.0  |  {DATE_STR}",
        "For clients, partners, and technical practitioners",
    ])
    page_break(el)

    # TOC
    section(el, styles, "Contents")
    toc = [
        "1. Audit Workflow Overview",
        "2. AI Citability Analysis (25%)",
        "3. Brand Authority Assessment (20%)",
        "4. Content E-E-A-T Evaluation (20%)",
        "5. Technical GEO Infrastructure (15%)",
        "6. Schema & Structured Data (10%)",
        "7. Platform Optimization (10%)",
        "8. Platform-Specific Strategies",
        "9. The E-E-A-T Revolution",
        "10. Content Strategy for Citations",
        "11. Measurement & Tools",
    ]
    for item in toc:
        body(el, styles, item)
    page_break(el)

    # 1. Audit Workflow
    section(el, styles, "1. Audit Workflow Overview")
    body(el, styles,
        "The GEO audit follows a three-phase process: Discovery, Parallel Analysis, "
        "and Score Aggregation.")
    spacer(el)

    subsection(el, styles, "Phase 1: Discovery & Reconnaissance")
    bullet(el, styles, "Fetch homepage, detect business type (SaaS, Local, E-commerce, Publisher, Agency)")
    bullet(el, styles, "Crawl sitemap (up to 50 pages, prioritized by navigation hierarchy)")
    bullet(el, styles, "Collect page-level data: headings, word count, schema, links, images, meta tags")
    bullet(el, styles, "Respect robots.txt; 30-second timeout per page; 1-second delay between fetches")
    spacer(el)

    subsection(el, styles, "Phase 2: Parallel Analysis")
    body(el, styles,
        "Five specialized analysis modules run in parallel, each producing a category "
        "score (0-100) with detailed findings:")
    spacer(el)

    modules_data = [
        ["Module", "Focus", "Key Metrics"],
        ["Citability Analyzer", "AI quotability", "Passage self-containment, answer blocks, stat density"],
        ["Brand Analyzer", "Entity recognition", "YouTube, Reddit, Wikipedia, LinkedIn presence"],
        ["Technical Analyzer", "Crawler access", "robots.txt, llms.txt, rendering, meta tags"],
        ["Content Analyzer", "E-E-A-T signals", "Author bios, credentials, freshness, depth"],
        ["Schema Analyzer", "Structured data", "JSON-LD types, completeness, validation"],
    ]
    t = Table(modules_data, colWidths=[110, 100, 250])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Phase 3: Score Aggregation")
    body(el, styles,
        "The composite GEO score is computed as a weighted average:")
    spacer(el)
    callout(el, styles,
        "<b>GEO Score</b> = (Citability x 0.25) + (Brand x 0.20) + (E-E-A-T x 0.20) "
        "+ (Technical x 0.15) + (Schema x 0.10) + (Platform x 0.10)")
    page_break(el)

    # 2. AI Citability
    section(el, styles, "2. AI Citability Analysis (25%)")
    body(el, styles,
        "This dimension measures how likely AI systems are to extract and cite passages "
        "from your content. It carries the highest weight because citation is the "
        "fundamental unit of GEO success.")
    spacer(el)

    subsection(el, styles, "What Gets Measured")
    bullet(el, styles, "<b>Passage self-containment:</b> Can a paragraph answer a question on its own?")
    bullet(el, styles, "<b>Answer block quality:</b> Are direct answers placed in the first 200-300 words?")
    bullet(el, styles, "<b>Statistical density:</b> Fact-to-word ratio (target > 1:80)")
    bullet(el, styles, "<b>Heading hierarchy:</b> Clean H1>H2>H3 structure (2.8x citation boost)")
    bullet(el, styles, "<b>FAQ sections:</b> Question-answer pairs AI engines extract heavily")
    spacer(el)

    subsection(el, styles, "Optimization Targets")
    bullet(el, styles, "Optimal passage length for citation: <b>134-167 words</b>")
    bullet(el, styles, "Lead every section with a clear, concise answer (inverted pyramid)")
    bullet(el, styles, "Include TL;DR statements so sections stand alone as answers")
    bullet(el, styles, "Use precise statistics: \"15%\" beats \"about 15%\"")
    bullet(el, styles, "Original/proprietary data is the <b>#1 citation magnet</b>")
    page_break(el)

    # 3. Brand Authority
    section(el, styles, "3. Brand Authority Assessment (20%)")
    body(el, styles,
        "AI systems need to trust an entity before citing it. Brand authority measures "
        "how recognizable and trustworthy your brand is across the platforms AI models "
        "draw from.")
    spacer(el)

    subsection(el, styles, "Signals Evaluated")
    bullet(el, styles, "<b>Wikipedia/Wikidata presence:</b> Wikipedia accounts for 7.8% of ChatGPT citations")
    bullet(el, styles, "<b>Reddit mentions:</b> Reddit dominates Perplexity (6.6% of citations)")
    bullet(el, styles, "<b>YouTube presence:</b> #2 cited source on Google AI Overviews (18.8%)")
    bullet(el, styles, "<b>LinkedIn company profile:</b> Professional authority signal")
    bullet(el, styles, "<b>Review volume and velocity:</b> Active reviews signal living, trusted business")
    bullet(el, styles, "<b>Cross-platform NAP consistency:</b> Character-for-character match everywhere")
    spacer(el)

    subsection(el, styles, "Key Insight")
    callout(el, styles,
        "AI engines favor <b>earned media</b> (third-party coverage, reviews, industry mentions) "
        "over brand-owned content. A mention in a Reddit thread or YouTube review carries more "
        "citation weight than a page on your own website.")
    page_break(el)

    # 4. Content E-E-A-T
    section(el, styles, "4. Content E-E-A-T Evaluation (20%)")
    body(el, styles,
        "Experience, Expertise, Authoritativeness, and Trustworthiness are the quality "
        "signals that differentiate citable content from noise.")
    spacer(el)

    eeat_data = [
        ["Signal", "What AI Looks For", "Implementation"],
        ["Experience", "First-hand knowledge", "Case studies, project photos, real examples"],
        ["Expertise", "Demonstrated skill", "Author credentials, certifications, detailed how-tos"],
        ["Authoritativeness", "Recognition by others", "Awards, press, third-party mentions, reviews"],
        ["Trustworthiness", "Verifiable accuracy", "Sources cited, real data, transparent business info"],
    ]
    t = Table(eeat_data, colWidths=[90, 160, 210])
    t.setStyle(make_accent_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Author Authority")
    body(el, styles,
        "Named experts with structured author bios and Person schema are significantly "
        "more likely to be cited. Anonymous content underperforms. Every piece of "
        "educational content should have a named, credentialed author.")
    page_break(el)

    # 5. Technical GEO
    section(el, styles, "5. Technical GEO Infrastructure (15%)")
    body(el, styles,
        "If AI crawlers cannot access your content, nothing else matters. Technical GEO "
        "ensures your site is crawlable, renderable, and machine-readable.")
    spacer(el)

    subsection(el, styles, "AI Crawler Access")
    crawler_data = [
        ["Crawler", "Platform", "Priority"],
        ["GPTBot", "ChatGPT / OpenAI", "Tier 1 (Critical)"],
        ["ClaudeBot", "Claude / Anthropic", "Tier 1 (Critical)"],
        ["PerplexityBot", "Perplexity AI", "Tier 1 (Critical)"],
        ["Google-Extended", "Gemini / Google AI", "Tier 1 (Critical)"],
        ["Bingbot", "Bing Copilot", "Tier 1 (Critical)"],
        ["Amazonbot", "Alexa / Amazon", "Tier 2"],
        ["Bytespider", "TikTok", "Tier 2"],
        ["ChatGPT-User", "ChatGPT Browsing", "Tier 2"],
        ["cohere-ai", "Cohere", "Tier 2"],
    ]
    t = Table(crawler_data, colWidths=[120, 160, 130])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "llms.txt")
    body(el, styles,
        "An emerging standard that helps AI systems understand your site structure. "
        "While 8/9 studied sites saw no measurable change, it remains a low-cost "
        "investment. Best practice: limit to 10-20 high-value pages, update quarterly.")
    spacer(el)

    subsection(el, styles, "Additional Technical Factors")
    bullet(el, styles, "Server-side rendering (SSR) for all public content pages")
    bullet(el, styles, "Sub-3-second page load time")
    bullet(el, styles, "Valid canonical URLs and no duplicate content")
    bullet(el, styles, "IndexNow protocol for Bing/Copilot indexing speed")
    page_break(el)

    # 6. Schema
    section(el, styles, "6. Schema & Structured Data (10%)")
    body(el, styles,
        "Google's May 2025 guidance explicitly recommends JSON-LD for AI content. "
        "Schema has evolved from a nice-to-have to <b>critical infrastructure</b> "
        "that acts as connective tissue between websites and AI agents.")
    spacer(el)

    schema_data = [
        ["Schema Type", "Purpose", "Priority"],
        ["LocalBusiness", "Business identity, NAP, hours", "Essential"],
        ["Organization", "Corporate entity recognition", "Essential"],
        ["FAQPage", "Q&A pairs AI engines extract", "Essential"],
        ["Service", "Service offerings with descriptions", "High"],
        ["Product", "Product data with pricing", "High"],
        ["Review + aggregateRating", "Social proof and trust signals", "High"],
        ["Article", "Blog/content with author attribution", "High"],
        ["HowTo", "Step-by-step processes", "Medium"],
        ["Person", "Author credentials and expertise", "Medium"],
        ["ContactPoint", "Contact information structure", "Medium"],
        ["BreadcrumbList", "Site navigation hierarchy", "Standard"],
    ]
    t = Table(schema_data, colWidths=[140, 210, 80])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)
    body(el, styles,
        "Schema contributes approximately <b>10% of Perplexity's ranking factors</b> (Qwairy). "
        "While the direct weight is moderate, schema enables AI systems to understand "
        "entity relationships that influence all other dimensions.")
    page_break(el)

    # 7. Platform Optimization
    section(el, styles, "7. Platform Optimization (10%)")
    body(el, styles,
        "Only 44% of AI citations come from owned websites. 48% come from community "
        "platforms. Your presence on the platforms AI models cite from is essential.")
    spacer(el)

    platforms = [
        ("YouTube", "18.8% of top 10 on Google AI Overviews; 13.9% on Perplexity"),
        ("Reddit", "46.7% of Perplexity's top 10 cited sources; community trust signal"),
        ("Wikipedia", "47.9% of ChatGPT's top 10; entity recognition foundation"),
        ("LinkedIn", "Professional authority; 1.3% of Google AI Overviews"),
        ("Houzz / Yelp / BBB", "Industry-specific platforms for local business authority"),
    ]
    for name, desc in platforms:
        sub2(el, styles, name)
        body(el, styles, desc)
    page_break(el)

    # 8. Platform-Specific Strategies
    section(el, styles, "8. Platform-Specific Strategies")

    subsection(el, styles, "Optimizing for ChatGPT")
    bullet(el, styles, "Prioritize encyclopedic, factual content with dense statistics")
    bullet(el, styles, "\"Best X\" blog lists account for 43.8% of all cited page types")
    bullet(el, styles, "Wikipedia presence is the strongest single signal (47.9% of top 10)")
    bullet(el, styles, "Authoritative tone with source citations")
    spacer(el)

    subsection(el, styles, "Optimizing for Perplexity")
    bullet(el, styles, "Community presence (Reddit, forums) is the dominant signal")
    bullet(el, styles, "Recency matters: Perplexity favors recently published content")
    bullet(el, styles, "YouTube content is heavily cited (13.9% of top 10)")
    bullet(el, styles, "2.76x more sources per query than ChatGPT (broader citation)")
    spacer(el)

    subsection(el, styles, "Optimizing for Google AI Overviews")
    bullet(el, styles, "Existing search rankings still matter (but E-E-A-T amplifies weak positions)")
    bullet(el, styles, "Balanced mix of social and professional signals")
    bullet(el, styles, "YouTube is #2 cited source (18.8% of top 10)")
    bullet(el, styles, "Schema markup directly influences content understanding")
    page_break(el)

    # 9. E-E-A-T Revolution
    section(el, styles, "9. The E-E-A-T Revolution")
    body(el, styles,
        "The single most important shift in the GEO era: <b>entity authority has replaced "
        "domain authority</b>. Traditional DA has collapsed to just r=0.18 correlation "
        "with AI citations. What matters now:")
    spacer(el)

    rev_data = [
        ["Old Signal", "New Signal", "Why"],
        ["Domain Authority (DA)", "Entity Recognition", "AI needs to identify you as a known concept"],
        ["Backlink quantity", "Cross-platform presence", "NAP consistency across all platforms"],
        ["Anchor text optimization", "Earned media coverage", "Third-party trust > self-promotion"],
        ["Keyword density", "Author credentials", "Named experts with Person schema"],
        ["Link building campaigns", "Review velocity", "Active reviews signal living business"],
        ["Content length", "Verifiable claims", "AI systems must trust before citing"],
    ]
    t = Table(rev_data, colWidths=[130, 130, 200])
    t.setStyle(make_accent_table_style())
    el.append(t)
    spacer(el)
    callout(el, styles,
        "<b>Critical insight:</b> Pages ranking #6-10 with strong E-E-A-T get cited "
        "<b>2.3x more often</b> than #1 pages with weak authority. You do not need to "
        "outrank the competition; you need to out-trust them.")
    page_break(el)

    # 10. Content Strategy
    section(el, styles, "10. Content Strategy for AI Citations")

    subsection(el, styles, "What Gets Cited Most")
    items = [
        ("<b>Original/proprietary data</b> &mdash; First-party research is the #1 citation magnet", ""),
        ("<b>Precise statistics</b> &mdash; \"15%\" beats \"about 15%\"", ""),
        ("<b>FAQ content</b> &mdash; All AI engines heavily leverage Q&A pairs", ""),
        ("<b>Direct answers first</b> &mdash; Place response in first 200-300 words", ""),
        ("<b>Entity specificity</b> &mdash; Name + service + location in content", ""),
        ("<b>\"Best X\" lists</b> &mdash; 43.8% of ChatGPT cited page types", ""),
    ]
    for text, _ in items:
        bullet(el, styles, text)
    spacer(el)

    subsection(el, styles, "Content Structure Best Practices")
    bullet(el, styles, "Lead with clear, concise answer (inverted pyramid)")
    bullet(el, styles, "Clean H2/H3 hierarchy signals passage topics to AI systems")
    bullet(el, styles, "TL;DR statements so sections stand alone as answers")
    bullet(el, styles, "Include FAQ sections on every page")
    bullet(el, styles, "\"Last updated\" timestamps for freshness signals")
    bullet(el, styles, "Topic clusters with interlinking (30% higher citation rates)")
    page_break(el)

    # 11. Measurement
    section(el, styles, "11. Measurement & Tools")
    body(el, styles,
        "GEO measurement requires new tools and metrics beyond traditional SEO analytics:")
    spacer(el)

    tools_data = [
        ["Tool/Metric", "Purpose", "Category"],
        ["Share of Model (SoM)", "Brand frequency in AI responses", "Primary KPI"],
        ["Siftly", "AI citation tracking across platforms", "Citation Monitoring"],
        ["Gauge", "Share of Model measurement", "Citation Monitoring"],
        ["Profound", "Citation pattern analysis", "Research"],
        ["Qwairy", "Provider citation behavior studies", "Research"],
        ["GA4 (AI referral)", "AI-referred traffic attribution", "Traffic Analytics"],
        ["Manual testing", "ChatGPT + Perplexity query monitoring", "Ongoing QA"],
    ]
    t = Table(tools_data, colWidths=[130, 200, 130])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Key Performance Indicators")
    bullet(el, styles, "<b>Citation frequency:</b> How often AI cites your content per relevant query")
    bullet(el, styles, "<b>Share of Model:</b> Your brand's share of AI-generated responses vs competitors")
    bullet(el, styles, "<b>Citation sentiment:</b> How positively AI presents your brand")
    bullet(el, styles, "<b>AI-referred traffic:</b> Sessions from AI platforms (track in GA4)")
    bullet(el, styles, "<b>Entity recognition:</b> Whether AI correctly identifies your brand and attributes")

    doc.build(el, onFirstPage=hf, onLaterPages=hf)
    return fname


# ============================================================
# PDF 4: GEO TECHNICAL REFERENCE
# ============================================================
def generate_technical_reference(output_dir):
    fname = os.path.join(output_dir, "GEO-Technical-Reference.pdf")
    doc, hf = build_doc(fname, "GEO Technical Reference")
    styles = build_styles()
    el = []

    # Cover
    build_cover(el, styles, "GEO Technical\nReference",
        "Complete System Documentation, Scoring Formulas & Research Data", [
        f"Version 1.0  |  {DATE_STR}",
        "Internal technical documentation",
        "Based on 14 primary research sources",
    ])
    page_break(el)

    # TOC
    section(el, styles, "Contents")
    toc = [
        "1. System Architecture",
        "2. Scoring Formulas & Weights",
        "3. Audit Module Specifications",
        "4. Issue Severity Classification",
        "5. Business Type Detection",
        "6. Citation Statistics Database",
        "7. Platform Citation Behavior (Detailed)",
        "8. Schema Implementation Guide",
        "9. Local Business GEO Playbook",
        "10. Strategic Shifts (SEO to GEO)",
        "11. Investment Benchmarks",
        "12. Research Sources",
    ]
    for item in toc:
        body(el, styles, item)
    page_break(el)

    # 1. System Architecture
    section(el, styles, "1. System Architecture")
    body(el, styles,
        "The GEO audit system consists of an orchestration layer and five specialized "
        "analysis modules that run in parallel for performance.")
    spacer(el)

    arch_data = [
        ["Component", "Function", "Dependencies"],
        ["Orchestrator", "Page crawling, data collection, score aggregation", "All modules"],
        ["Citability Module", "Content block analysis, quotability scoring", "Page data"],
        ["Brand Module", "Cross-platform presence scanning", "WebSearch, WebFetch"],
        ["Technical Module", "robots.txt, llms.txt, headers, rendering", "Page data"],
        ["Content Module", "E-E-A-T signal evaluation", "Page data"],
        ["Schema Module", "JSON-LD detection, validation, gap analysis", "Page data"],
    ]
    t = Table(arch_data, colWidths=[110, 220, 130])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Data Flow")
    body(el, styles,
        "1. Orchestrator fetches homepage, detects business type, crawls sitemap (max 50 pages)<br/>"
        "2. Page-level data collected: URL, title, meta, headings, word count, schema, links, images<br/>"
        "3. Five modules analyze data in parallel, each producing score (0-100) + findings<br/>"
        "4. Orchestrator computes weighted composite score<br/>"
        "5. Issues classified by severity (Critical/High/Medium/Low)<br/>"
        "6. Report generated with scores, findings, and prioritized action plan")
    page_break(el)

    # 2. Scoring Formulas
    section(el, styles, "2. Scoring Formulas & Weights")

    subsection(el, styles, "Composite Score Formula")
    callout(el, styles,
        "<b>GEO_Score</b> = (Citability x 0.25) + (Brand x 0.20) + (EEAT x 0.20) "
        "+ (Technical x 0.15) + (Schema x 0.10) + (Platform x 0.10)")
    spacer(el)

    subsection(el, styles, "Weight Rationale")
    weight_data = [
        ["Dimension", "Weight", "Rationale"],
        ["AI Citability", "25%", "Citation is the fundamental output. Content that cannot be cited fails at GEO regardless of other signals."],
        ["Brand Authority", "20%", "Entity recognition determines whether AI trusts a source enough to cite. High-E-E-A-T at #6-10 beats weak #1 (2.3x)."],
        ["Content E-E-A-T", "20%", "Quality signals (author credentials, verifiable claims, depth) are the gatekeeper for citation selection."],
        ["Technical GEO", "15%", "Crawler access is a prerequisite. If AI cannot crawl, nothing else matters. But once accessible, diminishing returns."],
        ["Schema", "10%", "Schema contributes ~10% of Perplexity ranking. Critical but enables understanding rather than directly driving citations."],
        ["Platform", "10%", "Off-site presence matters (48% of citations from community platforms) but is slower to influence."],
    ]
    t = Table(weight_data, colWidths=[90, 45, 325])
    t.setStyle(make_table_style(ACCENT))
    el.append(t)
    spacer(el)

    subsection(el, styles, "Score Thresholds")
    thresh_data = [
        ["Range", "Label", "Color Code", "Action Required"],
        ["90-100", "Excellent", "Green", "Maintain and iterate"],
        ["75-89", "Good", "Blue", "Targeted improvements"],
        ["60-74", "Fair", "Blue", "Significant optimization needed"],
        ["40-59", "Poor", "Yellow", "Major restructuring required"],
        ["0-39", "Critical", "Red", "Fundamental rebuild needed"],
    ]
    t = Table(thresh_data, colWidths=[60, 80, 80, 240])
    ts = make_table_style()
    ts.add('TEXTCOLOR', (1, 1), (1, 1), SUCCESS)
    ts.add('TEXTCOLOR', (1, 2), (1, 2), INFO)
    ts.add('TEXTCOLOR', (1, 3), (1, 3), INFO)
    ts.add('TEXTCOLOR', (1, 4), (1, 4), WARNING)
    ts.add('TEXTCOLOR', (1, 5), (1, 5), DANGER)
    t.setStyle(ts)
    el.append(t)
    page_break(el)

    # 3. Audit Module Specs
    section(el, styles, "3. Audit Module Specifications")

    modules = [
        ("3.1 Citability Module", [
            "Analyzes content blocks for AI quotability",
            "Scores passage self-containment (can it answer a question standalone?)",
            "Measures statistical density (fact-to-word ratio, target > 1:80)",
            "Evaluates answer block quality (direct answers in first 200-300 words)",
            "Checks heading hierarchy (H1>H2>H3 structure)",
            "Identifies high-value pages that could be reformatted for better citation",
            "Optimal citation passage length: 134-167 words",
        ]),
        ("3.2 Brand Module", [
            "Scans YouTube for brand presence and video content",
            "Checks Reddit for brand mentions (subreddit activity, comments)",
            "Searches Wikipedia/Wikidata for entity presence",
            "Evaluates LinkedIn company profile completeness",
            "Assesses third-party mention volume and sentiment",
            "Measures cross-platform NAP (Name, Address, Phone) consistency",
            "Evaluates review volume and velocity across platforms",
        ]),
        ("3.3 Technical Module", [
            "Analyzes robots.txt for AI crawler access (9 crawlers, 2 tiers)",
            "Checks for llms.txt presence, validity, and completeness",
            "Verifies server-side rendering for all public content",
            "Tests page load speed (<3 seconds target)",
            "Checks meta tags, canonical URLs, Open Graph, Twitter Cards",
            "Validates HTTP headers for security and caching",
            "Tests IndexNow protocol support",
        ]),
        ("3.4 Content Module", [
            "Evaluates Experience signals (case studies, real examples, photos)",
            "Measures Expertise indicators (author credentials, certifications, how-tos)",
            "Assesses Authoritativeness (awards, press, third-party mentions, reviews)",
            "Checks Trustworthiness (source citations, real data, transparent business info)",
            "Evaluates content freshness (publication and update dates)",
            "Measures content depth (word count, topic coverage, comprehensiveness)",
            "Checks author attribution and Person schema",
        ]),
        ("3.5 Schema Module", [
            "Detects all JSON-LD schema types present on each page",
            "Validates schema against schema.org specifications",
            "Identifies missing schema opportunities by business type",
            "Checks for essential types: Organization/LocalBusiness, FAQ, Article",
            "Evaluates schema completeness (required vs optional properties)",
            "Checks for Product schema with pricing and availability",
            "Validates Review and aggregateRating markup",
        ]),
    ]

    for title, items in modules:
        subsection(el, styles, title)
        for item in items:
            bullet(el, styles, item)
        spacer(el)
    page_break(el)

    # 4. Issue Severity
    section(el, styles, "4. Issue Severity Classification")

    sev_data = [
        ["Severity", "Timeline", "Examples"],
        ["Critical", "Fix immediately", "All AI crawlers blocked; no indexable content; site errors on key pages; no structured data; brand unrecognized"],
        ["High", "Fix within 1 week", "Key crawlers blocked; no llms.txt; zero Q&A content; missing Org schema; no author attribution; content behind paywall"],
        ["Medium", "Fix within 1 month", "Partial crawler blocking; incomplete llms.txt; low citability scores; missing FAQ schema; thin author bios; no Wikipedia presence"],
        ["Low", "When possible", "Minor schema errors; some missing alt text; content freshness issues; missing OG tags; suboptimal headings; incomplete LinkedIn"],
    ]
    t = Table(sev_data, colWidths=[60, 90, 310])
    ts = make_table_style()
    ts.add('TEXTCOLOR', (0, 1), (0, 1), DANGER)
    ts.add('FONTNAME', (0, 1), (0, 1), 'Helvetica-Bold')
    ts.add('TEXTCOLOR', (0, 2), (0, 2), WARNING)
    ts.add('FONTNAME', (0, 2), (0, 2), 'Helvetica-Bold')
    ts.add('TEXTCOLOR', (0, 3), (0, 3), INFO)
    ts.add('FONTNAME', (0, 3), (0, 3), 'Helvetica-Bold')
    ts.add('TEXTCOLOR', (0, 4), (0, 4), TEXT_SECONDARY)
    ts.add('FONTNAME', (0, 4), (0, 4), 'Helvetica-Bold')
    t.setStyle(ts)
    el.append(t)
    page_break(el)

    # 5. Business Type Detection
    section(el, styles, "5. Business Type Detection")
    body(el, styles,
        "The audit automatically classifies websites to apply business-type-specific "
        "scoring adjustments and recommendations.")
    spacer(el)

    btype_data = [
        ["Type", "Detection Signals", "Key Schema", "Extra Weight On"],
        ["SaaS", "Pricing page, sign up CTAs, app subdomain", "SoftwareApplication, FAQ, HowTo", "Feature comparison, docs, integrations"],
        ["Local Business", "Physical address, Maps embed, service areas", "LocalBusiness, GeoCoordinates, Hours", "NAP consistency, GBP, local schema"],
        ["E-commerce", "Product listings, cart, prices", "Product, AggregateRating, Offer", "Product descriptions, buying guides"],
        ["Publisher", "Blog-heavy nav, article schema, archives", "Article, NewsArticle, Person", "Author credentials, original research"],
        ["Agency", "Case studies, portfolio, client logos", "Organization, Service, Person", "Thought leadership, case study depth"],
    ]
    t = Table(btype_data, colWidths=[65, 130, 130, 135])
    t.setStyle(make_table_style())
    el.append(t)
    page_break(el)

    # 6. Citation Statistics
    section(el, styles, "6. Citation Statistics Database")
    body(el, styles,
        "Compiled from 14 primary research sources. All statistics have been verified "
        "across at least two independent sources where possible.")
    spacer(el)

    stats = [
        ["Statistic", "Value", "Source", "Confidence"],
        ["Fact-to-word ratio > 1:80 citation boost", "4.2x", "Incremys", "High"],
        ["Statistics in content visibility boost", "30-40%", "Profound", "High"],
        ["Semantic completeness > 8.5/10 boost", "4.2x", "Wellows", "High"],
        ["H1>H2>H3 hierarchy citation boost", "2.8x", "Incremys", "High"],
        ["Strong E-E-A-T at rank #6-10 vs weak #1", "2.3x", "Wellows", "High"],
        ["Topic clusters citation rate boost", "30%", "Wellows", "Medium"],
        ["AI referral traffic growth (SMBs)", "+123%", "HubSpot", "High"],
        ["Schema in Perplexity ranking", "~10%", "Qwairy", "Medium"],
        ["Domain Authority correlation w/ AI", "r=0.18", "Wellows", "High"],
        ["ChatGPT sources per query", "~8", "Qwairy", "High"],
        ["Perplexity sources per query", "~22", "Qwairy", "High"],
        ["Wikipedia in ChatGPT top 10", "47.9%", "Profound", "High"],
        ["Reddit in Perplexity top 10", "46.7%", "Profound", "High"],
        [".com domains in all citations", "80.41%", "Profound", "High"],
        ["Citations from owned sites", "44%", "Profound", "High"],
        ["Citations from community platforms", "48%", "Profound", "High"],
        ["ChatGPT searches with local intent", "59%", "HubSpot", "Medium"],
        ["Gen Z using AI as primary search", "31%", "HubSpot", "Medium"],
        ["GBP photos engagement boost", "35%", "HubSpot", "Medium"],
        ["Consumers using review-responsive biz", "88%", "HubSpot", "Medium"],
        ["Brands without GEO strategy", "47%", "Foundation Inc", "Medium"],
    ]
    t = Table(stats, colWidths=[200, 60, 100, 70])
    t.setStyle(make_table_style())
    el.append(t)
    page_break(el)

    # 7. Platform Citation Behavior
    section(el, styles, "7. Platform Citation Behavior (Detailed)")

    subsection(el, styles, "ChatGPT")
    chatgpt_data = [
        ["Metric", "Value"],
        ["Sources per query", "~8"],
        ["Top cited domain", "Wikipedia (7.8% of all citations)"],
        ["Wikipedia in top 10", "47.9%"],
        ["Most cited page type", "\"Best X\" blog lists (43.8%)"],
        ["Content preference", "Encyclopedic, factual, authoritative"],
        ["Domain type distribution", ".com (80.41%), .org (11.29%)"],
    ]
    t = Table(chatgpt_data, colWidths=[150, 310])
    t.setStyle(make_accent_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Perplexity")
    perp_data = [
        ["Metric", "Value"],
        ["Sources per query", "~22 (2.76x more than ChatGPT)"],
        ["Top cited domain", "Reddit (6.6% of all citations)"],
        ["Reddit in top 10", "46.7%"],
        ["YouTube in top 10", "13.9%"],
        ["Content preference", "Community-driven, recency-focused"],
        ["Key differentiator", "Broader citation (22 vs 8 sources)"],
    ]
    t = Table(perp_data, colWidths=[150, 310])
    t.setStyle(make_accent_table_style())
    el.append(t)
    spacer(el)

    subsection(el, styles, "Google AI Overviews")
    gaio_data = [
        ["Metric", "Value"],
        ["Citation mix", "Balanced social-professional"],
        ["Reddit presence", "2.2% of citations"],
        ["YouTube presence", "1.9% (but 18.8% of top 10)"],
        ["Quora presence", "1.5%"],
        ["LinkedIn presence", "1.3%"],
        ["Key factor", "Existing ranking + E-E-A-T signals"],
    ]
    t = Table(gaio_data, colWidths=[150, 310])
    t.setStyle(make_accent_table_style())
    el.append(t)
    page_break(el)

    # 8. Schema Implementation
    section(el, styles, "8. Schema Implementation Guide")
    body(el, styles,
        "Complete JSON-LD schema implementation reference for GEO-optimized websites. "
        "All schema should be embedded as <code>&lt;script type=\"application/ld+json\"&gt;</code> "
        "in the page head.")
    spacer(el)

    schema_ref = [
        ["Schema Type", "Required Properties", "GEO Impact"],
        ["LocalBusiness", "name, address, telephone, openingHours, geo, url, sameAs", "Entity recognition, NAP consistency"],
        ["Organization", "name, url, logo, sameAs, contactPoint", "Brand entity identity"],
        ["FAQPage", "mainEntity[].name, mainEntity[].acceptedAnswer", "Direct Q&A extraction by AI"],
        ["Service", "name, description, provider, areaServed", "Service-specific AI citations"],
        ["Product", "name, description, offers.price, brand", "Product comparison citations"],
        ["Review", "author, reviewBody, reviewRating", "Trust and social proof signals"],
        ["AggregateRating", "ratingValue, reviewCount, bestRating", "Summarized trust at a glance"],
        ["Article", "headline, author, datePublished, publisher", "Content attribution and freshness"],
        ["HowTo", "name, step[].name, step[].text", "Process/tutorial AI extraction"],
        ["Person", "name, jobTitle, worksFor, sameAs", "Author authority and E-E-A-T"],
        ["ContactPoint", "telephone, email, contactType, areaServed", "Contact accessibility signal"],
        ["BreadcrumbList", "itemListElement[].name, .item", "Navigation hierarchy understanding"],
    ]
    t = Table(schema_ref, colWidths=[100, 200, 160])
    t.setStyle(make_table_style())
    el.append(t)
    page_break(el)

    # 9. Local Business Playbook
    section(el, styles, "9. Local Business GEO Playbook")
    body(el, styles,
        "Local businesses have unique GEO opportunities. 59% of ChatGPT searches "
        "involve local intent, and local businesses can dominate geographic queries "
        "more easily than national competitors.")
    spacer(el)

    subsection(el, styles, "Priority Actions")
    local_actions = [
        ["Priority", "Action", "Impact", "Timeline"],
        ["#1", "Claim/optimize Google Business Profile (all locations)", "Highest single factor", "Week 1"],
        ["#2", "Launch review campaign (target 50+ Google reviews)", "Trust + velocity signal", "Weeks 1-8"],
        ["#3", "Cross-platform NAP consistency (Houzz, Yelp, BBB, Angi)", "Entity recognition", "Week 2"],
        ["#4", "Add photos to GBP (35% more engagement)", "Visual trust signal", "Week 2"],
        ["#5", "Respond to all reviews (88% consumer preference)", "Active business signal", "Ongoing"],
        ["#6", "Create location-specific content pages", "Geographic entity signals", "Weeks 3-4"],
        ["#7", "YouTube channel with project walkthroughs", "#2 cited source on AI Overviews", "Month 2"],
        ["#8", "Reddit/community presence (local subreddits)", "Perplexity citation source", "Month 2"],
        ["#9", "Local digital PR (newspaper features, industry pubs)", "Earned media trust", "Months 2-6"],
        ["#10", "Author page with Person schema for owner/experts", "E-E-A-T authority signal", "Week 3"],
    ]
    t = Table(local_actions, colWidths=[45, 230, 110, 75])
    t.setStyle(make_table_style(ACCENT))
    el.append(t)
    spacer(el)

    callout(el, styles,
        "<b>Timeline expectations:</b> Initial traction in 4-8 weeks. Foundation work (schema, "
        "content) in 4-8 weeks. Authority building (cross-platform) in 3-6 months. "
        "Measurable citation improvements within 90 days.")
    page_break(el)

    # 10. Strategic Shifts
    section(el, styles, "10. Strategic Shifts: SEO to GEO")
    body(el, styles,
        "The transition from traditional SEO to GEO represents five fundamental shifts "
        "in how digital visibility is achieved:")
    spacer(el)

    shifts_data = [
        ["SEO Era", "GEO Era", "Implication"],
        ["Link equity", "Citation authority", "Third-party mentions outweigh backlinks"],
        ["Keyword rankings", "Answer inclusion", "Success = being the cited source in AI responses"],
        ["Single platform (Google)", "Multi-engine optimization", "Must optimize for ChatGPT, Google AI, Perplexity, Claude, Copilot"],
        ["Content marketing", "Digital PR as core lever", "Earned media directly influences AI citation patterns"],
        ["Static content", "Content refresh cadence", "Regular updates with data signal active authority"],
    ]
    t = Table(shifts_data, colWidths=[110, 130, 220])
    t.setStyle(make_accent_table_style())
    el.append(t)
    page_break(el)

    # 11. Investment Benchmarks
    section(el, styles, "11. Investment Benchmarks")

    invest_data = [
        ["Category", "Investment Range", "Timeline"],
        ["Foundation work (schema, content restructuring)", "Varies by scope", "4-8 weeks"],
        ["Mid-market GEO program (annual)", "$75k-$150k/year", "Ongoing"],
        ["Enterprise GEO program (annual)", "$250k+/year", "Ongoing"],
        ["Authority building (cross-platform presence)", "Varies", "3-6 months"],
        ["Measurable citation improvements", "N/A", "Within 90 days"],
    ]
    t = Table(invest_data, colWidths=[230, 120, 110])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el)
    body(el, styles,
        "<i>47% of brands still lack a deliberate GEO strategy, creating a significant "
        "first-mover advantage for organizations that invest now.</i>")
    page_break(el)

    # 12. Sources
    section(el, styles, "12. Research Sources")
    body(el, styles,
        "All data in this reference is sourced from the following 14 primary sources, "
        "researched February 2026:")
    spacer(el)

    sources = [
        ["#", "Source", "Topic"],
        ["1", "SearchEngineLand", "Mastering GEO 2026 (comprehensive guide)"],
        ["2", "Profound", "AI Platform Citation Patterns (data study)"],
        ["3", "HubSpot", "GEO for Small Business (SMB focus)"],
        ["4", "Firebrand Marketing", "GEO Best Practices 2026"],
        ["5", "Go Fish Digital", "GEO Strategies"],
        ["6", "SchemaApp", "AI Search and Schema Markup"],
        ["7", "Hook Agency", "Brand Authority in AI Search"],
        ["8", "Wellows", "AI Overviews Ranking Factors (data study)"],
        ["9", "Averi", "Track AI Citations (metrics guide)"],
        ["10", "Qwairy", "Perplexity vs ChatGPT Citation Study"],
        ["11", "Foundation Inc", "GEO Metrics"],
        ["12", "ALM Corp", "Schema Markup 2026"],
        ["13", "Revved Digital", "E-E-A-T and AI Search 2026"],
        ["14", "LinkBuildingHQ", "llms.txt evaluation"],
    ]
    t = Table(sources, colWidths=[25, 120, 315])
    t.setStyle(make_table_style())
    el.append(t)
    spacer(el, 30)

    el.append(HRFlowable(width="100%", thickness=0.5, color=lightgrey, spaceAfter=8))
    body(el, styles,
        "<i>This technical reference document is based on automated analysis, industry "
        "research, and verified data sources. Statistics should be revalidated periodically "
        "as the AI search landscape evolves rapidly.</i>")

    doc.build(el, onFirstPage=hf, onLaterPages=hf)
    return fname


# ============================================================
# MAIN
# ============================================================
def main():
    output_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    os.makedirs(output_dir, exist_ok=True)

    print(f"Generating GEO System PDF Suite to: {output_dir}/")
    print()

    f1 = generate_overview(output_dir)
    size1 = os.path.getsize(f1) / 1024
    print(f"  1. {os.path.basename(f1):40s} {size1:6.0f} KB")

    f2 = generate_sales_deck(output_dir)
    size2 = os.path.getsize(f2) / 1024
    print(f"  2. {os.path.basename(f2):40s} {size2:6.0f} KB")

    f3 = generate_methodology(output_dir)
    size3 = os.path.getsize(f3) / 1024
    print(f"  3. {os.path.basename(f3):40s} {size3:6.0f} KB")

    f4 = generate_technical_reference(output_dir)
    size4 = os.path.getsize(f4) / 1024
    print(f"  4. {os.path.basename(f4):40s} {size4:6.0f} KB")

    total = size1 + size2 + size3 + size4
    print(f"\n  Total: {total:.0f} KB across 4 PDFs")
    print("\nDone.")


if __name__ == "__main__":
    main()
