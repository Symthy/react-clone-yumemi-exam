// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const mockDefaultPopulations = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1980, value: 12817 },
          { year: 1985, value: 12707 },
          { year: 1990, value: 12571 },
          { year: 1995, value: 12602 },
          { year: 2000, value: 12199 },
          { year: 2005, value: 11518 },
          { year: 2010, value: 10888 },
          { year: 2015, value: 10133 },
          { year: 2020, value: 9275 },
          { year: 2025, value: 8431 },
          { year: 2030, value: 7610 },
          { year: 2035, value: 6816 },
          { year: 2040, value: 6048 },
          { year: 2045, value: 5324 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 1980, value: 2906, rate: 22.6 },
          { year: 1985, value: 2769, rate: 21.7 },
          { year: 1990, value: 2346, rate: 18.6 },
          { year: 1995, value: 2019, rate: 16 },
          { year: 2000, value: 1728, rate: 14.1 },
          { year: 2005, value: 1442, rate: 12.5 },
          { year: 2010, value: 1321, rate: 12.1 },
          { year: 2015, value: 1144, rate: 11.2 },
          { year: 2020, value: 979, rate: 10.5 },
          { year: 2025, value: 822, rate: 9.7 },
          { year: 2030, value: 705, rate: 9.2 },
          { year: 2035, value: 593, rate: 8.7 },
          { year: 2040, value: 513, rate: 8.4 },
          { year: 2045, value: 443, rate: 8.3 }
        ]
      },
      {
        label: '生産年齢人口',
        data: [
          { year: 1980, value: 8360, rate: 65.2 },
          { year: 1985, value: 8236, rate: 64.8 },
          { year: 1990, value: 8144, rate: 64.7 },
          { year: 1995, value: 8048, rate: 63.8 },
          { year: 2000, value: 7595, rate: 62.2 },
          { year: 2005, value: 7032, rate: 61 },
          { year: 2010, value: 6387, rate: 58.6 },
          { year: 2015, value: 5538, rate: 54.6 },
          { year: 2020, value: 4748, rate: 51.1 },
          { year: 2025, value: 4187, rate: 49.6 },
          { year: 2030, value: 3693, rate: 48.5 },
          { year: 2035, value: 3251, rate: 47.6 },
          { year: 2040, value: 2681, rate: 44.3 },
          { year: 2045, value: 2261, rate: 42.4 }
        ]
      },
      {
        label: '老年人口',
        data: [
          { year: 1980, value: 1550, rate: 12 },
          { year: 1985, value: 1702, rate: 13.3 },
          { year: 1990, value: 2081, rate: 16.5 },
          { year: 1995, value: 2535, rate: 20.1 },
          { year: 2000, value: 2876, rate: 23.5 },
          { year: 2005, value: 3044, rate: 26.4 },
          { year: 2010, value: 3179, rate: 29.1 },
          { year: 2015, value: 3442, rate: 33.9 },
          { year: 2020, value: 3548, rate: 38.2 },
          { year: 2025, value: 3422, rate: 40.5 },
          { year: 2030, value: 3212, rate: 42.2 },
          { year: 2035, value: 2972, rate: 43.6 },
          { year: 2040, value: 2854, rate: 47.1 },
          { year: 2045, value: 2620, rate: 49.2 }
        ]
      }
    ]
  }
};

