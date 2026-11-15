import { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Shield,
  MapPin,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
  Scroll,
  Info
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';

const HERITAGE_DOSSIERS = [
  {
    id: 'kedarnath',
    name: 'Kedarnath Dham',
    image: '/images/destinations/kedarnath.jpg',
    shrine: '12th Jyotirlinga of Shiva',
    altitude: '3,583m (11,755 ft)',
    district: 'Rudraprayag, Garhwal',
    architecture: 'Katyuri style grey stone masonry without mortar, interlocking granite blocks that withstood the 2013 flash floods.',
    chronicle: 'Reconstructed by Adi Shankaracharya in the 8th Century CE. Legend attributes original foundation to the Pandavas seeking absolution from Lord Shiva after the Kurukshetra war.',
    rituals: [
      'Maha Abhishek at 04:00 AM (Booking via Shrine Board)',
      'Evening Aarti with rhythmic sounding of damrus and shankhs at 18:30',
      'Circumambulation (Parikrama) of the sanctum in clockwise cadence',
      'Darshan of Bhairavnath Temple to seal the pilgrimage merit',
    ],
    dressCode: 'Head covering mandatory. Strict exclusion of leather belts, wallets, and footwear inside perimeter. Heavy woollens required year-round.',
    biometricProtocol: 'Mandatory pre-registration at devasthanam.uk.gov.in. Medical fitness certificate required for pilgrims over 50.',
    languages: {
      en: {
        greeting: 'Namaste & Jai Kedar!',
        keyPhrase: 'Can you show me the route to the sanctum?',
        etiquette: 'Please do not film photography inside the Garbhagriha.',
      },
      hi: {
        greeting: 'नमस्ते और जय केदार!',
        keyPhrase: 'क्या आप गर्भगृह की ओर जाने वाला मार्ग दिखा सकते हैं?',
        etiquette: 'कृपया गर्भगृह के अंदर फोटोग्राफी न करें।',
      },
      garhwali: {
        greeting: 'प्रणाम! जय बाबा केदारनाथ!',
        keyPhrase: 'बाबा का मंदिर को बाट कख बटी च?',
        etiquette: 'मंदिर भीतर फोटो खीचणो सखत मणा च।',
      },
      kumaoni: {
        greeting: 'पैलाग! जय केदारनाथ महाराज!',
        keyPhrase: 'मंदिरै तरफ जाणि बाट कतूर बटी छ?',
        etiquette: 'मंदिर भितर फोटो खीचण मना छ।',
      },
    },
  },
  {
    id: 'badrinath',
    name: 'Badrinath Dham',
    image: '/images/destinations/badrinath.jpg',
    shrine: 'Supreme Vishnu Dhama (Char Dham)',
    altitude: '3,133m (10,279 ft)',
    district: 'Chamoli, Garhwal',
    architecture: 'Traditional hill-pagoda temple with brightly painted colourful facade, conical roof capped with a gold gilt cupola on the banks of Alaknanda.',
    chronicle: 'Seat of Badri Vishal where Lord Vishnu performed rigorous austerities while Goddess Lakshmi sheltered him as a Badri (jujube) tree.',
    rituals: [
      'Maha Snan at Tapt Kund natural sulphur thermal spring prior to darshan',
      'Morning Geeta Govinda recitations during Shringaar Darshan',
      'Offering of holy Brahma Kamal and Van Tulsi garlands',
      'Evening Shayan Aarti at 20:30',
    ],
    dressCode: 'Modest traditional Indian attire recommended. Remove all synthetic plastic bags before the inner courtyard.',
    biometricProtocol: 'Devasthanam Board e-pass required at Mana and Pandukeshwar checkposts.',
    languages: {
      en: {
        greeting: 'Jai Badri Vishal!',
        keyPhrase: 'Where is the entry line for the Tapt Kund thermal bath?',
        etiquette: 'Maintain silence during morning Vedic recitations.',
      },
      hi: {
        greeting: 'जय बद्री विशाल!',
        keyPhrase: 'तप्त कुंड स्नान के लिए प्रवेश पंक्ति कहाँ है?',
        etiquette: 'वैदिक पाठ के समय शांति और मर्यादा बनाए रखें।',
      },
      garhwali: {
        greeting: 'जय बद्रीनाथ भगवान!',
        keyPhrase: 'तप्त कुंड न्हौण की लाइन कख बटी च?',
        etiquette: 'पूजा का बखत शांत रौण जरूरी च।',
      },
      kumaoni: {
        greeting: 'जय बद्री विशाल महाराज!',
        keyPhrase: 'तप्त कुंड मा न्हौण खातिर कतूर जाणि छ?',
        etiquette: 'पाठ हुनै बखत आदर राखिबे चुप रया।',
      },
    },
  },
  {
    id: 'jageshwar-dham',
    name: 'Jageshwar Dham',
    image: '/images/destinations/jageshwar.jpg',
    shrine: 'Cluster of 124 Nagara Shiva Temples',
    altitude: '1,870m (6,135 ft)',
    district: 'Almora, Kumaon',
    architecture: 'Nagara & Katyuri shikhara clusters constructed of large stone blocks, nestled inside dense Deodar cedar groves along the Jata Ganga.',
    chronicle: 'Origin dates from 7th to 14th century CE. Believed to be the sacred spot of the first Jyotirlinga (Nagesh Darukavane) according to Shiva Purana.',
    rituals: [
      'Mrityunjaya Mahamantra chanting at Maha Mrityunjay Shrine',
      'Rudrabhishek performed by traditional hereditary priests',
      'Quiet meditation along the sacred Jata Ganga stream',
    ],
    dressCode: 'Respectful attire. Avoid stepping on consecrated stone plinths.',
    biometricProtocol: 'Open heritage site maintained by ASI (Archaeological Survey of India).',
    languages: {
      en: {
        greeting: 'Jai Jageshwar Mahadev!',
        keyPhrase: 'Which shrine is the oldest Maha Mrityunjaya temple?',
        etiquette: 'Do not climb or step on the ancient stone relics.',
      },
      hi: {
        greeting: 'जय जागेश्वर महादेव!',
        keyPhrase: 'इनमें से सबसे प्राचीन महामृत्युंजय मंदिर कौन सा है?',
        etiquette: 'प्राचीन पत्थरों पर पैर न रखें और मर्यादा रखें।',
      },
      garhwali: {
        greeting: 'प्रणाम! जागेश्वर महादेवै किरपा बनी रौ!',
        keyPhrase: 'मुख्य महामृत्युंजय देवल कख च?',
        etiquette: 'पुरानी देवलों पर पाँव नि धरण।',
      },
      kumaoni: {
        greeting: 'पैलाग! जागेश्वर भगवान रक्षा करन!',
        keyPhrase: 'बड्ड महामृत्युंजय मंदिर कतूर छ?',
        etiquette: 'प्राचीन देवलन मा आदर राखिबे हिंडिया।',
      },
    },
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh Tapovan & Triveni',
    image: '/images/destinations/rishikesh.jpg',
    shrine: 'Spiritual Gateway of the Himalayas',
    altitude: '356m (1,168 ft)',
    district: 'Dehradun / Pauri Garhwal',
    architecture: 'Riverside ghat architecture blended with ashram pavilions, hanging suspension bridges (Ram & Laxman Jhula), and meditation domes.',
    chronicle: 'Legend states Lord Rama performed penance here. The Beatles stayed at Maharishi Mahesh Yogi ashram in 1968, putting global focus on yoga and meditation.',
    rituals: [
      'Ganga Aarti at Triveni Ghat at sunset (18:00)',
      'Sunrise pranayama on the white sand beaches of Shivpuri',
      'Dipping at the confluence of sacred tributaries',
      'Vipassana silence meditation retreats',
    ],
    dressCode: 'Modest casual attire. Cover shoulders and knees when visiting ashram grounds and evening aartis.',
    biometricProtocol: 'Free entry for all domestic and foreign travellers.',
    languages: {
      en: {
        greeting: 'Har Har Gange!',
        keyPhrase: 'What time does the evening Ganga Aarti begin?',
        etiquette: 'Respect ashram silence hours after 21:00.',
      },
      hi: {
        greeting: 'हर हर गंगे!',
        keyPhrase: 'शाम की गंगा आरती कितने बजे शुरू होती है?',
        etiquette: 'रात ९ बजे के बाद आश्रमों में शांति बनाए रखें।',
      },
      garhwali: {
        greeting: 'हर हर गंगे माता!',
        keyPhrase: 'गंगा जी की आरती कब शुरू होंदी?',
        etiquette: 'आश्रम मा हल्ला-गुल्ला नि करणो।',
      },
      kumaoni: {
        greeting: 'हर हर गंगे मैया!',
        keyPhrase: 'संज्या गंगा आरती कति बखत हुनी?',
        etiquette: 'आश्रम भितर शांति राखिया।',
      },
    },
  },
];

export default function HeritageGPTPage() {
  const [selectedDossier, setSelectedDossier] = useState(HERITAGE_DOSSIERS[0]);
  const [activeLang, setActiveLang] = useState('en');

  const langNames = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'garhwali', label: 'गढ़वळि (Garhwali)' },
    { code: 'kumaoni', label: 'कुमाऊँनी (Kumaoni)' },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
            <span>Home</span>
            <span>/</span>
            <span>Heritage & Vernacular Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Cultural Intelligence & Sacred Etiquette
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1 leading-relaxed">
            Ancient Nagara temple architecture, Vedic ritual timings, biometric pass guides, and multi-dialect Pahadi phrasebooks for Uttarakhand shrines.
          </p>
        </div>

        {/* Circuit Selectors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {HERITAGE_DOSSIERS.map((dossier) => {
            const isSelected = selectedDossier.id === dossier.id;
            return (
              <button
                key={dossier.id}
                onClick={() => setSelectedDossier(dossier)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#008CFF] bg-blue-50/70 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase text-[#008CFF] block mb-1">
                  {dossier.altitude}
                </span>
                <h3 className="font-bold text-sm text-gray-900">
                  {dossier.name}
                </h3>
                <span className="text-xs text-gray-500 block truncate mt-0.5">
                  {dossier.district}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Dossier Content */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#008CFF]">
                  {selectedDossier.shrine}
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900">
                {selectedDossier.name}
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                {selectedDossier.district} • Elevation: {selectedDossier.altitude}
              </p>
            </div>

            {/* Architecture & Chronicle */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Architectural Style & Stone Masonry
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedDossier.architecture}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Historical Chronicle & Vedic Lore
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedDossier.chronicle}
                </p>
              </div>
            </div>

            {/* Sacred Rituals Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Key Darshan & Ritual Cadence
              </h3>
              <div className="space-y-2">
                {selectedDossier.rituals.map((ritual, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 p-2.5 rounded-lg border border-gray-100 bg-white">
                    <CheckCircle2 size={15} className="text-[#00A86B] shrink-0 mt-0.5" />
                    <span>{ritual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dialect Phrasebook */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#008CFF] flex items-center gap-1.5">
                  <Languages size={15} /> Vernacular Dialect Phrasebook
                </h3>
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {langNames.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setActiveLang(l.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeLang === l.code
                          ? 'bg-[#008CFF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Greeting / Salutation:</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    {selectedDossier.languages[activeLang]?.greeting}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Common Wayfinding Query:</span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">
                    "{selectedDossier.languages[activeLang]?.keyPhrase}"
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Sanctum Respect Etiquette:</span>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {selectedDossier.languages[activeLang]?.etiquette}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Rules & Biometrics */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF6D38] uppercase">
                <Shield size={16} /> Sanctum Dress Code
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedDossier.dressCode}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#008CFF] uppercase">
                <Info size={16} /> Biometric e-Pass Rules
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedDossier.biometricProtocol}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
