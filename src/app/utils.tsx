import { RawDataRow, TableRow } from "./types";

export const transformRawDataToTable = (data: RawDataRow[]): TableRow[] => {
  return data.map<TableRow>((rawRow: RawDataRow) => {
    const {
      url,
      totalCount,
      totalVisitorCount,
      bounceCount,
      startsWithCount,
      endsWithCount,
      avgScrollPercentage,
      totalPageviewCount
    } = rawRow;
    return {
      url: <a href={`https://${url}`} target="_blank">{url}</a>,
      scroll: `${avgScrollPercentage}%`,
      time: new Date(totalPageviewCount * 1000).toISOString().substring(14, 19),
      bounce: `${Math.ceil(bounceCount * 100 / totalCount)}%`,
      enters: startsWithCount,
      exits: endsWithCount,
      pageviews: totalCount,
      visitors: totalVisitorCount
    };
  });
};