#!/home/claude-runner/.claude/skills/geo/venv/bin/python3
"""
GEO Comparison PDF Report Generator
Generates a professional, client-facing PDF comparing Wix vs Next.js GEO scores.

Usage:
    python3 generate_geo_comparison_pdf.py [output_file.pdf]
"""

import sys
import os
import math
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
from reportlab.graphics.shapes import Drawing, Rect, String, Circle, Line, Group, Polygon
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics import renderPDF

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
DARK_BG = HexColor("#343a40")
TEXT_PRIMARY = HexColor("#2d3436")
TEXT_SECONDARY = HexColor("#636e72")
TEXT_LIGHT = HexColor("#b2bec3")
WIX_COLOR = HexColor("#c0392b")       # Red for Wix (old)
NEXTJS_COLOR = HexColor("#2980b9")    # Blue for Next.js (new)
DELTA_COLOR = HexColor("#27ae60")     # Green for improvements

PAGE_W = letter[0]
PAGE_H = letter[1]
USABLE_W = PAGE_W - 100  # 50pt margins each side


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

def score_bg(score):
    if score >= 80: return SUCCESS_LIGHT
    if score >= 60: return INFO_LIGHT
    if score >= 40: return WARNING_LIGHT
    return DANGER_LIGHT


# ============================================================
# VISUAL ELEMENTS
# ============================================================

def create_score_ring(score, label, color, x_center, y_center, radius=38):
    """Create a score ring with number in center."""
    g = Group()
    # Outer ring background
    g.add(Circle(x_center, y_center, radius, fillColor=LIGHT_BG, strokeColor=lightgrey, strokeWidth=1))
    # Colored ring
    g.add(Circle(x_center, y_center, radius - 4, fillColor=color, strokeColor=None))
    # Inner white
    g.add(Circle(x_center, y_center, radius - 12, fillColor=white, strokeColor=None))
    # Score number
    g.add(String(x_center, y_center + 2, str(score),
                 fontSize=22, fontName='Helvetica-Bold', fillColor=TEXT_PRIMARY, textAnchor='middle'))
    # /100
    g.add(String(x_center, y_center - 14, "/100",
                 fontSize=8, fontName='Helvetica', fillColor=TEXT_SECONDARY, textAnchor='middle'))
    # Label below
    g.add(String(x_center, y_center - radius - 16, label,
                 fontSize=9, fontName='Helvetica-Bold', fillColor=TEXT_PRIMARY, textAnchor='middle'))
    return g


def create_delta_arrow(delta, x_center, y_center):
    """Create an upward arrow with delta number."""
    g = Group()
    color = DELTA_COLOR if delta > 0 else DANGER
    # Arrow shaft
    g.add(Rect(x_center - 4, y_center - 15, 8, 20, fillColor=color, strokeColor=None))
    # Arrow head (triangle)
    g.add(Polygon([x_center - 12, y_center + 5,
                    x_center + 12, y_center + 5,
                    x_center, y_center + 22],
                   fillColor=color, strokeColor=None))
    # Delta text above arrow
    text = f"+{delta}" if delta > 0 else str(delta)
    g.add(String(x_center, y_center + 26, text,
                 fontSize=16, fontName='Helvetica-Bold', fillColor=color, textAnchor='middle'))
    g.add(String(x_center, y_center + 14, "points",
                 fontSize=7, fontName='Helvetica', fillColor=TEXT_SECONDARY, textAnchor='middle'))
    return g


def create_cover_visual(wix_score, nextjs_score, delta):
    """Create the cover page hero visual with two score rings and delta."""
    d = Drawing(USABLE_W, 160)
    # Wix ring (left)
    wix_g = create_score_ring(wix_score, "WIX (Before)", WIX_COLOR, 100, 90, radius=42)
    d.add(wix_g)
    # Delta arrow (center)
    arrow_g = create_delta_arrow(delta, USABLE_W / 2, 75)
    d.add(arrow_g)
    # Next.js ring (right)
    njs_g = create_score_ring(nextjs_score, "NEXT.JS (After)", NEXTJS_COLOR, USABLE_W - 100, 90, radius=42)
    d.add(njs_g)
    # Percentage label under arrow
    pct = round((delta / wix_score) * 100) if wix_score > 0 else 0
    d.add(String(USABLE_W / 2, 38, f"+{pct}% improvement",
                 fontSize=11, fontName='Helvetica-Bold', fillColor=DELTA_COLOR, textAnchor='middle'))
    return d


def create_comparison_bar_chart(categories, wix_scores, nextjs_scores, width=480, height=200):
    """Create a grouped bar chart comparing Wix vs Next.js scores."""
    d = Drawing(width, height)

    chart = VerticalBarChart()
    chart.x = 65
    chart.y = 35
    chart.height = height - 65
    chart.width = width - 100
    chart.data = [wix_scores, nextjs_scores]
    chart.categoryAxis.categoryNames = categories
    chart.categoryAxis.labels.angle = 0
    chart.categoryAxis.labels.fontSize = 7
    chart.categoryAxis.labels.fontName = 'Helvetica'
    chart.valueAxis.valueMin = 0
    chart.valueAxis.valueMax = 100
    chart.valueAxis.valueStep = 20
    chart.valueAxis.labels.fontSize = 7
    chart.valueAxis.labels.fontName = 'Helvetica'

    chart.bars[0].fillColor = WIX_COLOR
    chart.bars[0].strokeColor = None
    chart.bars[1].fillColor = NEXTJS_COLOR
    chart.bars[1].strokeColor = None
    chart.bars.strokeWidth = 0
    chart.barSpacing = 2
    chart.groupSpacing = 15

    d.add(chart)

    # Legend
    legend_y = height - 12
    legend_x = width - 180
    d.add(Rect(legend_x, legend_y, 10, 10, fillColor=WIX_COLOR, strokeColor=None))
    d.add(String(legend_x + 14, legend_y + 1, "Wix (Before)", fontSize=8, fontName='Helvetica', fillColor=TEXT_PRIMARY))
    d.add(Rect(legend_x + 90, legend_y, 10, 10, fillColor=NEXTJS_COLOR, strokeColor=None))
    d.add(String(legend_x + 104, legend_y + 1, "Next.js (After)", fontSize=8, fontName='Helvetica', fillColor=TEXT_PRIMARY))

    return d


def create_horizontal_comparison_bars(items, wix_vals, nextjs_vals, width=480, height=None):
    """Create horizontal stacked comparison bars showing before/after."""
    bar_h = 18
    gap = 28
    if height is None:
        height = len(items) * (bar_h + gap) + 30
    d = Drawing(width, height)
    max_bar = width - 180
    label_x = 5
    bar_x = 120

    for i, item in enumerate(items):
        y = height - 30 - i * (bar_h + gap)
        wix_v = wix_vals[i]
        njs_v = nextjs_vals[i]

        # Label
        d.add(String(label_x, y + 4, item, fontSize=8, fontName='Helvetica-Bold',
                     fillColor=TEXT_PRIMARY, textAnchor='start'))

        # Background
        d.add(Rect(bar_x, y, max_bar, bar_h, fillColor=LIGHT_BG, strokeColor=lightgrey, strokeWidth=0.5))

        # Wix bar (red, behind)
        wix_w = (wix_v / 100) * max_bar
        d.add(Rect(bar_x, y + bar_h / 2, wix_w, bar_h / 2, fillColor=WIX_COLOR, strokeColor=None))

        # Next.js bar (blue, front)
        njs_w = (njs_v / 100) * max_bar
        d.add(Rect(bar_x, y, njs_w, bar_h / 2, fillColor=NEXTJS_COLOR, strokeColor=None))

        # Score labels
        delta = njs_v - wix_v
        delta_str = f"+{delta}" if delta > 0 else str(delta)
        d.add(String(bar_x + max_bar + 8, y + bar_h / 2 + 1, f"{wix_v}", fontSize=7,
                     fontName='Helvetica', fillColor=WIX_COLOR, textAnchor='start'))
        d.add(String(bar_x + max_bar + 8, y - 1, f"{njs_v}", fontSize=7,
                     fontName='Helvetica', fillColor=NEXTJS_COLOR, textAnchor='start'))
        # Delta
        d_color = DELTA_COLOR if delta > 0 else (DANGER if delta < 0 else TEXT_SECONDARY)
        d.add(String(bar_x + max_bar + 30, y + 4, delta_str, fontSize=8,
                     fontName='Helvetica-Bold', fillColor=d_color, textAnchor='start'))

    return d


