'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MeshNode Survey — AnalyseClient.tsx
//
// HOW THIS WORKS WITH YOUR LAYOUT:
//   app/layout.tsx wraps every page with <Navbar/>, <MeshCanvas/>, <Footer/>
//   This component only renders the page BODY — no nav, no footer, no fonts.
//   All site theming (colours, fonts, CSS variables) comes from globals.css.
//
// STATIC EXPORT COMPATIBLE:
//   output: 'export' in next.config.js means no server/API routes.
//   Supabase is called directly from the browser using your existing
//   NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars
//   (already in your GitHub Secrets — no new setup needed).
//
// NAV ADDITION:
//   Add one line to components/Navbar.tsx in your nav links array:
//   { href: '/analyse', label: 'Analyse' }
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from 'react'

const SB_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Lang = 'en' | 'fi'
type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Pain {
  v: string; icon: string
  en: string; fi: string; sub_en: string; sub_fi: string
}
interface Tool  { v: string; en: string; fi: string }
interface Rec   { title: string; impact: string; effort: string; timeline: string }

// ─── BUSINESS DATA ────────────────────────────────────────────────────────────
const BIZ_NAMES: Record<string, { en: string; fi: string }> = {
  cafe:{en:'Café',fi:'Kahvila'}, fine_dining:{en:'Fine dining',fi:'Fine dining'},
  restaurant:{en:'Restaurant',fi:'Ravintola'}, takeaway:{en:'Takeaway',fi:'Pikaruoka'},
  food_truck:{en:'Food truck',fi:'Food truck'}, bar:{en:'Bar / pub',fi:'Baari'},
  bakery:{en:'Bakery',fi:'Leipomo'}, hair_salon:{en:'Hair salon',fi:'Kampaamo'},
  barber:{en:'Barber shop',fi:'Parturi'}, nail_salon:{en:'Nail salon',fi:'Kynsihoitola'},
  spa:{en:'Spa & massage',fi:'Spa / hieronta'}, tattoo:{en:'Tattoo studio',fi:'Tatuointistudio'},
  gym:{en:'Gym / fitness',fi:'Kuntosali'}, dance_school:{en:'Dance school',fi:'Tanssikoulu'},
  yoga:{en:'Yoga studio',fi:'Joogastudio'}, beauty_clinic:{en:'Beauty clinic',fi:'Kauneusklinikka'},
  clothing:{en:'Clothing boutique',fi:'Vaateliike'}, grocery:{en:'Grocery store',fi:'Ruokakauppa'},
  hobby_shop:{en:'Hobby / specialist',fi:'Harrasteliike'}, electronics:{en:'Electronics',fi:'Elektroniikka'},
  cleaning:{en:'Cleaning company',fi:'Siivousyritys'}, auto_repair:{en:'Auto repair',fi:'Autokorjaamo'},
  childcare:{en:'Childcare',fi:'Päiväkoti'}, accounting:{en:'Accounting',fi:'Tilitoimisto'},
  it_support:{en:'IT support',fi:'IT-tuki'}, construction:{en:'Construction',fi:'Rakentaminen'},
  logistics:{en:'Logistics',fi:'Logistiikka'},
}

const BIZ_ICONS: Record<string, string> = {
  cafe:'☕', fine_dining:'🍽️', restaurant:'🍴', takeaway:'📦', food_truck:'🚚',
  bar:'🍺', bakery:'🥐', hair_salon:'💇', barber:'✂️', nail_salon:'💅',
  spa:'🧖', tattoo:'🎨', gym:'🏋️', dance_school:'💃', yoga:'🧘', beauty_clinic:'✨',
  clothing:'👗', grocery:'🛒', hobby_shop:'🎮', electronics:'📱',
  cleaning:'🧹', auto_repair:'🔧', childcare:'🧒', accounting:'📊',
  it_support:'💻', construction:'🏗️', logistics:'🚛',
}

const SECTOR_GROUPS = [
  { key:'fb', en:'Food & Beverage',   fi:'Ruoka ja juoma',
    bizKeys:['cafe','fine_dining','restaurant','takeaway','food_truck','bar','bakery'] },
  { key:'bw', en:'Beauty & Wellness', fi:'Kauneus ja hyvinvointi',
    bizKeys:['hair_salon','barber','nail_salon','spa','tattoo','gym','dance_school','yoga','beauty_clinic'] },
  { key:'rt', en:'Retail',            fi:'Vähittäiskauppa',
    bizKeys:['clothing','grocery','hobby_shop','electronics'] },
  { key:'sv', en:'Services',          fi:'Palvelut',
    bizKeys:['cleaning','auto_repair','childcare','accounting','it_support','construction','logistics'] },
]

function getSector(biz: string) {
  for (const g of SECTOR_GROUPS) if (g.bizKeys.includes(biz)) return g.key
  return 'sv'
}