const mockPopulations36 = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 847274 },
          { year: 1965, value: 815115 },
          { year: 1970, value: 791111 },
          { year: 1975, value: 805166 },
          { year: 1980, value: 825261 },
          { year: 1985, value: 834889 },
          { year: 1990, value: 831598 },
          { year: 1995, value: 832427 },
          { year: 2000, value: 824108 },
          { year: 2005, value: 809950 },
          { year: 2010, value: 785491 },
          { year: 2015, value: 755733 },
          { year: 2020, value: 723087 },
          { year: 2025, value: 687680 },
          { year: 2030, value: 651234 },
          { year: 2035, value: 613686 },
          { year: 2040, value: 574474 },
          { year: 2045, value: 535370 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 1960, value: 275274, rate: 32.4 },
          { year: 1965, value: 219279, rate: 26.9 },
          { year: 1970, value: 183878, rate: 23.2 },
          { year: 1975, value: 177555, rate: 22 },
          { year: 1980, value: 175295, rate: 21.2 },
          { year: 1985, value: 170062, rate: 20.3 },
          { year: 1990, value: 149770, rate: 18 },
          { year: 1995, value: 132495, rate: 15.9 },
          { year: 2000, value: 117217, rate: 14.2 },
          { year: 2005, value: 105814, rate: 13 },
          { year: 2010, value: 96596, rate: 12.2 },
          { year: 2015, value: 87030, rate: 11.5 },
          { year: 2020, value: 79833, rate: 11 },
          { year: 2025, value: 72901, rate: 10.6 },
          { year: 2030, value: 66597, rate: 10.2 },
          { year: 2035, value: 60805, rate: 9.9 },
          { year: 2040, value: 56412, rate: 9.8 },
          { year: 2045, value: 52214, rate: 9.7 }
        ]
      },
      {
        label: '生産年齢人口',
        data: [
          { year: 1960, value: 508733, rate: 60 },
          { year: 1965, value: 527617, rate: 64.7 },
          { year: 1970, value: 531168, rate: 67.1 },
          { year: 1975, value: 541049, rate: 67.1 },
          { year: 1980, value: 550779, rate: 66.7 },
          { year: 1985, value: 553858, rate: 66.3 },
          { year: 1990, value: 551067, rate: 66.2 },
          { year: 1995, value: 541945, rate: 65.1 },
          { year: 2000, value: 525724, rate: 63.7 },
          { year: 2005, value: 506642, rate: 62.5 },
          { year: 2010, value: 471788, rate: 60 },
          { year: 2015, value: 428059, rate: 56.6 },
          { year: 2020, value: 398106, rate: 55 },
          { year: 2025, value: 370243, rate: 53.8 },
          { year: 2030, value: 345806, rate: 53.1 },
          { year: 2035, value: 321029, rate: 52.3 },
          { year: 2040, value: 287977, rate: 50.1 },
          { year: 2045, value: 261041, rate: 48.7 }
        ]
      },
      {
        label: '老年人口',
        data: [
          { year: 1960, value: 63267, rate: 7.4 },
          { year: 1965, value: 68219, rate: 8.3 },
          { year: 1970, value: 76065, rate: 9.6 },
          { year: 1975, value: 86505, rate: 10.7 },
          { year: 1980, value: 98904, rate: 11.9 },
          { year: 1985, value: 110921, rate: 13.2 },
          { year: 1990, value: 129105, rate: 15.5 },
          { year: 1995, value: 157461, rate: 18.9 },
          { year: 2000, value: 180637, rate: 21.9 },
          { year: 2005, value: 197313, rate: 24.3 },
          { year: 2010, value: 209926, rate: 26.7 },
          { year: 2015, value: 230914, rate: 30.5 },
          { year: 2020, value: 245148, rate: 33.9 },
          { year: 2025, value: 244536, rate: 35.5 },
          { year: 2030, value: 238831, rate: 36.6 },
          { year: 2035, value: 231852, rate: 37.7 },
          { year: 2040, value: 230085, rate: 40 },
          { year: 2045, value: 222115, rate: 41.4 }
        ]
      }
    ]
  }
};

