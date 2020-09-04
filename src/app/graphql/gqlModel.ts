export type AllZemljaQuery = {
  allZemlja: ZemljaQL[];
};

export type FudbalskiKluboviQuery = {
  fudbalskiKlubovi: FudbalskiKlubQL[];
};

export type FudbalskiRezulatiQuery = {
  rezultatiForDate: FudbalskiRezultatQL[];
};

export type BodoviKlubQuery = {
  bodovi: number;
};

export type FudbalskiRezultatQL = {
  id: string;
  vremeOdrzavanjaUtakmice: string;
  domacin: FudbalskiKlubQL;
  gost: FudbalskiKlubQL;
  liga: LigaQL;
  sezona: SezonaQL;
  goloviDomacin: number;
  goloviGost: number;
  informacija: InformacijaQL;
};

export type InformacijaQL = {
  id: string;
  fudbalskiRezultat: FudbalskiRezultatQL;
  posedDomacin: number;
  posedGost: number;
  suteviDomacin: number;
  suteviGost: number;
  brojZutihKartonaDomacin: number;
  brojZutihKartonaGost: number;
  brojCrvenihKartonaDomacin: number;
  brojCrvenihKartonaGost: number;
};

export type FudbalskiKlubQL = {
  id: string;
  naziv: string;
  zemlja: ZemljaQL;
  trener: TrenerQL;
  fudbaleri: [FudbalerQL];
  bodovi: number;
};

export type FudbalerQL = {
  id: string;
  ime: string;
  prezime: string;
  datumRodjenja: string;
  zemljaRodjenja: ZemljaQL;
  pozicija: PozicijaFudbal;
  fudbalskiKlub: FudbalskiKlubQL;
  status: StatusUTimu;
};

enum StatusUTimu {
  STARTER,
  REZERVNI
}

enum PozicijaFudbal {
  GOLMAN,
  LEVI_BEK,
  DESNI_BEK,
  LEVI_STOPER,
  DESNI_STOPER,
  ZADNJI_VEZNI,
  LEVI_VEZNI,
  DESNI_VEZNI,
  LEVO_KRILO,
  DESNO_KRILO,
  CENTARFOR
}

export type TrenerQL = {
  id: string;
  ime: string;
  prezime: string;
  godinaRodjenja: string;
  zemlja: ZemljaQL;
  sport: SportQL;
};

export type ZemljaQL = {
  id: string;
  naziv: string;
  lige: [LigaQL];
  prikazaneLige: boolean;
};

export type LigaQL = {
  id: string;
  naziv: string;
  zemlja: ZemljaQL;
  sport: SportQL;
};

export type SportQL = {
  id: string;
  naziv: string;
};

export type SezonaQL = {
  id: string;
  godina: string;
};