const PAINS: Record<string, Pain[]> = {
  fb: [
    {v:'waste',    icon:'🗑️',en:'Food & ingredient waste',    fi:'Ruoka- ja raaka-ainehävikki',   sub_en:'Daily over-prep and end-of-day losses',  sub_fi:'Ylivalmistelu ja päivän lopun hävikki'},
    {v:'staffing', icon:'👥', en:'Staffing & scheduling',      fi:'Henkilöstö ja aikataulut',      sub_en:'Over or understaffed on wrong days',     sub_fi:'Väärät henkilöstömäärät väärille päiville'},
    {v:'slowdays', icon:'📉', en:'Unpredictable slow days',    fi:'Arvaamattomat hiljaiset päivät',sub_en:'Revenue varies too much to plan ahead',  sub_fi:'Ei pysty suunnittelemaan etukäteen'},
    {v:'margins',  icon:'💰', en:'Unknown dish profitability', fi:'Tuntematon kannattavuus',       sub_en:"Don't know which dishes lose money",     sub_fi:'Mitkä annokset tuottavat tappiota'},
    {v:'equipment',icon:'⚙️', en:'Equipment failures',         fi:'Laiterikot',                    sub_en:'Breakdowns always a surprise',           sub_fi:'Rikkoontuminen yllättää aina'},
    {v:'customers',icon:'🔄', en:'Customer retention',         fi:'Asiakkaiden pitäminen',         sub_en:'Regulars leaving without notice',        sub_fi:'Kanta-asiakkaat lähtevät huomaamatta'},
    {v:'noshows',  icon:'🚫', en:'No-shows & cancellations',   fi:'Ilmestymättä jättämiset',       sub_en:'Wasted covers and lost revenue',         sub_fi:'Tuhlatut pöytäpaikat ja kadonneet tulot'},
  ],
  bw: [
    {v:'noshows',  icon:'🚫', en:'No-shows & cancellations',  fi:'Ilmestymättä jättämiset',       sub_en:'Wasted appointment slots',               sub_fi:'Tuhlatut aikaslotit'},
    {v:'rebooking',icon:'🔄', en:'Low rebooking rate',         fi:'Alhainen uudelleenvarausaste',  sub_en:'Clients not returning after first visit', sub_fi:'Asiakkaat eivät palaa ensimmäisen käynnin jälkeen'},
    {v:'products', icon:'🧴', en:'Retail product sales weak',  fi:'Tuotemyynti heikkoa',           sub_en:'Inconsistent upselling of products',     sub_fi:'Epäjohdonmukainen lisämyynti'},
    {v:'scheduling',icon:'📅',en:'Staff scheduling gaps',      fi:'Aikataulujen aukot',            sub_en:'Double bookings or idle chair time',     sub_fi:'Kaksoisbukkausta tai joutilasta aikaa'},
    {v:'loyalty',  icon:'⭐', en:'Building client loyalty',    fi:'Asiakasuskollisuus',            sub_en:'No system to retain regulars long-term', sub_fi:'Ei järjestelmää kanta-asiakkaiden pitämiseen'},
    {v:'marketing',icon:'📢', en:'New client acquisition',     fi:'Uusien asiakkaiden hankinta',   sub_en:'No system beyond word of mouth',         sub_fi:'Ei järjestelmää suosittelun lisäksi'},
  ],
  rt: [
    {v:'inventory',icon:'📦', en:'Inventory management',       fi:'Varastonhallinta',              sub_en:'Overstock or stockouts hurting margins', sub_fi:'Ylivarasto tai loppuunmyynti'},
    {v:'demand',   icon:'📊', en:'Demand forecasting',          fi:'Kysynnän ennustaminen',         sub_en:"Can't predict what will sell",           sub_fi:'Ei pysty ennustamaan mitä myy'},
    {v:'footfall', icon:'🚶', en:'Inconsistent footfall',       fi:'Vaihteleva asiakasvirta',       sub_en:'Traffic to store is unpredictable',      sub_fi:'Asiakasvirta myymälään arvaamatonta'},
    {v:'returns',  icon:'↩️', en:'High return rate',            fi:'Korkea palautusaste',           sub_en:'Returns eating into profit margins',     sub_fi:'Palautukset syövät katteita'},
    {v:'pricing',  icon:'💲', en:'Pricing feels like guesswork',fi:'Hinnoittelu arvausta',          sub_en:'No data behind pricing decisions',       sub_fi:'Ei dataa hinnoittelun takana'},
  ],
  sv: [
    {v:'scheduling',icon:'📅',en:'Scheduling & routing',       fi:'Aikataulutus ja reititys',      sub_en:'Inefficient job or route planning',      sub_fi:'Tehoton työ- tai reittisuunnittelu'},
    {v:'staff',    icon:'👥', en:'Staff reliability & turnover',fi:'Henkilöstön luotettavuus',     sub_en:'High churn and reliability issues',      sub_fi:'Suuri vaihtuvuus ja luotettavuusongelmat'},
    {v:'invoicing',icon:'💳', en:'Invoicing & cash flow',       fi:'Laskutus ja kassavirta',        sub_en:'Late payments and collection delays',    sub_fi:'Myöhäiset maksut ja perintäviiveet'},
    {v:'clients',  icon:'🔄', en:'Client churn',                fi:'Asiakkaiden menettäminen',      sub_en:'Losing clients without early warning',   sub_fi:'Menettäminen ilman varoitusta'},
    {v:'quotes',   icon:'📝', en:'Quoting is slow or wrong',    fi:'Tarjouslaskenta hidasta',       sub_en:'Too slow or too often inaccurate',       sub_fi:'Liian hidas tai usein väärä'},
    {v:'admin',    icon:'🗂️', en:'Admin overload',              fi:'Hallintoylikuormitus',          sub_en:'Too much time on paperwork',             sub_fi:'Liikaa aikaa paperitöihin'},
  ],
}

const TOOLS: Record<string, Tool[]> = {
  fb: [
    {v:'restolution',en:'Restolution POS',     fi:'Restolution POS'},
    {v:'tableonline',en:'TableOnline / Eatapp', fi:'TableOnline / Eatapp'},
    {v:'izettle',    en:'iZettle / Zettle',     fi:'iZettle / Zettle'},
    {v:'wolt',       en:'Wolt for Business',    fi:'Wolt yrityksille'},
    {v:'excel',      en:'Excel / spreadsheets', fi:'Excel / taulukkolaskennat'},
    {v:'nothing',    en:'No digital systems',   fi:'Ei digitaalisia järjestelmiä'},
  ],
  bw: [
    {v:'timma',    en:'Timma / Fresha',       fi:'Timma / Fresha'},
    {v:'treatwell',en:'Treatwell / Booksy',   fi:'Treatwell / Booksy'},
    {v:'instagram',en:'Instagram only',       fi:'Vain Instagram'},
    {v:'excel',    en:'Excel / manual',       fi:'Excel / manuaalinen'},
    {v:'nothing',  en:'No booking system',    fi:'Ei varausjärjestelmää'},
  ],
  rt: [
    {v:'shopify',en:'Shopify / WooCommerce',  fi:'Shopify / WooCommerce'},
    {v:'erp',    en:'ERP / inventory system', fi:'ERP / varastojärjestelmä'},
    {v:'pos',    en:'POS system',             fi:'Kassajärjestelmä'},
    {v:'excel',  en:'Excel / manual',         fi:'Excel / manuaalinen'},
    {v:'nothing',en:'No systems',             fi:'Ei järjestelmiä'},
  ],
  sv: [
    {v:'jobber',  en:'Jobber / field service',fi:'Jobber / kenttäpalvelu'},
    {v:'erp',     en:'ERP / business system', fi:'ERP / toiminnanohjaus'},
    {v:'excel',   en:'Excel / manual',        fi:'Excel / manuaalinen'},
    {v:'whatsapp',en:'WhatsApp coordination', fi:'WhatsApp koordinointi'},
    {v:'nothing', en:'No systems',            fi:'Ei järjestelmiä'},
  ],
}

const REVENUE_LABELS = ['Under €2K','€2K–€5K','€5K–€10K','€10K–€20K','€20K–€35K','€35K–€50K','€50K–€75K','€75K–€100K','€100K–€150K','€150K+']
const REVENUE_VALS   = [1500,3500,7500,15000,27500,42500,62500,87500,125000,200000]