const mockPopulations37 = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 918867 },
          { year: 1965, value: 900845 },
          { year: 1970, value: 907897 },
          { year: 1975, value: 961292 },
          { year: 1980, value: 999864 },
          { year: 1985, value: 1022569 },
          { year: 1990, value: 1023412 },
          { year: 1995, value: 1027006 },
          { year: 2000, value: 1022890 },
          { year: 2005, value: 1012400 },
          { year: 2010, value: 995842 },
          { year: 2015, value: 976263 },
          { year: 2020, value: 951400 },
          { year: 2025, value: 921343 },
          { year: 2030, value: 888509 },
          { year: 2035, value: 853054 },
          { year: 2040, value: 814677 },
          { year: 2045, value: 776478 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 1960, value: 277844, rate: 30.2 },
          { year: 1965, value: 219450, rate: 24.3 },
          { year: 1970, value: 201068, rate: 22.1 },
          { year: 1975, value: 213857, rate: 22.2 },
          { year: 1980, value: 222244, rate: 22.2 },
          { year: 1985, value: 214695, rate: 20.9 },
          { year: 1990, value: 184729, rate: 18 },
          { year: 1995, value: 161674, rate: 15.7 },
          { year: 2000, value: 148215, rate: 14.4 },
          { year: 2005, value: 139505, rate: 13.7 },
          { year: 2010, value: 131670, rate: 13.2 },
          { year: 2015, value: 122324, rate: 12.5 },
          { year: 2020, value: 114945, rate: 12 },
          { year: 2025, value: 106720, rate: 11.5 },
          { year: 2030, value: 99651, rate: 11.2 },
          { year: 2035, value: 93160, rate: 10.9 },
          { year: 2040, value: 88734, rate: 10.8 },
          { year: 2045, value: 84537, rate: 10.8 }
        ]
      },
      {
        label: '生産年齢人口',
        data: [
          { year: 1960, value: 572304, rate: 62.2 },
          { year: 1965, value: 604865, rate: 67.1 },
          { year: 1970, value: 620169, rate: 68.3 },
          { year: 1975, value: 645957, rate: 67.1 },
          { year: 1980, value: 658291, rate: 65.8 },
          { year: 1985, value: 672022, rate: 65.7 },
          { year: 1990, value: 680493, rate: 66.4 },
          { year: 1995, value: 678404, rate: 66 },
          { year: 2000, value: 659881, rate: 64.5 },
          { year: 2005, value: 635746, rate: 62.7 },
          { year: 2010, value: 595451, rate: 59.7 },
          { year: 2015, value: 547844, rate: 56.1 },
          { year: 2020, value: 530820, rate: 55.7 },
          { year: 2025, value: 508666, rate: 55.2 },
          { year: 2030, value: 488377, rate: 54.9 },
          { year: 2035, value: 463602, rate: 54.3 },
          { year: 2040, value: 424452, rate: 52.1 },
          { year: 2045, value: 394400, rate: 50.7 }
        ]
      },
      {
        label: '老年人口',
        data: [
          { year: 1960, value: 68719, rate: 7.4 },
          { year: 1965, value: 76530, rate: 8.4 },
          { year: 1970, value: 86660, rate: 9.5 },
          { year: 1975, value: 101376, rate: 10.5 },
          { year: 1980, value: 119031, rate: 11.9 },
          { year: 1985, value: 135696, rate: 13.2 },
          { year: 1990, value: 157237, rate: 15.3 },
          { year: 1995, value: 186850, rate: 18.1 },
          { year: 2000, value: 214242, rate: 20.9 },
          { year: 2005, value: 235508, rate: 23.2 },
          { year: 2010, value: 253245, rate: 25.4 },
          { year: 2015, value: 286296, rate: 29.3 },
          { year: 2020, value: 305635, rate: 32.1 },
          { year: 2025, value: 305957, rate: 33.2 },
          { year: 2030, value: 300481, rate: 33.8 },
          { year: 2035, value: 296292, rate: 34.7 },
          { year: 2040, value: 301491, rate: 37 },
          { year: 2045, value: 297541, rate: 38.3 }
        ]
      }
    ]
  }
};

