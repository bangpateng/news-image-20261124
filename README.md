# The World in One Day — Tuesday 24 November 2026

[![make.fun](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/bangpateng/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/bangpateng/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124)

One image summing up the world news of **Tuesday 24 November 2026**, drawn as a
newspaper front page. The entry program (`main.ts`) copies the `entry.png` held
in this repository to `/output/entry.png` (Node 22 stdlib only, no network).

## The day's news in the image

- **Lead — COP31 collapses:** the UN climate summit in Turkey ends with no deal
  as countries split over fossil fuels and money.
- **War at sea:** a Ukrainian sea drone sinks a Russian warship — a corvette
  reported to be the Merkury — at Benghazi port in Libya.
- **Tech:** Jensen Huang is reinstated as Nvidia CEO after a board inquiry;
  shares jump 31% as Congress sets a 3 December hearing on the China chip row.
- **Culture:** GTA VI takes $3.79 billion in two days — the biggest entertainment
  opening on record.
- **Sport:** FIFA picks the US-led bid to host the 2031 Women's World Cup.
- **Energy:** Iran orders daily power cuts as its grid strains, while tanker
  attacks in the Strait of Hormuz run at their highest since the conflict began.
- **Also:** Delta delays hit Thanksgiving travel, the EU and Indonesia sign a
  landmark trade deal, and Tarik Skubal agrees a record $450m Mets contract.

Sources: Guardian, BBC, NYT, Reuters, AP, NBC — as reported on 24 November 2026.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png` (1024×1024, under 1 MiB). It runs with no network
and is fully deterministic: both runs produce identical bytes.

Entry for the [news-image-20261124 bounty](https://make.fun/bounty/news-image-20261124)
on [make.fun](https://make.fun).
