from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from pathlib import Path

OUT = Path('/Users/sunilkumar/lumina/output/pdf/study-group-module-mini-srs.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

NAVY = HexColor('#14213D')
BLUE = HexColor('#2563EB')
SKY = HexColor('#EFF6FF')
INK = HexColor('#172033')
MUTED = HexColor('#536174')
LINE = HexColor('#D7DFEA')
GREEN = HexColor('#047857')
AMBER = HexColor('#B45309')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverKicker', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=BLUE, spaceAfter=10, tracking=1.2))
styles.add(ParagraphStyle(name='CoverTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=30, leading=35, textColor=NAVY, spaceAfter=14))
styles.add(ParagraphStyle(name='CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=13, leading=19, textColor=MUTED, spaceAfter=26))
styles.add(ParagraphStyle(name='H1x', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=19, leading=23, textColor=NAVY, spaceBefore=4, spaceAfter=12))
styles.add(ParagraphStyle(name='H2x', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=BLUE, spaceBefore=11, spaceAfter=6))
styles.add(ParagraphStyle(name='Bodyx', parent=styles['BodyText'], fontName='Helvetica', fontSize=9.2, leading=13.5, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name='Smallx', parent=styles['BodyText'], fontName='Helvetica', fontSize=8, leading=10.5, textColor=INK))
styles.add(ParagraphStyle(name='Tinyx', parent=styles['BodyText'], fontName='Helvetica', fontSize=7.2, leading=9.3, textColor=INK))
styles.add(ParagraphStyle(name='Callout', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=NAVY))

def P(text, style='Bodyx'):
    return Paragraph(text, styles[style])

def table(rows, widths, header=True, font_size=7.3):
    rendered = [[P(str(cell), 'Tinyx' if font_size <= 7.5 else 'Smallx') for cell in row] for row in rows]
    t = Table(rendered, colWidths=widths, repeatRows=1 if header else 0, hAlign='LEFT')
    commands = [
        ('VALIGN', (0,0), (-1,-1), 'TOP'), ('GRID', (0,0), (-1,-1), .35, LINE),
        ('LEFTPADDING',(0,0),(-1,-1),5), ('RIGHTPADDING',(0,0),(-1,-1),5),
        ('TOPPADDING',(0,0),(-1,-1),5), ('BOTTOMPADDING',(0,0),(-1,-1),5),
        ('BACKGROUND',(0,0),(-1,0),NAVY), ('TEXTCOLOR',(0,0),(-1,0),colors.white),
    ]
    for i in range(1, len(rows)):
        if i % 2 == 0: commands.append(('BACKGROUND',(0,i),(-1,i),HexColor('#F8FAFC')))
    t.setStyle(TableStyle(commands))
    return t

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs); self.pages=[]
    def showPage(self): self.pages.append(dict(self.__dict__)); self._startPage()
    def save(self):
        count=len(self.pages)
        for state in self.pages:
            self.__dict__.update(state)
            if self._pageNumber > 1:
                self.setStrokeColor(LINE); self.line(18*mm, 14*mm, 192*mm, 14*mm)
                self.setFillColor(MUTED); self.setFont('Helvetica', 8)
                self.drawString(18*mm, 8*mm, 'Lumina | Study Group Module - Mini SRS')
                self.drawRightString(192*mm, 8*mm, f'{self._pageNumber - 1} / {count - 1}')
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=20*mm)
story=[]

# Cover
story += [Spacer(1, 29*mm), P('LUMINA PRODUCT SPECIFICATION', 'CoverKicker'), P('Study Group Module', 'CoverTitle'), P('Mini Software Requirements Specification and implementation plan', 'CoverSub')]
cover = Table([[P('<b>Purpose</b><br/>Deliver a secure, collaborative study-space experience for verified college users.', 'Bodyx'), P('<b>Release scope</b><br/>P0: collaboration core. P1: storage, search, audit, reliability, chat.', 'Bodyx')]], colWidths=[78*mm,78*mm])
cover.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),SKY),('BOX',(0,0),(-1,-1),.7,BLUE),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
story += [cover, Spacer(1, 14*mm), P('Document control', 'H2x'), table([['Field','Value'],['Service','Study Group Service'],['Base path','/api/v1/study-groups'],['Audience','Product, backend, web, QA, platform'],['Status','Implementation-ready draft'],['Date','22 August 2026']], [42*mm,114*mm], font_size=8), Spacer(1, 20*mm), P('Success looks like', 'H2x'), P('Verified students can create and join study groups, collaborate through role-governed discussions and versioned notes, and have every important change protected by tenancy, authorization, validation, and an auditable trail.', 'Callout'), PageBreak()]

story += [P('1. Product scope', 'H1x'), P('The module provides tenant-isolated study groups for SUBJECT, EXAM, PROJECT, and ASSIGNMENT collaboration. A group has members and roles, discussion threads with replies, shared notes with immutable version history, and later extensions for files, timetables, search, audit, and chat.', 'Bodyx'), P('In scope', 'H2x'), table([['Area','P0 requirement','P1 extension'],['Groups','CRUD; public/private policy; group type; owner','Discovery/search filters and ranking'],['Membership','Join/leave; invitations; owner/admin/member roles','Idempotency and richer eventing'],['Collaboration','Threads, replies, shared notes, note versions','Files, timetable, chat bridge'],['Platform controls','Tenant isolation, verified user, feature flag, RBAC','Audit viewer, optimistic concurrency']], [29*mm,63*mm,64*mm]), P('Out of scope for this release', 'H2x'), P('Real-time message transport, file binary handling, calendar synchronization, full-text indexing infrastructure, notification delivery, and cross-tenant sharing. P1 endpoints may be implemented behind flags while their platform dependencies are completed.', 'Bodyx'), P('Primary user roles', 'H2x'), table([['Role','Capabilities'],['OWNER','Full group control; transfer/delegate ownership; delete group; manage roles and membership.'],['ADMIN','Manage members within policy; moderate discussions; manage notes, timetable, and files.'],['MEMBER','Read group content; join/leave where allowed; create and edit own discussion/reply content; create/edit shared notes subject to policy.']], [33*mm,123*mm]), PageBreak()]

story += [P('2. Functional requirements', 'H1x'), P('All protected requests must authenticate the caller, resolve an active tenant/college, require verified-user status, check the Study Groups feature flag, and return only tenant-scoped data.', 'Bodyx'), P('Group and membership behaviour', 'H2x'), table([['ID','Requirement','Acceptance condition'],['SG-01','Create group','Creates an OWNER membership for caller and emits GroupCreated. Required: name, type; optional description, visibility, capacity.'],['SG-02','List/detail/update/delete','Only tenant-owned groups appear. Update/delete require OWNER; mutation supports If-Match when enabled.'],['SG-03','Join/leave','Join respects visibility/capacity; leave removes caller unless owner transfer/delete rule applies. Duplicate requests are safe with Idempotency-Key.'],['SG-04','Membership admin','OWNER may invite/promote/demote/remove; ADMIN scope is limited by policy; owner cannot be removed without transfer.']], [17*mm,61*mm,78*mm]), P('Collaboration behaviour', 'H2x'), table([['ID','Requirement','Acceptance condition'],['SG-05','Discussions and replies','Members can create/read. Authors edit/delete own content; ADMIN/OWNER may moderate. Soft delete preserves audit context.'],['SG-06','Shared notes','Members create and edit notes. Each successful update stores a new immutable version and returns current version/ETag.'],['SG-07','Note history','Members can list versions and retrieve a specific version; historic content is read-only.'],['SG-08','P1 resources','Files use upload/download URLs and server-side metadata validation; timetable stores revisions; group and global search honor tenancy and membership visibility.']], [17*mm,61*mm,78*mm]), P('P1 integration and observability', 'H2x'), P('Chat endpoint provisions or retrieves the mapped conversation through the existing Chat Service. Audit endpoint returns authorized, redacted event history. Domain events are emitted using an outbox to avoid dual-write loss.', 'Bodyx'), PageBreak()]

story += [P('3. API contract and service rules', 'H1x'), P('Route groups are implemented under apps/api/modules/study-groups using handler, service, repo, router, and lib layers. Expose the router from the API composition root.', 'Bodyx'), table([['Route family','Endpoints / intent','Authorization'],['Groups','POST/GET /study-groups; GET/PATCH/DELETE /:groupId; POST /:groupId/join, /leave','Authenticated; owner for mutation/delete; member where applicable'],['Members','GET /:groupId/members; POST invitations; PATCH/DELETE members/:userId','Member to list; owner/admin per role policy'],['Discussions','CRUD /discussions; CRUD nested /replies','Member read/create; author or moderator edit/delete'],['Notes','CRUD /notes; GET version list/detail','Member access; shared-note edit policy'],['Files & timetable','Upload URL, file metadata/list/get/download/delete; timetable CRUD/history','Member read; admin/owner write by policy'],['Search, chat, audit','Global/group search; chat create/get; group audit','Tenant visibility; member for group search/chat; owner/admin for audit'],['Health','GET /health and /ready','Unauthenticated platform checks']], [29*mm,82*mm,45*mm]), P('Request and response conventions', 'H2x'), table([['Concern','Rule'],['Headers','Authorization: Bearer token on protected routes; Idempotency-Key on state-changing retriable operations; If-Match for version-controlled updates.'],['Pagination','Cursor pagination with stable sort (createdAt DESC unless documented otherwise). Return items, nextCursor, and total only where inexpensive.'],['Errors','Use one error envelope: code, message, requestId, details. Map 400 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 412 version mismatch, 422 domain rule, 429 rate limit.'],['Safety','Never leak existence across tenants; redact actor PII in audit results; validate IDs, payload size, HTML/Markdown policy, file type/size, and query length.']], [31*mm,125*mm]), PageBreak()]

story += [P('4. Data model and architecture', 'H1x'), P('Use Prisma in @lumina/db. All business tables include tenantId, stable IDs, createdAt, updatedAt, and appropriate tenant-aware indexes. Services own transactions; repositories do persistence only.', 'Bodyx'), table([['Entity','Key fields and relationships'],['StudyGroup','id, tenantId, name, description, type, visibility, capacity, ownerId, version, deletedAt. 1:N memberships/discussions/notes/files/timetable revisions/audit.'],['StudyGroupMember','groupId + userId unique; role (OWNER/ADMIN/MEMBER), status, joinedAt, invitedBy. Index tenant/group/role.'],['Discussion / Reply','groupId, authorId, body, version, deletedAt; Reply belongs to Discussion.'],['StudyNote / StudyNoteVersion','Note current body/title/version; versions store immutable snapshot, editedBy, version number, timestamp. Unique noteId + version.'],['P1: FileAsset / TimetableRevision','File metadata/object key/checksum/status; timetable snapshot with monotonically increasing revision.'],['AuditEvent / OutboxEvent','Actor, action, entity type/id, before/after safe metadata, requestId; outbox payload/status for reliable domain events.']], [48*mm,108*mm]), P('Control flow for every protected mutation', 'H2x'), P('Authenticate -> resolve tenant + verified status -> feature flag -> load resource tenant-scoped -> membership and role check -> validate -> idempotency lookup -> transaction (state change + version/audit/outbox) -> cache/event dispatch -> safe response.', 'Callout'), P('Key policies to settle before build', 'H2x'), table([['Decision','Recommended default'],['Visibility','Private by default. Join is allowed only for discoverable/open groups; invitation can add members to private groups.'],['Capacity','Optional; join returns 422 when full.'],['Note conflicts','Require If-Match for PATCH; return 412 plus current version metadata on mismatch.'],['Deletion','Soft-delete discussion/replies/groups; hard delete only through retention job. Group delete cascades access removal but preserves audit.'],['Owner exit','Block leaving as sole owner; require transfer or delete first.']], [48*mm,108*mm]), PageBreak()]

story += [P('5. Roadmap and delivery plan', 'H1x'), table([['Phase','Deliverables','Exit criteria'],['0. Foundations','Schema migrations; feature flag; tenant/auth middleware; shared validation/errors; OpenAPI contract; test fixtures.','Migration applies cleanly; all requests tenant-scoped; contract review complete.'],['1. P0 groups & RBAC','Group CRUD, memberships, invitations, join/leave, role guard, audit skeleton.','Permission matrix and edge-case tests pass; owner protection verified.'],['2. P0 collaboration','Discussions/replies; notes + immutable versions; optimistic concurrency.','Author/moderator rules and version retrieval are covered by integration tests.'],['3. P1 platform','Signed file workflow + validation, timetable revisions, search, audit feed, outbox events, idempotency.','Storage security tests; no duplicate mutations; audit/event completeness sampled.'],['4. Chat & release','Chat Service adapter; web integration; observability dashboards; load/security checks; rollout flag.','Staged tenant rollout meets latency/error targets and has rollback path.']], [23*mm,81*mm,52*mm]), P('Implementation work breakdown', 'H2x'), P('<b>Backend:</b> Prisma models/migrations; validators in @lumina/validators; module router/service/repo; authorization library; storage/chat adapters; outbox worker.<br/><b>Web:</b> group directory/detail, member management, threads, note editor/history, error/conflict states; P1 files/timetable/search.<br/><b>QA:</b> route contract tests, RBAC matrix, tenant-isolation tests, concurrency/idempotency tests, storage abuse tests, accessibility and smoke tests.', 'Bodyx'), P('Quality gates', 'H2x'), table([['Area','Gate'],['Security','No cross-tenant reads/writes; authorization tests for each endpoint; signed URLs scoped and short lived.'],['Reliability','Transactions include audit/outbox; retry-safe idempotent routes; 412 behavior tested.'],['Performance','Cursor pagination; composite indexes for tenant/group/createdAt; load-test list/search paths.'],['Observability','requestId, structured action logs, metrics for membership/content mutations, audit/outbox failure alerts.']], [36*mm,120*mm]), P('Risks and mitigations', 'H2x'), table([['Risk','Mitigation'],['Role complexity / privilege escalation','Centralize policy checks and test table-driven role matrix.'],['Lost updates to notes/timetable','Enforce version checks and retain immutable revisions.'],['File abuse or data leakage','Direct-to-object-store signed URLs, MIME/size/checksum validation, malware scanning before availability.'],['Chat dependency delays','Adapter interface plus feature flag; module stays usable without chat.']], [49*mm,107*mm])]

doc.build(story, canvasmaker=NumberedCanvas)
print(OUT)
