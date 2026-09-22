import { useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Heart,
  Home as HomeIcon,
  MessageCircle,
  MapPin,
  MapPinned,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Star,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Footer, Navbar } from "./components/SiteChrome";
import { useStoredState } from "./hooks/useStoredState";
import "./App.css";

const workers = [
  {
    id: "w1",
    name: "Ayesha Khan",
    role: "Experienced Housekeeper",
    city: "Islamabad",
    area: "F-7",
    category: "Maid",
    experience: "6 years",
    salary: "PKR 32,000",
    rating: 4.9,
    reviews: 28,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=47",
    skills: ["Deep cleaning", "Laundry", "Cooking"],
    languages: ["Urdu", "English", "Punjabi"],
    about:
      "A calm, detail-oriented housekeeper who takes pride in making every home feel cared for.",
  },
  {
    id: "w2",
    name: "Sana Malik",
    role: "Home Cook & Baker",
    city: "Lahore",
    area: "Gulberg III",
    category: "Cook",
    experience: "8 years",
    salary: "PKR 38,000",
    rating: 4.8,
    reviews: 34,
    available: "Available in 3 days",
    image: "https://i.pravatar.cc/160?img=32",
    skills: ["Pakistani cuisine", "Baking", "Meal prep"],
    languages: ["Urdu", "English"],
    about:
      "A thoughtful cook who brings homestyle meals, careful planning, and a generous spirit to the kitchen.",
  },
  {
    id: "w3",
    name: "Nadia Raza",
    role: "Trusted Nanny",
    city: "Rawalpindi",
    area: "Bahria Town",
    category: "Nanny",
    experience: "5 years",
    salary: "PKR 30,000",
    rating: 5.0,
    reviews: 19,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=44",
    skills: ["Infant care", "Homework help", "First aid"],
    languages: ["Urdu", "English", "Punjabi"],
    about:
      "Warm and patient childcare professional experienced with toddlers and school-age children.",
  },
  {
    id: "w4",
    name: "Imran Ahmed",
    role: "Professional Driver",
    city: "Karachi",
    area: "Clifton",
    category: "Driver",
    experience: "11 years",
    salary: "PKR 45,000",
    rating: 4.7,
    reviews: 41,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=12",
    skills: ["Defensive driving", "Routes", "Vehicle care"],
    languages: ["Urdu", "English", "Sindhi"],
    about:
      "A punctual, safety-first driver with a clean record and strong knowledge of Karachi routes.",
  },
  {
    id: "w5",
    name: "Kiran Bibi",
    role: "Home Care Assistant",
    city: "Faisalabad",
    area: "Peoples Colony",
    category: "Elder Care",
    experience: "7 years",
    salary: "PKR 35,000",
    rating: 4.9,
    reviews: 22,
    available: "Available in 1 week",
    image: "https://i.pravatar.cc/160?img=49",
    skills: ["Companionship", "Medication reminders", "Mobility care"],
    languages: ["Urdu", "Punjabi"],
    about:
      "Kind, dependable support for older adults, with a focus on dignity and daily comfort.",
  },
  {
    id: "w6",
    name: "Rafiq Hussain",
    role: "Garden & Maintenance Pro",
    city: "Islamabad",
    area: "G-11",
    category: "Gardener",
    experience: "9 years",
    salary: "PKR 28,000",
    rating: 4.6,
    reviews: 16,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=68",
    skills: ["Lawn care", "Pruning", "Plants"],
    languages: ["Urdu", "Punjabi"],
    about:
      "Practical, reliable garden care for homes that want their outdoor space to thrive.",
  },
  {
    id: "w7",
    name: "Maryam Zafar",
    role: "Housekeeping Specialist",
    city: "Multan",
    area: "Cantt",
    category: "Cleaner",
    experience: "4 years",
    salary: "PKR 26,000",
    rating: 4.8,
    reviews: 13,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=23",
    skills: ["Deep cleaning", "Organization", "Ironing"],
    languages: ["Urdu", "English"],
    about:
      "Organized and efficient, with a thoughtful eye for the details that make a home run smoothly.",
  },
  {
    id: "w8",
    name: "Shazia Noor",
    role: "Childcare Specialist",
    city: "Peshawar",
    area: "Hayatabad",
    category: "Babysitter",
    experience: "6 years",
    salary: "PKR 29,000",
    rating: 4.9,
    reviews: 25,
    available: "Available now",
    image: "https://i.pravatar.cc/160?img=25",
    skills: ["Newborn care", "Creative play", "Meal prep"],
    languages: ["Urdu", "Pashto", "English"],
    about:
      "A nurturing caregiver who creates a safe, playful routine for little ones.",
  },
];
const jobs = [
  {
    id: "j1",
    title: "Live-in housekeeper for a family home",
    customer: "The Ahmed family",
    city: "Islamabad",
    category: "Maid",
    salary: "PKR 35,000 - 42,000",
    type: "Live-in",
    experience: "2+ years",
    posted: "2 days ago",
    description:
      "Looking for a dependable housekeeper to manage daily cleaning, laundry, and light meal preparation for a family of four.",
  },
  {
    id: "j2",
    title: "Part-time cook for weekday dinners",
    customer: "Maha S.",
    city: "Lahore",
    category: "Cook",
    salary: "PKR 25,000 - 30,000",
    type: "Part-time",
    experience: "3+ years",
    posted: "4 days ago",
    description:
      "Prepare fresh Pakistani and continental dinners from Monday to Friday. Ingredients and recipes are provided.",
  },
  {
    id: "j3",
    title: "Patient companion for elderly mother",
    customer: "Usman R.",
    city: "Rawalpindi",
    category: "Elder Care",
    salary: "PKR 32,000 - 38,000",
    type: "Live-out",
    experience: "4+ years",
    posted: "1 week ago",
    description:
      "Seeking a patient companion for daytime support, walks, meals, and medication reminders.",
  },
  {
    id: "j4",
    title: "After-school nanny for two children",
    customer: "Nadia A.",
    city: "Karachi",
    category: "Nanny",
    salary: "PKR 28,000 - 35,000",
    type: "Part-time",
    experience: "2+ years",
    posted: "1 week ago",
    description:
      "Pick up two children from school, help with homework, and prepare a light snack until parents return.",
  },
  {
    id: "j5",
    title: "Family driver with own license",
    customer: "S. Farooq",
    city: "Faisalabad",
    category: "Driver",
    salary: "PKR 40,000 - 48,000",
    type: "Full-time",
    experience: "5+ years",
    posted: "2 weeks ago",
    description:
      "A careful driver is needed for family errands and school runs. Must have a current license.",
  },
  {
    id: "j6",
    title: "Weekend garden maintenance",
    customer: "Bilal K.",
    city: "Islamabad",
    category: "Gardener",
    salary: "PKR 18,000 - 22,000",
    type: "Part-time",
    experience: "1+ years",
    posted: "2 weeks ago",
    description:
      "Keep a residential garden healthy with weekly lawn care, pruning, and seasonal planting.",
  },
];
const categories = [
  ["Maid", "Housekeeping", "🧺"],
  ["Cook", "Home cooking", "🍲"],
  ["Nanny", "Childcare", "🧸"],
  ["Driver", "Safe rides", "🚗"],
  ["Cleaner", "Deep cleaning", "✨"],
  ["Elder Care", "Companionship", "🌿"],
  ["Gardener", "Outdoor care", "🌱"],
  ["Babysitter", "Little ones", "🫶"],
];
const testimonials = [
  {
    quote:
      "We found a wonderful housekeeper in just two days. The profiles feel genuine and the process is refreshingly simple.",
    name: "Hira S.",
    detail: "Customer in Islamabad",
  },
  {
    quote:
      "Maid & Servants Online helped me find a family who values my experience. I felt respected from the first message.",
    name: "Sana M.",
    detail: "Cook in Lahore",
  },
  {
    quote:
      "The filters make it easy to find exactly what we need without wasting anyone’s time.",
    name: "Omar A.",
    detail: "Customer in Karachi",
  },
];

