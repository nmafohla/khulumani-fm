import type {
  TeamMember,
  ChartTrack,
  NewsArticle,
  StationHeroContent,
  StationContactsContent,
  SiteContentPayload,
} from "@/types/radio";
import { KHULUMANI_SHOWS } from "@/lib/showsData";

export const DEFAULT_HERO_CONTENT: StationHeroContent = {
  badge: "Montrose Studios • Bulawayo, Zimbabwe",
  headline: "Izwi Lethu, Igugu Lethu",
  subtitle:
    "Broadcasting 24/7 on 95.0 FM across Bulawayo and Matabeleland. Re-engineered for crystal-clear, uninterrupted live streaming with zero 5-minute audio dropouts.",
  announcement:
    "Live from Montrose Studios: Stream 95.0 FM non-stop, check the 7-day lineup, and vote on the Khulumani Top 10 Chart!",
};

export const STATION_CONTACTS: StationContactsContent = {
  name: "Khulumani FM 95.0",
  slogan: "Izwi Lethu, Igugu Lethu",
  parentOrg: "The Zimbabwe Broadcasting Corporation (ZBC)",
  phone: "+263 292 472 730",
  mobile: "+263 713 200 366",
  whatsappUrl:
    "https://wa.me/263713200366?text=Sawubona%20Khulumani%20FM%2095.0%20Studio!%20Listening%20live",
  email: "khulumanifm@zbc.co.zw",
  location: "Montrose Studios, Bulawayo, Zimbabwe",
  frequency: "95.0 MHz FM",
  heroTitle: "Contact Montrose Studios",
  heroSubtitle:
    "Seriously, we want to hear about you! Whether you have a song dedication, community notice, music submission, or advertising inquiry, reach out directly to our Bulawayo broadcast team.",
  socials: {
    facebook: "https://www.facebook.com/khulumanifm95.0",
    instagram: "https://www.instagram.com/khulumanifm95.0/",
    x: "https://x.com/khulumanifm95",
    tiktok: "https://www.tiktok.com/@khulumanifm95",
  },
};

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "philip",
    slug: "philip",
    name: "Philip (Cde Phil)",
    role: "Producer / Presenter",
    shows: ["Jam & Toast", "Chuu! Nomphulaphuli"],
    scheduleSummary: "Monday to Friday • 6:00 am – 9:00 am",
    bio: "Co-host of Bulawayo's flagship morning breakfast show Jam & Toast and Chuu! Nomphulaphuli, waking up the City of Kings with news, current affairs, and infectious energy.",
    image: "/images/cde-phil.jpg",
  },
  {
    id: "joe",
    slug: "joe",
    name: "Joe",
    role: "Producer / Presenter",
    shows: ["Jam & Toast"],
    scheduleSummary: "Monday to Friday • 6:00 am – 9:00 am",
    bio: "Co-host on Jam & Toast alongside Philip, delivering sharp sports updates, traffic reports, and morning banter every weekday.",
    image: "/images/post-1.jpg",
  },
  {
    id: "khanyile",
    slug: "khanyile",
    name: "Khanyile",
    role: "Producer / Presenter",
    shows: ["Chuu – Mid Morning Show"],
    scheduleSummary:
      "Mon, Wed, Fri (9:00 am – 12:00 pm) & Sun (8:00 am – 12:00 pm)",
    bio: "Host of the vibrant Chuu – Mid Morning Show, spotlighting community stories, lifestyle, youth empowerment, and Bulawayo arts.",
    image: "/images/show-banner.jpg",
  },
  {
    id: "tracy",
    slug: "tracy",
    name: "Tracy",
    role: "Producer / Presenter",
    shows: ["Chuu – Mid Morning Show", "Koloi Yamonate"],
    scheduleSummary:
      "Tue & Thu (9:00 am – 12:00 pm) • Sat & Sun (12:00 pm – 4:00 pm)",
    bio: "Bringing warmth and energy to mid-mornings on Chuu and driving weekend afternoons on Koloi Yamonate.",
    image: "/images/post-2.jpg",
  },
  {
    id: "maria",
    slug: "maria",
    name: "Maria",
    role: "Producer / Presenter",
    shows: ["Koloi Yamonate", "Jam & Toast"],
    scheduleSummary:
      "Mon, Wed, Fri (12:00 pm – 3:00 pm) • Sat (4:00 am – 8:00 am)",
    bio: "Host of Koloi Yamonate on Mondays, Wednesdays, and Fridays, plus Saturday sunrise editions of Jam & Toast.",
    image: "/images/studio-host-1.png",
  },
  {
    id: "leonard",
    slug: "leonard",
    name: "Leonard",
    role: "Producer / Presenter",
    shows: ["Koloi Yamonate", "Pyjama Party"],
    scheduleSummary:
      "Tue & Thu (12:00 pm – 3:00 pm) • Sat & Sun (8:00 pm – 12:00 am)",
    bio: "Commanding midday airwaves on Koloi Yamonate and curating soulful weekend nights on the Pyjama Party.",
    image: "/images/post-3.jpg",
  },
  {
    id: "thorne",
    slug: "thorne",
    name: "Thorne",
    role: "Producer / Presenter",
    shows: ["Vrr-Phaa Drive Time", "Chuu – Mid Morning Show"],
    scheduleSummary:
      "Mon, Wed, Fri (3:00 pm – 6:00 pm) • Sat (8:00 am – 12:00 pm) • Sat & Sun (4:00 pm – 8:00 pm)",
    bio: "Captain of the Vrr-Phaa Drive Time express, taking Bulawayo home with high-octane hits, chart countdowns, and sports.",
    image: "/images/chart-1.jpg",
  },
  {
    id: "exult",
    slug: "exult",
    name: "Exult",
    role: "Producer / Presenter",
    shows: ["Vrr-Phaa Drive Time"],
    scheduleSummary: "Tuesday & Thursday • 3:00 pm – 6:00 pm",
    bio: "Driving Tuesday and Thursday rush hours on Vrr-Phaa Drive Time with fresh local music and interactive listener debates.",
    image: "/images/chart-2.jpg",
  },
  {
    id: "thoko",
    slug: "thoko",
    name: "Thoko",
    role: "Producer / Presenter",
    shows: ["K – Lounge", "Jam & Toast"],
    scheduleSummary:
      "Mon, Wed, Fri (6:00 pm – 9:00 pm) • Sun (4:00 am – 8:00 am)",
    bio: "Your gracious host inside the evening K-Lounge and Sunday morning editions of Jam & Toast.",
    image: "/images/chart-3.jpg",
  },
  {
    id: "nokuthula",
    slug: "nokuthula",
    name: "Nokuthula",
    role: "Producer / Presenter",
    shows: ["K – Lounge"],
    scheduleSummary: "Tuesday & Thursday • 6:00 pm – 9:00 pm",
    bio: "Curating deep evening conversations, creative arts spotlights, and Afro-soul sessions in the K-Lounge.",
    image: "/images/track-1.jpg",
  },
  {
    id: "rumbidzai",
    slug: "rumbidzayi",
    name: "Rumbidzai",
    role: "Producer / Presenter",
    shows: ["Pyjama Party"],
    scheduleSummary: "Monday, Tuesday & Thursday • 9:00 pm – 12:00 am",
    bio: "Leading late-night heart-to-heart discussions, dedications, and slow jams on the Pyjama Party.",
    image: "/images/track-2.jpg",
  },
  {
    id: "rachel",
    slug: "rachel",
    name: "Rachel",
    role: "Producer / Presenter",
    shows: ["Pyjama Party"],
    scheduleSummary: "Wednesday & Friday • 9:00 pm – 12:00 am",
    bio: "Your Wednesday and Friday night companion on Pyjama Party, blending R&B classics with lively late-night call-ins.",
    image: "/images/track-3.jpg",
  },
  {
    id: "sakhaleni",
    slug: "sakhaleni",
    name: "Sakhaleni",
    role: "Producer / Presenter",
    shows: ["Indosakusa"],
    scheduleSummary: "Monday to Thursday • 3:00 am – 6:00 am",
    bio: "Guiding early risers across Matabeleland on Indosakusa (The Morning Star) with heritage wisdom and dawn melodies.",
    image: "/images/post-1.jpg",
  },
  {
    id: "valentine",
    slug: "valentine",
    name: "Valentine",
    role: "Producer / Presenter",
    shows: ["The Morning After"],
    scheduleSummary:
      "Mon, Wed, Fri (12:00 am – 3:00 am) & Sun (12:00 am – 4:00 am)",
    bio: "Keeping the midnight oil burning on The Morning After with smooth grooves and overnight shoutouts.",
    image: "/images/studio-host-1.png",
  },
  {
    id: "vuyile",
    slug: "vuyile",
    name: "Vuyile",
    role: "Producer / Presenter",
    shows: ["The Morning After", "Indosakusa"],
    scheduleSummary:
      "Tue, Thu, Sat (12:00 am – 4:00 am) & Fri (3:00 am – 6:00 am)",
    bio: "Commanding the overnight and Friday dawn airwaves on The Morning After and Indosakusa.",
    image: "/images/post-2.jpg",
  },
];

