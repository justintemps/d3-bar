export default {
  csv: 'https://raw.githubusercontent.com/justintemps/d3-bar/master/data.csv',
  margin: {
    top: 50,
    right: 20,
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
        'Share of employment in agriculture, by origin and sex (%, most recent period)'
    },
    {
      short: 'Sector: industry',
      long:
        'Share of employment in industry, by origin and sex (%, most recent period)'
    },
    {
      short: 'Sector: services',
      long:
        'Share of employment in services, by origin and sex (%, most recent period)'
    },
    {
      short: 'Occupation: High-skill',
      long:
        'Share of employment in high-skill occupations, by origin and sex (%, most recent time period)'
    },
    {
      short: 'Occupation: Medium-skill',
      long:
        'Share of employment in medium-skill occupations, by origin and sex (%, most recent time period)'
    },
    {
      short: 'Occupation: Low-skill',
      long:
        'Share of employment in low-skill occupations, by origin and sex (%, most recent time period)'
    },
    {
      short: 'Skills mismatch: over-qualification',
      long:
        'Rates of over-qualification, by origin and sex (%, most recent time period)'
    },
    {
      short: 'Skills mismatch: under-qualification',
      long:
        'Rates of under-qualification, by origin and sex (%, most recent time period)'
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
