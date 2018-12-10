import {
  calculateChecksum,
  countLetterAppearance,
  getDifferentAppearanceNumbersById
} from '../02';

const IDsForLetterCounter = [
  ['abcdef', { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 }], //no letters that appear exactly two or three times.
  ['bababc', { a: 2, b: 3, c: 1 }], //two a and three b, so it counts for both.
  ['abbcde', { a: 1, b: 2, c: 1, d: 1, e: 1 }], //two b, but no letter appears exactly three times.
  ['abcccd', { a: 1, b: 1, c: 3, d: 1 }], //three c, but no letter appears exactly two times.
  ['aabcdd', { a: 2, b: 1, c: 1, d: 2 }], //two a and two d, but it only counts once.
  ['abcdee', { a: 1, b: 1, c: 1, d: 1, e: 2 }], //two e.
  ['ababab', { a: 3, b: 3 }] //three a and three b, but it only counts once.
];

const IDsForLogger = [
  ['abcdef', new Set([])], // contains no letters that appear exactly two or three times.
  ['bababc', new Set([2, 3])], // contains two a and three b, so it counts for both.
  ['abbcde', new Set([2])], // contains two b, but no letter appears exactly three times.
  ['abcccd', new Set([3])], // contains three c, but no letter appears exactly two times.
  ['aabcdd', new Set([2])], // contains two a and two d, but it only counts once.
  ['abcdee', new Set([2])], // contains two e.
  ['ababab', new Set([3])] // contains three a and three b, but it only counts once.
];

