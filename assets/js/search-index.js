// Static site search index — plain pages + service/portfolio keywords.
// `category` groups pages so we can fall back to a sensible suggestion
// when a search doesn't match anything directly (e.g. "engraved gift for wedding").
window.SBA_SEARCH_INDEX = [
  {
    title: 'Home',
    url: '/',
    description: 'Luxury calligraphy and hand engraving in Dublin — weddings, corporate gifting, live events.',
    keywords: 'home scribbled by anju calligraphy hand engraving dublin ireland luxury personalisation live calligraphy live calligrapher calligrapher for event calligrapher for events event calligrapher',
    category: 'general'
  },
  {
    title: 'About Anju',
    url: '/about',
    description: 'Meet Anju, Dublin-based calligrapher and live engraving artist.',
    keywords: 'about anju calligrapher artist bio story who is anju meet the artist live calligrapher event calligrapher',
    category: 'general'
  },
  {
    title: 'Services',
    url: '/services',
    description: 'Calligraphy, hand engraving, corporate events and brand activations.',
    keywords: 'services calligraphy engraving corporate events brand activations wedding pricing price cost quote what do you offer live calligraphy live calligrapher calligrapher for event calligrapher for a party calligrapher for hire',
    category: 'general'
  },
  {
    title: 'Hand Engraving',
    url: '/hand-engraving',
    description: 'Live & hand engraving on glass, perfume bottles, jewellery and keepsakes across Dublin and Ireland.',
    keywords: 'hand engraving live engraving perfume bottle glass jewellery keepsake personalisation gift engraver dublin engraved gift engraved present ring box ring boxes wedding favours wedding gift engrave name initials message champagne flute glassware',
    category: 'engraving'
  },
  {
    title: 'Corporate Events',
    url: '/corporate-events',
    description: 'Live calligraphy and personalisation for staff recognition, client appreciation and Christmas gifting at corporate events.',
    keywords: 'corporate events personalisation staff recognition client appreciation christmas gifting office party corporate gift employee gift live calligraphy calligrapher for corporate event calligrapher for event event calligrapher live calligrapher hire a calligrapher',
    category: 'calligraphy-event'
  },
  {
    title: 'Brand Activations',
    url: '/brand-activations',
    description: 'Live onsite calligraphy and engraving for brand activations, product launches and PR events.',
    keywords: 'brand activations product launch pr event live calligraphy live calligrapher onsite engraving marketing retail popup calligrapher for event calligrapher for a launch calligrapher for brand event event calligrapher calligraphy station',
    category: 'calligraphy-event'
  },
  {
    title: 'Wedding Calligraphy',
    url: '/wedding-calligraphy',
    description: 'Hand-lettered invitations, envelopes, place cards and wedding favours.',
    keywords: 'wedding calligraphy invitations envelopes place cards favours bride groom wedding gift wedding stationery save the date table plan menu live wedding calligrapher calligrapher for wedding calligrapher for event event calligrapher',
    category: 'wedding'
  },
  {
    title: 'Best Hand Engraving Artist for Your Event',
    url: '/best-calligraphy-in-dublin',
    description: 'Why Scribbled by Anju is Dublin\'s go-to live hand engraving artist for events.',
    keywords: 'best hand engraving artist event dublin engraver ireland top rated live engraver engraver for event event engraver engraver for hire live engraving perfume bottle glassware keepsake calligrapher for event event calligrapher',
    category: 'engraving'
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    description: 'Gallery of calligraphy, hand engraving, corporate gifting and Irish Ogham script work.',
    keywords: 'portfolio gallery examples corporate gifting ogham script jo malone perfume bottle engraving photos work samples',
    category: 'general'
  },
  {
    title: 'Contact',
    url: '/contact',
    description: 'Get in touch to enquire about calligraphy, engraving or booking a live event.',
    keywords: 'contact enquire book quote get in touch email phone',
    category: 'general'
  }
];

// Category hint words — used to redirect a query to the closest matching
// section of the site when no direct keyword match is found.
// e.g. "engraved gift for wedding" has no exact match, but contains
// "engraved" (-> engraving) and "wedding" (-> wedding), so we can surface
// both the Hand Engraving and Wedding Calligraphy pages as suggestions.
window.SBA_SEARCH_CATEGORY_HINTS = {
  engraving: ['engrave', 'engraved', 'engraving', 'engraver', 'personalise', 'personalised', 'personalize', 'personalized', 'glass', 'bottle', 'perfume', 'jewellery', 'jewelry', 'keepsake', 'ring box', 'initials', 'monogram', 'name'],
  wedding: ['wedding', 'bride', 'groom', 'bridal', 'favour', 'favor', 'invitation', 'invite', 'envelope', 'place card', 'table plan', 'save the date', 'menu'],
  'calligraphy-event': ['calligrapher', 'calligraphy', 'live calligrapher', 'live calligraphy', 'event calligrapher', 'calligrapher for hire', 'hire a calligrapher', 'event', 'corporate', 'office', 'company', 'brand', 'activation', 'launch', 'party', 'staff', 'client', 'christmas', 'pr'],
  general: ['about', 'price', 'pricing', 'cost', 'quote', 'service', 'portfolio', 'gallery', 'contact', 'book']
};
