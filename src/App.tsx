import { useState, useEffect } from 'react'
import DirectorLensScene from './3d/DirectorLensScene.tsx'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Film, 
  Sparkles, 
  Cpu, 
  Tv, 
  Award, 
  Compass as CompassIcon, 
  Mail, 
  ExternalLink,
  ChevronDown,
  Layers,
  Code
} from 'lucide-react'

/* =========================================================================
   MANAGING YOUR VIDEO SLOTS & LINKS (MANUAL CONFIGURATION GUIDE)
   
   If you want to move a film to a different slot, or change its link, 
   simply modify the "PROJECTS" array below!
   
   Each project contains:
   1. title: The headline on the card.
   2. subtitle: The sub-headline on the card.
   3. description: A 1-2 sentence description of the work.
   4. icon: The icon component (Tv, Film, Award, Layers, Sparkles, Code).
   5. badge: The tiny capitalized tag in the upper right.
   6. category: "TV Commercials", "Corporate Films", "Social & Documentary", or "Immersive & Academic"
   
   7. embedUrl: The YouTube Player URL (important for inline watching!).
      -> Must look like: "https://www.youtube.com/embed/VIDEO_ID"
      -> (Where VIDEO_ID is the 11 characters at the end of your YouTube link).
      
   8. link: The "Open in YouTube" button destination.
      -> Must look like: "https://youtu.be/VIDEO_ID"
   ========================================================================= */

