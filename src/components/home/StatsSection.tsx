import { siteConfig } from "../../../data/site-config";

export function StatsSection() {
  const demo = siteConfig.stats.find((stat) => stat.isDemo && "demoNote" in stat);

  return (
    <section className="border-y border-line" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Selected figures
      </h2>
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 px-5 py-10 sm:grid-cols-3 md:px-8 lg:px-12">
        {siteConfig.stats.map((stat) => (
          <div key={stat.id}>
            <p className="font-display text-5xl tracking-[-0.04em]">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">
              {stat.label}
              {stat.isDemo ? <span className="text-wine"> · placeholder</span> : null}
            </p>
          </div>
        ))}
      </div>
      {demo && "demoNote" in demo ? (
        <p className="mx-auto w-full max-w-[90rem] px-5 pb-8 text-xs leading-relaxed text-muted md:px-8 lg:px-12">
          {demo.demoNote}
        </p>
      ) : null}
    </section>
  );
}