const IDsForChecksum = [
  [
    'lnfgdsywjyleogambzuchirkpx,nnfqdskfjyteogambzuchirkpx,lnfqdvvwjyteofambzuchirkpf,lnfqdsvwjyteogvmbzuthirkpn,ltfqdsvwjyoeogambxuchirkpx,lnfqcsvwjytzogacbzuchirkpx,lpfpdsvwjyteogambyuchirkpx,pnfqdsvwjyteogqmbzuchinkpx,lnfqdsvwjytyopambzpchirkpx,lnfqisswjyteogadbzuchirkpx,lnfqdsuwjcteogambzuchirepx,lnfqdovwjnteigambzuchirkpx,lnfbdsvwjxteogambzuchirkax,lnfqdsawjyteogamxzuchiwkpx,lncqdsvwjoteogambzuchirfpx,lnfadsrwjyteogambzuchirktx,lnfqdsvhjyteorazbzuchirkpx,lwfqdsvwjytdogambzuchirkhx,lnfqdhvwjyteogambzuhairkpx,lnfqdsvwjytlogambzgchyrkpx,lnfqdsvwjyteogamnzjwhirkpx,lnfodsvwjyteogahuzuchirkpx,lnfqdsvtjyteogamvzwchirkpx,lnfqdsvwjzueogambzuxhirkpx,lnfqxsvljytxogambzuchirkpx,lnfqdsvwjyteogambpyvhirkpx,lqzqdsvwjnteogambzuchirkpx,lnfqdsvwjyteogumbzichirapx,lnfqdbvwjytedgaubzuchirkpx,lnfqdsvwpyteogabbhuchirkpx,nnfqdsvwryteogambzuchiwkpx,lrfqdsvwjeteogambzuchhrkpx,lnfqdsvwxyteogamtzucyirkpx,lnfsdsvwjyteogambzulhirknx,lnfqdsvwjyreoyambzmchirkpx,ltfqdsvwjytdogkmbzuchirkpx,lnfqwbvcjyteogambzuchirkpx,lnfqdsvwjyteogamrzfchirmpx,lnfqdsvwjqteogambzucwirkpy,lnfqdslwjyfeogambzuchikkpx,lnfqdsvwjybeogambzuchikjpx,lofqysvwjyteogasbzuchirkpx,lnfqusvwjyteogambzucverkpx,lnfqdsvwjyteogaibzuchfrkzx,lnfqdsvwjyleogabbzuchirkcx,lnfqdsvqjyteogambzuchdqkpx,lnfqdsvwjwtewgambzuciirkpx,lnfqisvwjatwogambzuchirkpx,lnfqdgvwjyteogambzuchizkix,lnfqdsxwjyteogambyuehirkpx,lpffdsvwjyteogamrzuchirkpx,lnirdsvwjyteogambzuchirkbx,lnfqdsxdjyteogazbzuchirkpx,lnfgdgvwyyteogambzuchirkpx,lnfqxsvwjyteogambzmcwirkpx,lnxqjsvwjyteogambzuchirkqx,lnrqdsvwjpteogkmbzuchirkpx,lnfqdstwjyteoeahbzuchirkpx,lnfqdsvwtuteogambzuchixkpx,lwfqvsvwjyteogambzughirkpx,lnkqdsvwjyfeogambzuuhirkpx,lvvqdsvwjyteogambzuchirkpn,jndqdsvwjyteogzmbzuchirkpx,enfqdszwjyteogambcuchirkpx,lnfqdsvwiyteogakbauchirkpx,lnfqdsvwjyteogtmbzxcdirkpx,fnfqdswwjyteogawbzuchirkpx,lnfqdsvwjydejqambzuchirkpx,lnqqdsvwjyteogambzucbdrkpx,lnfqdsvwjyteogadbzuchirxcx,lnfqdslwjyyeogambzulhirkpx,lnfqdsvwjytecgambzucgirkpb,lbmqdsvwjyteogamkzuchirkpx,lbfqdsvrjyteogambzuchirapx,lnfqdsmwjyteogambzucfarkpx,lnfqasvwoyteofambzuchirkpx,bnfudsvwjyteogambzucharkpx,lnfrdsvwjytxogambzuchirkpg,lbfqdsvwjyteagambzucdirkpx,lxfqdsvwjytuogambzucjirkpx,lnfqdsvwjcteogamyzuchiikpx,lnfodsvwjyteognmbzuchirapx,ltfqdsvwjytedgaxbzuchirkpx,lnfqdshwjyteogambzucsilkpx,lnfqdsvwpyteohambzuchitkpx,wnzqdsvwjyteogambiuchirkpx,lnfqdsvwayteogambzhchirkpw,ltfqcsvwjrteogambzuchirkpx,lnfqdsvwaytekgamvzuchirkpx,lnfqdsvwjyteogambzokpirkpx,lnfqysbwjyeeogambzuchirkpx,lnsqdsvwjyteogambzuchikkpd,lrfqdsvwjyteogahbzochirkpx,lnfqdsvwjyreoggmbzuchjrkpx,lxfqdsvwjyteogkmbzuchirkpp,enhqdbvwjyteogambzuchirkpx,jnfqdsvwjyteogamczuuhirkpx,lnfqdsvwuyteogadbzuchirkpw,lnfqdsvjjytergambznchirkpx,lnfqdsvwjyteoglmbzuceijkpx,lwfqdsvwjyteogamieuchirkpx,lnfqdsvwjfaeogambzqchirkpx,lfbqdjvwjyteogambzuchirkpx,lnfqdsvwjxteoaambzuchirkpp,lnfqdsvwjyheogjmbzgchirkpx,lnfqdskwjyteonambzuchiikpx,lnfqdwvwjyteogambxuchirkph,pnfqdsvwdyteogambzuchihkpx,lnoqdsvwjyteogaybznchirkpx,lnfqdsvwfyxefgambzuchirkpx,lnfqdsvwjyteotamxzmchirkpx,lnfqdsvwjyteigwmbzuchivkpx,lnfqdsvwjytekgambcuchirkwx,lnfqdsvwjuteogamrzulhirkpx,lnfqdsvwjyteogambzucczrgpx,wnfqzsvwjyteogambduchirkpx,lnfqdsowjyteogambuuthirkpx,lnfqdsvrjyteogcmbzuclirkpx,knfqdsvwgyteogambzuchorkpx,lnaqdsvwjytuogdmbzuchirkpx,lnfrdsvwjyteogambluchigkpx,lnfqqzvwjyteogambzkchirkpx,lnfqdsvwjyteogamuzuchgrkux,lnfqdsvnjyteogxmbznchirkpx,lnfqdsvwjyteolajbzuchdrkpx,lnfqdsvwjypeoiagbzuchirkpx,lnrqdsvwjyteozamuzuchirkpx,lnfqdsvwjytkogaubzucqirkpx,lnkbdsvwjyteogacbzuchirkpx,unfqdsvwjybeogambwuchirkpx,lnfqfsvzjyteogambzuchiikpx,lnfqdsvgjyreogahbzuchirkpx,lnfqdsewjyteogavbeuchirkpx,lnfqdsvwjdteogambbuchidkpx,lnfqdsvwjythogambzcchirkvx,lnfqdscwjyteorambzuchirgpx,cnfqdzvwjyteogambzushirkpx,lnfgdsgwjytedgambzuchirkpx,lnfqdsvwbyteogimbzuchdrkpx,lnfqdsswjyteogambzuohbrkpx,lnfqdsvwjytqogabbzachirkpx,lnfqdsvwjyteogmmbzucqiukpx,lnfxdsrwjyteogambzuchnrkpx,lnfqnqvwjyteogambzuchiwkpx,lffqisvwjyteogambzulhirkpx,lnfqdsxwjydeogambzucfirkpx,lnfqdsvwjyteogambzucjirkrp,lnfqdsnqjyteogambduchirkpx,fnfqdmvwjyteogamlzuchirkpx,lnfqvsvwjyteooamdzuchirkpx,lnfqdsvcyyteogambzuchickpx,onfqdsvwjyqeogambzuchirqpx,znfqdcvwjyteoaambzuchirkpx,lnfqdsvwjzteogambzuchidklx,lnfqjsvwjyteogjmbzuchirkpv,lnfqdsvwjytgorambzuchirppx,lzfqdsvwpfteogambzuchirkpx,lnfidsfwjyteogapbzuchirkpx,lnfodsvwbyteobambzuchirkpx,lnlqdsvwjytefgambzuchfrkpx,lnkqdsvwjyteogambzkchgrkpx,tnfqdsvwjyteoiamhzuchirkpx,lnfqdsvwjyteogamllschirkpx,lnfqdsvwjmthogamizuchirkpx,lnfqdbvwjyteogafbzuchirkpb,lnfxosvwjyteogahbzuchirkpx,lnmqdsvwjyzeogambzuchirkcx,lnfqdevbjytxogambzuchirkpx,lnfqdsvwjyteogamzzudhipkpx,lnfqdszwjyteoqambzuchirkpp,lffqdsvwjyteogamtouchirkpx,lnfqdsvhjytfogambzucharkpx,hnfqdsvwjyteogembzschirkpx,lnfqdsvwjateogambzuchirmpa,lnfqdsvcjyteogambzocairkpx,lnfqdsvwjyteogamwzmchirkpd,lnfqzsvwjyteogdmbzuyhirkpx,lnfqdsvwjytfyglmbzuchirkpx,lnfndsvwjyteogambzuchirktf,gnfqdnvwjytevgambzuchirkpx,lnfqdsvwjyteoganbpuchorkpx,lnfpdsvwnyteogambzucqirkpx,fnfqdstejyteogambzuchirkpx,lnfqlsvwjyteowambzuchirkmx,lnfqdsvwjyteogmmdzuchtrkpx,lnfqdsvwcyteogaqbzuchirkqx,lnfqdsvwjytlogtmbzuchiwkpx,lnfqdsvwoyteogambzuczirkwx,lnfqdsvwjyteogzybzucdirkpx,lnfqdvvwjyteogumbzuchiukpx,lnfqbwvwjyteogambzuchjrkpx,lnfgdsvwjyteogambzvchirkzx,lnfqdsvwjvtjogambzuchiokpx,lnfedsvwjyteogambzuchivkph,lhfqusvwjytaogambzuchirkpx,lnfqdsvwjyteogacbzuihirkpv,lnfwdsvwjyteogambzucokrkpx,lnfqtsvwjpteognmbzuchirkpx,anfqdswwjyteogambzucairkpx,lnfqdsvwjyteorambzuchirlsx,lnfqdsvwjytgogambzychirkpc,lnfqdhvwjyteogambzachirklx,lnfwdsvwjyteogaobquchirkpx,rnfqdsvwjiteogambzuhhirkpx,lnfqdsuwjyemogambzuchirkpx,hnfqdsvwjyteogambzuchprfpx,anfqssvwjyteogambzumhirkpx,lnfkdsvwjyteogafbzqchirkpx,lnfqdsvwjyteogacqzuchirspx,lnfqdskwjyteggambzuchiakpx,lnnqdsvwjyteooambzuchihkpx,lnlqdsvjjyteogambzuchgrkpx,lnfqdsvwjyteogamszochirkex,lnfqbsvwjyteogambzqchirepx,lnfqdsbwjcteogambzhchirkpx,lnfqdwvzjyteogambzechirkpx,ynfadsvwdyteogambzuchirkpx,tnfqdsvwjytuogambzuohirkpx,lnfqdsvwjyteogambzaohivkpx,mnfqisvwjyteogagbzuchirkpx,lnfqbsvwjyueogambzuchirkhx,ynfqdsvwjyteogdmbzuchinkpx,lnfqdwhwjyteogambzuchirqpx,mnfqdsvwjyteogambzfchkrkpx,lnfqdsnwjyteogambzgchiqkpx,lnfqdsvwjytergambzuchiuklx,lnfqdqvjjyteogamtzuchirkpx,lnfqdscwjyteorambzuchzrgpx,enfqdevwjyteogaabzuchirkpx,gnfqdsvbjyteogambzuchirkph,lnfqdxvwjyteogambzubhixkpx,lnfqdsvwjyteogambojchihkpx,lnfqdsvwjytdogambzuzhilkpx,lnfqdsvwjyteogamezuqhirtpx,tnfhdsvwjyteogambzuvhirkpx,lnfzdsvwjnteogahbzuchirkpx,lnfqdsvwjyteogambzfzhirkvx,lnfqqsvwjyteogambzuchirgpo,lufqpsvwjythogambzuchirkpx,lnfqdsvwjyteogzmbzuchimkix,lnwqdspwjyteogambzcchirkpx,lnfqdsowjyteogambzuchigypx,lnfqdnvvjyteogambzucjirkpx,lnfjdsvwryteogambzuchirkcx,lnfqdsvwbyteogambzuchirfpb,lnfqdsvwjyheogambzxchprkpx,lnfqmsvwjytezgambzuchirlpx,lnaqdsvwjyteogamdzuzhirkpx,lnoqdsvwjytebgambfuchirkpx,lnfqdtvwjytvogambzuchirkpv',
    7936
  ],
  ['abcdef, bababc, abbcde, abcccd, aabcdd, abcdee, ababab', 12]
];

test.each(IDsForChecksum)(
  // '%s contains letters which appears exactly twice and three times. Multiplying these together produces a checksum of %i',
  '%s produces a checksum of %i',
  (ids, expected) => {
    expect(calculateChecksum(ids)).toBe(expected);
  }
);

test.each(IDsForLetterCounter)(
  // '%s contains %i a, %i b, %i c, %i d, %i e',
  `%s contains %o`,
  (id, expected) => {
    expect(countLetterAppearance(id)).toEqual(expected);
  }
);

test.each(IDsForLetterCounter)('%s to Match Snapshot', id => {
  expect(countLetterAppearance(id)).toMatchSnapshot();
});

test.each(IDsForLogger)(
  '%s contains letters which appears exactly %o times',
  (id, result) => {
    expect(
      getDifferentAppearanceNumbersById(countLetterAppearance(id))
    ).toEqual(result);
  }
);
