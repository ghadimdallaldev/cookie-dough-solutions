import { motion } from 'framer-motion'
import { HOME_WARM_PACK, type HomeWarmImageKey } from '../../data/cookie-dough-homepage'
import { home as h } from '../../theme/home'
import { SplitText } from '../motion/SplitText'
import { Reveal } from '../Reveal'
import { HomeImage } from './HomeImage'

type PillarData = {
  index: string
  category: string
  title: string
  lead: string
  body: string
  callout: string
  imageKey: HomeWarmImageKey
  imageAlt: string
}

const PILLARS: PillarData[] = [
  {
    index: '01',
    category: 'Front of house',
    title: 'POS & ordering apps',
    lead: "The ticket is wrong. The menu changed. The line won't wait. Sound familiar?",
    body: 'Branded ordering, counter flows, and guest web experiences — built for rush mode, modifiers, and staff who absolutely cannot afford a manual.',
    callout: 'Built for rush mode. Not your lunch break.',
    imageKey: 'pillarPOS',
    imageAlt: 'POS and ordering app built for hospitality rush mode',
  },
  {
    index: '02',
    category: 'Back of house',
    title: 'Operations without ERP baggage',
    lead: 'Suppliers, stock, dispatch — connected only as deep as you need. No 200-screen onboarding required.',
    body: 'When ops live in WhatsApp and Excel, we ship focused tools without the hundred-screen enterprise suite nobody actually uses.',
    callout: 'Ops depth without the therapy bill.',
    imageKey: 'pillarOps',
    imageAlt: 'Back of house operations management — no ERP theater',
  },
  {
    index: '03',
    category: 'Bespoke',
    title: 'Bespoke systems for complex businesses',
    lead: "When the problem is uniquely yours, off-the-shelf is a polite lie.",
    body: 'Franchise logic, odd approvals, legacy hardware — we architect from scratch or extend Supplify. No two kitchens are alike. Neither are our builds.',
    callout: 'Custom when off-the-shelf is a polite lie.',
    imageKey: 'pillarBespoke',
    imageAlt: 'Bespoke hospitality software built from scratch',
  },
]

function PillarRow({ pillar, rowIndex }: { pillar: PillarData; rowIndex: number }) {
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
          <p className={h.eyebrow}>What we build</p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text="Three ways we end the chaos."
            className={`${h.h2} mt-5 max-w-[14ch]`}
          />
          <p className={`${h.body} mt-6 max-w-md`}>
            Organized systems for genuinely messy hospitality operations — without the ERP theater and the 6-month implementation timeline nobody warned you about.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14">
          {PILLARS.map((pillar, i) => (
            <PillarRow key={pillar.index} pillar={pillar} rowIndex={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
