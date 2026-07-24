interface Capital {
  name: string
}

interface CountryItemNames {
  common: string
}

export type CountryCode = string

export interface CountryItem {
  flag: {
    url_png: string
  }
  names: CountryItemNames
  population: number
  region: string
  capitals: Capital[]
  codes: {
    alpha_3: CountryCode
  }
}

interface Currency {
  name: string
}

interface Language {
  name: string
}

export interface Country extends CountryItem {
  names: CountryItemNames & {
    official: string
  }
  subregion: string
  currencies: Currency[]
  timezones: string[]
  area: {
    kilometers: number
  }
  languages: Language[]
  borders: string[] | never[]
}