const REC_MAP: Record<string, Rec> = {
  waste:      {title:'AI demand forecasting agent',          impact:'Reduce waste 25–45% — recover €200–800/mo',        effort:'Low',    timeline:'2–3 weeks'},
  staffing:   {title:'AI shift optimisation system',         impact:'Cut labour waste 8–15%',                           effort:'Medium', timeline:'3–4 weeks'},
  slowdays:   {title:'Demand prediction (weather + events)', impact:'Increase covers 15–30% on slow days',              effort:'Low',    timeline:'2 weeks'},
  margins:    {title:'Menu / product profitability tracker', impact:'Identify loss-makers — improve margin 4–8%',       effort:'Low',    timeline:'1 week'},
  equipment:  {title:'Equipment health monitoring agent',    impact:'Predict failures 1–2 weeks early',                 effort:'Medium', timeline:'4–6 weeks'},
  customers:  {title:'Customer churn prediction & re-engage',impact:'Recover 20–35% of at-risk regulars',              effort:'Low',    timeline:'2 weeks'},
  noshows:    {title:'Automated no-show prevention system',  impact:'Reduce no-shows 40–60%',                          effort:'Low',    timeline:'1 week'},
  rebooking:  {title:'Automated rebooking reminder agent',   impact:'Increase return rate 20–40%',                     effort:'Low',    timeline:'1 week'},
  products:   {title:'Retail product recommendation engine', impact:'Increase upsell conversion 15–25%',               effort:'Low',    timeline:'2 weeks'},
  inventory:  {title:'AI inventory prediction engine',       impact:'Reduce overstock 25–40%, eliminate stockouts',    effort:'Medium', timeline:'3–4 weeks'},
  demand:     {title:'Seasonal demand model',                impact:'15–25% revenue uplift on targeted periods',       effort:'Low',    timeline:'2 weeks'},
  scheduling: {title:'Intelligent scheduling optimiser',     impact:'Reduce scheduling errors 60%',                    effort:'Medium', timeline:'3 weeks'},
  invoicing:  {title:'Automated invoice trigger system',     impact:'Cut payment delays 40%',                          effort:'Low',    timeline:'1 week'},
  clients:    {title:'Client churn early-warning system',    impact:'Detect at-risk clients 3–6 weeks early',          effort:'Low',    timeline:'2 weeks'},
  staff:      {title:'Staff reliability tracker',            impact:'Reduce turnover cost 20–30%',                     effort:'Medium', timeline:'3 weeks'},
  quotes:     {title:'AI-assisted quoting tool',             impact:'Reduce quote time 60%, improve accuracy',         effort:'Medium', timeline:'3–4 weeks'},
  admin:      {title:'Admin automation agent',               impact:'Save 4–8 hours/week on paperwork',                effort:'Low',    timeline:'2 weeks'},
  loyalty:    {title:'Customer loyalty & rewards system',    impact:'Increase visit frequency 20–35%',                 effort:'Low',    timeline:'2 weeks'},
  marketing:  {title:'Targeted acquisition campaign engine', impact:'Cut customer acquisition cost 30–50%',            effort:'Low',    timeline:'2 weeks'},
  footfall:   {title:'Footfall prediction model',            impact:'Optimise opening hours and staffing',             effort:'Low',    timeline:'2 weeks'},
  returns:    {title:'Returns pattern analyser',             impact:'Identify root cause, reduce returns 20–35%',      effort:'Low',    timeline:'2 weeks'},
  pricing:    {title:'Dynamic pricing intelligence',         impact:'Improve margin 3–8% through data-driven pricing', effort:'Medium', timeline:'3 weeks'},
}

// ─── SCORING ──────────────────────────────────────────────────────────────────
function calcScore(pains: string[], ratings: Record<string,number>, tools: string[], readiness: number, revenue: number) {
  if (!pains.length) return 0
  const painScore = pains.reduce((s,p) => s + (ratings[p] ?? 3), 0)
  const painNorm  = Math.min(painScore / Math.max(pains.length * 5, 1), 1) * 4
  const noTools   = tools.includes('nothing') || tools.includes('excel')
  const toolScore = noTools ? 3 : tools.length > 0 ? 1.5 : 2
  const readScore = (readiness / 10) * 3
  const revMult   = 1 + Math.min(revenue / 10, 0.5)
  return Math.min((painNorm + toolScore + readScore) * revMult, 10)
}