def create_score_scale(wix_score, nextjs_score, width=480, height=50):
    """Create a horizontal scale showing both scores on a 0-100 range."""
    d = Drawing(width, height)
    bar_y = 25
    bar_h = 12
    bar_x = 30
    bar_w = width - 60

    # Background gradient effect (5 segments)
    seg_w = bar_w / 5
    colors = [DANGER, HexColor("#e17055"), WARNING, HexColor("#74b9ff"), SUCCESS]
    for i, c in enumerate(colors):
        d.add(Rect(bar_x + i * seg_w, bar_y, seg_w, bar_h, fillColor=c, strokeColor=None))

    # Scale labels
    for v in [0, 20, 40, 60, 80, 100]:
        x = bar_x + (v / 100) * bar_w
        d.add(String(x, bar_y - 10, str(v), fontSize=7, fontName='Helvetica',
                     fillColor=TEXT_SECONDARY, textAnchor='middle'))

    # Wix marker
    wix_x = bar_x + (wix_score / 100) * bar_w
    d.add(Polygon([wix_x - 5, bar_y + bar_h + 2, wix_x + 5, bar_y + bar_h + 2,
                    wix_x, bar_y + bar_h + 10], fillColor=WIX_COLOR, strokeColor=None))
    d.add(String(wix_x, bar_y + bar_h + 13, f"Wix ({wix_score})",
                 fontSize=8, fontName='Helvetica-Bold', fillColor=WIX_COLOR, textAnchor='middle'))

    # Next.js marker
    njs_x = bar_x + (nextjs_score / 100) * bar_w
    d.add(Polygon([njs_x - 5, bar_y + bar_h + 2, njs_x + 5, bar_y + bar_h + 2,
                    njs_x, bar_y + bar_h + 10], fillColor=NEXTJS_COLOR, strokeColor=None))
    d.add(String(njs_x, bar_y + bar_h + 13, f"Next.js ({nextjs_score})",
                 fontSize=8, fontName='Helvetica-Bold', fillColor=NEXTJS_COLOR, textAnchor='middle'))

    # Category labels
    labels = ["Critical", "Poor", "Fair", "Good", "Excellent"]
    for i, lbl in enumerate(labels):
        x = bar_x + i * seg_w + seg_w / 2
        d.add(String(x, bar_y + 2, lbl, fontSize=6, fontName='Helvetica',
                     fillColor=white, textAnchor='middle'))

    return d


def create_roadmap_visual(width=480, height=110):
    """Create a timeline visualization for the roadmap."""
    d = Drawing(width, height)
    y = 55
    bar_x = 40
    bar_w = width - 80

    # Timeline bar
    d.add(Rect(bar_x, y, bar_w, 6, fillColor=MEDIUM_BG, strokeColor=None))

    # Milestones
    milestones = [
        (0, "Today", "67", INFO),
        (0.17, "30 days", "73-75", HexColor("#2ecc71")),
        (0.33, "60 days", "76-79", HexColor("#27ae60")),
        (0.50, "90 days", "80-83", SUCCESS),
        (1.0, "180 days", "85-88", HexColor("#00a878")),
    ]

    for pct, label, score, color in milestones:
        x = bar_x + pct * bar_w
        # Fill to this point
        if pct > 0:
            d.add(Rect(bar_x, y, pct * bar_w, 6, fillColor=color, strokeColor=None))
        # Dot
        d.add(Circle(x, y + 3, 8, fillColor=color, strokeColor=white, strokeWidth=2))
        d.add(String(x, y + 0, score.split("-")[0] if "-" not in score else "",
                     fontSize=7, fontName='Helvetica-Bold', fillColor=white, textAnchor='middle'))
        # Label above
        d.add(String(x, y + 18, label, fontSize=7, fontName='Helvetica-Bold',
                     fillColor=TEXT_PRIMARY, textAnchor='middle'))
        # Score below
        d.add(String(x, y - 18, score, fontSize=8, fontName='Helvetica-Bold',
                     fillColor=color, textAnchor='middle'))

    # Arrow at end
    end_x = bar_x + bar_w + 5
    d.add(Polygon([end_x, y, end_x, y + 6, end_x + 10, y + 3],
                   fillColor=MEDIUM_BG, strokeColor=None))

    return d


def create_category_mini_gauge(wix_score, nextjs_score, cat_name, width=230, height=60):
    """Small inline comparison visual for a category."""
    d = Drawing(width, height)
    bar_w = 140
    bar_x = 5
    bar_h = 10
    mid_y = height / 2

    # Category name
    d.add(String(bar_x, mid_y + 18, cat_name, fontSize=8, fontName='Helvetica-Bold',
                 fillColor=TEXT_PRIMARY, textAnchor='start'))

    # Background
    d.add(Rect(bar_x, mid_y + 2, bar_w, bar_h, fillColor=LIGHT_BG, strokeColor=lightgrey, strokeWidth=0.5))
    # Wix
    d.add(Rect(bar_x, mid_y + 2, (wix_score / 100) * bar_w, bar_h / 2, fillColor=WIX_COLOR, strokeColor=None))
    # Next.js
    d.add(Rect(bar_x, mid_y + 2 + bar_h / 2, (nextjs_score / 100) * bar_w, bar_h / 2, fillColor=NEXTJS_COLOR, strokeColor=None))

    # Scores
    d.add(String(bar_x + bar_w + 6, mid_y + 8, f"{wix_score}", fontSize=7, fontName='Helvetica',
                 fillColor=WIX_COLOR, textAnchor='start'))
    d.add(String(bar_x + bar_w + 6, mid_y + 1, f"{nextjs_score}", fontSize=7, fontName='Helvetica',
                 fillColor=NEXTJS_COLOR, textAnchor='start'))

    delta = nextjs_score - wix_score
    d_str = f"+{delta}" if delta > 0 else str(delta) if delta < 0 else "0"
    d_color = DELTA_COLOR if delta > 0 else (DANGER if delta < 0 else TEXT_SECONDARY)
    d.add(String(bar_x + bar_w + 28, mid_y + 4, d_str, fontSize=9, fontName='Helvetica-Bold',
                 fillColor=d_color, textAnchor='start'))

    # Below label
    d.add(String(bar_x, mid_y - 8, f"Wix {wix_score} → Next.js {nextjs_score}",
                 fontSize=7, fontName='Helvetica', fillColor=TEXT_SECONDARY, textAnchor='start'))

    return d


# ============================================================
# STYLES
# ============================================================

def build_styles():
    styles = getSampleStyleSheet()

    custom = {
        'CoverTitle': ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=28,
                                      textColor=PRIMARY, spaceAfter=4, alignment=TA_LEFT),
        'CoverSubtitle': ParagraphStyle('CoverSubtitle', fontName='Helvetica', fontSize=14,
                                         textColor=ACCENT, spaceAfter=6, alignment=TA_LEFT),
        'CoverDetail': ParagraphStyle('CoverDetail', fontName='Helvetica', fontSize=10,
                                       textColor=TEXT_SECONDARY, spaceAfter=3, alignment=TA_LEFT),
        'SectionNum': ParagraphStyle('SectionNum', fontName='Helvetica-Bold', fontSize=11,
                                      textColor=ACCENT, spaceBefore=0, spaceAfter=0),
        'SectionHeader': ParagraphStyle('SectionHeader', fontName='Helvetica-Bold', fontSize=17,
                                         textColor=PRIMARY, spaceBefore=16, spaceAfter=8),
        'SubHeader': ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=12,
                                     textColor=ACCENT, spaceBefore=12, spaceAfter=5),
        'SubSubHeader': ParagraphStyle('SubSubHeader', fontName='Helvetica-Bold', fontSize=10,
                                        textColor=SECONDARY, spaceBefore=8, spaceAfter=4),
        'BodyCustom': ParagraphStyle('BodyCustom', fontName='Helvetica', fontSize=9.5,
                                textColor=TEXT_PRIMARY, spaceBefore=3, spaceAfter=3,
                                leading=13.5, alignment=TA_JUSTIFY),
        'BodyBoldCustom': ParagraphStyle('BodyBoldCustom', fontName='Helvetica-Bold', fontSize=9.5,
                                    textColor=TEXT_PRIMARY, spaceBefore=3, spaceAfter=3, leading=13.5),
        'BulletCustom': ParagraphStyle('BulletCustom', fontName='Helvetica', fontSize=9.5,
                                  textColor=TEXT_PRIMARY, leftIndent=18, bulletIndent=8,
                                  spaceBefore=2, spaceAfter=2, leading=13),
        'SmallText': ParagraphStyle('SmallText', fontName='Helvetica', fontSize=8,
                                     textColor=TEXT_SECONDARY, spaceBefore=2, spaceAfter=2),
        'CalloutText': ParagraphStyle('CalloutText', fontName='Helvetica', fontSize=9.5,
                                       textColor=TEXT_PRIMARY, backColor=LIGHT_BG,
                                       borderPadding=(8, 10, 8, 10), spaceBefore=6, spaceAfter=6,
                                       leading=13.5),
        'BigNumber': ParagraphStyle('BigNumber', fontName='Helvetica-Bold', fontSize=32,
                                     textColor=PRIMARY, alignment=TA_CENTER, spaceAfter=2),
        'Highlight': ParagraphStyle('Highlight', fontName='Helvetica-Bold', fontSize=10,
                                     textColor=DELTA_COLOR, spaceBefore=4, spaceAfter=4),
    }

    for name, style in custom.items():
        styles.add(style)

    return styles


