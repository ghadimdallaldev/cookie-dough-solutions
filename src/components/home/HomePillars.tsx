import { motion } from 'framer-motion'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { HOME_PILLARS } from '../../data/homepage-copy'
import { home as h } from '../../theme/home'
import { SplitText } from '../motion/SplitText'
import { Reveal } from '../Reveal'
import { HomeImage } from './HomeImage'

function PillarRow({ pillar, rowIndex }: { pillar: (typeof HOME_PILLARS.items)[number]; rowIndex: number }) {
  const imageFirst = rowIndex % 2 === 1
  const imageVariant = rowIndex === 2 ? 'arch' : 'default'

  return (
    <motion.article
      className={`grid items-center gap-10 border-t border-ink/[0.07] py-14 first:border-t-0 md:gap-14 lg:grid-cols-2 lg:gap-16 ${
        imageFirst ? '' : ''
      }`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.75, ease: h.ease }}
    >
      <div className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
        <HomeImage
          src={HOME_WARM_PACK[pillar.imageKey]}
          alt={pillar.imageAlt}
          variant={imageVariant}
          animate={false}
        />
      </div>

      <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-[-0.04em] text-ink/[0.08]">
            {pillar.index}
          </span>
          <p className={h.eyebrow}>{pillar.category}</p>
        </div>
        <h3 className={`${h.h3} mt-4`}>{pillar.title}</h3>
        <p className={`${h.lead} mt-4 text-base md:text-[1.125rem]`}>{pillar.lead}</p>
        <p className={`${h.body} mt-4 text-[0.9375rem]`}>{pillar.body}</p>
        <p className="mt-6 inline-block border-l-[3px] border-chip pl-4 font-display text-lg font-bold text-chip md:text-xl">
          {pillar.callout}
        </p>
      </div>
    </motion.article>
  )
}

export function HomePillars() {
  return (
    <section className={`${h.sectionBorder} py-20 md:py-28`}>
      <div className={h.container}>
        <Reveal className="max-w-2xl">
          <p className={h.eyebrow}>{HOME_PILLARS.eyebrow}</p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text={HOME_PILLARS.headline}
            className={`${h.h2} mt-5 max-w-[14ch]`}
          />
          <p className={`${h.body} mt-6 max-w-md`}>{HOME_PILLARS.body}</p>
        </Reveal>

        <div className="mt-10 md:mt-14">
          {HOME_PILLARS.items.map((pillar, i) => (
            <PillarRow key={pillar.index} pillar={pillar} rowIndex={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
