export default {
  csv: 'data.csv',
  margin: {
    top: 50,
    right: 0,
    bottom: 150,
    left: 25
  },
  colors: [
    '#6baed6',
    '#3182bd',
    '#08519c',
    '#74c476',
    '#31a354',
    '#006d2c',
    '#9e9ac8',
    '#756bb1',
    '#54278f'
  ],
  category: [
    {
      short: 'Sector: agriculture',
      long:
        'Share of employment in agriculture, by origin and sex (%, most recent period)',
      description: 'Agriculture has become less important for both native-born workers and foreign-born workers in all ECLM partner countries except Côte d’Ivoire and Nepal. Nevertheless, the sector still employs the largest numbers of workers in most partner countries.'
    },
    {
      short: 'Sector: industry',
      long:
        'Share of employment in industry, by origin and sex (%, most recent period)',
      description: 'Foreign-born workers have a higher share of employment in industry when compared to native-born workers. This share has risen over time in several countries (up to 24 percentage points for foreign-born workers in Thailand).'
    },
    {
      short: 'Sector: services',
      long:
        'Share of employment in services, by origin and sex (%, most recent period)',
      description: 'Employment in services increased for native-born workers in all ECLM partner countries and for foreign-born workers in all except Argentina and Côte d’Ivoire. In four countries – the Dominican Republic, Ghana, Rwanda and South Africa –, employment growth in services was considerably greater for foreign-born workers than for native-born workers.'
    },
    {
      short: 'Occupation: High-skill',
      long:
        'Share of employment in high-skill occupations, by origin and sex (%, most recent time period)',
      description: 'Globally, the share of high-skill occupations tends to increase, driven by several factors including globalisation, technological change and policy choices. ECLM partner countries mostly follow the same pattern, with the exceptions of Kyrgyzstan and Thailand.'
    },
    {
      short: 'Occupation: Medium-skill',
      long:
        'Share of employment in medium-skill occupations, by origin and sex (%, most recent time period)',
      description: 'The large majority of both native- and foreign-born workers in most ECLM partner countries are working in medium-skill occupations. The exception is Kyrgyzstan, where only around a third of the workforce, both native- and foreign-born, is in medium-skill occupations.'
    },
    {
      short: 'Occupation: Low-skill',
      long:
        'Share of employment in low-skill occupations, by origin and sex (%, most recent time period)',
      description: 'The native-born occupational distribution is usually quite different from the foreign-born. In particular, in comparison with the native-born, foreign-born workers are overrepresented in low-skill occupations in most of the ECLM partner countries. In the absence of strong unions, these workers often have limited bargaining power and are at risk of exploitation.  '
    },
    {
      short: 'Mismatch: over-qualification',
      long:
        'Rates of over-qualification, by origin and sex (%, most recent time period)',
      description: 'Over-qualification means that workers have attained educational levels that are higher than those required for their jobs. On average, the levels of over-qualification are higher for women, while levels of over-qualification are often higher for immigrant workers in medium skill occupations.'
    },
    {
      short: 'Mismatch: under-qualification',
      long:
        'Rates of under-qualification, by origin and sex (%, most recent time period)',
      description: 'When comparing native- to foreign-born workers, the rate of under-qualification is higher for the latter in seven of the partner countries. In part this may reflect low quality work performed by foreign-born workers.'
    }
  ],
  keys: [
    {
      short: 'male',
      long: 'All men',
    },
    {
      short: 'female',
      long: 'All women'
    },
    {
      short: 'total',
      long: 'Total'
    },
    {
      short: 'native-male',
      long: 'Native-born men'
    },
    {
      short: 'native-female',
      long: 'Native-born women'
    },
    {
      short: 'native-total',
      long: 'Native-born total'
    },
    {
      short: 'foreign-male',
      long: 'Foreign-born men'
    },
    {
      short: 'foreign-female',
      long: 'Foreign-born women'
    },
    {
      short: 'foreign-total',
      long: 'Foreign-born total'
    }
  ]
};