export const TOP_CHART_TRACKS: readonly ChartTrack[] = [
  {
    position: 1,
    previousPosition: 2,
    title: "Amahlolanyama (City of Kings Anthem)",
    artist: "Fab G Umshanakagogo ft. Ma9Nine",
    coverImage: "/images/track-1.jpg",
    weeksOnChart: 6,
    votes: 1420,
  },
  {
    position: 2,
    previousPosition: 1,
    title: "Sunshine",
    artist: "Tommy Blues",
    coverImage: "/images/track-2.jpg",
    weeksOnChart: 8,
    votes: 1295,
  },
  {
    position: 3,
    previousPosition: 4,
    title: "Super Natural",
    artist: "Jamie Tock",
    coverImage: "/images/track-3.jpg",
    weeksOnChart: 5,
    votes: 1180,
  },
  {
    position: 4,
    previousPosition: 3,
    title: "Into The Sky",
    artist: "Mike Lost",
    coverImage: "/images/chart-1.jpg",
    weeksOnChart: 7,
    votes: 1045,
  },
  {
    position: 5,
    previousPosition: 7,
    title: "KoBulawayo",
    artist: "Sandra Ndebele ft. Mzoe 7",
    coverImage: "/images/chart-2.jpg",
    weeksOnChart: 4,
    votes: 980,
  },
  {
    position: 6,
    previousPosition: 5,
    title: "Imali Yegolo",
    artist: "Asaph & Tha Dawg",
    coverImage: "/images/chart-3.jpg",
    weeksOnChart: 9,
    votes: 910,
  },
  {
    position: 7,
    previousPosition: 9,
    title: "Sound Opinions",
    artist: "Yana Bolder",
    coverImage: "/images/track-1.jpg",
    weeksOnChart: 3,
    votes: 865,
  },
  {
    position: 8,
    previousPosition: 6,
    title: "Ngiyakuthanda",
    artist: "Novuyo Seagirl",
    coverImage: "/images/track-2.jpg",
    weeksOnChart: 6,
    votes: 790,
  },
  {
    position: 9,
    previousPosition: 10,
    title: "Keja",
    artist: "MJ Sings & Murphy Cubic",
    coverImage: "/images/track-3.jpg",
    weeksOnChart: 2,
    votes: 740,
  },
  {
    position: 10,
    previousPosition: 8,
    title: "Matabeleland Groove",
    artist: "Bhila & Ramsey K",
    coverImage: "/images/chart-1.jpg",
    weeksOnChart: 5,
    votes: 695,
  },
];

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    id: "bulawayo-arts-festival-spotlight",
    slug: "bulawayo-arts-festival-spotlight",
    title:
      "Khulumani FM 95.0 Broadcasts Live from Bulawayo Arts & Culture Showcase",
    category: "Arts & Culture",
    date: "October 18, 2026",
    author: "Montrose News Desk",
    image: "/images/post-1.jpg",
    excerpt:
      "Khulumani FM continues to champion local creatives across Matabeleland with live outside broadcasts, acoustic studio sessions, and youth talent interviews.",
    content:
      "Broadcasting live from Montrose Studios on 95.0 MHz, Khulumani FM ('Izwi Lethu, Igugu Lethu') remains the heartbeat of Bulawayo's creative economy. This month, our Chuu Mid-Morning and K-Lounge teams are hosting emerging musicians, theatre directors, and poets live on air.",
  },
  {
    id: "top-week-chart-submissions",
    slug: "top-week-chart-submissions",
    title:
      "New Music Submissions Open for Vrr-Phaa Drive Time & Top Week Charts",
    category: "Music & Charts",
    date: "October 15, 2026",
    author: "Music Department",
    image: "/images/post-2.jpg",
    excerpt:
      "Independent artists across Bulawayo, Gwanda, Plumtree, Hwange, and Victoria Falls are invited to submit mastered singles for rotation on 95.0 FM.",
    content:
      "Khulumani FM is dedicated to giving local talent first-class airplay. Artists can drop off press kits and radio-edit MP3s at Montrose Studios or reach out to our producers via our official studio email khulumanifm@zbc.co.zw.",
  },
  {
    id: "community-roadshow-matabeleland",
    slug: "community-roadshow-matabeleland",
    title:
      "Jam & Toast and Koloi Yamonate Announce Matabeleland Community Roadshows",
    category: "Community",
    date: "October 11, 2026",
    author: "Events Team",
    image: "/images/cde-phil.jpg",
    excerpt:
      "Meet your favourite presenters Philip, Joe, Maria, Khanyile, and Thorne in person as the 95.0 FM crew hits high-density suburbs and regional growth points.",
    content:
      "True to our motto 'Izwi Lethu, Igugu Lethu', Khulumani FM is taking the studio to the people. Tune in to Jam & Toast every weekday from 6:00 am to 9:00 am for roadshow dates, giveaways, and live listener link-ups.",
  },
  {
    id: "youth-entrepreneurship-dialogues",
    slug: "youth-entrepreneurship-dialogues",
    title: "Chuu Mid-Morning Show Launches Youth Business & Skills Clinic",
    category: "Youth Empowerment",
    date: "October 6, 2026",
    author: "Khanyile & Tracy",
    image: "/images/post-3.jpg",
    excerpt:
      "Every weekday between 9:00 am and 12:00 pm, young entrepreneurs share practical insights on building sustainable enterprises in Bulawayo.",
    content:
      "Join Khanyile and Tracy on Chuu – Mid Morning Show for interactive Q&A sessions via WhatsApp (+263 713 200 366) featuring local innovators, vocational colleges, and business mentors.",
  },
];

export const DEFAULT_SITE_CONTENT: SiteContentPayload = {
  hero: DEFAULT_HERO_CONTENT,
  contacts: STATION_CONTACTS,
  shows: KHULUMANI_SHOWS,
  charts: TOP_CHART_TRACKS,
  team: TEAM_MEMBERS,
  news: NEWS_ARTICLES,
};