const mockPopulations38 = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 1500687 },
          { year: 1965, value: 1446384 },
          { year: 1970, value: 1418124 },
          { year: 1975, value: 1465215 },
          { year: 1980, value: 1506637 },
          { year: 1985, value: 1529983 },
          { year: 1990, value: 1515025 },
          { year: 1995, value: 1506700 },
          { year: 2000, value: 1493092 },
          { year: 2005, value: 1467815 },
          { year: 2010, value: 1431493 },
          { year: 2015, value: 1385262 },
          { year: 2020, value: 1332802 },
          { year: 2025, value: 1274128 },
          { year: 2030, value: 1212388 },
          { year: 2035, value: 1148113 },
          { year: 2040, value: 1080610 },
          { year: 2045, value: 1012995 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 1960, value: 491067, rate: 32.7 },
          { year: 1965, value: 394189, rate: 27.2 },
          { year: 1970, value: 342671, rate: 24.1 },
          { year: 1975, value: 343882, rate: 23.4 },
          { year: 1980, value: 341262, rate: 22.6 },
          { year: 1985, value: 325958, rate: 21.3 },
          { year: 1990, value: 280919, rate: 18.5 },
          { year: 1995, value: 245563, rate: 16.2 },
          { year: 2000, value: 219340, rate: 14.6 },
          { year: 2005, value: 200270, rate: 13.6 },
          { year: 2010, value: 185179, rate: 12.9 },
          { year: 2015, value: 169110, rate: 12.2 },
          { year: 2020, value: 156775, rate: 11.7 },
          { year: 2025, value: 142540, rate: 11.1 },
          { year: 2030, value: 129656, rate: 10.6 },
          { year: 2035, value: 118043, rate: 10.2 },
          { year: 2040, value: 109277, rate: 10.1 },
          { year: 2045, value: 101207, rate: 9.9 }
        ]
      },
      {
        label: '生産年齢人口',
        data: [
          {
            year: 1960,
            value: 901968,
            rate: 60.1
          },
          { year: 1965, value: 933371, rate: 64.5 },
          { year: 1970, value: 942241, rate: 66.4 },
          { year: 1975, value: 968827, rate: 66.1 },
          { year: 1980, value: 990401, rate: 65.7 },
          { year: 1985, value: 1005968, rate: 65.7 },
          { year: 1990, value: 1000404, rate: 66 },
          { year: 1995, value: 982400, rate: 65.2 },
          { year: 2000, value: 953189, rate: 63.8 },
          { year: 2005, value: 914747, rate: 62.3 },
          { year: 2010, value: 858991, rate: 60 },
          { year: 2015, value: 776111, rate: 56 },
          { year: 2020, value: 730723, rate: 54.8 },
          { year: 2025, value: 685299, rate: 53.7 },
          { year: 2030, value: 642775, rate: 53 },
          { year: 2035, value: 599283, rate: 52.1 },
          { year: 2040, value: 539391, rate: 49.9 },
          { year: 2045, value: 491642, rate: 48.5 }
        ]
      },
      {
        label: '老年人口',
        data: [
          { year: 1960, value: 107652, rate: 7.1 },
          { year: 1965, value: 118824, rate: 8.2 },
          { year: 1970, value: 133212, rate: 9.3 },
          { year: 1975, value: 152344, rate: 10.3 },
          { year: 1980, value: 174729, rate: 11.5 },
          { year: 1985, value: 198044, rate: 12.9 },
          { year: 1990, value: 232726, rate: 15.3 },
          { year: 1995, value: 278691, rate: 18.4 },
          { year: 2000, value: 320078, rate: 21.4 },
          { year: 2005, value: 351990, rate: 23.9 },
          { year: 2010, value: 378591, rate: 26.4 },
          { year: 2015, value: 417186, rate: 30.1 },
          { year: 2020, value: 445304, rate: 33.4 },
          { year: 2025, value: 446289, rate: 35 },
          { year: 2030, value: 439957, rate: 36.2 },
          { year: 2035, value: 430787, rate: 37.5 },
          { year: 2040, value: 431942, rate: 39.9 },
          { year: 2045, value: 420146, rate: 41.4 }
        ]
      }
    ]
  }
};