const PROJECTS = [
  {
    title: "TVC DemoReel",
    disableFullScreen: true,
    subtitle: "Commercial Directing Showreel",
    description: "A premium compiled demoreel showcasing high-impact television commercials, art direction, and brand storytelling across regional and national markets.",
    icon: Tv,
    badge: "TVC Showreel",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/pUa7GM0o2vs",
    link: "https://youtu.be/pUa7GM0o2vs"
  },
  {
    title: "Pureit Motivational Film",
    subtitle: "O&M Award-Winning Campaign",
    description: "Highly acclaimed corporate motivational campaign for Unilever Pureit. Crafted with deep emotional resonance, premium cinematic execution, and Ogilvy & Mather agency credentials.",
    icon: Award,
    badge: "Award-Winner",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Corporate Films",
    embedUrl: "https://www.youtube.com/embed/DgRjVmJbdUE",
    link: "https://youtu.be/DgRjVmJbdUE"
  },
  {
    title: "Chennais Amirtha TVC",
    subtitle: "Flagship Brand Commercial",
    description: "A high-conversion regional television commercial outlining elite hospitality education standards and student opportunities, securing major regional brand authority.",
    icon: Tv,
    badge: "Commercial TVC",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/xIdpuZYQk4s",
    link: "https://youtu.be/xIdpuZYQk4s"
  },
  {
    title: "Tulsyan TMT",
    subtitle: "Heavy-Industry TV Commercial",
    description: "Premium industrial television commercial showcasing structural strength, metallurgical excellence, and corporate scale through dramatic cinematography.",
    icon: Layers,
    badge: "Industrial TVC",
    color: "rgba(255, 59, 48, 0.12)",
    category: ["TV Commercials", "3D & CGI"],
    embedUrl: "https://www.youtube.com/embed/4rZ06TK6qzg",
    link: "https://youtu.be/4rZ06TK6qzg"
  },
  {
    title: "Shell Safety Film",
    subtitle: "Emotional Corporate Safety Story",
    description: "An emotional internal film designed for Shell to motivate safety guidelines, translating serious corporate compliance policies into a highly-engaging human story.",
    icon: CompassIcon,
    badge: "Shell Corporate",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Social & Documentary",
    embedUrl: "https://www.youtube.com/embed/jmp4lmKTbNk",
    link: "https://youtu.be/jmp4lmKTbNk"
  },
  {
    title: "CII – Tsunami Film",
    subtitle: "Social Impact Documentary",
    description: "Institutional documentary film for the Confederation of Indian Industry (CII) highlighting humanitarian relief, recovery, and societal rehabilitation post-tsunami.",
    icon: Film,
    badge: "National Reach",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Social & Documentary",
    embedUrl: "https://www.youtube.com/embed/lNY3lh53Nf8",
    link: "https://youtu.be/lNY3lh53Nf8"
  },
  {
    title: "Kudisai (The Hut)",
    subtitle: "Social Realism Independent Film",
    description: "An impactful independent film focused on sociological issues. Features deep realism, authentic performances, and a strong regional cultural footprint.",
    icon: Film,
    badge: "Indie Feature",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Social & Documentary",
    embedUrl: "https://www.youtube.com/embed/vwB7k6ELEAM",
    link: "https://youtu.be/vwB7k6ELEAM"
  },
  {
    title: "Stereoscopic 360° Video",
    subtitle: "Chennais Amirtha Immersive Campaign",
    description: "Innovative stereoscopic 3D full-sphere 360-degree video, custom engineered for immersive spherical display systems and virtual reality headsets.",
    icon: Sparkles,
    badge: "360° Immersive",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Immersive Video",
    embedUrl: "https://www.youtube.com/embed/4P5uAQoaygQ",
    link: "https://youtu.be/4P5uAQoaygQ"
  },
  {
    title: "Chennais Amirtha - Tamil",
    subtitle: "Regional Career Motivation Film",
    description: "A highly successful, episodic, story-driven motivational film targeted at Tamil-speaking students to elevate aspirations and college enrolment.",
    icon: Award,
    badge: "Regional Campaign",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Corporate Films",
    embedUrl: "https://www.youtube.com/embed/nBXuZd-kGak",
    link: "https://youtu.be/nBXuZd-kGak"
  },
  {
    title: "Chennais Amirtha - Kannada",
    subtitle: "Regional Career Motivation Film",
    description: "An episodic motivational campaign designed specifically for the Karnataka region, bridging local youth aspirations with quality academic opportunities.",
    icon: Award,
    badge: "Regional Campaign",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Corporate Films",
    embedUrl: "https://www.youtube.com/embed/3pN19MOkIOI",
    link: "https://youtu.be/3pN19MOkIOI"
  },
  {
    title: "Chennais Amirtha - Hindi",
    subtitle: "National Brand Campaign",
    description: " Episodic career story-driven national motivational series in Hindi, aligning corporate narrative, production, and massive audience outreach.",
    icon: Award,
    badge: "National Campaign",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Corporate Films",
    embedUrl: "https://www.youtube.com/embed/41k0J_i_Iiw",
    link: "https://youtu.be/41k0J_i_Iiw"
  },
  {
    title: "NIE Social Awareness Film",
    subtitle: "National Institute of Epidemiology",
    description: "A social-impact film for the National Institute of Epidemiology, translating public-health research into a human story of families, safe drinking water and its measurable impact on childhood diarrhoeal disease.",
    icon: Code,
    badge: "Social Awareness Film",
    color: "rgba(255, 59, 48, 0.12)",
    category: "Social & Documentary",
    embedUrl: "https://www.youtube.com/embed/9alS3g6YOtE",
    link: "https://youtu.be/9alS3g6YOtE"
  },
  {
    title: "Fa Deo TVC",
    subtitle: "Premium Fragrance Commercial",
    description: "Television advertisement for Fa Deo fragrance, focused on sleek sensory motion, luxury branding, high-concept lighting, and dynamic frame rhythm.",
    icon: Tv,
    badge: "Fragrance TVC",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/sIxMpvlzXTA",
    link: "https://youtu.be/sIxMpvlzXTA"
  },
  {
    title: "Fa Deo Hammock TVC",
    subtitle: "Leisure Perfume Commercial",
    description: "Summer-themed television commercial capturing premium fragrance freshness and relaxed, scenic visual vibes through meticulous art direction.",
    icon: Tv,
    badge: "Fragrance TVC",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/_D-vEoPeBsY",
    link: "https://youtu.be/_D-vEoPeBsY"
  },
  {
    title: "Kishkinta Dresses",
    subtitle: "Retail Festival Commercial",
    description: "High-energy festival television commercial involving massive group coordination, vibrant colors, choreography, and rhythmic pacing.",
    icon: Tv,
    badge: "Retail TVC",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/5wd1nzOx3Es",
    link: "https://youtu.be/5wd1nzOx3Es"
  },
  {
    title: "Kurinji Arts & Science",
    subtitle: "Institutional Campus Film",
    description: "A promotional documentary detailing Kurinji College's state-of-the-art campus, diverse syllabus, lab facilities, and graduate success pathways.",
    icon: Code,
    badge: "Academic Film",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/iOkDkj71QQ8",
    link: "https://youtu.be/iOkDkj71QQ8"
  },
  {
    title: "Kurinji Engineering",
    subtitle: "Academic Showcase Film",
    description: "Engineering-specific institutional campaign highlighting technical innovation labs, hands-on workshops, and major regional placement drive statistics.",
    icon: Code,
    badge: "Academic Film",
    color: "rgba(255, 59, 48, 0.12)",
    category: "TV Commercials",
    embedUrl: "https://www.youtube.com/embed/moRGhM-bZOM",
    link: "https://youtu.be/moRGhM-bZOM"
  },
  {
    title: "3D Architectural Walkthrough",
    disableFullScreen: true,
    subtitle: "Virtual Environment Rendering",
    description: "A highly detailed 3D architectural visualization and walkthrough film, showcasing advanced spatial design, lighting realism, and rendering capabilities.",
    icon: Layers,
    badge: "3D Walkthrough",
    color: "rgba(255, 59, 48, 0.12)",
    category: "3D & CGI",
    embedUrl: "https://www.youtube.com/embed/2Al7BES7h4I",
    link: "https://youtu.be/2Al7BES7h4I"
  }
]