function workerMapQuery(worker) {
  return `${worker.name}, ${worker.category}, ${worker.area}, ${worker.city}, Pakistan`;
}

function salaryRange(workers) {
  const amounts = workers.flatMap((worker) =>
    [...worker.salary.matchAll(/([\d,]+)/g)].map((match) =>
      Number(match[1].replace(/,/g, "")),
    ),
  );
  if (!amounts.length) return "Salary shared on profile";
  const lowest = Math.min(...amounts).toLocaleString("en-PK");
  const highest = Math.max(...amounts).toLocaleString("en-PK");
  return lowest === highest ? `PKR ${lowest}` : `PKR ${lowest} - ${highest}`;
}

function assistantReply(question, location, workerList) {
  const prompt = question.toLowerCase();
  const cities = [...new Set(workerList.map((worker) => worker.city))];
  const mentionedCity = cities.find((city) =>
    prompt.includes(city.toLowerCase()),
  );
  const locationName = mentionedCity || location.trim() || "your area";
  const citySuggestions = cities
    .filter((city) => city.toLowerCase().startsWith(prompt.trim()))
    .slice(0, 5);
  const isGreeting = /^(hi|hello|hey|salam|assalamualaikum|assalam o alaikum|good morning|good afternoon|good evening|good night|how are you|thanks|thank you)[!.?\s]*$/i.test(
    question.trim(),
  );
  const mentionsGreeting = /\b(hi|hello|hey|salam|assalamualaikum|assalam o alaikum)\b/i.test(
    question,
  );
  const category = [
    "Maid",
    "Cook",
    "Nanny",
    "Driver",
    "Cleaner",
    "Elder Care",
    "Gardener",
    "Babysitter",
  ].find((item) => prompt.includes(item.toLowerCase()));
  const cityMatch = workerList.filter((worker) =>
    worker.city.toLowerCase().includes(locationName.toLowerCase()),
  );
  const categoryMatch = category
    ? workerList.filter((worker) => worker.category === category)
    : workerList;
  const locationAndCategory = cityMatch.filter(
    (worker) => !category || worker.category === category,
  );
  const nearby = (locationAndCategory.length ? locationAndCategory : categoryMatch)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const nearbySalaryRange = salaryRange(nearby);

  if (isGreeting) {
    return {
      text: "Hello, it’s lovely to hear from you. I’m doing well and ready to help. Tell me your city and the kind of help you need, or ask me to show every worker category nearby.",
      workers: [],
      cities,
    };
  }

  if (mentionsGreeting && (prompt.includes("how are you") || prompt.includes("today"))) {
    const today = new Intl.DateTimeFormat("en-PK", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    return {
      text: `Hello, I’m doing well and happy to help. Today is ${today}. What would you like to talk about: home help, work, food, planning, or something else?`,
      workers: [],
      cities: [],
    };
  }

  if (
    prompt.includes("who are you") ||
    prompt.includes("what are you") ||
    prompt.includes("your name")
  ) {
    return {
      text: "I’m the home-help guide for Maid & Servants Online. I can help you compare worker profiles, services, locations, availability, salary guidance, and safe first steps.",
      workers: [],
      cities,
    };
  }

  if (
    prompt.includes("what can you do") ||
    prompt.includes("how can you help") ||
    prompt.includes("what services") ||
    prompt.includes("which services") ||
    prompt.includes("what kind of help")
  ) {
    return {
      text: "I can help you find a maid, cook, nanny, driver, cleaner, elder-care assistant, gardener, or babysitter. Tell me a city and I’ll show matching profiles with their category, experience, availability, rating, and salary guidance.",
      workers: [],
      cities,
    };
  }

  if (
    prompt.includes("how do i hire") ||
    prompt.includes("how can i hire") ||
    prompt.includes("how does hiring") ||
    prompt.includes("how it works") ||
    prompt.includes("hire someone")
  ) {
    return {
      text: "A good first step is to choose a profile, review the person’s skills and availability, then message them about your routine, schedule, expectations, and salary. Meet thoughtfully before making a final decision.",
      workers: [],
      cities,
    };
  }

  if (
    prompt.includes("what date") ||
    prompt.includes("today") ||
    prompt.includes("what day is it")
  ) {
    const today = new Intl.DateTimeFormat("en-PK", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    return {
      text: `Today is ${today}. How can I help you find the right support for your home?`,
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("what time") || prompt.includes("current time")) {
    const time = new Intl.DateTimeFormat("en-PK", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date());
    return {
      text: `It’s ${time} right now. What would you like to get done today?`,
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("weather")) {
    return {
      text: "I can help you plan around the weather, but I don’t have a live weather connection yet. Tell me your city and check a trusted local weather service for today’s exact forecast.",
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("news") || prompt.includes("latest update")) {
    return {
      text: "I don’t have live news access in this version, so I don’t want to guess. For current updates, please check a trusted news source. I can still help you with planning, hiring, or everyday questions.",
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("what should i cook") || prompt.includes("what to cook") || prompt.includes("food idea")) {
    return {
      text: "For an easy day, try daal with rice, chicken karahi with roti, or a vegetable pulao. If you tell me what ingredients you have and how much time you have, I can suggest something more specific.",
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("tired") || prompt.includes("stressed") || prompt.includes("sad")) {
    return {
      text: "I’m sorry you’re feeling that way. Take a small pause, drink some water, and focus on one gentle next step. If you want, tell me what is making today difficult and I’ll listen.",
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("joke")) {
    return {
      text: "Why did the cleaner bring a ladder? Because the job had very high standards. I’m here for practical questions too.",
      workers: [],
      cities: [],
    };
  }

  if (prompt.includes("language") || prompt.includes("speak")) {
    return {
      text: "Languages are listed on each worker profile. Open a recommendation to check whether they speak Urdu, English, Punjabi, Sindhi, Pashto, or another language that works for your home.",
      workers: nearby,
      cities,
    };
  }

  if (prompt.includes("review") || prompt.includes("experience") || prompt.includes("skill")) {
    return {
      text: `I can help you compare experience, skills, ratings, and reviews. These ${nearby.length} profiles are the closest matches I found near ${locationName}.`,
      workers: nearby,
      cities,
    };
  }

  const searchWords = [
    "worker",
    "help",
    "near",
    "show",
    "find",
    "available",
    "salary",
    "cost",
    "price",
    "safe",
    "trust",
    "verify",
    "hire",
    "recommend",
    "best",
    "much",
    "map",
    "direction",
    "where",
  ];
  const isWorkerRequest =
    Boolean(category) || searchWords.some((word) => prompt.includes(word));

  if (!mentionedCity && category && !location.trim()) {
    return {
      text: `I can help you find a ${category.toLowerCase()}. Which city should I search in? You can tap a city below.`,
      workers: [],
      cities,
    };
  }

  if (!mentionedCity && !isWorkerRequest) {
    const suggestedCities = citySuggestions.length ? citySuggestions : cities;
    return {
      text: citySuggestions.length
        ? `I think you may mean ${citySuggestions.join(" or ")}. Tap a city below and I’ll show the workers listed there.`
        : `I’m not quite sure what you mean yet. You can try ${suggestedCities.join(", ")}. Tap a city below, or tell me which kind of home help you need.`,
      workers: [],
      cities: suggestedCities,
    };
  }

  if (mentionedCity && !category) {
    const cityWorkers = cityMatch.sort((a, b) => b.rating - a.rating).slice(0, 3);
    return {
      text: `Of course. Here are the worker categories currently listed in ${mentionedCity}. The listed salary range is ${salaryRange(cityWorkers)}. You can ask me to narrow this down to a maid, cook, nanny, driver, or another service.`,
      workers: cityWorkers,
      cities,
    };
  }

  if (
    prompt.includes("salary") ||
    prompt.includes("cost") ||
    prompt.includes("price") ||
    prompt.includes("how much")
  ) {
    return {
      text: `That depends on the schedule and the person’s experience. For these ${category || "worker"} profiles, the listed salary range is ${nearbySalaryRange}. I pulled together each worker’s guidance so you can compare it before starting a conversation.`,
      workers: nearby,
      cities,
    };
  }
  if (prompt.includes("available") || prompt.includes("availability")) {
    const available = nearby.filter((worker) => worker.available === "Available now");
    return {
      text: available.length
        ? `Good news. I found ${available.length} ${category || "worker"}${available.length === 1 ? "" : "s"} in or near ${locationName} who are marked available now. The listed range is ${salaryRange(available)}. I’d still confirm the schedule in your first message.`
        : `I’m not seeing an available-now match in ${locationName} today. These are the closest profiles I could find, and their current availability is shown on each card.`,
      workers: available.length ? available : nearby,
      cities,
    };
  }
  if (prompt.includes("safe") || prompt.includes("trust") || prompt.includes("verify")) {
    return {
      text: "I’d start by asking about routines, references, and availability, then meet thoughtfully before hiring. For privacy, the site shows an area and city only, never an exact home address.",
      workers: nearby,
      cities,
    };
  }
  if (prompt.includes("map") || prompt.includes("direction") || prompt.includes("where is")) {
    return {
      text: `I can show service areas for workers near ${locationName}. For privacy, profiles share only an area and city. Open a worker profile or use the Find in map page for location context.`,
      workers: nearby,
      cities,
    };
  }
  return {
    text: "I want to make sure I understand you correctly. Are you looking for a worker, asking about a service, checking salary or availability, or looking for hiring and safety advice?",
    workers: [],
    cities,
  };
}

function App() {
  const [user, setUser] = useStoredState("authUser", null);
  const [favorites, setFavorites] = useStoredState("favorites", []);
  const [savedJobs, setSavedJobs] = useStoredState("savedJobs", []);
  const [applications, setApplications] = useStoredState("applications", []);
  const [toast, setToast] = useState("");
  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setToast(
      favorites.includes(id) ? "Removed from favorites" : "Saved to favorites",
    );
    setTimeout(() => setToast(""), 2200);
  };
  const toggleSavedJob = (id) => {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setToast(
      savedJobs.includes(id) ? "Job removed from saved jobs" : "Job saved",
    );
    setTimeout(() => setToast(""), 2200);
  };
  const applyToJob = (id) => {
    if (applications.includes(id)) return false;
    setApplications((current) => [...current, id]);
    setToast("Application submitted successfully");
    setTimeout(() => setToast(""), 2200);
    return true;
  };
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar user={user} setUser={setUser} favorites={favorites} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/workers"
            element={
              <Workers favorites={favorites} toggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/workers/:id"
            element={
              <WorkerDetails
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/map" element={<WorkerMap />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route
            path="/jobs/:id"
            element={
              <JobDetails
                savedJobs={savedJobs}
                toggleSavedJob={toggleSavedJob}
                applications={applications}
                applyToJob={applyToJob}
              />
            }
          />
          <Route
            path="/login"
            element={<Auth mode="login" setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Auth mode="register" setUser={setUser} />}
          />
          <Route path="/register/worker" element={<WorkerRegister />} />
          <Route
            path="/favorites"
            element={
              <Protected user={user}>
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </Protected>
            }
          />
          <Route
            path="/messages"
            element={
              <Protected user={user}>
                <Messages />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected user={user}>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/hiring-requests"
            element={
              <Protected user={user}>
                <HiringRequests />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected user={user}>
                <Profile user={user} />
              </Protected>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <Protected user={user}>
                <EditProfile user={user} setUser={setUser} />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected user={user}>
                <Settings />
              </Protected>
            }
          />
          <Route path="/how-it-works" element={<InfoPage type="how" />} />
          <Route path="/about" element={<InfoPage type="about" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <AssistantLauncher />
        {toast && (
          <div className="toast">
            <Check size={16} />
            {toast}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> Trusted help, closer to home
            </span>
            <h1>
              Good help makes <i>home</i> feel better.
            </h1>
            <p>
              Find reliable maids, cooks, nannies and more, with profiles made
              to help you choose with confidence.
            </p>
            <div className="hero-search">
              <div>
                <Search size={19} />
                <input
                  aria-label="Search for a service"
                  placeholder="What kind of help do you need?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() =>
                  navigate(`/workers${query ? `?search=${query}` : ""}`)
                }
              >
                Find workers <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-note">
              <ShieldCheck size={16} /> Browse local profiles, compare
              experience, and start the conversation safely.
            </div>
          </div>
          <div className="hero-art">
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85"
                alt="Bright welcoming kitchen"
              />
            </div>
            <div className="hero-stat">
              <strong>4.9/5</strong>
              <span>
                <Star size={13} fill="currentColor" /> average community rating
              </span>
            </div>
            <div className="hero-float">
              <span className="avatar-stack">
                <img src={workers[0].image} alt="" />
                <img src={workers[2].image} alt="" />
                <img src={workers[4].image} alt="" />
              </span>
              <b>2,400+</b>
              <small>trusted connections</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Start with what you need</span>
            <h2>Find the right kind of help</h2>
          </div>
          <Link to="/workers" className="arrow-link">
            View all services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map(([name, desc, icon]) => (
            <Link
              className="category-card"
              to={`/workers?category=${encodeURIComponent(name)}`}
              key={name}
            >
              <span className="category-icon">{icon}</span>
              <strong>{name}</strong>
              <small>{desc}</small>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section soft-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A few good options</span>
            <h2>Meet people ready to help</h2>
          </div>
          <Link to="/workers" className="arrow-link">
            Browse all workers <ArrowRight size={16} />
          </Link>
        </div>
        <div className="worker-grid">
          {workers.slice(0, 3).map((worker) => (
            <WorkerCard worker={worker} key={worker.id} />
          ))}
        </div>
      </section>
      <section className="how-section section">
        <div className="how-intro">
          <span className="eyebrow">Simple by design</span>
          <h2>From searching to settled.</h2>
          <p>
            We keep the process human, clear, and easy to move at your own pace.
          </p>
          <Link to="/how-it-works" className="button button-dark">
            See how it works <ArrowRight size={16} />
          </Link>
        </div>
        <div className="steps">
          <Step
            number="01"
            icon={<Search />}
            title="Search"
            text="Tell us what kind of support your home needs."
          />
          <Step
            number="02"
            icon={<MessageCircle />}
            title="Connect"
            text="Read real profiles and start a conversation."
          />
          <Step
            number="03"
            icon={<Heart />}
            title="Find your fit"
            text="Choose the right person for your home and routine."
          />
        </div>
      </section>
      <section className="testimonial-section section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Words from the community</span>
            <h2>Built on good experiences</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial" key={item.name}>
              <div className="stars">★★★★★</div>
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="cta-section">
        <div>
          <span className="eyebrow">For people who care for homes</span>
          <h2>Ready for a better way to find help?</h2>
          <p>
            Join a growing community of households and professionals building
            trust, one conversation at a time.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/workers" className="button button-light">
            Find a worker <ArrowRight size={16} />
          </Link>
          <Link to="/register/worker" className="button button-outline">
            Create a worker profile
          </Link>
        </div>
      </section>
    </main>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="step">
      <span className="step-number">{number}</span>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Assistant() {
  const [registeredWorkers] = useStoredState("workerProfiles", []);
  const allWorkers = [...workers, ...registeredWorkers];
  const [location, setLocation] = useState("");
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Hi, I’m your home-help guide. Tell me what you need, and I’ll use the worker profiles to suggest a nearby fit.",
    },
  ]);

  const ask = (prompt = question) => {
    if (!prompt.trim()) return;
    setIsTyping(true);
    setMessages((current) => [...current, { from: "you", text: prompt }]);
    setQuestion("");
    window.setTimeout(() => {
      const response = assistantReply(prompt, location, allWorkers);
      setMessages((current) => [
        ...current,
        {
          from: "agent",
          text: response.text,
          workers: response.workers,
          cities: response.cities,
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <main className="page assistant-page">
      <div className="assistant-intro">
        <div>
          <span className="eyebrow"><Sparkles size={13} /> Your home-help guide</span>
          <h1>Ask better questions. Find a closer fit.</h1>
          <p>
            Get quick answers from the worker profiles already on Maid &amp;
            Servants Online, plus suggestions around the location you choose.
          </p>
        </div>
        <div className="assistant-badge"><Bot size={22} /><span>Profile-aware<br />recommendations</span></div>
      </div>

      <div className="assistant-layout">
        <section className="assistant-chat" aria-label="AI assistant">
          <div className="assistant-chat-head">
            <div className="assistant-avatar"><Bot size={19} /></div>
            <div><strong>Home-help AI</strong><small>Uses public profile details only</small></div>
            <span className="assistant-live"><span /> Ready</span>
          </div>
          <div className="assistant-messages">
            {messages.map((message, index) => (
              <div className={message.from === "you" ? "assistant-message own" : "assistant-message"} key={`${message.text}-${index}`}>
                <p>{message.text}</p>
                {message.workers?.length > 0 && (
                  <div className="assistant-results">
                    {message.workers.map((worker) => (
                      <article className="assistant-worker" key={worker.id}>
                        <img src={worker.image} alt={worker.name} />
                        <div>
                          <strong>{worker.name}</strong>
                          <span className="assistant-worker-category">{worker.category}</span>
                          <span>{worker.role}</span>
                          <small><MapPin size={12} /> {worker.area}, {worker.city}</small>
                          <small><Star size={12} fill="currentColor" /> {worker.rating || "New"} · {worker.salary}</small>
                        </div>
                        <Link to={`/workers/${worker.id}`} aria-label={`View ${worker.name} profile`}><ArrowRight size={15} /></Link>
                      </article>
                    ))}
                  </div>
                )}
                {message.cities?.length > 0 && message.from === "agent" && (
                  <div className="assistant-city-suggestions">
                    {message.cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        className={message.selectedCity === city ? "selected" : ""}
                        disabled={Boolean(message.selectedCity)}
                        onClick={() => {
                          setMessages((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, selectedCity: city }
                                : item,
                            ),
                          );
                          setLocation(city);
                          ask(city);
                        }}
                      >
                        <MapPin size={13} /> {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && <div className="assistant-typing"><span /><span /><span /> Looking through nearby profiles...</div>}
          </div>
          <form className="assistant-composer" onSubmit={(event) => { event.preventDefault(); ask(); }}>
            <input aria-label="Ask the home-help AI" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about a worker, service, salary, or safety..." />
            <button className="send-button" aria-label="Ask assistant" type="submit"><Send size={17} /></button>
          </form>
        </section>

        <aside className="assistant-side">
          <div className="assistant-location">
            <span className="eyebrow"><MapPin size={13} /> Recommendation area</span>
            <label htmlFor="assistant-location">Where do you need help?</label>
            <input id="assistant-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, for example Islamabad" />
            <small>We share city and area only. Exact addresses stay private.</small>
          </div>
          <div className="assistant-prompts">
            <span className="eyebrow">Try asking</span>
            {[
              "Who is available now near me?",
              "Show me a cook with baking skills",
              "What should I ask before hiring?",
              "What salary should I expect?",
            ].map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<ArrowRight size={14} /></button>)}
          </div>
          <div className="assistant-privacy"><ShieldCheck size={18} /><p><strong>Thoughtful by design</strong><br />The agent only shares the same public profile information you can see on the site.</p></div>
        </aside>
      </div>
    </main>
  );
}

function AssistantLauncher() {
  return (
    <Link
      to="/assistant"
      className="assistant-launcher"
      aria-label="Open home-help AI assistant"
      title="Ask the home-help AI"
    >
      <span className="assistant-launcher-pulse" />
      <Bot size={22} />
    </Link>
  );
}

function WorkerCard({ worker, favorites = [], toggleFavorite = () => {} }) {
  const isFavorite = favorites.includes(worker.id);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workerMapQuery(worker))}`;
  return (
    <article className="worker-card">
      <div className="worker-image">
        <img src={worker.image} alt={worker.name} />
        <button
          className={isFavorite ? "heart-btn saved" : "heart-btn"}
          onClick={() => toggleFavorite(worker.id)}
          aria-label="Save worker"
        >
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        {worker.available === "Available now" && (
          <span className="availability">Available now</span>
        )}
      </div>
      <div className="worker-info">
        <div className="card-topline">
          <span className="category-label">{worker.category}</span>
          <span className="verified">
            <ShieldCheck size={13} /> Verified
          </span>
        </div>
        <Link to={`/workers/${worker.id}`} className="worker-name">
          {worker.name}
        </Link>
        <p className="worker-role">{worker.role}</p>
        <p className="muted">
          <HomeIcon size={14} /> {worker.area}, {worker.city}
        </p>
        <a
          className="location-link"
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={13} /> Open location in Google Maps
        </a>
        <div className="card-meta">
          <span>
            <Star size={14} fill="currentColor" /> {worker.rating}{" "}
            <small>({worker.reviews})</small>
          </span>
          <span>{worker.experience}</span>
        </div>
        <div className="card-bottom">
          <strong>
            {worker.salary}
            <small>/month</small>
          </strong>
          <Link to={`/workers/${worker.id}`} className="view-link">
            View profile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Workers({ favorites, toggleFavorite }) {
  const params = new URLSearchParams(useLocation().search);
  const initial = params.get("search") || "";
  const [search, setSearch] = useState(initial);
  const [category, setCategory] = useState(
    params.get("category") || "All services",
  );
  const [city, setCity] = useState("All cities");
  const [sort, setSort] = useState("Recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const result = useMemo(
    () =>
      workers
        .filter(
          (worker) =>
            (!search ||
              `${worker.name} ${worker.role} ${worker.category}`
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (category === "All services" || worker.category === category) &&
            (city === "All cities" || worker.city === city),
        )
        .sort((a, b) =>
          sort === "Rating"
            ? b.rating - a.rating
            : sort === "Experience"
              ? parseInt(b.experience) - parseInt(a.experience)
              : sort === "Salary Low to High"
                ? parseInt(a.salary.replace(/\D/g, "")) -
                  parseInt(b.salary.replace(/\D/g, ""))
                : 0,
        ),
    [search, category, city, sort],
  );
  return (
    <main className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">The worker directory</span>
          <h1>Find help that fits your home.</h1>
          <p>
            Browse real profiles from people ready to make everyday life a
            little lighter.
          </p>
        </div>
        <Link to="/register/worker" className="button button-dark">
          Offer your skills <ArrowRight size={16} />
        </Link>
      </div>
      <div className="marketplace-layout">
        <aside className={filterOpen ? "filters open" : "filters"}>
          <div className="filter-head">
            <h3>Refine your search</h3>
            <button
              className="close-filter"
              onClick={() => setFilterOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <label>
            Search
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or service"
            />
          </label>
          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All services</option>
              {categories.map(([name]) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Location
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option>All cities</option>
              {[
                "Islamabad",
                "Rawalpindi",
                "Lahore",
                "Karachi",
                "Faisalabad",
                "Multan",
                "Peshawar",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <div className="filter-tip">
            <ShieldCheck size={17} />
            <span>
              <strong>Choose with confidence</strong>
              <small>
                Look for verified profiles and reviews from the community.
              </small>
            </span>
          </div>
          <button
            className="button button-dark filter-apply"
            onClick={() => setFilterOpen(false)}
          >
            Show {result.length} workers
          </button>
        </aside>
        <div className="market-results">
          <div className="results-toolbar">
            <button
              className="filter-toggle"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <span>
              <strong>{result.length}</strong> people ready to help
            </span>
            <label>
              Sort by{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Recommended</option>
                <option>Rating</option>
                <option>Experience</option>
                <option>Salary Low to High</option>
              </select>
            </label>
          </div>
          {result.length ? (
            <div className="worker-grid">
              {result.map((worker) => (
                <WorkerCard
                  worker={worker}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  key={worker.id}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No workers found"
              text="Try widening your search or choosing another service."
            />
          )}
        </div>
      </div>
    </main>
  );
}

function Jobs() {
  const [search, setSearch] = useState("");
  const filtered = jobs.filter((job) =>
    `${job.title} ${job.category} ${job.city}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <main className="page">
      <div className="page-header jobs-header">
        <div>
          <span className="eyebrow">Opportunities near you</span>
          <h1>Find work that feels right.</h1>
          <p>
            Explore thoughtful households looking for reliable, skilled help.
          </p>
        </div>
        <Link to="/register/worker" className="button button-dark">
          Create your profile <ArrowRight size={16} />
        </Link>
      </div>
      <div className="job-search">
        <Search size={19} />
        <input
          placeholder="Search by role, category, or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="button button-dark"
          onClick={() => setSearch(search.trim())}
        >
          Search jobs
        </button>
      </div>
      <div className="jobs-list">
        {filtered.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </main>
  );
}

function WorkerMap() {
  const [search, setSearch] = useState("");
  const mapPreviewRef = useRef(null);
  const [registeredWorkers] = useStoredState("workerProfiles", []);
  const allWorkers = [...workers, ...registeredWorkers];
  const [selectedWorkerId, setSelectedWorkerId] = useState(allWorkers[0]?.id);
  const filteredWorkers = allWorkers.filter((worker) =>
    `${worker.name} ${worker.category} ${worker.area} ${worker.city}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const selectedWorker =
    filteredWorkers.find((worker) => worker.id === selectedWorkerId) ||
    filteredWorkers[0];
  const selectedMapUrl = selectedWorker
    ? `https://www.google.com/maps?q=${encodeURIComponent(workerMapQuery(selectedWorker))}&output=embed`
    : "https://www.google.com/maps?q=Pakistan&output=embed";
  const selectedWorkerMapUrl = selectedWorker
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workerMapQuery(selectedWorker))}`
    : "https://www.google.com/maps";
  const showWorkerOnMap = (worker) => {
    setSelectedWorkerId(worker.id);
    requestAnimationFrame(() => {
      mapPreviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="page map-page">
      <div className="page-header map-page-header">
        <div>
          <span className="eyebrow">Local help, easier to discover</span>
          <h1>Find workers near you.</h1>
          <p>
            Browse the service areas shared by our fictional worker profiles,
            then open the area in Google Maps for directions and context.
          </p>
        </div>
        <a
          className="button button-dark"
          href={selectedWorkerMapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MapPinned size={16} /> Show in Map
        </a>
      </div>

      <div className="map-toolbar">
        <Search size={18} />
        <input
          aria-label="Search worker locations"
          placeholder="Search by name, service, area, or city"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <span>{filteredWorkers.length} locations</span>
      </div>

      <div className="map-notice">
        <ShieldCheck size={18} />
        <p>
          For privacy, profiles show an area and city only. Exact home addresses
          are never displayed publicly.
        </p>
      </div>

      <div className="map-preview" ref={mapPreviewRef}>
        <div className="map-preview-heading">
          <div>
            <span className="eyebrow">Now showing on map</span>
            <h2>
              {selectedWorker
                ? `${selectedWorker.area}, ${selectedWorker.city}`
                : "Worker locations"}
            </h2>
            {selectedWorker && (
              <p className="map-selected-worker">
                <MapPin size={13} /> {selectedWorker.name} · {selectedWorker.category}
              </p>
            )}
          </div>
          <MapPinned size={22} />
        </div>
        <iframe
          key={selectedWorker?.id || "all-workers"}
          title="Google map showing the selected worker service area"
          src={selectedMapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {filteredWorkers.length ? (
        <div className="location-grid">
          {filteredWorkers.map((worker) => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workerMapQuery(worker))}`;
            return (
              <article className="location-card" key={worker.id}>
                <div className="location-card-top">
                  <img src={worker.image} alt={worker.name} />
                  <div>
                    <span className="category-label">{worker.category}</span>
                    <h2>{worker.name}</h2>
                    <p>{worker.role}</p>
                  </div>
                </div>
                <div className="location-address">
                  <MapPin size={17} />
                  <div>
                    <strong>{worker.area}</strong>
                    <span>{worker.city}, Pakistan</span>
                  </div>
                </div>
                <button
                  className="location-select"
                  onClick={() => showWorkerOnMap(worker)}
                  aria-pressed={selectedWorker?.id === worker.id}
                >
                  <MapPin size={14} />
                  {selectedWorker?.id === worker.id
                    ? "Showing on map"
                    : "Show in Map"}
                </button>
                <div className="location-card-actions">
                  <Link to={`/workers/${worker.id}`} className="view-link">
                    View profile <ArrowRight size={14} />
                  </Link>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-soft"
                  >
                    <MapPin size={14} /> Google Maps
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No locations found"
          text="Try another city, area, or service."
          action="Browse workers"
        />
      )}
    </main>
  );
}

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-icon">
        <BriefcaseBusiness size={21} />
      </div>
      <div className="job-content">
        <div className="job-top">
          <span className="category-label">{job.category}</span>
          <span className="muted">
            <Clock3 size={14} /> {job.posted}
          </span>
        </div>
        <Link to={`/jobs/${job.id}`} className="job-title">
          {job.title}
        </Link>
        <p>{job.description}</p>
        <div className="job-meta">
          <span>
            <HomeIcon size={14} /> {job.city}
          </span>
          <span>
            <UsersRound size={14} /> {job.type}
          </span>
          <span>
            <Star size={14} /> {job.experience}
          </span>
        </div>
      </div>
      <div className="job-pay">
        <strong>{job.salary}</strong>
        <Link to={`/jobs/${job.id}`} className="view-link">
          See details <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

function WorkerDetails({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const [registeredWorkers] = useStoredState("workerProfiles", []);
  const worker = [...workers, ...registeredWorkers].find(
    (item) => item.id === id,
  );
  if (!worker) return <NotFound />;
  return (
    <main className="page detail-page">
      <Link to="/workers" className="back-link">
        <ArrowRight size={15} /> Back to workers
      </Link>
      <div className="profile-layout">
        <section>
          <div className="profile-banner">
            <img src={worker.image} alt={worker.name} />
            <div>
              <div className="card-topline">
                <span className="category-label">{worker.category}</span>
                <span className="verified">
                  <ShieldCheck size={13} /> Verified profile
                </span>
              </div>
              <h1>{worker.name}</h1>
              <p>{worker.role}</p>
              <div className="profile-facts">
                <span>
                  <HomeIcon size={15} /> {worker.area}, {worker.city}
                </span>
                <span>
                  <Star size={15} fill="currentColor" /> {worker.rating} (
                  {worker.reviews} reviews)
                </span>
                <span>
                  <Clock3 size={15} /> {worker.experience}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-section">
            <h2>About {worker.name.split(" ")[0]}</h2>
            <p className="lead-copy">{worker.about}</p>
          </div>
          <div className="detail-section">
            <h2>Skills & services</h2>
            <div className="pill-list">
              {worker.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="detail-section">
            <h2>Languages</h2>
            <div className="pill-list quiet-pills">
              {worker.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </div>
          <div className="detail-section work-history">
            <h2>Experience</h2>
            <div>
              <span className="timeline-dot" />
              <p>
                <strong>{worker.role}</strong>
                <small>{worker.experience} of household experience</small>
              </p>
            </div>
          </div>
        </section>
        <aside className="profile-aside">
          <div className="contact-card">
            <span className="eyebrow">A good next step</span>
            <h3>Start a conversation</h3>
            <p>
              Ask about availability, routines, and what your home needs before
              making a decision.
            </p>
            <div className="aside-price">
              <small>Expected salary</small>
              <strong>
                {worker.salary}
                <em>/month</em>
              </strong>
            </div>
            <div className="aside-row">
              <span>Availability</span>
              <b>{worker.available}</b>
            </div>
            <div className="aside-row">
              <span>Location</span>
              <b>{worker.city}</b>
            </div>
            <Link to="/messages" className="button button-dark full-button">
              <MessageCircle size={16} /> Contact {worker.name.split(" ")[0]}
            </Link>
            <button
              className={
                favorites.includes(worker.id)
                  ? "button button-soft full-button saved-action"
                  : "button button-soft full-button"
              }
              onClick={() => toggleFavorite(worker.id)}
            >
              <Heart
                size={16}
                fill={favorites.includes(worker.id) ? "currentColor" : "none"}
              />{" "}
              {favorites.includes(worker.id)
                ? "Saved to favorites"
                : "Save to favorites"}
            </button>
          </div>
          <div className="safety-card">
            <ShieldCheck size={21} />
            <div>
              <strong>Stay safe</strong>
              <p>
                Meet in a public place first and never send money before hiring.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
function JobDetails({ savedJobs, toggleSavedJob, applications, applyToJob }) {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);
  const applied = applications.includes(id);
  const saved = savedJobs.includes(id);
  if (!job) return <NotFound />;
  return (
    <main className="page detail-page">
      <Link to="/jobs" className="back-link">
        <ArrowRight size={15} /> Back to jobs
      </Link>
      <div className="job-detail-layout">
        <section className="job-detail-main">
          <span className="category-label">{job.category}</span>
          <h1>{job.title}</h1>
          <p className="job-byline">
            Posted by {job.customer} · {job.posted}
          </p>
          <div className="large-job-facts">
            <span>
              <HomeIcon size={17} />
              {job.city}
            </span>
            <span>
              <BriefcaseBusiness size={17} />
              {job.type}
            </span>
            <span>
              <Clock3 size={17} />
              {job.experience}
            </span>
          </div>
          <div className="detail-section">
            <h2>About the role</h2>
            <p className="lead-copy">
              {job.description} We are looking for someone warm, punctual, and
              comfortable communicating openly about the work.
            </p>
          </div>
          <div className="detail-section">
            <h2>Responsibilities</h2>
            <ul className="check-list">
              <li>
                <Check size={16} />
                Keep a clear, consistent daily routine.
              </li>
              <li>
                <Check size={16} />
                Treat the home and family with care.
              </li>
              <li>
                <Check size={16} />
                Communicate schedule changes early.
              </li>
            </ul>
          </div>
        </section>
        <aside className="profile-aside">
          <div className="contact-card">
            <span className="eyebrow">This opportunity</span>
            <h3>{job.salary}</h3>
            <p>
              {job.type} · {job.city}
            </p>
            <button
              className="button button-dark full-button"
              onClick={() => applyToJob(id)}
            >
              {applied ? (
                <>
                  <Check size={16} /> Application sent
                </>
              ) : (
                <>
                  Apply now <ArrowRight size={16} />
                </>
              )}
            </button>
            <button
              className="button button-soft full-button"
              onClick={() => toggleSavedJob(id)}
            >
              <Heart size={16} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved job" : "Save job"}
            </button>
            {applied && (
              <div className="success-note">
                <Check size={15} /> Application submitted successfully.
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

function Auth({ mode, setUser }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(mode === "register");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "Islamabad",
    type: "Customer",
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (isRegister && !form.name))
      return setError("Please complete the required fields.");
    const name = form.name || form.email.split("@")[0];
    setUser({ name, email: form.email, city: form.city, type: form.type });
    navigate("/profile");
  };
  return (
    <main className="auth-page">
      <div className="auth-visual">
        <span className="eyebrow">A better way to find help</span>
        <h1>Make room for what matters.</h1>
        <p>
          Connect with people who bring care, skill, and pride to the work they
          do.
        </p>
        <div className="auth-quote">
          <Star size={16} fill="currentColor" /> “It felt like a conversation
          with a neighbor, not a transaction.”
        </div>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-form">
          <span className="eyebrow">
            {isRegister ? "Join the community" : "Welcome back"}
          </span>
          <h2>
            {isRegister ? "Create your account" : "Log in to your account"}
          </h2>
          <p>
            {isRegister
              ? "Save favorites, message people, and manage your profile."
              : "Pick up where you left off."}
          </p>
          {error && <div className="form-error">{error}</div>}
          {notice && <div className="success-note">{notice}</div>}
          <form onSubmit={submit}>
            {isRegister && (
              <label>
                Full name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </label>
            )}
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 8 characters"
              />
            </label>
            {isRegister && (
              <>
                <label>
                  City
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  >
                    {[
                      "Islamabad",
                      "Rawalpindi",
                      "Lahore",
                      "Karachi",
                      "Faisalabad",
                      "Multan",
                      "Peshawar",
                    ].map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </label>
                <label>
                  I am joining as
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option>Customer</option>
                    <option>Worker / Servant</option>
                  </select>
                </label>
              </>
            )}
            {!isRegister && (
              <div className="form-row">
                <label className="checkbox">
                  <input type="checkbox" /> Remember me
                </label>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() =>
                    setNotice(
                      form.email
                        ? `A recovery link would be sent to ${form.email}.`
                        : "Enter your email first to request a recovery link.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}
             <button className="button button-dark full-button">
              {isRegister ? "Create account" : "Log in"}{" "}
              <ArrowRight size={16} />
             </button>
          </form>
          <div className="auth-switch">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Log in" : "Create account"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Protected({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}
function Favorites({ favorites, toggleFavorite }) {
  const saved = workers.filter((worker) => favorites.includes(worker.id));
  return (
    <main className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Your shortlist</span>
          <h1>Favorites</h1>
          <p>Keep the profiles that feel promising close at hand.</p>
        </div>
      </div>
      {saved.length ? (
        <div className="worker-grid">
          {saved.map((worker) => (
            <WorkerCard
              worker={worker}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              key={worker.id}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your shortlist is empty"
          text="Tap the heart on a worker profile to save it here."
          action="Browse workers"
        />
      )}
    </main>
  );
}
function Messages() {
  const [messages, setMessages] = useStoredState("messages", [
    {
      from: "Sana Malik",
      text: "Hello! I would be happy to answer any questions about my availability.",
      time: "10:42 AM",
    },
  ]);
  const [text, setText] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");
  const visibleConversations = [
    {
      worker: workers[1],
      preview: messages[messages.length - 1].text,
      time: "10:42",
    },
    {
      worker: workers[2],
      preview: "Thank you for reaching out.",
      time: "Yesterday",
    },
  ].filter((conversation) =>
    `${conversation.worker.name} ${conversation.worker.role}`
      .toLowerCase()
      .includes(conversationSearch.toLowerCase()),
  );
  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { from: "You", text, time: "Now" }]);
    setText("");
  };
  return (
    <main className="page dashboard-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Your conversations</span>
          <h1>Messages</h1>
        </div>
      </div>
      <div className="chat-layout">
        <aside className="chat-list">
          <div className="chat-search">
            <Search size={15} />
            <input
              placeholder="Search conversations"
              value={conversationSearch}
              onChange={(e) => setConversationSearch(e.target.value)}
            />
          </div>
          {visibleConversations.length ? (
            visibleConversations.map((conversation, index) => (
              <div
                className={
                  index === 0 ? "conversation selected" : "conversation"
                }
                key={conversation.worker.id}
              >
                <img src={conversation.worker.image} alt="" />
                <div>
                  <strong>{conversation.worker.name}</strong>
                  <small>{conversation.worker.role}</small>
                  <p>{conversation.preview}</p>
                </div>
                <time>{conversation.time}</time>
              </div>
            ))
          ) : (
            <p className="muted" style={{ padding: "16px" }}>
              No conversations found.
            </p>
          )}
        </aside>
        <section className="chat-window">
          <div className="chat-head">
            <img src={workers[1].image} alt="" />
            <div>
              <strong>Sana Malik</strong>
              <small>
                <span className="online-dot" /> Usually replies quickly
              </small>
            </div>
            <Link to="/workers/w2" className="icon-button" title="View profile">
              <UserRound size={18} />
            </Link>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                className={message.from === "You" ? "message own" : "message"}
                key={`${message.time}-${index}`}
              >
                <span>{message.text}</span>
                <small>{message.time}</small>
              </div>
            ))}
          </div>
          <div className="message-composer">
            <button
              className="icon-button"
              title="Add a friendly emoji"
              onClick={() => setText((current) => `${current} 🙂`)}
            >
              <span>☺</span>
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Write a message..."
            />
            <button className="send-button" onClick={send}>
              <Send size={17} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
function Notifications() {
  const [items, setItems] = useStoredState("notifications", [
    {
      id: 1,
      icon: "!",
      title: "New message from Sana Malik",
      text: "I would be happy to answer your questions.",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      icon: "♡",
      title: "Your profile was viewed",
      text: "A customer in Islamabad viewed your profile.",
      time: "Yesterday",
      unread: true,
    },
    {
      id: 3,
      icon: "*",
      title: "New job matching your skills",
      text: "Live-in housekeeper in Islamabad.",
      time: "2 days ago",
      unread: false,
    },
  ]);
  return (
    <main className="page dashboard-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Stay in the loop</span>
          <h1>Notifications</h1>
        </div>
        <button
          className="text-btn"
          onClick={() =>
            setItems(items.map((item) => ({ ...item, unread: false })))
          }
        >
          Mark all as read
        </button>
      </div>
      <div className="notification-list">
        {items.map((item) => (
          <article
            className={item.unread ? "notification unread" : "notification"}
            key={item.id}
          >
            <span className="notification-icon">{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <small>{item.time}</small>
            </div>
            {item.unread && <span className="unread-dot" />}
          </article>
        ))}
      </div>
    </main>
  );
}
function HiringRequests() {
  const [requests, setRequests] = useState([
    {
      name: "Ayesha Khan",
      role: "Experienced Housekeeper",
      status: "Pending",
      image: workers[0].image,
    },
    {
      name: "Nadia Raza",
      role: "Trusted Nanny",
      status: "Accepted",
      image: workers[2].image,
    },
  ]);
  return (
    <main className="page dashboard-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Keep things moving</span>
          <h1>Hiring requests</h1>
          <p>Manage conversations and next steps in one place.</p>
        </div>
      </div>
      <div className="request-list">
        {requests.map((request, index) => (
          <article className="request-card" key={request.name}>
            <img src={request.image} alt="" />
            <div>
              <strong>{request.name}</strong>
              <p>{request.role}</p>
              <small>Requested 3 days ago · Islamabad</small>
            </div>
            <span className={`status ${request.status.toLowerCase()}`}>
              {request.status}
            </span>
            {request.status === "Pending" && (
              <div className="request-actions">
                <button
                  className="button button-dark"
                  onClick={() =>
                    setRequests(
                      requests.map((item, i) =>
                        i === index ? { ...item, status: "Accepted" } : item,
                      ),
                    )
                  }
                >
                  Accept
                </button>
                <button
                  className="button button-soft"
                  onClick={() =>
                    setRequests(requests.filter((_, i) => i !== index))
                  }
                >
                  Decline
                </button>
              </div>
            )}
            <Link to="/messages" className="view-link">
              Message <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
function Profile({ user }) {
  return (
    <main className="page dashboard-page">
      <div className="profile-dashboard">
        <div className="profile-dashboard-head">
          <div className="large-avatar">{user.name.charAt(0)}</div>
          <div>
            <span className="eyebrow">{user.type || "Customer"} account</span>
            <h1>{user.name}</h1>
            <p>
              <UserRound size={14} /> {user.email} · {user.city}
            </p>
          </div>
          <Link to="/profile/edit" className="button button-soft">
            Edit profile
          </Link>
        </div>
        <div className="dashboard-grid">
          <Link to="/favorites" className="dashboard-tile">
            <Heart />
            <strong>Favorites</strong>
            <span>Saved workers to revisit</span>
            <ArrowRight />
          </Link>
          <Link to="/messages" className="dashboard-tile">
            <MessageCircle />
            <strong>Messages</strong>
            <span>Continue a conversation</span>
            <ArrowRight />
          </Link>
          <Link to="/hiring-requests" className="dashboard-tile">
            <BriefcaseBusiness />
            <strong>Hiring requests</strong>
            <span>See your active requests</span>
            <ArrowRight />
          </Link>
          <Link to="/settings" className="dashboard-tile">
            <SlidersHorizontal />
            <strong>Settings</strong>
            <span>Privacy and preferences</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
function EditProfile({ user, setUser }) {
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);
  const save = (e) => {
    e.preventDefault();
    setUser(form);
    setSaved(true);
  };
  return (
    <main className="page form-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Your public presence</span>
          <h1>Edit profile</h1>
          <p>Keep your details current so the right people can find you.</p>
        </div>
      </div>
      <form className="edit-form" onSubmit={save}>
        <label>
          Full name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          City
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            {[
              "Islamabad",
              "Rawalpindi",
              "Lahore",
              "Karachi",
              "Faisalabad",
              "Multan",
              "Peshawar",
            ].map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>
        <label>
          About you
          <textarea placeholder="Tell the community a little about yourself..." />
        </label>
        <button className="button button-dark">
          Save changes <Check size={16} />
        </button>
        {saved && (
          <span className="success-note">
            <Check size={15} /> Profile updated
          </span>
        )}
      </form>
    </main>
  );
}
function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useStoredState("settings", {
    email: true,
    messages: true,
    jobs: true,
    visible: true,
  });
  return (
    <main className="page form-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Make it yours</span>
          <h1>Settings</h1>
        </div>
      </div>
      <div className="settings-list">
        <h3>Notifications</h3>
        {[
          [
            "email",
            "Email notifications",
            "Occasional updates about your account",
          ],
          ["messages", "Message notifications", "Know when someone replies"],
          [
            "jobs",
            "Job notifications",
            "Get matched with relevant opportunities",
          ],
        ].map(([key, title, desc]) => (
          <div className="setting-row" key={key}>
            <div>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
            <button
              className={settings[key] ? "toggle on" : "toggle"}
              onClick={() =>
                setSettings({ ...settings, [key]: !settings[key] })
              }
            >
              <span />
            </button>
          </div>
        ))}
        <h3>Privacy</h3>
        <div className="setting-row">
          <div>
            <strong>Profile visibility</strong>
            <p>Let people discover your profile in search</p>
          </div>
          <button
            className={settings.visible ? "toggle on" : "toggle"}
            onClick={() =>
              setSettings({ ...settings, visible: !settings.visible })
            }
          >
            <span />
          </button>
        </div>
        <div className="danger-zone">
          <strong>Danger zone</strong>
          <p>
            Deleting your account removes your local profile from this device.
          </p>
          <button
            className="button button-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Delete this local demo account and sign out? This cannot be undone.",
                )
              ) {
                localStorage.removeItem("authUser");
                navigate("/");
                window.location.reload();
              }
            }}
          >
            Delete account
          </button>
        </div>
      </div>
    </main>
  );
}
function InfoPage({ type }) {
  const how = type === "how";
  return (
    <main className="page info-page">
      <div className="info-hero">
        <span className="eyebrow">
          {how ? "A clearer path forward" : "Our reason for being"}
        </span>
        <h1>
          {how
            ? "Finding the right help should feel simple."
            : "Care work deserves more trust, respect, and visibility."}
        </h1>
        <p>
          {how
            ? "Whether you are opening your home to help or opening a new chapter at work, we give you the tools to move thoughtfully."
            : "Maid & Servants Online is a community marketplace built around the belief that good work starts with a good conversation."}
        </p>
      </div>
      <div className="info-grid">
        {(how
          ? [
              [
                "01",
                "Search with intention",
                "Use categories, location, and experience to find profiles that fit your real routine.",
              ],
              [
                "02",
                "Ask the right questions",
                "Message people directly. Talk through expectations, schedule, and comfort before deciding.",
              ],
              [
                "03",
                "Make a good match",
                "Choose the person who feels right for your home, skills, and way of working.",
              ],
              [
                "04",
                "Build trust over time",
                "Leave thoughtful reviews and keep the community useful for everyone.",
              ],
            ]
          : [
              [
                "01",
                "A more human marketplace",
                "People are more than job titles. Our profiles make space for experience, personality, and expectations.",
              ],
              [
                "02",
                "Trust, made visible",
                "Reviews, availability, skills, and clear conversations help both sides make informed decisions.",
              ],
              [
                "03",
                "Respect for the work",
                "Domestic work is skilled, essential work. We are here to make it easier to find and value.",
              ],
              [
                "04",
                "Safer first steps",
                "We share practical safety guidance and encourage meeting thoughtfully before hiring.",
              ],
            ]
        ).map(([number, title, text]) => (
          <article className="info-block" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main className="page contact-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">We are listening</span>
          <h1>Let’s talk.</h1>
          <p>
            Questions, feedback, or a thoughtful suggestion? Send us a note.
          </p>
        </div>
      </div>
      <div className="contact-layout">
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Email
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
            Subject
            <input required placeholder="How can we help?" />
          </label>
          <label>
            Message
            <textarea required placeholder="Write your message..." />
          </label>
          <button className="button button-dark">
            {sent ? (
              <>
                <Check size={16} /> Message sent
              </>
            ) : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </button>
        </form>
        <div className="contact-details">
          <h2>Come say hello</h2>
          <p>Our small team is here Monday to Friday, 9am to 6pm.</p>
          <div>
            <strong>Email</strong>
            <span>hello@maidservantsonline.example</span>
          </div>
          <div>
            <strong>Phone</strong>
            <span>+92 51 000 2026</span>
          </div>
          <div>
            <strong>Based in</strong>
            <span>Islamabad, Pakistan</span>
          </div>
        </div>
      </div>
    </main>
  );
}
function Help() {
  const [open, setOpen] = useState(0);
  const faqs = [
    "How do I find a maid?",
    "How do I hire a worker?",
    "How do workers apply for jobs?",
    "Is registration free?",
    "How does verification work?",
    "How do I report a user?",
    "How do I change my profile?",
  ];
  return (
    <main className="page help-page">
      <div className="info-hero">
        <span className="eyebrow">Help center</span>
        <h1>Good questions are welcome here.</h1>
        <p>Everything you need to get started with more confidence.</p>
      </div>
      <div className="faq-list">
        {faqs.map((question, index) => (
          <div className={open === index ? "faq open" : "faq"} key={question}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{question}</span>
              <ChevronDown size={18} />
            </button>
            {open === index && (
              <p>
                {index === 0
                  ? "Start on Find Workers, choose a category and location, then browse profiles with experience and reviews that fit your needs."
                  : "This frontend demo simulates the flow locally. In a real conversation, always agree on responsibilities, schedule, and compensation before you begin."}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="safety-banner">
        <ShieldCheck size={24} />
        <div>
          <strong>A note on staying safe</strong>
          <p>
            Never send money before meeting and agreeing on the work. Trust your
            instincts, meet thoughtfully, and report anything that feels wrong.
          </p>
        </div>
      </div>
    </main>
  );
}
function WorkerRegister() {
  const [saved, setSaved] = useState(false);
  const [, setRegisteredWorkers] = useStoredState("workerProfiles", []);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Islamabad",
    area: "",
    category: "Maid",
    experience: "1-2 years",
    salary: "",
    about: "",
  });
  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };
  return (
    <main className="page form-page">
      <div className="page-header compact">
        <div>
          <span className="eyebrow">Share your skills</span>
          <h1>Create a worker profile</h1>
          <p>Help the right households discover what you do best.</p>
        </div>
      </div>
      <form
        className="edit-form two-column"
        onSubmit={(e) => {
          e.preventDefault();
          setRegisteredWorkers((current) => [
            ...current,
            {
              id: `registered-${Date.now()}`,
              name: form.name,
              role: form.category,
              city: form.city,
              area: form.area,
              category: form.category,
              experience: form.experience,
              salary: form.salary || "Salary discussed",
              rating: 0,
              reviews: 0,
              available: "Availability to confirm",
              image: `https://i.pravatar.cc/160?u=${encodeURIComponent(form.name)}`,
              skills: [],
              languages: [],
              about: form.about,
              phone: form.phone,
            },
          ]);
          setSaved(true);
        }}
      >
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={updateField("name")}
            placeholder="Your name"
          />
        </label>
        <label>
          Phone
          <input
            required
            value={form.phone}
            onChange={updateField("phone")}
            placeholder="03XX XXXXXXX"
          />
        </label>
        <label>
          City
          <select value={form.city} onChange={updateField("city")}>
            <option>Islamabad</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Rawalpindi</option>
            <option>Faisalabad</option>
            <option>Multan</option>
            <option>Peshawar</option>
          </select>
        </label>
        <label>
          Area / service location
          <input
            required
            value={form.area}
            onChange={updateField("area")}
            placeholder="For example, F-7 or Gulberg"
          />
        </label>
        <label>
          Category
          <select value={form.category} onChange={updateField("category")}>
            {categories.map(([name]) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          Experience
          <select value={form.experience} onChange={updateField("experience")}>
            <option>1-2 years</option>
            <option>3-5 years</option>
            <option>6-10 years</option>
            <option>10+ years</option>
          </select>
        </label>
        <label>
          Expected salary
          <input
            value={form.salary}
            onChange={updateField("salary")}
            placeholder="PKR per month"
          />
        </label>
        <label className="wide">
          About you
          <textarea
            required
            value={form.about}
            onChange={updateField("about")}
            placeholder="Tell households about your experience, skills, and the work you enjoy..."
          />
        </label>
        <button className="button button-dark">
          {saved ? (
            <>
              <Check size={16} /> Profile created and location saved
            </>
          ) : (
            <>
              Create profile <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </main>
  );
}
function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <span>
        <Search size={22} />
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action && (
        <Link to="/workers" className="button button-dark">
          {action} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>That page took a day off.</h1>
      <p>Let’s get you back to people and places that are here.</p>
      <Link to="/" className="button button-dark">
        Back to home <ArrowRight size={16} />
      </Link>
    </main>
  );
}

export default App;
