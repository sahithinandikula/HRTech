/**
 * Single source of truth for the logged-in HR persona.
 * Every page, sidebar, and topbar reads from this one object.
 */
export const currentUser = {
  name: 'Sarah Mitchell',
  role: 'HR Lead',
  initials: 'SM',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBadDh0w14Bg5pHLpOhU95qZXON5j_xMiBcP_nZYDMK5eDIF8rg2wnX8wsUfCRUNjqmRnYNuxzDZ0xd0pWNUzNMUJlRyxd4hm_OgnQVtcaw_BpkFEXH9R5cZsaFu-HszjkU66fDdVzvt-ByT3s4lgdnldjZYlrNO6Jpovdk6kJ-I90QrIFABhha2iEg4kQ4bRS0DJXJtev8cM7GubmUEoCSUXUJfdDKnxOBu_BdoeauPqj6t1wzuJjCoAjaDa_vSyQIV3Zme8u9izAY',
}

/** Derive first name for greetings */
export const firstName = currentUser.name.split(' ')[0]
