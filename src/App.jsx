
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Search,
  GraduationCap,
  FileText,
  FolderCheck,
  UserRound,
  Bell,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  CircleHelp,
  BookOpen,
  Wallet,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  Upload,
  Send,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Leaf,
  MessageCircle,
  Landmark,
} from "lucide-react";
import "./App.css";

const scholarships = [
  {
    id: 1,
    name: "Pre-Matric Scholarship",
    category: "School",
    level: "Class IX–X",
    amount: "As per official guidelines",
    description: "Financial assistance for eligible ST school students.",
    deadline: "Check official portal",
    color: "mint",
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Post-Matric Scholarship",
    category: "College",
    level: "Class XI and above",
    amount: "As per official guidelines",
    description: "Support for eligible ST students pursuing further education.",
    deadline: "Check official portal",
    color: "lavender",
    icon: GraduationCap,
  },
  {
    id: 3,
    name: "Top Class Education",
    category: "College",
    level: "Higher education",
    amount: "As per official guidelines",
    description: "Education support for eligible students in notified institutions.",
    deadline: "Check official portal",
    color: "peach",
    icon: Landmark,
  },
  {
    id: 4,
    name: "National Fellowship",
    category: "Research",
    level: "Research studies",
    amount: "As per official guidelines",
    description: "Explore fellowship opportunities for eligible ST researchers.",
    deadline: "Check official portal",
    color: "blue",
    icon: Sparkles,
  },
  {
    id: 5,
    name: "National Overseas Scholarship",
    category: "Overseas",
    level: "Studies abroad",
    amount: "As per official guidelines",
    description: "Explore support for eligible students pursuing studies overseas.",
    deadline: "Check official portal",
    color: "rose",
    icon: GraduationCap,
  },
];

