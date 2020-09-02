export type ZemljaQL = {
  id: string;
  naziv: string;
  lige: [LigaQl];
};

export type LigaQl = {
  id: string;
  naziv: string;
}

export type AllZemljaQuery = {
  allZemlja: ZemljaQL[];
};
