import { ReactNode } from "react";

export type RawDataRow = {
  url: string;
  totalCount: number;
  totalVisitorCount: number;
  bounceCount: number;
  startsWithCount: number;
  endsWithCount: number;
  avgScrollPercentage: number;
  totalPageviewCount: number;
};

export type TableRow = {
  url: JSX.Element;
  scroll: string;
  time: string;
  bounce: string;
  enters: number;
  exits: number;
  pageviews: number;
  visitors: number;
}