const initialApplications = [
  {
    id: "APP-1001",
    scholarship: "Post-Matric Scholarship",
    date: "Demo application",
    status: "Under Review",
  },
  {
    id: "APP-1002",
    scholarship: "Top Class Education",
    date: "Demo application",
    status: "Documents Needed",
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Explore Scholarships", icon: Search },
  { label: "Eligibility Checker", icon: ShieldCheck },
  { label: "My Applications", icon: FileText },
  { label: "Documents", icon: FolderCheck },
  { label: "JAGO Assistant", icon: MessageCircle },
];

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applications, setApplications] = useState(initialApplications);
  const [checkedDocs, setCheckedDocs] = useState([]);
  const [studentName, setStudentName] = useState("Student");
  const [course, setCourse] = useState("Undergraduate");
  const [studyLevel, setStudyLevel] = useState("College");
  const [showEligibility, setShowEligibility] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Vanakkam! I'm JAGO, your scholarship guide. Ask me about finding scholarships, documents, or the application process.",
    },
  ]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.level.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || item.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const goTo = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    setSelectedScholarship(null);
  };

  const applyForScholarship = (scholarship) => {
    const alreadyApplied = applications.some(
      (app) => app.scholarship === scholarship.name
    );

    if (alreadyApplied) {
      alert("A demo application for this scholarship already exists.");
      return;
    }

    const newApplication = {
      id: `APP-${1000 + applications.length + 1}`,
      scholarship: scholarship.name,
      date: "Just added (demo)",
      status: "Draft",
    };

    setApplications((previous) => [newApplication, ...previous]);
    setSelectedScholarship(null);
    setActivePage("My Applications");
  };

  const toggleDocument = (doc) => {
    setCheckedDocs((previous) =>
      previous.includes(doc)
        ? previous.filter((item) => item !== doc)
        : [...previous, doc]
    );
  };

  const sendMessage = (message = chatInput) => {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setChatMessages((previous) => [
      ...previous,
      { from: "user", text: cleanMessage },
      {
        from: "bot",
        text: "You can explore the scholarship cards, review each scheme's official guidelines, and prepare the required documents. Please confirm eligibility and deadlines on the official portal before applying.",
      },
    ]);
    setChatInput("");
  };

  const renderScholarshipCard = (item) => {
    const Icon = item.icon;

    return (
      <article className="scholarship-card" key={item.id}>
        <div className={`scheme-icon ${item.color}`}>
          <Icon size={23} />
        </div>
        <span className="scheme-tag">{item.category}</span>
        <h3>{item.name}</h3>
        <p className="scheme-description">{item.description}</p>
        <div className="scheme-meta">
          <span><BookOpen size={15} /> {item.level}</span>
          <span><CalendarDays size={15} /> {item.deadline}</span>
        </div>
        <div className="scheme-footer">
          <div>
            <small>Financial support</small>
            <strong>{item.amount}</strong>
          </div>
          <button
            className="icon-button"
            aria-label={`View ${item.name}`}
            onClick={() => setSelectedScholarship(item)}
          >
            <ArrowUpRight size={20} />
          </button>
        </div>
      </article>
    );
  };

  const renderOverview = () => (
    <>
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={14} /> YOUR EDUCATION, YOUR FUTURE</span>
          <h2>Every opportunity starts with <em>one step.</em></h2>
          <p>
            Discover scholarships, understand eligibility, and keep your
            education journey organised — all in one place.
          </p>
          <button className="primary-button" onClick={() => goTo("Explore Scholarships")}>
            Explore scholarships <ArrowRight size={17} />
          </button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun" />
          <div className="art-book"><BookOpen size={66} strokeWidth={1.4} /></div>
          <div className="art-leaf leaf-one"><Leaf size={45} /></div>
          <div className="art-leaf leaf-two"><Leaf size={32} /></div>
          <div className="art-star star-one">✦</div>
          <div className="art-star star-two">✳</div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-green"><GraduationCap size={21} /></div>
          <div><span>Scholarships to explore</span><strong>05</strong><small>Across multiple study levels</small></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-purple"><FileText size={21} /></div>
          <div><span>My applications</span><strong>{applications.length.toString().padStart(2, "0")}</strong><small>Demo records</small></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-orange"><FolderCheck size={21} /></div>
          <div><span>Documents checked</span><strong>{checkedDocs.length}/5</strong><small>Personal checklist</small></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR PATH</span>
            <h2>Scholarships to explore</h2>
            <p>Start with opportunities that match your education journey.</p>
          </div>
          <button className="text-button" onClick={() => goTo("Explore Scholarships")}>
            View all <ArrowRight size={16} />
          </button>
        </div>
        <div className="scholarship-grid">
          {scholarships.slice(0, 3).map(renderScholarshipCard)}
        </div>
      </section>

      <section className="bottom-grid">
        <div className="panel next-panel">
          <div className="panel-heading">
            <div className="panel-icon"><CalendarDays size={20} /></div>
            <div><h3>Your next steps</h3><p>Stay organised as you get started.</p></div>
          </div>
          <div className="step-row">
            <span className="step-number">01</span>
            <div><strong>Explore scholarships</strong><p>Find schemes that fit your study level.</p></div>
            <button className="small-arrow" onClick={() => goTo("Explore Scholarships")}><ChevronRight size={18} /></button>
          </div>
          <div className="step-row">
            <span className="step-number">02</span>
            <div><strong>Check eligibility</strong><p>Review your details against scheme rules.</p></div>
            <button className="small-arrow" onClick={() => goTo("Eligibility Checker")}><ChevronRight size={18} /></button>
          </div>
          <div className="step-row">
            <span className="step-number">03</span>
            <div><strong>Prepare documents</strong><p>Keep your documents organised.</p></div>
            <button className="small-arrow" onClick={() => goTo("Documents")}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="panel assistant-promo">
          <div className="assistant-spark"><Sparkles size={25} /></div>
          <span className="eyebrow">HERE TO HELP</span>
          <h3>Meet JAGO, your student assistant.</h3>
          <p>Not sure where to start? Get simple guidance on scholarships and documents.</p>
          <button className="secondary-button" onClick={() => goTo("JAGO Assistant")}>
            Ask JAGO <ArrowRight size={16} />
          </button>
          <div className="promo-decoration">✳</div>
        </div>
      </section>
    </>
  );

  const renderExplore = () => (
    <section className="section-block page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">OPPORTUNITIES FOR YOU</span>
          <h2>Explore scholarships</h2>
          <p>Search opportunities and review their official guidelines.</p>
        </div>
      </div>
      <div className="search-toolbar">
        <div className="search-box">
          <Search size={19} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search scholarships or study level..."
            aria-label="Search scholarships"
          />
          {searchTerm && <button onClick={() => setSearchTerm("")} aria-label="Clear search"><X size={17} /></button>}
        </div>
        <div className="filter-label"><SlidersHorizontal size={17} /> Filter</div>
      </div>
      <div className="filter-chips">
        {["All", "School", "College", "Research", "Overseas"].map((filter) => (
          <button
            key={filter}
            className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="results-label">{filteredScholarships.length} opportunities listed</p>
      {filteredScholarships.length ? (
        <div className="scholarship-grid">
          {filteredScholarships.map(renderScholarshipCard)}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={34} />
          <h3>No scholarships found</h3>
          <p>Try another keyword or choose a different category.</p>
          <button className="secondary-button" onClick={() => { setSearchTerm(""); setActiveFilter("All"); }}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );

  const renderEligibility = () => (
    <section className="section-block page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A SIMPLE STARTING POINT</span>
          <h2>Eligibility checker</h2>
          <p>Answer a few questions to get a suggested next step.</p>
        </div>
      </div>
      <div className="eligibility-layout">
        <div className="panel eligibility-form">
          <div className="form-title"><ShieldCheck size={24} /><h3>About your education</h3></div>
          <label htmlFor="student-name">What should we call you?</label>
          <input id="student-name" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your name" />
          <label htmlFor="study-level">Current study level</label>
          <select id="study-level" value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)}>
            <option>School</option>
            <option>College</option>
            <option>Research</option>
            <option>Overseas</option>
          </select>
          <label htmlFor="course-type">Course type</label>
          <select id="course-type" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>School education</option>
            <option>Research</option>
          </select>
          <button className="primary-button full-button" onClick={() => setShowEligibility(true)}>
            Find suggested schemes <ArrowRight size={17} />
          </button>
          {showEligibility && (
            <div className="eligibility-result">
              <CheckCircle2 size={22} />
              <div>
                <strong>Thanks{studentName.trim() ? `, ${studentName.trim()}` : ""}!</strong>
                <p>Start by reviewing the schemes below. This tool does not confirm official eligibility.</p>
              </div>
            </div>
          )}
        </div>
        <div className="panel eligibility-info">
          <div className="info-art"><GraduationCap size={48} /></div>
          <h3>Eligibility depends on more than your course.</h3>
          <p>Official scheme rules may include ST community documentation, family income, institution, course, and other conditions.</p>
          <div className="info-note"><CircleHelp size={19} /><span>Always check the latest official guidelines before applying.</span></div>
          <a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer" className="external-link">
            Visit National Scholarship Portal <ExternalLink size={15} />
          </a>
        </div>
      </div>
      <div className="section-heading compact-heading">
        <div><h2>Suggested places to start</h2></div>
      </div>
      <div className="scholarship-grid">
        {scholarships.filter((item) => {
          if (studyLevel === "School") return item.category === "School";
          if (studyLevel === "Research") return item.category === "Research";
          if (studyLevel === "Overseas") return item.category === "Overseas";
          return item.category === "College";
        }).map(renderScholarshipCard)}
      </div>
    </section>
  );

  const renderApplications = () => (
    <section className="section-block page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR PROGRESS</span>
          <h2>My applications</h2>
          <p>Keep track of demo application records in one place.</p>
        </div>
        <button className="primary-button" onClick={() => goTo("Explore Scholarships")}>
          Find scholarships <ArrowRight size={16} />
        </button>
      </div>
      <div className="notice-bar"><CircleHelp size={19} /><span>These are sample records stored only in this browser session. They are not connected to any government portal.</span></div>
      <div className="panel applications-panel">
        <div className="application-table-head">
          <span>Scholarship</span><span>Reference</span><span>Progress</span><span>Action</span>
        </div>
        {applications.map((app) => (
          <div className="application-row" key={app.id}>
            <div className="application-name"><div className="mini-file"><FileText size={18} /></div><div><strong>{app.scholarship}</strong><small>{app.date}</small></div></div>
            <span className="application-id">{app.id}</span>
            <span className={`status-pill ${app.status.toLowerCase().replaceAll(" ", "-")}`}><span />{app.status}</span>
            <button className="small-arrow" onClick={() => alert(`${app.scholarship}: ${app.status}\n\nDemo only — no real application has been submitted.`)} aria-label="View application"><ChevronRight size={18} /></button>
          </div>
        ))}
        {!applications.length && (
          <div className="empty-state">
            <FileText size={32} /><h3>No applications yet</h3>
            <p>Explore scholarships to create a demo record.</p>
            <button className="secondary-button" onClick={() => goTo("Explore Scholarships")}>Explore scholarships</button>
          </div>
        )}
      </div>
    </section>
  );

  const renderDocuments = () => {
    const docs = [
      "ST community certificate",
      "Income certificate (if required)",
      "Aadhaar or other accepted ID",
      "Bank account details / passbook",
      "Previous academic marksheets",
    ];
    const progress = Math.round((checkedDocs.length / docs.length) * 100);

    return (
      <section className="section-block page-section">
        <div className="section-heading">
          <div><span className="eyebrow">BE PREPARED</span><h2>Document checklist</h2><p>Use this personal checklist to organise your documents.</p></div>
        </div>
        <div className="documents-layout">
          <div className="panel checklist-panel">
            <div className="checklist-title"><div><h3>Before you apply</h3><p>Mark each item when you've checked it.</p></div><span>{checkedDocs.length} of {docs.length}</span></div>
            <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
            {docs.map((doc) => (
              <label className={`document-row ${checkedDocs.includes(doc) ? "is-checked" : ""}`} key={doc}>
                <input type="checkbox" checked={checkedDocs.includes(doc)} onChange={() => toggleDocument(doc)} />
                <span className="custom-check"><CheckCircle2 size={19} /></span>
                <span>{doc}</span>
                <span className="doc-state">{checkedDocs.includes(doc) ? "Checked" : "To check"}</span>
              </label>
            ))}
            <p className="fine-print">Requirements vary by scheme. This checklist is only a guide; verify the official document list.</p>
          </div>
          <div className="panel upload-panel">
            <div className="upload-illustration"><Upload size={34} /></div>
            <h3>Keep your files organised</h3>
            <p>This demo doesn't upload or store documents. Keep your files in a secure place and upload them only to trusted official portals when required.</p>
            <a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer" className="secondary-button">
              Open official portal <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    );
  };

  const renderAssistant = () => (
    <section className="section-block page-section">
      <div className="section-heading">
        <div><span className="eyebrow">YOUR STUDENT GUIDE</span><h2>JAGO Assistant</h2><p>Simple guidance to help you get started with scholarships.</p></div>
      </div>
      <div className="chat-layout panel">
        <div className="chat-header">
          <div className="jago-avatar"><Sparkles size={23} /></div>
          <div><strong>JAGO</strong><span><span className="online-dot" /> Student guidance assistant · Demo</span></div>
          <span className="chat-language">Friendly guide</span>
        </div>
        <div className="chat-body">
          {chatMessages.map((message, index) => (
            <div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}>
              {message.from === "bot" && <div className="bot-avatar"><Sparkles size={16} /></div>}
              <p>{message.text}</p>
            </div>
          ))}
          <div className="quick-prompts">
            <button onClick={() => sendMessage("What documents might I need?")}>Documents needed</button>
            <button onClick={() => sendMessage("How can I find scholarships?")}>Find scholarships</button>
            <button onClick={() => sendMessage("Where do I verify eligibility?")}>Check eligibility</button>
          </div>
        </div>
        <form className="chat-input-row" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about scholarships..." aria-label="Message JAGO" />
          <button type="submit" aria-label="Send message"><Send size={18} /></button>
        </form>
        <p className="chat-disclaimer">JAGO uses demo responses in this version. Verify all details with official sources.</p>
      </div>
    </section>
  );

  const renderPage = () => {
    if (selectedScholarship) {
      const Icon = selectedScholarship.icon;
      return (
        <section className="section-block page-section">
          <button className="back-button" onClick={() => setSelectedScholarship(null)}>← Back to scholarships</button>
          <div className="panel detail-panel">
            <div className={`scheme-icon large-scheme-icon ${selectedScholarship.color}`}><Icon size={30} /></div>
            <span className="scheme-tag">{selectedScholarship.category}</span>
            <h2>{selectedScholarship.name}</h2>
            <p>{selectedScholarship.description}</p>
            <div className="detail-info-grid">
              <div><small>Study level</small><strong>{selectedScholarship.level}</strong></div>
              <div><small>Financial support</small><strong>{selectedScholarship.amount}</strong></div>
              <div><small>Deadline</small><strong>{selectedScholarship.deadline}</strong></div>
            </div>
            <div className="notice-bar"><CircleHelp size={19} /><span>Eligibility, benefits, and dates must be verified using the latest official scheme guidelines.</span></div>
            <div className="detail-actions">
              <button className="primary-button" onClick={() => applyForScholarship(selectedScholarship)}>Add demo application <ArrowRight size={16} /></button>
              <a className="secondary-button" href="https://tribal.nic.in/" target="_blank" rel="noreferrer">Official Tribal Affairs site <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>
      );
    }

    switch (activePage) {
      case "Explore Scholarships": return renderExplore();
      case "Eligibility Checker": return renderEligibility();
      case "My Applications": return renderApplications();
      case "Documents": return renderDocuments();
      case "JAGO Assistant": return renderAssistant();
      default: return renderOverview();
    }
  };

  return (
    <div className="app-shell">
      {mobileMenu && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileMenu(false)} />}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Leaf size={24} /></div>
          <div><strong>JANA<span>SETU</span></strong><small>Scholarship companion</small></div>
          <button className="close-menu" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="workspace-label">YOUR WORKSPACE</div>
        <nav className="main-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={`nav-item ${activePage === item.label ? "active" : ""}`} onClick={() => goTo(item.label)}>
                <Icon size={19} strokeWidth={1.8} /><span>{item.label}</span>
                {item.label === "JAGO Assistant" && <span className="nav-new">NEW</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-help">
          <div className="help-icon"><CircleHelp size={20} /></div>
          <strong>Need a hand?</strong>
          <p>Start with our simple scholarship guide.</p>
          <button onClick={() => goTo("JAGO Assistant")}>Get help <ArrowRight size={15} /></button>
        </div>
        <div className="sidebar-footer">
          <div className="secure-icon"><ShieldCheck size={17} /></div>
          <span>Student-first. Simple. Secure.</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="breadcrumb">Workspace <ChevronRight size={15} /> <strong>{activePage}</strong></div>
          <div className="topbar-right">
            <span className="demo-label"><span /> DEMO MODE</span>
            <button className="notification-button" aria-label="Notifications" onClick={() => alert("You're all caught up! This is a demo notification panel.")}><Bell size={19} /><i /></button>
            <div className="topbar-divider" />
            <div className="profile-avatar">{(studentName.trim().charAt(0) || "S").toUpperCase()}</div>
            <div className="profile-info"><strong>{studentName.trim() || "Student"}</strong><span>Student workspace</span></div>
          </div>
        </header>

        <div className="content-area">
          <div className="page-intro">
            <div><span className="eyebrow">WEDNESDAY, 28 OCTOBER 2026</span><h1>{activePage === "Overview" ? "Your learning journey" : activePage}</h1></div>
            <div className="intro-badge"><span className="intro-dot" /> Your future matters</div>
          </div>
          {renderPage()}
          <footer className="app-footer">
            <div className="footer-brand"><Leaf size={17} /> JANASETU</div>
            <span>Made to make scholarship discovery simpler.</span>
            <span>Student assistance demo · Not an official government website</span>
          </footer>
        </div>
      </main>

      {selectedScholarship && (
        <div className="detail-mobile-hint"><span>Scholarship details</span><button onClick={() => setSelectedScholarship(null)}><X size={18} /></button></div>
      )}
    </div>
  );
}

export default App;