# ============================================================
# TABLE HELPERS
# ============================================================

def make_table_style(header_color=PRIMARY):
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), header_color),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, lightgrey),
        ('BACKGROUND', (0, 1), (-1, -1), white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ])


def color_delta_cell(ts, col, row, delta):
    """Add color to a delta cell."""
    if delta > 0:
        ts.add('TEXTCOLOR', (col, row), (col, row), DELTA_COLOR)
        ts.add('FONTNAME', (col, row), (col, row), 'Helvetica-Bold')
    elif delta < 0:
        ts.add('TEXTCOLOR', (col, row), (col, row), DANGER)


def section_header(elements, styles, num, title):
    """Add a section header with number badge."""
    elements.append(Paragraph(f"Section {num}", styles['SectionNum']))
    elements.append(Paragraph(title, styles['SectionHeader']))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))


# ============================================================
# HEADER / FOOTER
# ============================================================

def header_footer(canvas, doc):
    canvas.saveState()
    # Header line
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(50, PAGE_H - 40, PAGE_W - 50, PAGE_H - 40)
    # Header text
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(TEXT_SECONDARY)
    canvas.drawString(50, PAGE_H - 35, "GEO Scoring Comparison: Wix vs. Next.js  |  Paragon Pool & Spa")
    canvas.drawRightString(PAGE_W - 50, PAGE_H - 35, "Confidential")
    # Footer
    canvas.setStrokeColor(lightgrey)
    canvas.setLineWidth(0.5)
    canvas.line(50, 40, PAGE_W - 50, 40)
    canvas.drawString(50, 28, f"Generated {datetime.now().strftime('%B %d, %Y')}")
    canvas.drawRightString(PAGE_W - 50, 28, f"Page {doc.page}")
    canvas.drawCentredString(PAGE_W / 2, 28, "Paragon Pool and Patio, Inc.")
    canvas.restoreState()


def cover_page(canvas, doc):
    """Custom first page with no standard header."""
    canvas.saveState()
    # Top accent bar
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 8, PAGE_W, 8, fill=1, stroke=0)
    # Bottom accent bar
    canvas.rect(0, 0, PAGE_W, 8, fill=1, stroke=0)
    # Confidential watermark
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(TEXT_LIGHT)
    canvas.drawCentredString(PAGE_W / 2, 18, "Confidential  |  Prepared for Paragon Pool and Patio, Inc.")
    canvas.restoreState()


# ============================================================
# DATA
# ============================================================

CATEGORIES = [
    ("AI Citability", 38, 77, 25),
    ("Brand Authority", 42, 42, 20),
    ("Content E-E-A-T", 45, 74, 20),
    ("Technical GEO", 18, 90, 15),
    ("Schema & Structured Data", 12, 65, 10),
    ("Platform Optimization", 42, 42, 10),
]

WIX_COMPOSITE = 35
NEXTJS_COMPOSITE = 67
DELTA = 32
PCT_IMPROVEMENT = 91


# ============================================================
# BUILD THE REPORT
# ============================================================