function buildRecs(pains: string[], ratings: Record<string,number>): Rec[] {
  return [...pains]
    .sort((a,b) => (ratings[b] ?? 3) - (ratings[a] ?? 3))
    .slice(0, 4)
    .map(p => REC_MAP[p] ?? {title:`Optimise ${p}`,impact:'ROI to be quantified on-site',effort:'TBD',timeline:'TBD'})
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AnalyseClient() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('meshnode_lang') as Lang) ?? 'en'
    }
    return 'en'
  })
  const [step,     setStep]     = useState<StepId>(1)
  const [search,   setSearch]   = useState('')
  const [biz,      setBiz]      = useState('')
  const [size,     setSize]     = useState('')
  const [revenue,  setRevenue]  = useState(3)
  const [pains,    setPains]    = useState<string[]>([])
  const [ratings,  setRatings]  = useState<Record<string,number>>({})
  const [tools,    setTools]    = useState<string[]>([])
  const [readiness,setReadiness]= useState(0)
  const [name,     setName]     = useState('')
  const [bizName,  setBizName]  = useState('')
  const [email,    setEmail]    = useState('')
  const [phone,    setPhone]    = useState('')
  const [submitting,setSubmitting]=useState(false)
  const [submitted, setSubmitted]=useState(false)
  const [error,    setError]    = useState('')
  const [demoReady,setDemoReady]=useState(false)
  const ringRef = useRef<SVGCircleElement>(null)
  const topRef  = useRef<HTMLDivElement>(null)

  const sector  = getSector(biz)
  const score   = calcScore(pains, ratings, tools, readiness, revenue)
  const recs    = buildRecs(pains, ratings)
  const rev     = REVENUE_VALS[revenue - 1] ?? 7500
  const roiLo   = Math.round(rev * 0.06 / 100) * 100
  const roiHi   = Math.round(rev * 0.18 / 100) * 100
  const risk    = pains.length
    ? Math.min(pains.reduce((s,p)=>(s+(ratings[p]??3)),0) / Math.max(pains.length*5,1) * 10, 10)
    : 0
  const opp     = tools.includes('nothing') || tools.includes('excel') ? 8 : pains.length > 3 ? 6 : 4

  const t = useCallback((en: string, fi: string) => lang === 'fi' ? fi : en, [lang])

  // scroll to top on step change
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [step])

  // animate ring when demo shown
  useEffect(() => {
    if (!demoReady || !ringRef.current) return
    const circ   = 2 * Math.PI * 50
    const offset = circ - (score / 10) * circ
    setTimeout(() => {
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(offset)
    }, 200)
  }, [demoReady, score])

    // listen for lang change dispatched from Navbar toggle
  useEffect(() => {
    const handler = (e: Event) => {
      setLang((e as CustomEvent).detail as Lang)
    }
    window.addEventListener('meshnode_lang', handler)
    return () => window.removeEventListener('meshnode_lang', handler)
  }, [])

  // ─── SUBMIT ─────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    const payload = {
      name, business: bizName, email, phone,
      biz_type: biz, sector,
      size, revenue_band: REVENUE_LABELS[revenue - 1],
      pains: pains.join(', '),
      pain_ratings: JSON.stringify(ratings),
      tools: tools.join(', '),
      readiness,
      score: parseFloat(score.toFixed(2)),
      lang,
      submitted_at: new Date().toISOString(),
    }
    try {
      if (SB_URL) {
        const res = await fetch(`${SB_URL}/rest/v1/meshnode_surveys`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SB_ANON,
            'Authorization': `Bearer ${SB_ANON}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(payload),
        })
        if (!res.ok && res.status !== 201) throw new Error(`DB error ${res.status}`)
      }
      setSubmitted(true)
      setStep(7)
    } catch (e) {
      setError(t('Submission failed — email stanley@cognitivemeshlab.fi directly','Lähetys epäonnistui — lähetä sähköposti stanley@cognitivemeshlab.fi'))
    } finally {
      setSubmitting(false)
    }
  }

  // ─── FILTERED BIZ GROUPS ────────────────────────────────────────────────────
  const filteredGroups = SECTOR_GROUPS.map(g => ({
    ...g,
    visible: g.bizKeys.filter(k => {
      if (!search) return true
      const n = (BIZ_NAMES[k]?.[lang] ?? k).toLowerCase()
      return n.includes(search.toLowerCase())
    }),
  })).filter(g => g.visible.length > 0)

  // ─── PAIN TOGGLE ────────────────────────────────────────────────────────────
  function togglePain(v: string) {
    setPains(prev => {
      const next = prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
      if (!prev.includes(v)) setRatings(r => ({ ...r, [v]: r[v] ?? 3 }))
      return next
    })
  }

  function toggleTool(v: string) {
    setTools(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  }

  // ─── PROGRESS ───────────────────────────────────────────────────────────────
  const TOTAL_STEPS = 6
  const stepNum = step === 7 ? 6 : Math.min(Number(step), TOTAL_STEPS)
  const progPct = Math.round((stepNum - 1) / TOTAL_STEPS * 100)

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER — uses globals.css variables so it matches the rest of the site
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div ref={topRef} style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px 100px' }}>

      {/* ── HERO ── */}
      <div style={{ textAlign:'center', padding:'44px 0 36px' }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          fontFamily:'var(--font-mono, monospace)', fontSize:10, letterSpacing:'0.15em',
          color:'var(--color-accent, #14b8a6)', textTransform:'uppercase',
          padding:'5px 14px', border:'1px solid rgba(20,184,166,0.35)',
          borderRadius:100, background:'rgba(20,184,166,0.06)', marginBottom:20,
        }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--color-accent,#14b8a6)',
            animation:'pulse 1.5s infinite', display:'inline-block' }} />
          MeshNode — AI Business Intelligence
        </div>
        <h1 style={{
          fontFamily:'var(--font-display, "DM Serif Display", serif)',
          fontSize:'clamp(26px,5vw,42px)', fontWeight:400, lineHeight:1.1,
          color:'var(--color-text, #e2e8f0)', marginBottom:14,
        }}>
          {t('Is your Oulu business', 'Jättääkö Oulu-yrityksesi')}<br/>
          {t('leaving ', '')}<em style={{ color:'var(--color-accent,#14b8a6)', fontStyle:'italic' }}>
            {t('money on the table?', 'rahaa pöydälle?')}
          </em>
          {lang === 'fi' ? '' : ''}
        </h1>
        <p style={{ fontFamily:'var(--font-body,"Outfit",sans-serif)', fontSize:15,
          color:'rgba(255,255,255,0.5)', lineHeight:1.7, maxWidth:480, margin:'0 auto 22px' }}>
          {t(
            '6 questions tailored to your exact business type. Get a personalised AI opportunity report — with ROI estimates and a 90-day roadmap.',
            '6 kysymystä räätälöitynä juuri sinun yrityksellesi. Saat henkilökohtaisen tekoälymahdollisuusraportin — ROI-arvioilla ja 90 päivän tiekartalla.'
          )}
        </p>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'8px 18px', border:'1px solid rgba(16,185,129,0.25)',
          borderRadius:100, background:'rgba(16,185,129,0.1)',
          fontFamily:'var(--font-mono,monospace)', fontSize:12, fontWeight:500,
        }}>
          <span style={{ fontSize:16, fontWeight:600, color:'#10b981' }}>5</span>
          <span style={{ color:'rgba(255,255,255,0.4)' }}>
            {t('free on-site analyses remaining this month','ilmaista paikan päällä analyysiä jäljellä tässä kuussa')}
          </span>
        </div>
      </div>

      {/* ── PROGRESS ── */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11, color:'rgba(255,255,255,0.3)' }}>
            {t('Step','Vaihe')} {stepNum} {t('of','/')} {TOTAL_STEPS}
          </span>
          <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11, color:'var(--color-accent,#14b8a6)' }}>
            {progPct}%
          </span>
        </div>
        <div style={{ height:2, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progPct}%`, background:'var(--color-accent,#14b8a6)',
            borderRadius:2, transition:'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
        </div>
      </div>

      {/* ── LIVE SCORE BAR ── */}
      {score > 0 && (
        <div style={{
          display:'flex', alignItems:'center', gap:14, padding:'12px 18px',
          background:'rgba(255,255,255,0.03)', border:'1px solid rgba(20,184,166,0.3)',
          borderRadius:10, marginBottom:28,
        }}>
          <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10,
            letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)',
            whiteSpace:'nowrap' }}>
            {t('AI opportunity','Tekoälymahdollisuus')}
          </span>
          <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${Math.min(score/10*100,100)}%`,
              background:'linear-gradient(90deg,#14b8a6,#06d6a0)', borderRadius:2,
              transition:'width 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:15,
            fontWeight:500, color:'var(--color-accent,#14b8a6)', minWidth:44, textAlign:'right' }}>
            {score.toFixed(1)}
          </span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 1 — BUSINESS TYPE
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 1 && (
        <div>
          <div style={labelStyle}>{t('Step 1 of 6 — your business type','Vaihe 1/6 — yrityksesi tyyppi')}</div>
          <h2 style={questionStyle}>{t('What type of business do you run?','Minkä tyyppistä yritystä pyörität?')}</h2>
          <p style={hintStyle}>{t('Search or browse all categories below','Hae tai selaa kaikkia kategorioita alla')}</p>

          <input
            type="text" value={search} placeholder={t('Search your business type…','Hae yrityksesi tyyppiä…')}
            onChange={e => setSearch(e.target.value)}
            style={inputStyle}
          />

          {filteredGroups.map(g => (
            <div key={g.key} style={{ marginBottom:24 }}>
              <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10,
                letterSpacing:'0.14em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.25)', marginBottom:10 }}>
                {lang === 'fi' ? g.fi : g.en}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:6 }}>
                {g.visible.map(k => (
                  <button key={k} onClick={() => { setBiz(k); setSearch('') }}
                    style={{
                      display:'flex', flexDirection:'column', alignItems:'center',
                      gap:6, padding:'14px 8px',
                      background: biz === k ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${biz === k ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius:10, cursor:'pointer', transition:'all 0.18s',
                      position:'relative',
                    }}>
                    {biz === k && (
                      <div style={{ position:'absolute', top:6, right:6, width:16, height:16,
                        borderRadius:'50%', background:'var(--color-accent,#14b8a6)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:9, fontWeight:700, color:'#080c18' }}>✓</div>
                    )}
                    <span style={{ fontSize:20, lineHeight:1 }}>{BIZ_ICONS[k]}</span>
                    <span style={{ fontSize:12, fontWeight:500,
                      color: biz === k ? 'var(--color-accent,#14b8a6)' : 'var(--color-text,#e2e8f0)',
                      textAlign:'center', lineHeight:1.2 }}>
                      {BIZ_NAMES[k]?.[lang] ?? k}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={btnRowStyle}>
            <button onClick={() => setStep(2)} disabled={!biz} style={biz ? primaryBtnStyle : disabledBtnStyle}>
              {t('Continue →','Jatka →')}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 2 — SIZE + REVENUE
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 2 && (
        <div>
          <div style={labelStyle}>{t('Step 2 of 6 — your scale','Vaihe 2/6 — mittakaavasi')}</div>
          <h2 style={questionStyle}>{t('How many people work here?','Kuinka monta ihmistä täällä työskentelee?')}</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:28 }}>
            {[
              {v:'solo', en:'Just me — solo operator', fi:'Vain minä — yksinyrittäjä'},
              {v:'2-5',  en:'2–5 people',              fi:'2–5 henkilöä'},
              {v:'6-20', en:'6–20 people',             fi:'6–20 henkilöä'},
              {v:'20-50',en:'20–50 people',            fi:'20–50 henkilöä'},
              {v:'50+',  en:'More than 50',            fi:'Yli 50'},
            ].map(o => (
              <button key={o.v} onClick={() => setSize(o.v)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'13px 16px',
                background: size === o.v ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${size === o.v ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius:9, cursor:'pointer', color:'var(--color-text,#e2e8f0)',
                fontFamily:'var(--font-body,"Outfit",sans-serif)', fontSize:14, transition:'all 0.18s',
              }}>
                <div style={{ width:17, height:17, borderRadius:'50%',
                  border:`1.5px solid ${size===o.v?'var(--color-accent,#14b8a6)':'rgba(255,255,255,0.2)'}`,
                  background: size===o.v?'var(--color-accent,#14b8a6)':'transparent',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {size===o.v && <div style={{width:5,height:5,borderRadius:'50%',background:'#080c18'}}/>}
                </div>
                {lang==='fi'?o.fi:o.en}
              </button>
            ))}
          </div>

          <h2 style={{...questionStyle, fontSize:18}}>
            {t('Estimated monthly revenue (€)','Arvioitu kuukausitulo (€)')}
          </h2>
          <p style={hintStyle}>
            {t('Drag to set — used to calculate your AI ROI potential','Vedä asettaaksesi — käytetään tekoälyn tuottopotentiaalin laskemiseen')}
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8,
            fontSize:12, color:'rgba(255,255,255,0.3)', fontFamily:'var(--font-mono,monospace)' }}>
            <span>{t('Under €2K','Alle 2 000 €')}</span>
            <span>{t('€150K+','150 000 €+')}</span>
          </div>
          <input type="range" min={1} max={10} value={revenue} step={1}
            onChange={e => setRevenue(parseInt(e.target.value))}
            style={{ width:'100%', accentColor:'var(--color-accent,#14b8a6)', cursor:'pointer' }} />
          <div style={{ textAlign:'center', fontFamily:'var(--font-mono,monospace)',
            fontSize:20, fontWeight:500, color:'var(--color-accent,#14b8a6)', marginTop:10 }}>
            {'€' + REVENUE_LABELS[revenue - 1]} / {t('month','kk')}
          </div>

          <div style={btnRowStyle}>
            <button onClick={() => setStep(1)} style={backBtnStyle}>{t('Back','Takaisin')}</button>
            <button onClick={() => setStep(3)} disabled={!size} style={size ? primaryBtnStyle : disabledBtnStyle}>
              {t('Continue →','Jatka →')}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 3 — PAIN POINTS
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 3 && (
        <div>
          <div style={labelStyle}>{t('Step 3 of 6 — your pain points','Vaihe 3/6 — kipupisteet')}</div>
          <h2 style={questionStyle}>{t('What costs you the most?','Mikä maksaa sinulle eniten?')}</h2>
          <p style={hintStyle}>{t('Select all that apply — this drives your analysis','Valitse kaikki sopivat — tämä ohjaa analyysiäsi')}</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:8 }}>
            {(PAINS[sector] ?? PAINS.sv).map(p => (
              <div key={p.v} onClick={() => togglePain(p.v)} style={{
                padding:'13px 15px', borderRadius:9, cursor:'pointer',
                background: pains.includes(p.v) ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${pains.includes(p.v) ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                transition:'all 0.18s', position:'relative',
              }}>
                {pains.includes(p.v) && (
                  <div style={{ position:'absolute', top:8, right:8, width:14, height:14,
                    borderRadius:'50%', background:'var(--color-accent,#14b8a6)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:8, fontWeight:700, color:'#080c18' }}>✓</div>
                )}
                <div style={{ fontSize:16, marginBottom:4 }}>{p.icon}</div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--color-text,#e2e8f0)',
                  lineHeight:1.3, marginBottom:3 }}>{lang==='fi'?p.fi:p.en}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', lineHeight:1.4 }}>
                  {lang==='fi'?p.sub_fi:p.sub_en}
                </div>
              </div>
            ))}
          </div>

          <div style={btnRowStyle}>
            <button onClick={() => setStep(2)} style={backBtnStyle}>{t('Back','Takaisin')}</button>
            <button onClick={() => setStep(4)} disabled={pains.length===0}
              style={pains.length ? primaryBtnStyle : disabledBtnStyle}>
              {t('Continue →','Jatka →')}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 4 — SEVERITY RATING
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 4 && (
        <div>
          <div style={labelStyle}>{t('Step 4 of 6 — severity rating','Vaihe 4/6 — vakavuusarvio')}</div>
          <h2 style={questionStyle}>
            {t('How severe is each problem?','Kuinka vakavia ongelmat ovat?')}
          </h2>
          <p style={hintStyle}>{t('1 = minor nuisance · 5 = costs you significantly every week','1 = pieni haitta · 5 = maksaa sinulle merkittävästi joka viikko')}</p>

          {(PAINS[sector] ?? PAINS.sv).filter(p => pains.includes(p.v)).map(p => (
            <div key={p.v} style={{ marginBottom:24 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--color-text,#e2e8f0)',
                marginBottom:10, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>{p.icon}</span>
                {lang==='fi'?p.fi:p.en}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,minmax(0,1fr))', gap:6 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setRatings(r => ({...r,[p.v]:n}))}
                    style={{
                      padding:'12px 6px', borderRadius:9, cursor:'pointer', textAlign:'center',
                      background: ratings[p.v]===n ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                      border:`1px solid ${ratings[p.v]===n ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                      transition:'all 0.18s',
                    }}>
                    <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:18, fontWeight:500,
                      color: ratings[p.v]===n ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.4)' }}>{n}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.25)', marginTop:3 }}>
                      {['Minor','Low','Moderate','High','Critical'][n-1]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={btnRowStyle}>
            <button onClick={() => setStep(3)} style={backBtnStyle}>{t('Back','Takaisin')}</button>
            <button onClick={() => setStep(5)} style={primaryBtnStyle}>
              {t('Continue →','Jatka →')}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 5 — TOOLS + READINESS
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 5 && (
        <div>
          <div style={labelStyle}>{t('Step 5 of 6 — your current setup','Vaihe 5/6 — nykyinen tilanne')}</div>
          <h2 style={questionStyle}>{t('What tools do you currently use?','Mitä järjestelmiä käytät tällä hetkellä?')}</h2>
          <p style={hintStyle}>{t('Select all that apply','Valitse kaikki sopivat')}</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:7, marginBottom:28 }}>
            {(TOOLS[sector] ?? TOOLS.sv).map(t2 => (
              <div key={t2.v} onClick={() => toggleTool(t2.v)} style={{
                padding:'13px 15px', borderRadius:9, cursor:'pointer',
                background: tools.includes(t2.v) ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${tools.includes(t2.v) ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                transition:'all 0.18s', position:'relative',
                fontSize:13, fontWeight:500, color:'var(--color-text,#e2e8f0)',
              }}>
                {tools.includes(t2.v) && (
                  <div style={{ position:'absolute', top:8, right:8, width:14, height:14,
                    borderRadius:'50%', background:'var(--color-accent,#14b8a6)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:8, fontWeight:700, color:'#080c18' }}>✓</div>
                )}
                {lang==='fi' ? t2.fi : t2.en}
              </div>
            ))}
          </div>

          <h2 style={{...questionStyle, fontSize:18}}>
            {t('How ready are you for AI? (1–10)','Kuinka valmis olet tekoälyyn? (1–10)')}
          </h2>
          <p style={hintStyle}>{t('1 = not ready at all · 10 = very ready to start','1 = ei lainkaan valmis · 10 = erittäin valmis')}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,minmax(0,1fr))', gap:6, marginBottom:8 }}>
            {[1,3,5,7,10].map(n => (
              <button key={n} onClick={() => setReadiness(n)} style={{
                padding:'12px 6px', borderRadius:9, cursor:'pointer', textAlign:'center',
                background: readiness===n ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${readiness===n ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.08)'}`,
                transition:'all 0.18s',
              }}>
                <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:18, fontWeight:500,
                  color: readiness===n ? 'var(--color-accent,#14b8a6)' : 'rgba(255,255,255,0.4)' }}>{n}</div>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.25)' }}>
            <span>{t('Not ready','Ei valmis')}</span>
            <span>{t('Very ready','Erittäin valmis')}</span>
          </div>

          <div style={btnRowStyle}>
            <button onClick={() => setStep(4)} style={backBtnStyle}>{t('Back','Takaisin')}</button>
            <button onClick={() => { setDemoReady(true); setStep(6) }}
              disabled={!readiness} style={readiness ? primaryBtnStyle : disabledBtnStyle}>
              {t('See my analysis →','Näytä analyysini →')}
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 6 — DEMO DASHBOARD + EMAIL GATE
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 6 && (
        <div>
          {/* Demo dashboard */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px', background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.08)', borderRadius:'10px 10px 0 0', borderBottom:'none' }}>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11,
                color:'var(--color-accent,#14b8a6)', letterSpacing:'0.12em' }}>
                MESHNODE // LIVE ANALYSIS ENGINE
              </span>
              <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10, color:'#10b981',
                display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#10b981',
                  display:'inline-block', animation:'pulse 1s infinite' }}/>
                PROCESSING
              </span>
            </div>
            <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'0 0 10px 10px', padding:20 }}>

              {/* Ring */}
              <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
                <div style={{ position:'relative', width:120, height:120,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg style={{ position:'absolute', top:0, left:0, transform:'rotate(-90deg)' }}
                    width={120} height={120} viewBox="0 0 120 120">
                    <circle cx={60} cy={60} r={50} fill="none"
                      stroke="rgba(255,255,255,0.05)" strokeWidth={7}/>
                    <circle ref={ringRef} cx={60} cy={60} r={50} fill="none"
                      stroke="#14b8a6" strokeWidth={7} strokeLinecap="round"
                      strokeDasharray="314" strokeDashoffset="314"
                      style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' }}/>
                  </svg>
                  <div style={{ textAlign:'center', zIndex:1 }}>
                    <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:28,
                      fontWeight:500, color:'var(--color-accent,#14b8a6)', lineHeight:1 }}>
                      {score.toFixed(1)}
                    </div>
                    <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:12,
                      color:'rgba(255,255,255,0.3)' }}>/10</div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign:'center', fontSize:12, color:'rgba(255,255,255,0.35)',
                marginBottom:18 }}>
                {score>=7 ? t('High opportunity — strong AI ROI','Korkea mahdollisuus — vahva tekoälyn tuotto')
                 : score>=4 ? t('Moderate — clear wins available','Kohtalainen — selkeitä hyötyjä saatavilla')
                 : t('Early stage — solid foundation','Alkuvaihe — vahva perusta')}
              </div>

              {/* Node cards */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:8, marginBottom:16 }}>
                {[
                  {label:'RISK',        val:risk.toFixed(1),     color:'#ef4444', sub:risk>=7?'High — act now':'Moderate'},
                  {label:'OPPORTUNITY', val:opp.toFixed(1),      color:'#f59e0b', sub:opp>=7?'Strong potential':'Good potential'},
                  {label:'READINESS',   val:readiness.toFixed(1),color:'#10b981', sub:readiness>=6?'Ready to start':'Building up'},
                ].map(n => (
                  <div key={n.label} style={{ background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.08)', borderRadius:9, padding:'14px 10px',
                    textAlign:'center', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                      background:n.color, borderRadius:'2px 2px 0 0' }}/>
                    <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:9,
                      letterSpacing:'0.12em', textTransform:'uppercase',
                      color:'rgba(255,255,255,0.3)', marginBottom:8 }}>{n.label}</div>
                    <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:22,
                      fontWeight:500, color:n.color }}>{n.val}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:4 }}>{n.sub}</div>
                  </div>
                ))}
              </div>

              {/* Insight pills */}
              <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:18 }}>
                {[
                  {type:'warn', msg:`${pains.length} ${t('issue','ongelma')}${pains.length!==1?t('s','a'):''} ${t('identified — severity score','tunnistettu — vakavuuspisteet')} ${pains.reduce((s,p)=>s+(ratings[p]??3),0)}`},
                  {type:'info', msg:`${t('AI ROI estimate:','Tekoälyn tuottoarvio:')} €${roiLo.toLocaleString()}–€${roiHi.toLocaleString()}/${t('mo','kk')}`},
                  ...(tools.includes('nothing')||tools.includes('excel') ? [{type:'warn',msg:t('No integrated data systems — highest AI impact zone','Ei integroituja tietojärjestelmiä — korkein tekoälyvaikutusalue')}] : []),
                ].map((ins,i) => (
                  <div key={i} style={{
                    display:'flex', gap:10, padding:'11px 14px', borderRadius:8, fontSize:13, lineHeight:1.5,
                    background: ins.type==='warn' ? 'rgba(245,158,11,0.1)' : 'rgba(20,184,166,0.1)',
                    border: `1px solid ${ins.type==='warn' ? 'rgba(245,158,11,0.2)' : 'rgba(20,184,166,0.2)'}`,
                    color: ins.type==='warn' ? '#fbbf24' : 'var(--color-accent,#14b8a6)',
                  }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', flexShrink:0, marginTop:5,
                      background: ins.type==='warn' ? '#f59e0b' : '#14b8a6' }}/>
                    {ins.msg}
                  </div>
                ))}
              </div>

              {/* Blur gate */}
              <div style={{ position:'relative' }}>
                <div style={{ filter:'blur(5px)', opacity:0.4, pointerEvents:'none', userSelect:'none',
                  padding:16, background:'rgba(255,255,255,0.02)',
                  border:'1px solid rgba(255,255,255,0.06)', borderRadius:9,
                  fontFamily:'var(--font-mono,monospace)', fontSize:11, color:'rgba(255,255,255,0.3)', lineHeight:1.9 }}>
                  ── FULL MESHNODE ANALYSIS REPORT ──────────────────<br/>
                  Recommendation_01 [CRITICAL]: Revenue recovery…<br/>
                  Recommendation_02 [HIGH]: Automation opportunity…<br/>
                  ROI Forecast 90 days: €X,XXX recoverable…<br/>
                  Implementation roadmap: Phase 1 (Week 1–4)…<br/>
                  ──────────────────────────────────────────────────
                </div>
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center', textAlign:'center',
                  background:'rgba(8,12,24,0.75)', borderRadius:9,
                  border:'1px solid rgba(20,184,166,0.4)', padding:24 }}>
                  <div style={{ fontSize:18, fontWeight:600, color:'var(--color-text,#e2e8f0)',
                    fontFamily:'var(--font-body,"Outfit",sans-serif)', marginBottom:8 }}>
                    {t('Your full report is ready','Koko raporttisi on valmis')}
                  </div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:18, lineHeight:1.6 }}>
                    {t('Includes prioritised recommendations, 90-day roadmap, and ROI forecast.',
                       'Sisältää priorisoidut suositukset, 90 päivän tiekartan ja ROI-ennusteen.')}
                  </div>
                  <button onClick={() => { /* scroll to form below */ }} style={{ padding:'10px 24px',
                    background:'var(--color-accent,#14b8a6)', color:'#080c18', border:'none',
                    borderRadius:8, fontFamily:'var(--font-body,"Outfit",sans-serif)',
                    fontSize:13, fontWeight:600, cursor:'pointer' }}>
                    {t('Enter your details below →','Syötä tietosi alta →')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div style={{ marginTop:24 }}>
            <div style={labelStyle}>{t('Step 6 of 6 — unlock your report','Vaihe 6/6 — avaa raporttisi')}</div>
            <h2 style={questionStyle}>{t('Where should we send your full analysis?','Mihin toimitamme koko analyysisi?')}</h2>

            {/* Summary */}
            <div style={{ background:'rgba(20,184,166,0.06)', border:'1px solid rgba(20,184,166,0.25)',
              borderRadius:10, padding:'14px 18px', marginBottom:20 }}>
              {[
                [t('Business type','Yritystyyppi'), BIZ_NAMES[biz]?.[lang] ?? biz],
                [t('Your score','Pisteesi'), `${score.toFixed(1)}/10`],
                [t('Issues identified','Tunnistetut ongelmat'), `${pains.length} ${t('areas','aluetta')}`],
                [t('ROI potential','Tuottopotentiaali'), `€${roiLo.toLocaleString()}–€${roiHi.toLocaleString()}/${t('mo','kk')}`],
              ].map(([k,v]) => (
                <div key={String(k)} style={{ display:'flex', justifyContent:'space-between',
                  padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', fontSize:13 }}>
                  <span style={{ color:'rgba(255,255,255,0.4)' }}>{k}</span>
                  <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:12,
                    fontWeight:500, color:'var(--color-accent,#14b8a6)' }}>{v}</span>
                </div>
              ))}
            </div>

            {[
              {id:'name',  label:t('Your name','Nimesi'),         ph:'Matti Virtanen',        val:name,    set:setName},
              {id:'bname', label:t('Business name','Yrityksen nimi'), ph:'Ravintola Pohjoinen', val:bizName, set:setBizName},
              {id:'email', label:t('Email address','Sähköpostiosoite'), ph:'matti@yrityksesi.fi', val:email,   set:setEmail},
              {id:'phone', label:t('Phone (optional)','Puhelin (valinnainen)'), ph:'+358 40 123 4567',   val:phone,   set:setPhone},
            ].map(f => (
              <div key={f.id} style={{ marginBottom:10 }}>
                <label style={{ display:'block', fontFamily:'var(--font-mono,monospace)',
                  fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.35)', marginBottom:6 }}>{f.label}</label>
                <input value={f.val} placeholder={f.ph}
                  onChange={e => f.set(e.target.value)} style={inputStyle}/>
              </div>
            ))}

            <p style={{ fontSize:11, color:'rgba(255,255,255,0.25)', lineHeight:1.6, marginTop:6 }}>
              {t('GDPR compliant · your data stays with Cognitive Mesh Lab only · no spam',
                 'GDPR-yhteensopiva · tietosi pysyvät vain Cognitive Mesh Labilla · ei roskapostia')}
            </p>

            {error && <p style={{ fontSize:12, color:'#ef4444', marginTop:8, fontFamily:'var(--font-mono,monospace)' }}>{error}</p>}

            <div style={btnRowStyle}>
              <button onClick={() => setStep(5)} style={backBtnStyle}>{t('Back','Takaisin')}</button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !name || !bizName || !email.includes('@')}
                style={submitting || !name || !bizName || !email.includes('@') ? disabledBtnStyle : primaryBtnStyle}>
                {submitting ? t('Submitting…','Lähetetään…') : t('Unlock full report →','Avaa koko raportti →')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          STEP 7 — FULL REPORT
      ════════════════════════════════════════════════════════════════════════ */}
      {step === 7 && (
        <div>
          <div style={{ padding:'20px 0 16px',
            borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:24 }}>
            <h1 style={{ fontFamily:'var(--font-display,"DM Serif Display",serif)',
              fontSize:28, fontWeight:400, color:'var(--color-text,#e2e8f0)',
              letterSpacing:'-0.02em', marginBottom:6 }}>
              {bizName} — {t('MeshNode Analysis','MeshNode-analyysi')}
            </h1>
            <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:11, color:'rgba(255,255,255,0.3)' }}>
              Cognitive Mesh Lab · Oulu · {new Date().toLocaleDateString(lang==='fi'?'fi-FI':'en-GB',{day:'numeric',month:'long',year:'numeric'})}
            </div>
          </div>

          {/* Score bars */}
          <ReportSection title={t('SCORE BREAKDOWN','PISTEIDEN ERITTELY')}>
            {[
              {label:t('Overall opportunity','Kokonaismahdollisuus'), val:score,      max:10, color:'#14b8a6'},
              {label:t('Risk index','Riskiindeksi'),                  val:risk,       max:10, color:'#ef4444'},
              {label:t('AI opportunity index','Tekoälymahdollisuusindeksi'), val:opp, max:10, color:'#f59e0b'},
              {label:t('Readiness index','Valmiusindeksi'),           val:readiness,  max:10, color:'#10b981'},
            ].map(b => (
              <div key={b.label} style={{ background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.06)', borderRadius:9,
                padding:'14px 16px', marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8 }}>
                  <span style={{ color:'rgba(255,255,255,0.4)' }}>{b.label}</span>
                  <span style={{ fontFamily:'var(--font-mono,monospace)', fontWeight:500, color:b.color }}>
                    {b.val.toFixed(1)}/10
                  </span>
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${b.val/b.max*100}%`,
                    background:b.color, borderRadius:2,
                    transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}/>
                </div>
              </div>
            ))}
          </ReportSection>

          {/* ROI */}
          <ReportSection title={t('ROI POTENTIAL','TUOTTOPOTENTIAALI')}>
            {[
              {label:t('Monthly recovery (conservative)','Kuukausittainen palautus (konservatiivinen)'), val:`€${roiLo.toLocaleString()}/${t('mo','kk')}`, pct:6},
              {label:t('Monthly recovery (optimistic)','Kuukausittainen palautus (optimistinen)'), val:`€${roiHi.toLocaleString()}/${t('mo','kk')}`, pct:18},
              {label:t('Year 1 cumulative potential','Vuosi 1 kumulatiivinen potentiaali'), val:`€${(roiLo*10).toLocaleString()}–€${(roiHi*10).toLocaleString()}`, pct:65},
            ].map(r => (
              <div key={r.label} style={{ background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.06)', borderRadius:9,
                padding:'14px 16px', marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8 }}>
                  <span style={{ color:'rgba(255,255,255,0.4)' }}>{r.label}</span>
                  <span style={{ fontFamily:'var(--font-mono,monospace)', fontWeight:500, color:'#14b8a6' }}>{r.val}</span>
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${r.pct}%`, background:'linear-gradient(90deg,#14b8a6,#06d6a0)',
                    borderRadius:2, transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}/>
                </div>
              </div>
            ))}
          </ReportSection>

          {/* Recommendations */}
          <ReportSection title={t('PRIORITISED RECOMMENDATIONS','PRIORISOIDUT SUOSITUKSET')}>
            {recs.map((r,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.08)', borderRadius:10,
                padding:16, marginBottom:10, display:'flex', gap:14, alignItems:'flex-start' }}>
                <div style={{ width:28, height:28, borderRadius:'50%',
                  background:'rgba(20,184,166,0.12)', border:'1px solid rgba(20,184,166,0.35)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-mono,monospace)', fontSize:12, fontWeight:500,
                  color:'var(--color-accent,#14b8a6)', flexShrink:0, marginTop:1 }}>
                  {i+1}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color:'var(--color-text,#e2e8f0)', marginBottom:4 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize:12, color:'#10b981', marginBottom:3 }}>↑ {r.impact}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>
                    {t('Effort','Vaiva')}: {r.effort} · {t('Timeline','Aikajana')}: {r.timeline}
                  </div>
                </div>
              </div>
            ))}
          </ReportSection>

          {/* 90-day roadmap */}
          <ReportSection title={t('90-DAY IMPLEMENTATION ROADMAP','90 PÄIVÄN TOTEUTUSSUUNNITELMA')}>
            {[
              {phase:'W1–2', color:'#f59e0b', title:t('MeshAudit on-site visit','MeshAudit-paikkakäynti'),
               detail:t('Stanley visits your location, connects to your existing data systems, runs a live MeshNode demo on your actual business data.','Stanley vierailee toimipaikassasi, yhdistää olemassa oleviin järjestelmiisi, ajaa live-demon todellisilla tiedoillasi.'),
               note:t('Zero cost · We come to you in Oulu','Ilmainen · Tulemme sinulle Ouluun')},
              {phase:'M1', color:'#14b8a6', title:t('Deploy first AI agent','Ensimmäinen tekoälyagentti'),
               detail:t('Highest-priority automation goes live. First measurable ROI visible within 2–4 weeks of deployment.','Prioriteettiautomatisointi käyttöön. Ensimmäinen mitattava tuotto näkyvissä 2–4 viikossa.'),
               note:'€149/mo MeshNode Starter'},
              {phase:'M3', color:'#10b981', title:t('Full node coverage active','Täysi solmupeitto aktiivinen'),
               detail:t('All identified pain points addressed. Full MeshNode dashboard live with weekly automated reports.','Kaikki tunnistetut kipupisteet käsitelty. MeshNode-hallintapaneeli käytössä viikoittaisilla raporteilla.'),
               note:'€349/mo MeshNode Professional'},
            ].map(p => (
              <div key={p.phase} style={{ background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.08)', borderRadius:10,
                padding:16, marginBottom:10, display:'flex', gap:14, alignItems:'flex-start' }}>
                <div style={{ minWidth:40, padding:'4px 8px', borderRadius:6,
                  background:`${p.color}20`, border:`1px solid ${p.color}40`,
                  fontFamily:'var(--font-mono,monospace)', fontSize:11, fontWeight:500,
                  color:p.color, textAlign:'center', flexShrink:0 }}>{p.phase}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color:'var(--color-text,#e2e8f0)', marginBottom:4 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', lineHeight:1.6, marginBottom:4 }}>
                    {p.detail}
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.25)' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </ReportSection>

          {/* CTA */}
          <div style={{ background:'rgba(20,184,166,0.08)', border:'1px solid rgba(20,184,166,0.3)',
            borderRadius:12, padding:'22px 24px', marginTop:8 }}>
            <div style={{ fontSize:17, fontWeight:600, color:'var(--color-text,#e2e8f0)',
              fontFamily:'var(--font-body,"Outfit",sans-serif)', marginBottom:8 }}>
              {t("You're confirmed for a free on-site MeshAudit",'Olet vahvistettu ilmaiselle MeshAudit-paikkakäynnille')}
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.45)', lineHeight:1.7, marginBottom:16 }}>
              {t(
                'Stanley will contact you within 24 hours to schedule a visit to your location in Oulu. We connect to your existing data systems and run a live MeshNode demo on your actual business data.',
                'Stanley ottaa sinuun yhteyttä 24 tunnin kuluessa aikatauluttaakseen käynnin toimipaikkaasi Oulussa.'
              )}
            </div>
            <a href="mailto:stanley@cognitivemeshlab.fi"
              style={{ display:'inline-block', padding:'10px 22px',
                background:'var(--color-accent,#14b8a6)', color:'#080c18',
                borderRadius:8, fontSize:13, fontWeight:600,
                fontFamily:'var(--font-body,"Outfit",sans-serif)', textDecoration:'none' }}>
              {t('Email Stanley directly →','Lähetä Stanley sähköpostia →')}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SUB-COMPONENT ────────────────────────────────────────────────────────────