const CATEGORIES = ["Show All", "TV Commercials", "Corporate Films", "Social & Documentary", "Immersive Video", "3D & CGI"]

// Pipeline data for Alfred's executive capabilities
const PIPELINE = [
  "Concept", "Story", "Screenplay", "Visual Dev", "Production", "Direction", "Post", "Delivery", "Team", "Systems", "Scale"
]

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Show All")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredProjects = selectedCategory === "Show All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(selectedCategory))

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 3D WebGL Canvas Layer */}
      <DirectorLensScene scrollY={scrollY} />

      {/* Modern Glassmorphic Nav */}
      <nav className="glass-panel" style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Film size={20} color="var(--accent-color)" />
          <span style={{ 
            fontFamily: 'var(--font-header)', 
            fontWeight: 800, 
            letterSpacing: '1px',
            fontSize: '1.1rem' 
          }}>
            ALFRED JAI R
          </span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#about" className="nav-link" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>About</a>
          <a href="#projects" className="nav-link" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Projects</a>
          <a href="#skills" className="nav-link" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Skills</a>
          <a href="#contact" className="nav-link" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Contact</a>
        </div>
        <a href="mailto:alfred.jai@gmail.com" className="glass-panel btn-primary" style={{
          padding: '8px 16px',
          borderRadius: '20px',
          textDecoration: 'none',
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'rgba(255, 59, 48, 0.15)',
          border: '1px solid rgba(255, 59, 48, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          Contact Me
        </a>
      </nav>

      {/* MAIN CONTENT CONTAINERS (2D OVERLAYS) */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* HERO SECTION */}
        <section id="hero" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '100px',
          position: 'relative'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '850px' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'linear-gradient(90deg, rgba(255, 59, 48, 0.15) 0%, rgba(255, 59, 48, 0.05) 100%)', 
              padding: '10px 20px', 
              borderRadius: '30px',
              border: '1px solid rgba(255, 59, 48, 0.3)',
              boxShadow: '0 0 20px rgba(255, 59, 48, 0.15)',
              fontSize: '0.9rem',
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '30px'
            }}>
              <Sparkles size={16} color="var(--accent-color)" />
              28+ Years of Production-Grounded Creative Judgment
            </motion.div>
            
            <h1 style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              marginBottom: '24px'
            }}>
              BRIDGING <br />
              <span className="text-gradient">CINEMATIC CRAFT</span><br />
              & GENERATIVE AI.
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-dim)',
              lineHeight: 1.5,
              fontWeight: 400,
              marginBottom: '40px',
              maxWidth: '650px'
            }}>
              Senior Media & Content Production Leader, Film Director, and AI Systems Architect bridging traditional cinematic craft with the frontier of generative AI.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="#projects" className="glass-panel btn-primary" style={{
                padding: '16px 32px',
                borderRadius: '30px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'rgba(255, 59, 48, 0.2)',
                border: '1px solid rgba(255, 59, 48, 0.4)',
                boxShadow: '0 0 20px rgba(255, 59, 48, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                View Selected Works <ChevronDown size={18} />
              </a>
              <a href="/Alfred_Jai_Resume.pdf" download="Alfred_Jai_Resume.pdf" className="glass-panel" style={{
                padding: '16px 32px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)'
              }}>
                Download Resume
              </a>
            </div>
          </motion.div>

          <a href="#about" style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-dim)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            cursor: 'pointer',
            opacity: 0.8,
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            <span style={{ fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Scroll to Enter</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={20} color="var(--accent-color)" />
            </motion.div>
          </a>
        </section>

        {/* ABOUT, POSITIONING, & PORTRAIT */}
        <section id="about" style={{ padding: '120px 0', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            width: '100%',
            alignItems: 'center'
          }}>
            {/* Column 1: Journey Text & Careers */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: '20px',
                lineHeight: 1.1
              }}>
                From Celluloid to <span className="text-gradient">Generative AI</span>
              </h2>
              <div style={{ width: '60px', height: '4px', background: 'var(--accent-color)', marginBottom: '30px' }} />
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '20px' }}>
                Senior media, creative and production professional with 28+ years of experience across filmmaking, creative direction, screenwriting, executive production, visual storytelling, and end-to-end content delivery. I turn communication objectives into compelling stories and carry them from concept to finished visual communication.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '20px' }}>
                <strong>Creative-to-Client-to-Execution Leadership:</strong> Understanding the communication requirement, developing the concept and story, presenting and refining it with stakeholders, translating it into a production strategy, leading execution, supervising post-production, and delivering the finished work.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '30px' }}>
                Experience spans commercial advertising, TVCs, corporate and institutional films, promotional films, documentaries, VFX/CG-intensive productions, 3D/animation, and immersive 360° content. Selected work includes an Advertising Club award-winning PureIT/Unilever film, Chennai’s Amirtha promotional films, a CII Tsunami film, NIE documentary, Shell Emotional Safety film, 20+ national and regional TVCs, a Tulsyan 3D claymation production involving a 30+ professional 3D team, and a 360° educational-institution film.
              </p>

              {/* Career Timeline Blocks from Master Profile */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="glass-panel" style={{ padding: '15px 20px', borderLeft: '3px solid var(--accent-color)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase' }}>2009 – Present</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', margin: '2px 0' }}>Freelance Producer, Director & Writer</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Translating communication objectives into elite visual treatments and AI-assisted workflows.</div>
                </div>

                <div className="glass-panel" style={{ padding: '15px 20px', borderLeft: '3px solid var(--accent-color)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase' }}>2003 – 2009</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', margin: '2px 0' }}>Film Director & NLE Editor</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Autumncart Communications Pvt Ltd | Directing TVCs and coordinating post-production workflows.</div>
                </div>
              </div>
            </div>

            {/* Column 2: Stylized Director Portrait Lens Circle Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '20px 0' }}>
              <div style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                padding: '10px',
                background: 'linear-gradient(135deg, var(--accent-color) 0%, rgba(255, 59, 48, 0.1) 100%)',
                boxShadow: '0 0 35px rgba(255, 59, 48, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 2,
              }} className="glass-panel">
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '3px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(12, 10, 11, 0.95)'
                }}>
                  {/* Photo file mapping with auto-fallback to stylized graphic initials */}
                  <img 
                    src="/profile.jpg" 
                    alt="Alfred Jai R" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback') as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.5s ease',
                    }}
                    className="profile-image"
                  />
                  {/* Highly styled Fallback Emblem when profile.jpg isn't placed yet */}
                  <div className="image-fallback" style={{
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(255, 59, 48, 0.15) 0%, rgba(0,0,0,0) 70%)',
                  }}>
                    <Film size={44} color="var(--accent-color)" style={{ marginBottom: '8px' }} />
                    <span style={{ fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '2px' }} className="text-gradient">AJ</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Director</span>
                  </div>
                </div>
              </div>
              {/* Camera Lens Grid Reticle Frame Markings */}
              <div style={{ position: 'absolute', top: '-12px', left: '10px', width: '24px', height: '24px', borderTop: '2.5px solid var(--accent-color)', borderLeft: '2.5px solid var(--accent-color)', zIndex: 1 }} />
              <div style={{ position: 'absolute', top: '-12px', right: '10px', width: '24px', height: '24px', borderTop: '2.5px solid var(--accent-color)', borderRight: '2.5px solid var(--accent-color)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: '-12px', left: '10px', width: '24px', height: '24px', borderBottom: '2.5px solid var(--accent-color)', borderLeft: '2.5px solid var(--accent-color)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: '-12px', right: '10px', width: '24px', height: '24px', borderBottom: '2.5px solid var(--accent-color)', borderRight: '2.5px solid var(--accent-color)', zIndex: 1 }} />
              
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--font-header)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '16px', opacity: 0.8 }}>
                REC ● 4K 24FPS
              </span>
            </div>

            {/* Column 3: Professional Positioning Glass Panel */}
            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: 'var(--accent-color)' }}>
                Professional Positioning
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Film size={20} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Storyteller & Director</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}><strong>Storyteller:</strong> narrative, emotion and visual communication.<br/><strong>Director:</strong> performance, image, movement and cinematic language.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CompassIcon size={20} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Executive Producer</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}><strong>Producer:</strong> execution, resources, teams and delivery. End-to-end Creative-to-Client-to-Execution leadership.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Cpu size={20} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>AI Systems Architect</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}>Creator of <strong>BookOS</strong>, an advanced AI pipeline engineered to autonomously author CRC Press-standard, publication-ready textbooks for postgraduate aerospace engineers. Currently deployed to write a definitive Missile Technology Bible on par with experts like Eugene L. Fleeman and S.R. Mohan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Master Capability Pipeline Flowbar */}
          <div style={{ width: '100%', marginTop: '60px' }}>
            <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
              <span className="text-gradient">Core Execution Pipeline</span> <span style={{ opacity: 0.7 }}>(Creative-to-Client-to-Execution)</span>
            </h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '12px', 
              flexWrap: 'wrap', 
              padding: '24px',
              borderRadius: '16px',
              background: 'linear-gradient(145deg, rgba(255,59,48,0.05) 0%, rgba(12,10,11,0.8) 100%)',
              border: '1px solid rgba(255,59,48,0.2)',
              boxShadow: '0 8px 32px rgba(255,59,48,0.1)'
            }} className="glass-panel">
              {PIPELINE.map((step, i) => (
                <motion.div 
                  key={step} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <div style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {step}
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <motion.span 
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      style={{ color: 'var(--accent-color)', fontWeight: 800, fontSize: '1.2rem', opacity: 0.8 }}
                    >
                      ➔
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (BENTO GRID WITH EMBEDDED VIDEOS) */}
        <section id="projects" style={{ padding: '100px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '3rem', fontWeight: 800 }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginTop: '10px', marginBottom: '40px' }}>
              A selection of high-impact visual campaigns and technical production leadership.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '50px',
            zIndex: 10,
            position: 'relative'
          }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="glass-panel btn-primary"
                style={{
                  padding: '10px 24px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat 
                    ? '1.5px solid var(--accent-color)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: selectedCategory === cat 
                    ? 'rgba(255, 59, 48, 0.25)' 
                    : 'rgba(18, 15, 16, 0.65)',
                  color: '#fff',
                  boxShadow: selectedCategory === cat 
                    ? '0 0 15px rgba(255, 59, 48, 0.25)' 
                    : 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '48px', // Increased spacing for maximum breathing room and pristine separation
              width: '100%'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => {
                const IconComp = proj.icon
                return (
                  <motion.div
                    key={proj.title}
                    layout="position" // Prevents iframe stretching / warping during category transitions
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="glass-panel"
                    style={{
                      padding: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '480px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Glowing subtle red background shape */}
                    <div style={{
                      position: 'absolute',
                      top: '-60px',
                      right: '-60px',
                      width: '150px',
                      height: '150px',
                      background: proj.color,
                      filter: 'blur(50px)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      zIndex: 0
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{
                          background: 'rgba(255,255,255,0.04)',
                          width: '52px',
                          height: '52px',
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <IconComp size={24} color="var(--accent-color)" />
                        </div>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          color: 'var(--accent-color)',
                          background: 'rgba(255, 59, 48, 0.08)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 59, 48, 0.15)'
                        }}>
                          {proj.badge}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>
                        {proj.title}
                      </h3>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--accent-color)', marginBottom: '12px' }}>
                        {proj.subtitle}
                      </h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                        {proj.description}
                      </p>

                      {/* Integrated Interactive YouTube Video Player Slot */}
                      {proj.embedUrl && (
                        <div style={{
                          width: '100%',
                          aspectRatio: '16/9',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                          background: '#080808',
                          marginTop: '15px',
                          position: 'relative',
                          zIndex: 2
                        }}>
                          <iframe
                            width="100%"
                            height="100%"
                            src={proj.embedUrl}
                            title={proj.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen={!proj.disableFullScreen}
                            loading="lazy"
                            style={{ border: 'none' }}
                          />
                        </div>
                      )}
                    </div>

                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--accent-color)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginTop: '24px',
                        zIndex: 2,
                        alignSelf: 'flex-start'
                      }} className="project-link">
                        Open in YouTube <ExternalLink size={14} />
                      </a>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" style={{ padding: '100px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '3rem', fontWeight: 800 }}>
              Expert <span className="text-gradient">Arsenal</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginTop: '10px' }}>
              The synthesis of multi-platform industry software and generative AI pipelines.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={20} /> Traditional Production
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Film Direction', 'Executive Production', 'TV Commercials', 'Storyboarding', 'VFX & CG Supervision', 'Non-Linear Editing (NLE)'].map((skill, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-color)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={20} /> AI Filmmaking Stack
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                    Cloud Based
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Higgsfield', 'Google Flow', 'Storyboard Studio', 'Nana Banana Pro', 'Veo', 'Omniflash', 'Kling AI', 'Seedance'].map((skill, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                    Local Open-source
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['LTX-2.5', 'LTX-2.3', 'Wan TI2V-5B', 'Wan A14B', 'Wan S2V-14B', 'SkyReels 1.3B', 'SkyReels 14B', 'HunyuanVideo 1.5', 'Open-Sora 2.0'].map((skill, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                    Platforms
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Runway', 'OpenArt', 'Morphic', 'KlingAI', 'Pixverse', 'KreaAI', 'Wireflow', 'ComfyUI', 'Runcomfy', 'Comfycloud', 'SwarmUI'].map((skill, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code size={20} /> Industry Software
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Adobe Premiere Pro', 'Avid Media Composer', 'DaVinci Resolve', 'Blackmagic Fusion', 'Celtx Screenwriting', 'Final Draft'].map((skill, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-color)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>


        </section>

        {/* CALL TO ACTION / CONTACT */}
        <section id="contact" style={{ padding: '120px 0 160px 0' }}>
          <div className="glass-panel" style={{
            padding: '80px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glowing spot */}
            <div style={{
              position: 'absolute',
              bottom: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              background: 'var(--accent-glow)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
                Let’s Forge the <span className="text-gradient">Next Vision</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '40px' }}>
                Whether you need an executive creative director to scale premium television campaigns, a VFX supervisor to align complex 3D pipelines, or an AI systems architect to engineer your custom narrative and assets engines—let's build the future together.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="mailto:alfred.jai@gmail.com" className="glass-panel btn-primary" style={{
                  padding: '16px 40px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: '#fff',
                  color: '#000',
                  border: '1px solid #fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.15)'
                }}>
                  <Mail size={18} /> alfred.jai@gmail.com
                </a>

                <a href="https://www.linkedin.com/in/alfredjai/" target="_blank" rel="noopener noreferrer" className="glass-panel btn-primary" style={{
                  padding: '16px 40px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease'
                }}>
                  Connect on LinkedIn <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'rgba(0,0,0,0.5)',
        padding: '40px 0',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          color: 'var(--text-dim)',
          fontSize: '0.9rem'
        }}>
          <div>
            © {new Date().getFullYear()} Alfred Jai R. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <a href="#about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#projects" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
            <a href="#skills" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a>
            <a href="#contact" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