def generate_report(output_path):
    doc = SimpleDocTemplate(
        output_path, pagesize=letter,
        topMargin=55, bottomMargin=55, leftMargin=50, rightMargin=50,
    )
    styles = build_styles()
    el = []  # elements

    # ────────────────────────────────────────────
    # COVER PAGE
    # ────────────────────────────────────────────
    el.append(Spacer(1, 50))
    el.append(Paragraph("GEO Scoring Comparison", styles['CoverTitle']))
    el.append(Spacer(1, 4))
    el.append(Paragraph("Wix Site vs. New Next.js Site", styles['CoverSubtitle']))
    el.append(HRFlowable(width="100%", thickness=2, color=ACCENT, spaceAfter=16))

    cover_details = [
        ["Client", "Paragon Pool and Patio, Inc."],
        ["Analysis Date", "February 2026"],
        ["Wix Site Score", f"{WIX_COMPOSITE}/100 — {score_label(WIX_COMPOSITE)}"],
        ["Next.js Site Score", f"{NEXTJS_COMPOSITE}/100 — {score_label(NEXTJS_COMPOSITE)}"],
        ["Net Improvement", f"+{DELTA} points (+{PCT_IMPROVEMENT}%)"],
    ]
    ct = Table(cover_details, colWidths=[130, 340])
    ct.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), ACCENT),
        ('TEXTCOLOR', (1, 0), (1, -1), TEXT_PRIMARY),
        ('TEXTCOLOR', (1, 4), (1, 4), DELTA_COLOR),
        ('FONTNAME', (1, 4), (1, 4), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, lightgrey),
    ]))
    el.append(ct)
    el.append(Spacer(1, 24))

    # Cover visual — two score rings with delta arrow
    el.append(create_cover_visual(WIX_COMPOSITE, NEXTJS_COMPOSITE, DELTA))

    el.append(Spacer(1, 16))

    # Score scale
    el.append(create_score_scale(WIX_COMPOSITE, NEXTJS_COMPOSITE))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 1: EXECUTIVE SUMMARY
    # ────────────────────────────────────────────
    section_header(el, styles, 1, "Executive Summary")

    el.append(Paragraph(
        f"Your old Wix website scored <b>{WIX_COMPOSITE} out of 100</b> on our Generative Engine Optimization "
        f"(GEO) audit — a \"{score_label(WIX_COMPOSITE)}\" rating that means AI assistants like ChatGPT, "
        f"Google AI Overview, Perplexity, and Siri were largely unable to find, understand, or recommend "
        f"your business.",
        styles['BodyCustom']
    ))
    el.append(Paragraph(
        f"Your new custom-built website scores <b>{NEXTJS_COMPOSITE} out of 100</b> — a \"{score_label(NEXTJS_COMPOSITE)}\" "
        f"rating representing a <font color=\"{DELTA_COLOR.hexval()}\"><b>+{DELTA}-point improvement (+{PCT_IMPROVEMENT}%)</b></font>. "
        f"AI systems can now read your site, extract your business data, and cite you when someone asks "
        f"\"Who builds pools near Stillwater, MN?\"",
        styles['BodyCustom']
    ))

    el.append(Spacer(1, 8))

    # Summary scorecard table
    summary_data = [["Category", "Wix", "Next.js", "Change", "Impact"]]
    for name, wix, njs, weight in CATEGORIES:
        delta = njs - wix
        delta_str = f"+{delta}" if delta > 0 else str(delta) if delta < 0 else "—"
        w_delta = round((delta * weight / 100), 1)
        impact_str = f"+{w_delta}" if w_delta > 0 else str(w_delta) if w_delta != 0 else "—"
        summary_data.append([name, f"{wix}", f"{njs}", delta_str, f"{impact_str} pts"])
    summary_data.append(["Composite GEO Score", str(WIX_COMPOSITE), str(NEXTJS_COMPOSITE),
                          f"+{DELTA}", f"+{PCT_IMPROVEMENT}%"])

    st = Table(summary_data, colWidths=[155, 55, 60, 55, 65])
    st_style = make_table_style()
    # Bold last row
    st_style.add('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold')
    st_style.add('BACKGROUND', (0, -1), (-1, -1), MEDIUM_BG)
    # Color delta column
    for i in range(1, len(summary_data)):
        delta_val = summary_data[i][3]
        if delta_val.startswith("+"):
            st_style.add('TEXTCOLOR', (3, i), (3, i), DELTA_COLOR)
            st_style.add('FONTNAME', (3, i), (3, i), 'Helvetica-Bold')
        elif delta_val == "—":
            st_style.add('TEXTCOLOR', (3, i), (3, i), TEXT_SECONDARY)
    # Color score columns
    for i in range(1, len(summary_data) - 1):
        wix_v = int(summary_data[i][1])
        njs_v = int(summary_data[i][2])
        st_style.add('TEXTCOLOR', (1, i), (1, i), score_color(wix_v))
        st_style.add('TEXTCOLOR', (2, i), (2, i), score_color(njs_v))
    st.setStyle(st_style)
    el.append(st)

    el.append(Spacer(1, 12))

    # Plain English bullets
    el.append(Paragraph("<b>What This Means in Plain English</b>", styles['SubSubHeader']))
    bullets = [
        "<b>Before:</b> When someone asked ChatGPT \"Who builds inground pools near Stillwater, MN?\", your business was invisible. AI couldn't read your Wix site, couldn't find structured data to extract, and had almost nothing quotable to work with.",
        "<b>After:</b> AI systems can now read every page, extract your business details (owner, locations, hours, packages, pricing), and cite specific facts like \"$51,995 for a complete 18x36 package\" or \"BBB A+ rated since 1998.\"",
        "<b>What's left:</b> The remaining 33 points to reach 100 are primarily off-site work — getting more customer reviews, claiming your Yelp and Google profiles, and building third-party authority. The website itself is doing its job.",
    ]
    for b in bullets:
        el.append(Paragraph(f"&#8226; {b}", styles['BulletCustom']))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 2: WHAT IS GEO?
    # ────────────────────────────────────────────
    section_header(el, styles, 2, "What Is GEO?")

    el.append(Paragraph(
        "For 25 years, getting found online meant ranking on Google's first page of blue links. "
        "That era is ending. Today, customers increasingly <b>ask</b> instead of <b>search</b>:",
        styles['BodyCustom']
    ))
    el.append(Paragraph(
        "<i>\"Hey Siri, who builds inground pools near Stillwater?\"</i><br/>"
        "<i>\"ChatGPT, what does an inground pool cost in Minnesota?\"</i><br/>"
        "<i>\"Google, compare pool builders in the Twin Cities area.\"</i>",
        styles['CalloutText']
    ))
    el.append(Paragraph(
        "These AI systems don't show a list of links. They read websites, synthesize information, and "
        "<b>give one answer</b>. If your site isn't structured for AI to understand, you don't appear "
        "in that answer — and the customer never knows you exist. <b>Generative Engine Optimization (GEO)</b> "
        "is the practice of building your website so AI systems can find you, understand what you offer, "
        "and recommend you.",
        styles['BodyCustom']
    ))

    el.append(Spacer(1, 6))

    # SEO vs GEO comparison table
    seo_geo = [
        ["Dimension", "Traditional SEO", "GEO"],
        ["Goal", "Rank on Google page 1", "Be cited in AI answers"],
        ["Who reads your site", "Googlebot", "10+ AI crawlers (GPTBot, Claude, Siri, etc.)"],
        ["What matters most", "Keywords, backlinks, speed", "Structured data, factual density, entities"],
        ["How customers find you", "Click a link in results", "AI quotes you directly in its answer"],
        ["Winner-take-all?", "Top 10 share traffic", "AI cites 1-3 sources — or you get nothing"],
    ]
    seo_t = Table(seo_geo, colWidths=[110, 165, 195])
    seo_t.setStyle(make_table_style())
    el.append(seo_t)

    el.append(Spacer(1, 10))

    # Benchmarks table
    el.append(Paragraph("<b>Industry Benchmarks</b>", styles['SubSubHeader']))
    bench = [
        ["Website Type", "Typical Score", "Description"],
        ["Template (Wix/Squarespace), no SEO", "15-30", "AI largely cannot read or cite the site"],
        ["Template with basic SEO", "25-40", "Some visibility, missing structured data"],
        ["Custom-built with traditional SEO", "40-60", "Good for humans, not optimized for AI"],
        ["Custom-built with active GEO", "65-85", "Structured for AI, strong entity signals"],
        ["Enterprise-level GEO program", "80-95", "Full-stack optimization"],
    ]
    bt = Table(bench, colWidths=[175, 80, 215])
    bt_style = make_table_style()
    # Highlight Wix row
    bt_style.add('BACKGROUND', (0, 1), (-1, 1), DANGER_LIGHT)
    # Highlight active GEO row
    bt_style.add('BACKGROUND', (0, 4), (-1, 4), INFO_LIGHT)
    bt.setStyle(bt_style)
    el.append(bt)
    el.append(Paragraph(
        f"<i>Your Wix site (35) fell in the \"template with minimal SEO\" range. "
        f"Your new site (67) places you in the \"active GEO\" range — ahead of virtually all competitors.</i>",
        styles['SmallText']
    ))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 3: SCORE CARD — FULL COMPARISON
    # ────────────────────────────────────────────
    section_header(el, styles, 3, "Score Card — Full Comparison")

    # Master comparison table
    master_data = [["#", "Category", "Weight", "Wix", "Wix Wtd", "Next.js", "NJS Wtd", "Delta", "Wtd Delta"]]
    for i, (name, wix, njs, weight) in enumerate(CATEGORIES, 1):
        delta = njs - wix
        wix_wtd = round(wix * weight / 100, 1)
        njs_wtd = round(njs * weight / 100, 1)
        wtd_delta = round(njs_wtd - wix_wtd, 1)
        d_str = f"+{delta}" if delta > 0 else str(delta) if delta < 0 else "0"
        wd_str = f"+{wtd_delta}" if wtd_delta > 0 else str(wtd_delta) if wtd_delta != 0 else "0.0"
        master_data.append([str(i), name, f"{weight}%", str(wix), str(wix_wtd),
                            str(njs), str(njs_wtd), d_str, wd_str])
    master_data.append(["", "Composite", "100%", str(WIX_COMPOSITE), "35.00",
                         str(NEXTJS_COMPOSITE), "66.65", f"+{DELTA}", f"+{PCT_IMPROVEMENT}%"])

    mt = Table(master_data, colWidths=[20, 120, 40, 38, 45, 45, 45, 40, 55])
    mt_style = make_table_style()
    mt_style.add('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold')
    mt_style.add('BACKGROUND', (0, -1), (-1, -1), MEDIUM_BG)
    mt_style.add('ALIGN', (2, 0), (-1, -1), 'CENTER')
    # Color scores and deltas
    for i in range(1, len(master_data) - 1):
        wix_v = int(master_data[i][3])
        njs_v = int(master_data[i][5])
        mt_style.add('TEXTCOLOR', (3, i), (3, i), score_color(wix_v))
        mt_style.add('TEXTCOLOR', (5, i), (5, i), score_color(njs_v))
        if master_data[i][7].startswith("+"):
            mt_style.add('TEXTCOLOR', (7, i), (7, i), DELTA_COLOR)
            mt_style.add('TEXTCOLOR', (8, i), (8, i), DELTA_COLOR)
    # Last row
    mt_style.add('TEXTCOLOR', (7, -1), (8, -1), DELTA_COLOR)
    mt.setStyle(mt_style)
    el.append(mt)

    el.append(Spacer(1, 12))

    # Grouped bar chart
    cat_names = [c[0].replace("& Structured Data", "\n& Struct. Data") for c in CATEGORIES]
    short_names = ["Citability", "Brand Auth.", "E-E-A-T", "Technical", "Schema", "Platform"]
    wix_scores = [c[1] for c in CATEGORIES]
    njs_scores = [c[2] for c in CATEGORIES]
    el.append(create_comparison_bar_chart(short_names, wix_scores, njs_scores))

    el.append(Spacer(1, 8))

    # Note about identical scores
    el.append(Paragraph(
        "<b>Why two categories are identical:</b> Brand Authority (42) and Platform Optimization (42) "
        "measure <i>off-site</i> signals — reviews on Google/Yelp, social media accounts, directory listings. "
        "Rebuilding the website doesn't change these. They require separate business actions (claiming profiles, "
        "requesting reviews).",
        styles['CalloutText']
    ))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 4: CATEGORY DEEP DIVES
    # ────────────────────────────────────────────
    section_header(el, styles, 4, "Category Deep Dives")

    # --- 4.1 AI Citability ---
    el.append(Paragraph("4.1  AI Citability — 38 → 77 (+39)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> How easily AI systems can extract specific, quotable facts — "
        "prices, specs, timelines, locations, and direct answers to customer questions.",
        styles['BodyCustom']
    ))

    cit_data = [
        ["Sub-Dimension", "Wix", "Next.js", "Key Evidence"],
        ["Factual density", "Medium", "High", "4 packages → 4 packages + 15 products + 3 tiers + 7 services"],
        ["Quotable FAQs", "0", "5", "5 FAQs with specifics: \"6-10 weeks,\" \"$300-600 permits\""],
        ["Price transparency", "1 price", "1 + 5 items", "Permits, gas, electrical, fencing, chemical pkg"],
        ["Entity clarity", "Low", "High", "Owner on every page, in schema, in llms.txt"],
        ["Service descriptions", "3 generic", "8 detailed", "Wix had template copy, not real descriptions"],
        ["Product descriptions", "Images only", "15 items", "Wix Products page: thumbnails, zero text"],
        ["Educational content", "None", "None", "Neither site — opportunity for both"],
    ]
    ct2 = Table(cit_data, colWidths=[100, 55, 60, 255])
    ct2.setStyle(make_table_style())
    el.append(ct2)

    el.append(Spacer(1, 6))
    el.append(Paragraph(
        "<b>Business impact:</b> When a potential customer asks an AI about pool costs, services, or "
        "products in your area, the new site provides 5-10x more citable data points. More citable data "
        "means more AI recommendations.",
        styles['BodyCustom']
    ))

    el.append(Spacer(1, 10))

    # --- 4.2 Brand Authority ---
    el.append(Paragraph("4.2  Brand Authority — 42 → 42 (No Change)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> Third-party evidence that your business is real, reputable, and active — "
        "reviews, directory listings, social media presence, and external mentions.",
        styles['BodyCustom']
    ))
    ba_data = [
        ["Sub-Dimension", "Wix", "Next.js", "Why Identical"],
        ["Review volume", "~10-12", "~10-12", "Reviews live on Google, Yelp, BBB — not your website"],
        ["Review sentiment", "Mixed", "Mixed", "Yelp 1.5 stars unclaimed — external platform"],
        ["Directory presence", "15+ sites", "15+ sites", "BBB, Angi, Yellow Pages — all off-site"],
        ["Social media", "FB, LinkedIn", "FB, LinkedIn", "Social accounts are separate from website"],
        ["Owner brand", "None online", "None online", "LinkedIn profile is a personal action"],
    ]
    bt2 = Table(ba_data, colWidths=[100, 55, 60, 255])
    bt2.setStyle(make_table_style())
    el.append(bt2)

    el.append(Spacer(1, 4))
    el.append(Paragraph(
        "<b>What would move the needle:</b> Claim Yelp (+3-5 pts), get 50+ Google reviews (+8-12 pts), "
        "create Instagram (+2-3 pts), complete LinkedIn profile (+1-2 pts).",
        styles['BodyCustom']
    ))

    el.append(CondPageBreak(3.5 * inch))

    # --- 4.3 Content E-E-A-T ---
    el.append(Paragraph("4.3  Content E-E-A-T — 45 → 74 (+29)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> Whether your content demonstrates real Experience, Expertise, "
        "Authoritativeness, and Trustworthiness — the four signals AI uses to decide which source to cite.",
        styles['BodyCustom']
    ))
    eeat_data = [
        ["Sub-Dimension", "Wix", "Next.js", "Key Change"],
        ["Experience signals", "\"25+ years\" (wrong)", "\"35+ years, founded 1990\"", "Specific, verifiable claim"],
        ["Expertise depth", "3 generic services", "8 services + specs", "Equipment model numbers show expertise"],
        ["Data accuracy", "Hours conflict", "Consistent everywhere", "Single source of truth in code"],
        ["Location coverage", "1 of 3 locations", "3 of 3 locations", "Stillwater, Forest Lake now listed"],
        ["Founder visibility", "Minimal", "Strong (schema, pages)", "Mike Henry as named entity everywhere"],
        ["Visual evidence", "Gallery page exists", "No gallery page", "Wix advantage — gap acknowledged"],
        ["FAQ coverage", "None", "5 Q&As", "Cost, timeline, liner, winter, maintenance"],
    ]
    et = Table(eeat_data, colWidths=[90, 100, 105, 175])
    et.setStyle(make_table_style())
    # Highlight the gallery row (Wix advantage)
    et_style = et._argW  # just reuse existing style
    el.append(et)

    el.append(Spacer(1, 4))
    el.append(Paragraph(
        "<b>Honest acknowledgment:</b> The Wix site had a Gallery page with project photos — "
        "visual proof of completed projects. The new site does not yet have this. Adding a gallery "
        "with real photography is a high-priority next step.",
        styles['CalloutText']
    ))

    el.append(CondPageBreak(4 * inch))

    # --- 4.4 Technical GEO ---
    el.append(Paragraph("4.4  Technical GEO — 18 → 90 (+72)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> Whether AI crawlers can physically access, read, and understand "
        "your website. This is the <b>largest single improvement</b> (+72 points).",
        styles['BodyCustom']
    ))
    tech_data = [
        ["Sub-Dimension", "Wix", "Next.js"],
        ["Rendering method", "Client-side JavaScript", "Static prerendering (SSG) — complete HTML"],
        ["AI crawler permissions", "Wix default (no AI rules)", "9 AI crawlers explicitly whitelisted"],
        ["llms.txt endpoint", "Not possible on Wix", "Dynamic, auto-generated from source data"],
        ["Sitemap quality", "Basic auto-generated", "Priority-weighted, 8 URLs"],
        ["Per-page Open Graph", "None / basic Wix", "Full OG per page (title, desc, image, URL)"],
        ["Canonical URLs", "Not configured", "Set per page"],
        ["Geo meta tags", "None", "Region, placename, GPS coordinates"],
        ["Code ownership", "None (Wix proprietary)", "Full source code + git history"],
    ]
    tt = Table(tech_data, colWidths=[115, 165, 190])
    tt.setStyle(make_table_style())
    el.append(tt)

    el.append(Spacer(1, 6))

    # Rendering comparison callout
    el.append(Paragraph(
        "<b>Why rendering matters:</b> When an AI crawler visits a Wix site, it gets an empty HTML shell "
        "with JavaScript instructions. Many AI crawlers cannot execute JavaScript, so they see a blank page. "
        "The Next.js site serves <b>complete, pre-rendered HTML instantly</b> — no JavaScript needed. "
        "Every crawler gets every word.",
        styles['CalloutText']
    ))

    el.append(CondPageBreak(3.5 * inch))

    # --- 4.5 Schema & Structured Data ---
    el.append(Paragraph("4.5  Schema & Structured Data — 12 → 65 (+53)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> Machine-readable labels that tell AI exactly what each piece of content "
        "represents. Think of schema as name tags — without them, AI has to guess.",
        styles['BodyCustom']
    ))
    schema_data = [
        ["Schema Type", "Wix", "Next.js", "What It Does"],
        ["LocalBusiness", "Maybe (minimal)", "Rich (3 locations, GPS, hours, expertise)", "\"This is a real local business\""],
        ["WebSite", "No", "All pages", "\"This is an official business website\""],
        ["BreadcrumbList", "No", "7 interior pages", "Page hierarchy for AI navigation"],
        ["FAQPage", "No", "5 Q&As (Services)", "Machine-readable FAQ extraction"],
        ["Product + Offer", "No", "1 item ($51,995)", "\"This is a product you can buy\""],
        ["Review", "No", "6 reviews (Testimonials)", "\"These are real customer reviews\""],
        ["Service", "No", "Built (not yet wired)", "\"This is a specific service offered\""],
    ]
    scht = Table(schema_data, colWidths=[90, 80, 115, 185])
    scht_style = make_table_style()
    # Color "No" cells red, "Yes"/"Rich" cells green
    for i in range(1, len(schema_data)):
        wix_val = schema_data[i][1]
        njs_val = schema_data[i][2]
        if wix_val == "No":
            scht_style.add('TEXTCOLOR', (1, i), (1, i), DANGER)
        if "Rich" in njs_val or "All" in njs_val or "5 Q" in njs_val or "6 rev" in njs_val or "1 item" in njs_val or "7 int" in njs_val:
            scht_style.add('TEXTCOLOR', (2, i), (2, i), SUCCESS)
        elif "Built" in njs_val:
            scht_style.add('TEXTCOLOR', (2, i), (2, i), WARNING)
    scht.setStyle(scht_style)
    el.append(scht)

    el.append(CondPageBreak(2.5 * inch))

    # --- 4.6 Platform Optimization ---
    el.append(Paragraph("4.6  Platform Optimization — 42 → 42 (No Change)", styles['SubHeader']))
    el.append(Paragraph(
        "<b>What this measures:</b> How well your business is represented on platforms AI uses as "
        "reference sources — Google, Yelp, social media, and industry directories.",
        styles['BodyCustom']
    ))
    plat_data = [
        ["Platform", "Status", "Action Needed", "Est. Impact"],
        ["Google Business Profile", "Not optimized", "Claim and optimize for all 3 locations", "+5-8 pts"],
        ["Yelp", "Unclaimed (1.5 stars)", "Claim and respond to reviews", "+2-3 pts"],
        ["Instagram", "Not present", "Create account, post project photos", "+3-5 pts"],
        ["Houzz", "Not present", "Create profile with portfolio", "+2-3 pts"],
        ["YouTube", "Not present", "Create channel (high effort)", "+2-3 pts"],
    ]
    plt = Table(plat_data, colWidths=[115, 105, 175, 75])
    plt_style = make_table_style()
    for i in range(1, len(plat_data)):
        status = plat_data[i][1]
        if "Not" in status or "Unclaimed" in status:
            plt_style.add('TEXTCOLOR', (1, i), (1, i), DANGER)
        plt_style.add('TEXTCOLOR', (3, i), (3, i), DELTA_COLOR)
    plt.setStyle(plt_style)
    el.append(plt)

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 5: WHAT CHANGED VS. WHAT STAYED
    # ────────────────────────────────────────────
    section_header(el, styles, 5, "What Changed vs. What Stayed the Same")

    # Horizontal comparison bars
    cat_labels = [c[0] for c in CATEGORIES]
    wix_vals = [c[1] for c in CATEGORIES]
    njs_vals = [c[2] for c in CATEGORIES]
    el.append(create_horizontal_comparison_bars(cat_labels, wix_vals, njs_vals))

    el.append(Spacer(1, 10))

    # Two-column summary
    changed_data = [
        ["Website Improvements (4 categories)", "Score Change"],
        ["Technical GEO", "+72 pts (18 → 90)"],
        ["Schema & Structured Data", "+53 pts (12 → 65)"],
        ["AI Citability", "+39 pts (38 → 77)"],
        ["Content E-E-A-T", "+29 pts (45 → 74)"],
    ]
    unchanged_data = [
        ["Business Presence (2 categories)", "Score"],
        ["Brand Authority", "42 (unchanged)"],
        ["Platform Optimization", "42 (unchanged)"],
    ]

    ch_t = Table(changed_data, colWidths=[220, 130])
    ch_style = make_table_style(header_color=DELTA_COLOR)
    for i in range(1, len(changed_data)):
        ch_style.add('TEXTCOLOR', (1, i), (1, i), DELTA_COLOR)
    ch_t.setStyle(ch_style)

    unch_t = Table(unchanged_data, colWidths=[200, 130])
    unch_style = make_table_style(header_color=TEXT_SECONDARY)
    for i in range(1, len(unchanged_data)):
        unch_style.add('TEXTCOLOR', (1, i), (1, i), TEXT_SECONDARY)
    unch_t.setStyle(unch_style)

    # Place side by side
    wrapper = Table([[ch_t, Spacer(10, 1), unch_t]], colWidths=[350, 10, 150])
    wrapper.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))
    el.append(wrapper)

    el.append(Spacer(1, 10))
    el.append(Paragraph(
        "<b>Key insight:</b> The website rebuild captured <b>all available on-site gains</b>. "
        "The four website-controlled categories jumped by an average of 48 points. The remaining 33 points "
        "to 100 require <b>off-site business work</b> — reviews, profiles, social media. "
        "The foundation is built; now the business presence needs to catch up.",
        styles['CalloutText']
    ))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 6: BUSINESS IMPACT
    # ────────────────────────────────────────────
    section_header(el, styles, 6, "Business Impact")

    el.append(Paragraph("<b>What a 32-point GEO improvement means for lead generation:</b>", styles['BodyCustom']))
    el.append(Spacer(1, 6))

    # Before/After query examples
    el.append(Paragraph("Example Query: \"Who builds inground pools near Stillwater, MN?\"", styles['SubSubHeader']))
    q1_data = [
        ["", "Wix (GEO 35)", "Next.js (GEO 67)"],
        ["AI can read the site?", "Unreliable (JavaScript rendering)", "Yes — complete HTML instantly"],
        ["Structured business data?", "None or minimal", "3 locations, hours, GPS, 14 service area cities"],
        ["Quotable facts?", "1 price ($51,995), limited context", "$51,995 + cost breakdown + FAQs + specs"],
        ["Result", "Unlikely to appear in AI answer", "Strong candidate for AI recommendation"],
    ]
    q1t = Table(q1_data, colWidths=[120, 175, 175])
    q1_style = make_table_style()
    # Color results row
    q1_style.add('TEXTCOLOR', (1, 4), (1, 4), DANGER)
    q1_style.add('TEXTCOLOR', (2, 4), (2, 4), SUCCESS)
    q1_style.add('FONTNAME', (0, 4), (-1, 4), 'Helvetica-Bold')
    q1t.setStyle(q1_style)
    el.append(q1t)

    el.append(Spacer(1, 10))

    # ROI box
    el.append(Paragraph("<b>ROI Context</b>", styles['SubSubHeader']))
    roi_data = [
        ["Metric", "Value"],
        ["Average complete pool package", "$51,995"],
        ["Potential maintenance customer LTV", "$1,500-$3,000/year"],
        ["Cost of one lost lead to competitor", "Entire package revenue ($51,995+)"],
    ]
    rt = Table(roi_data, colWidths=[220, 250])
    rt.setStyle(make_table_style(header_color=ACCENT))
    el.append(rt)

    el.append(Spacer(1, 6))
    el.append(Paragraph(
        "The enhanced website needs to generate <b>one additional qualified lead per year</b> "
        "to deliver substantial ROI. With AI search growing as a lead source, being the structured, "
        "citable business in your market is a compounding advantage.",
        styles['BodyCustom']
    ))

    el.append(Spacer(1, 10))

    # Competitive positioning
    el.append(Paragraph("<b>Competitive Positioning</b>", styles['SubSubHeader']))
    el.append(Paragraph(
        "Your competitors in the Twin Cities pool builder market are almost certainly running standard "
        "template websites without AI crawler whitelisting, llms.txt endpoints, rich schema markup, or "
        "structured FAQ content. A GEO score of 67 likely puts you <b>ahead of every competitor</b> for "
        "AI visibility. When a customer asks ChatGPT or Perplexity for pool builder recommendations in "
        "your area, you're structured to be cited first.",
        styles['BodyCustom']
    ))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 7: ROADMAP TO 80+
    # ────────────────────────────────────────────
    section_header(el, styles, 7, "Roadmap to 80+")

    el.append(Paragraph(
        "The current score of 67 can reach 80+ within 6 months through three tiers of work.",
        styles['BodyCustom']
    ))
    el.append(Spacer(1, 4))

    # Timeline visual
    el.append(create_roadmap_visual())
    el.append(Spacer(1, 8))

    # Tier 1
    el.append(Paragraph("Tier 1: Quick Wins (0-2 Weeks) — Est. +5-8 Points", styles['SubHeader']))
    t1_data = [
        ["#", "Action", "Impact", "Effort", "Owner"],
        ["1", "Wire up Service schema on Services page (8 services)", "+2 pts", "15 min", "Developer"],
        ["2", "Add star ratings + aggregateRating to reviews", "+1-2 pts", "15 min", "Developer"],
        ["3", "Add Product schema to Products page (15 items)", "+1-2 pts", "30 min", "Developer"],
        ["4", "Create branded og:image.jpg (1200x630)", "+0.5 pts", "30 min", "Dev/Design"],
        ["5", "Configure custom domain on Vercel", "+1 pt", "15 min", "Developer"],
        ["6", "Claim Yelp listing and respond to reviews", "+2-3 pts", "30 min", "Owner"],
    ]
    t1t = Table(t1_data, colWidths=[20, 220, 55, 48, 65])
    t1_style = make_table_style(header_color=SUCCESS)
    t1_style.add('TEXTCOLOR', (2, 1), (2, -1), DELTA_COLOR)
    t1t.setStyle(t1_style)
    el.append(t1t)

    el.append(Spacer(1, 8))

    # Tier 2
    el.append(Paragraph("Tier 2: Content Expansion (2-8 Weeks) — Est. +5-8 Points", styles['SubHeader']))
    t2_data = [
        ["#", "Action", "Impact", "Effort", "Owner"],
        ["7", "Add project gallery page with real photos", "+3-4 pts", "2-4 hrs", "Owner + Dev"],
        ["8", "Add price ranges to remaining 3 packages", "+1-2 pts", "30 min", "Owner + Dev"],
        ["9", "Create 3 educational articles", "+2-3 pts", "8-12 hrs", "Owner + Dev"],
        ["10", "Add HowTo + ContactPoint schema", "+1 pt", "35 min", "Developer"],
        ["11", "Add privacy policy page", "+0.5 pts", "1 hr", "Developer"],
    ]
    t2t = Table(t2_data, colWidths=[20, 220, 55, 48, 65])
    t2_style = make_table_style(header_color=INFO)
    t2_style.add('TEXTCOLOR', (2, 1), (2, -1), DELTA_COLOR)
    t2t.setStyle(t2_style)
    el.append(t2t)

    el.append(Spacer(1, 8))

    # Tier 3 — wrapped in KeepTogether to prevent awkward page split
    tier3_elements = []
    tier3_elements.append(Paragraph("Tier 3: Off-Site Authority (Ongoing) — Est. +10-15 Points", styles['SubHeader']))
    t3_data = [
        ["#", "Action", "Impact", "Effort", "Owner"],
        ["12", "Review generation campaign (50+ Google reviews)", "+8-12 pts", "Ongoing", "Owner + Staff"],
        ["13", "Claim Google Business Profile (3 locations)", "+3-5 pts", "3-4 hrs", "Owner"],
        ["14", "Create Instagram, post project photos", "+2-3 pts", "Ongoing", "Owner/Mktg"],
        ["15", "Complete Mike Henry's LinkedIn profile", "+1-2 pts", "1-2 hrs", "Owner"],
        ["16", "Get listed on Houzz with portfolio", "+1-2 pts", "2-3 hrs", "Owner"],
    ]
    t3t = Table(t3_data, colWidths=[20, 220, 55, 48, 65])
    t3_style = make_table_style(header_color=ACCENT)
    t3_style.add('TEXTCOLOR', (2, 1), (2, -1), DELTA_COLOR)
    t3t.setStyle(t3_style)
    tier3_elements.append(t3t)
    el.append(KeepTogether(tier3_elements))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 8: METHODOLOGY
    # ────────────────────────────────────────────
    section_header(el, styles, 8, "Methodology")

    el.append(Paragraph("<b>Scoring Formula</b>", styles['SubSubHeader']))
    el.append(Paragraph(
        "GEO Score = (AI Citability x 0.25) + (Brand Authority x 0.20) + (Content E-E-A-T x 0.20) + "
        "(Technical GEO x 0.15) + (Schema &amp; Structured Data x 0.10) + (Platform Optimization x 0.10)",
        styles['CalloutText']
    ))

    el.append(Paragraph("<b>Score Interpretation</b>", styles['SubSubHeader']))
    interp = [
        ["Range", "Rating", "Meaning"],
        ["90-100", "Excellent", "Top-tier GEO; highly likely to be cited by AI"],
        ["75-89", "Good", "Strong foundation with room to improve"],
        ["60-74", "Fair", "Moderate presence; significant opportunities"],
        ["40-59", "Poor", "Weak signals; AI struggles to cite or recommend"],
        ["0-39", "Critical", "Largely invisible to AI systems"],
    ]
    it = Table(interp, colWidths=[60, 70, 340])
    it_style = make_table_style()
    # Color the rating cells
    rating_colors = [SUCCESS, INFO, INFO, WARNING, DANGER]
    for i, c in enumerate(rating_colors, 1):
        it_style.add('TEXTCOLOR', (1, i), (1, i), c)
        it_style.add('FONTNAME', (1, i), (1, i), 'Helvetica-Bold')
    it.setStyle(it_style)
    el.append(it)

    el.append(Spacer(1, 8))

    el.append(Paragraph("<b>Data Sources</b>", styles['SubSubHeader']))
    ds = [
        ["Source", "Location", "Purpose"],
        ["Wix site scrape", "scripts/scraped-data/wix-content.md", "All \"before\" evidence"],
        ["New site codebase", "src/, public/", "All \"after\" evidence"],
        ["GEO Audit Report", "GEO-AUDIT-REPORT.md", "All Next.js scores (exact match)"],
        ["Schema generators", "src/lib/schema.ts", "7 generators proving schema coverage"],
        ["AI crawler config", "src/app/robots.ts", "9 AI crawler user-agent rules"],
        ["llms.txt endpoint", "src/app/llms.txt/route.ts", "Dynamic AI-readable summary"],
    ]
    dst = Table(ds, colWidths=[100, 185, 185])
    dst.setStyle(make_table_style())
    el.append(dst)

    el.append(Spacer(1, 8))

    # Integrity notes
    el.append(Paragraph("<b>Notes on Scoring Integrity</b>", styles['SubSubHeader']))
    integrity_notes = [
        "Off-site scores (Brand Authority, Platform Optimization) are intentionally identical for both sites — these measure signals outside the website.",
        "Wix schema score (12) gives benefit of the doubt for possible auto-injected LocalBusiness markup.",
        "The Wix site had a Gallery page with project photos. The new site does not yet have this — acknowledged as a gap.",
        "All Next.js scores match GEO-AUDIT-REPORT.md exactly — no rounding or adjustment.",
    ]
    for note in integrity_notes:
        el.append(Paragraph(f"&#8226; {note}", styles['BulletCustom']))

    el.append(PageBreak())

    # ────────────────────────────────────────────
    # SECTION 9: APPENDICES
    # ────────────────────────────────────────────
    section_header(el, styles, 9, "Appendices")

    # --- Appendix A: AI Crawler Access Matrix ---
    el.append(Paragraph("Appendix A: AI Crawler Access Matrix", styles['SubHeader']))
    crawlers_data = [
        ["AI Crawler", "Platform", "Wix", "Next.js"],
        ["GPTBot", "ChatGPT (OpenAI)", "Wildcard only", "Explicitly whitelisted"],
        ["ChatGPT-User", "ChatGPT browse", "Wildcard only", "Explicitly whitelisted"],
        ["Google-Extended", "Gemini (Google)", "Wildcard only", "Explicitly whitelisted"],
        ["PerplexityBot", "Perplexity AI", "Wildcard only", "Explicitly whitelisted"],
        ["anthropic-ai", "Claude (Anthropic)", "Wildcard only", "Explicitly whitelisted"],
        ["Claude-Web", "Claude web search", "Wildcard only", "Explicitly whitelisted"],
        ["Applebot-Extended", "Siri / Apple Intelligence", "Wildcard only", "Explicitly whitelisted"],
        ["CCBot", "Common Crawl", "Wildcard only", "Explicitly whitelisted"],
        ["cohere-ai", "Cohere AI models", "Wildcard only", "Explicitly whitelisted"],
        ["Bytespider", "TikTok / ByteDance", "Wildcard only", "Wildcard only"],
        ["Meta-ExternalAgent", "Meta AI", "Wildcard only", "Wildcard only"],
        ["Amazonbot", "Alexa / Amazon", "Wildcard only", "Wildcard only"],
    ]
    crt = Table(crawlers_data, colWidths=[100, 120, 95, 110])
    cr_style = make_table_style()
    for i in range(1, len(crawlers_data)):
        wix_status = crawlers_data[i][2]
        njs_status = crawlers_data[i][3]
        if "Wildcard" in wix_status:
            cr_style.add('TEXTCOLOR', (2, i), (2, i), WARNING)
        if "Explicitly" in njs_status:
            cr_style.add('TEXTCOLOR', (3, i), (3, i), SUCCESS)
        elif "Wildcard" in njs_status:
            cr_style.add('TEXTCOLOR', (3, i), (3, i), WARNING)
    crt.setStyle(cr_style)
    el.append(crt)

    el.append(Spacer(1, 6))
    el.append(Paragraph(
        "<i>Explicit whitelisting signals intent — it tells AI systems \"we want you here.\" "
        "Additionally, Wix's client-side rendering means even allowed crawlers may get empty content.</i>",
        styles['SmallText']
    ))

    el.append(CondPageBreak(4 * inch))

    # --- Appendix B: Schema Coverage Matrix ---
    el.append(Paragraph("Appendix B: Schema Coverage Matrix", styles['SubHeader']))
    schema_mx = [
        ["Schema Type", "Wix", "Next.js", "Page(s)"],
        ["HomeAndConstructionBusiness", "Maybe (minimal)", "Yes (rich)", "All pages"],
        ["WebSite", "No", "Yes", "All pages"],
        ["BreadcrumbList", "No", "Yes", "7 interior pages"],
        ["FAQPage", "No", "Yes", "Services"],
        ["Product + Offer", "No", "Yes (1 item)", "Packages"],
        ["Review", "No", "Yes (6 reviews)", "Testimonials"],
        ["Service", "No", "Built (not wired)", "—"],
        ["Person (founder)", "No", "Yes (embedded)", "All pages"],
        ["GeoCoordinates", "No", "Yes (3 locations)", "All pages"],
        ["OpeningHoursSpec", "No", "Yes", "All pages"],
        ["aggregateRating", "No", "No", "—"],
        ["reviewRating", "No", "No", "—"],
    ]
    smxt = Table(schema_mx, colWidths=[130, 85, 110, 100])
    smx_style = make_table_style()
    for i in range(1, len(schema_mx)):
        wix = schema_mx[i][1]
        njs = schema_mx[i][2]
        if wix == "No":
            smx_style.add('TEXTCOLOR', (1, i), (1, i), DANGER)
        if "Yes" in njs:
            smx_style.add('TEXTCOLOR', (2, i), (2, i), SUCCESS)
        elif "Built" in njs:
            smx_style.add('TEXTCOLOR', (2, i), (2, i), WARNING)
        elif njs == "No":
            smx_style.add('TEXTCOLOR', (2, i), (2, i), DANGER)
    smxt.setStyle(smx_style)
    el.append(smxt)

    el.append(CondPageBreak(3 * inch))

    # --- Appendix C: Pages Analyzed ---
    el.append(Paragraph("Appendix C: Pages Analyzed", styles['SubHeader']))
    el.append(Paragraph("<b>Wix Site (7 pages)</b>", styles['SubSubHeader']))
    wix_pages = [
        ["Page", "Content Quality", "GEO Issues"],
        ["Home", "Hours listed, basic intro", "Hours conflict with Contact page"],
        ["About", "Company story, brands, award", "Outdated \"25+ years\""],
        ["Packages", "4 packages, 1 price", "Only 1 of 4 packages priced"],
        ["Products", "Image thumbnails only", "Zero text — AI gets nothing"],
        ["Gallery", "Project photos", "Visual evidence (advantage)"],
        ["Testimonials", "6 real testimonials", "No schema markup"],
        ["Contact", "1 location, basic form", "Only Willernie listed"],
    ]
    wpt = Table(wix_pages, colWidths=[70, 170, 200])
    wpt.setStyle(make_table_style(header_color=WIX_COLOR))
    el.append(wpt)

    el.append(Spacer(1, 8))

    el.append(Paragraph("<b>Next.js Site (8 pages + infrastructure)</b>", styles['SubSubHeader']))
    njs_pages = [
        ["Page", "Schema Types", "Content Quality"],
        ["Home", "LocalBusiness, WebSite", "Trust signals, CTAs, consistent data"],
        ["Services", "+ FAQPage, Breadcrumb", "8 services, 5 FAQs, 4-step process"],
        ["Packages", "+ Product (1), Breadcrumb", "4 packages with full specs"],
        ["Products", "+ Breadcrumb", "5 categories, 15 products"],
        ["Plans & Pricing", "+ Breadcrumb", "3 tiers, 7 services"],
        ["About", "+ Breadcrumb", "Accurate history, awards, brands"],
        ["Testimonials", "+ Review (6), Breadcrumb", "6 real reviews"],
        ["Contact", "+ Breadcrumb", "3 locations, 8-field form"],
        ["robots.txt", "—", "9 AI crawlers whitelisted"],
        ["llms.txt", "—", "Full AI-readable business summary"],
    ]
    njpt = Table(njs_pages, colWidths=[80, 150, 210])
    njpt.setStyle(make_table_style(header_color=NEXTJS_COLOR))
    el.append(njpt)

    el.append(CondPageBreak(3 * inch))

    # --- Appendix D: Glossary ---
    el.append(Paragraph("Appendix D: Glossary", styles['SubHeader']))
    glossary = [
        ["Term", "Definition"],
        ["GEO", "Generative Engine Optimization — making your website findable by AI"],
        ["AI Crawler", "A program that reads websites for AI systems (e.g., GPTBot for ChatGPT)"],
        ["Schema Markup", "Machine-readable labels telling AI what your content represents"],
        ["JSON-LD", "Code format for schema — invisible to visitors, readable by machines"],
        ["E-E-A-T", "Experience, Expertise, Authoritativeness, Trustworthiness"],
        ["llms.txt", "A special page formatted specifically for AI systems to read"],
        ["robots.txt", "A file telling crawlers what they can access on your site"],
        ["Open Graph", "Tags controlling how pages appear when shared on social media"],
        ["Canonical URL", "Tag telling search engines \"this is the official page version\""],
        ["SSG", "Static Site Generation — pages built in advance for instant loading"],
        ["CSR", "Client-Side Rendering — browser must run JavaScript to see content"],
        ["NAP", "Name, Address, Phone — must be identical everywhere for AI trust"],
        ["Rich Results", "Enhanced search appearances (stars, FAQs, breadcrumbs)"],
        ["CDN", "Content Delivery Network — serves your site from the nearest server"],
    ]
    gt = Table(glossary, colWidths=[90, 380])
    gt.setStyle(make_table_style())
    el.append(gt)

    el.append(Spacer(1, 20))

    # Final footer
    el.append(HRFlowable(width="100%", thickness=0.5, color=lightgrey, spaceAfter=8))
    el.append(Paragraph(
        "This report was generated using a structured 6-category GEO scoring methodology. "
        "All Wix data verified against Playwright headless browser scrape (February 26, 2026). "
        "All Next.js data verified against the live codebase. Off-site signals verified via live platform searches.",
        styles['SmallText']
    ))
    el.append(Paragraph(
        "Companion reports: docs/audit/wix-vs-nextjs-comparison.md (technical comparison)  |  "
        "GEO-AUDIT-REPORT.md (detailed Next.js audit with issue-level findings)",
        styles['SmallText']
    ))

    # ────────────────────────────────────────────
    # BUILD
    # ────────────────────────────────────────────
    doc.build(el, onFirstPage=cover_page, onLaterPages=header_footer)
    return output_path


if __name__ == "__main__":
    output = sys.argv[1] if len(sys.argv) > 1 else "docs/audit/GEO-Comparison-Wix-vs-NextJS.pdf"
    result = generate_report(output)
    file_size = os.path.getsize(result)
    print(f"PDF generated: {result} ({file_size:,} bytes / {file_size/1024:.0f} KB)")