function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ fontFamily:'var(--font-mono,monospace)', fontSize:10,
        letterSpacing:'0.16em', textTransform:'uppercase',
        color:'var(--color-accent,#14b8a6)', marginBottom:12 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily:'var(--font-mono,monospace)', fontSize:10, letterSpacing:'0.14em',
  textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:8,
}
const questionStyle: React.CSSProperties = {
  fontFamily:'var(--font-display,"DM Serif Display",serif)',
  fontSize:'clamp(18px,3.5vw,24px)', fontWeight:400, lineHeight:1.25,
  color:'var(--color-text,#e2e8f0)', marginBottom:6, letterSpacing:'-0.01em',
}
const hintStyle: React.CSSProperties = {
  fontFamily:'var(--font-body,"Outfit",sans-serif)',
  fontSize:13, color:'rgba(255,255,255,0.35)', marginBottom:20,
}
const inputStyle: React.CSSProperties = {
  width:'100%', padding:'12px 15px',
  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:9, color:'var(--color-text,#e2e8f0)',
  fontFamily:'var(--font-body,"Outfit",sans-serif)', fontSize:14, outline:'none',
}
const btnRowStyle: React.CSSProperties = { display:'flex', gap:8, marginTop:24 }
const primaryBtnStyle: React.CSSProperties = {
  flex:1, padding:'13px 22px', background:'var(--color-accent,#14b8a6)',
  color:'#080c18', border:'none', borderRadius:9,
  fontFamily:'var(--font-body,"Outfit",sans-serif)', fontSize:14, fontWeight:600,
  cursor:'pointer', letterSpacing:'-0.01em',
}
const disabledBtnStyle: React.CSSProperties = { ...primaryBtnStyle, opacity:0.3, cursor:'not-allowed' }
const backBtnStyle: React.CSSProperties = {
  padding:'13px 18px', background:'transparent', color:'rgba(255,255,255,0.35)',
  border:'1px solid rgba(255,255,255,0.1)', borderRadius:9,
  fontFamily:'var(--font-body,"Outfit",sans-serif)', fontSize:13, cursor:'pointer',
}