const mockPopulations39 = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1960, value: 854595 },
          { year: 1965, value: 812714 },
          { year: 1970, value: 786882 },
          { year: 1975, value: 808397 },
          { year: 1980, value: 831275 },
          { year: 1985, value: 839784 },
          { year: 1990, value: 825034 },
          { year: 1995, value: 816704 },
          { year: 2000, value: 813949 },
          { year: 2005, value: 796292 },
          { year: 2010, value: 764456 },
          { year: 2015, value: 728276 },
          { year: 2020, value: 691090 },
          { year: 2025, value: 652757 },
          { year: 2030, value: 614449 },
          { year: 2035, value: 575728 },
          { year: 2040, value: 536443 },
          { year: 2045, value: 498460 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 1960, value: 253081, rate: 29.6 },
          { year: 1965, value: 200055, rate: 24.6 },
          { year: 1970, value: 171991, rate: 21.8 },
          { year: 1975, value: 173005, rate: 21.4 },
          { year: 1980, value: 173649, rate: 20.8 },
          { year: 1985, value: 168580, rate: 20 },
          { year: 1990, value: 144276, rate: 17.4 },
          { year: 1995, value: 125833, rate: 15.4 },
          { year: 2000, value: 111740, rate: 13.7 },
          { year: 2005, value: 102421, rate: 12.8 },
          { year: 2010, value: 92798, rate: 12.1 },
          { year: 2015, value: 83884, rate: 11.5 },
          { year: 2020, value: 76335, rate: 11 },
          { year: 2025, value: 68775, rate: 10.5 },
          { year: 2030, value: 62306, rate: 10.1 },
          { year: 2035, value: 56380, rate: 9.7 },
          { year: 2040, value: 52105, rate: 9.7 },
          { year: 2045, value: 48198, rate: 9.6 }
        ]
      },
      {
        label: '生産年齢人口',
        data: [
          { year: 1960, value: 528882, rate: 61.8 },
          { year: 1965, value: 530837, rate: 65.3 },
          { year: 1970, value: 524918, rate: 66.7 },
          { year: 1975, value: 536129, rate: 66.3 },
          { year: 1980, value: 547780, rate: 65.8 },
          { year: 1985, value: 548167, rate: 65.2 },
          { year: 1990, value: 535995, rate: 64.9 },
          { year: 1995, value: 522208, rate: 63.9 },
          { year: 2000, value: 509050, rate: 62.5 },
          { year: 2005, value: 487367, rate: 61.2 },
          { year: 2010, value: 447540, rate: 58.5 },
          { year: 2015, value: 400605, rate: 55 },
          { year: 2020, value: 370062, rate: 53.5 },
          { year: 2025, value: 343706, rate: 52.6 },
          { year: 2030, value: 319382, rate: 51.9 },
          { year: 2035, value: 296169, rate: 51.4 },
          { year: 2040, value: 263431, rate: 49.1 },
          { year: 2045, value: 237246, rate: 47.5 }
        ]
      },
      {
        label: '老年人口',
        data: [
          { year: 1960, value: 72632, rate: 8.4 },
          { year: 1965, value: 81822, rate: 10 },
          { year: 1970, value: 89973, rate: 11.4 },
          { year: 1975, value: 98752, rate: 12.2 },
          { year: 1980, value: 109116, rate: 13.1 },
          { year: 1985, value: 121759, rate: 14.4 },
          { year: 1990, value: 141508, rate: 17.1 },
          { year: 1995, value: 167967, rate: 20.5 },
          { year: 2000, value: 191729, rate: 23.5 },
          { year: 2005, value: 206375, rate: 25.9 },
          { year: 2010, value: 218148, rate: 28.5 },
          { year: 2015, value: 237012, rate: 32.5 },
          { year: 2020, value: 244693, rate: 35.4 },
          { year: 2025, value: 240276, rate: 36.8 },
          { year: 2030, value: 232761, rate: 37.8 },
          { year: 2035, value: 223179, rate: 38.7 },
          { year: 2040, value: 220907, rate: 41.1 },
          { year: 2045, value: 213016, rate: 42.7 }
        ]
      }
    ]
  }
};

export const mockPopulationsApi: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  const prefCode = req.url.searchParams.get('prefCode');

  let responsePopulations = {};
  switch (prefCode) {
    case '36':
      responsePopulations = mockPopulations36;
      break;
    case '37':
      responsePopulations = mockPopulations37;
      break;
    case '38':
      responsePopulations = mockPopulations38;
      break;
    case '39':
      responsePopulations = mockPopulations39;
      break;
    default:
      responsePopulations = mockDefaultPopulations;
  }

  return res(ctx.status(200), ctx.json(responsePopulations));
};
