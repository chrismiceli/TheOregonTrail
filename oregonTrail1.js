/*  MINNESOTA EDUCATIONAL COMPUTING CONSORTIUM STAFF */
/*  PROGRAMMING REVISIONS BY DON RAWITSCH - 1975     */
/*  CURRENT VERSION - 3/27/75                        */
function* play() {
  function createChoice(text, choices) {
    return {
      text,
      choices,
      type: play.PROMPT_TYPE.CHOICE,
    };
  }

  function createNumericChoice(text) {
    return {
      text,
      type: play.PROMPT_TYPE.NUMERIC,
    };
  }

  function createStringChoice(text) {
    return {
      text,
      type: play.PROMPT_TYPE.STRING,
    };
  }

  function createInfo(text) {
    return {
      text,
      type: play.PROMPT_TYPE.NONE,
    };
  }

  let instructionPointer = 30;
  let returnPointer;
  let X1;
  let K8;
  let S4;
  let F1;
  let F2;
  let M;
  let M9;
  let D3;
  let info;

  let A;
  let F;
  let B;
  let C;
  let M1;
  let T;
  let M2;
  let D1;
  let DATA_INDEX;
  let R1;
  while (true) {
    switch (instructionPointer) {
      case 30: {
        let C$ = yield createChoice('DO YOU NEED INSTRUCTIONS', ['YES', 'NO']);
        if (C$ === 'NO') {
          instructionPointer = 400;
          break;
        }
        yield createInfo(
          `THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM
    INDEPENDENCE, MISSOURI TO OREGON CITY, OREGON IN 1847.
    YOUR FAMILY OF FIVE WILL COVER THE 2000 MILE OREGON TRAIL
    IN 5-6 MONTHS --- IF YOU MAKE IT ALIVE.
            YOU HAD SAVED $900 TO SPEND FOR THE TRIP, AND YOU'VE JUST
        PAID $200 FOR A WAGON.
    YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ON THE
        FOLLOWING ITEMS:
                OXEN - YOU CAN SPEND $200-$300 ON YOUR TEAM
                THE MORE YOU SPEND, THE FASTER YOU'LL GO
                    BECAUSE YOU'LL HAVE BETTER ANIMALS
                FOOD - THE MORE YOU HAVE, THE LESS CHANCE THERE
                    IS OF GETTING SICK
                AMMUNITION - $1 BUYS A BELT OF 50 BULLETS
                YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS
                    AND BANDITS, AND FOR HUNTING FOOD
                CLOTHING - THIS IS ESPECIALLY IMPORTANT FOR THE COLD
                    WEATHER YOU WILL ENCOUNTER WHEN CROSSING
                    THE MOUNTAINS
                MISCELLANEOUS SUPPLIES - THIS INCLUDES MEDICINE AND
                    OTHER THINGS YOU WILL NEED FOR SICKNESS
                    AND EMERGENCY REPAIRS
    
    
    YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -
    OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG
    THE WAY WHEN YOU RUN LOW.  HOWEVER, ITEMS COST MORE AT
    THE FORTS.  YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET
    MORE FOOD.
    WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY,
    YOU WILL SEE THE WORDS: TYPE BANG.  THE FASTER YOU TYPE
    IN THE WORD 'BANG' AND HIT THE 'RETURN' KEY, THE BETTER
    LUCK YOU'LL HAVE WITH YOUR GUN.
            WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A '$'.
            GOOD LUCK!!!`
        );
      }
      case 400: {
        X1 = -1;
        K8 = S4 = F1 = F2 = M = M9 = D3 = 0;
      }
      case 415: {
        A = parseInt(
          yield createNumericChoice(
            'HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM'
          ),
          10
        );
        if (A >= 200) {
          instructionPointer = 440;
          break;
        }
        yield createInfo('NOT ENOUGH');
        instructionPointer = 415;
        break;
      }
      case 440: {
        if (A <= 300) {
          instructionPointer = 455;
          break;
        }
        yield createInfo('TOO MUCH');
        instructionPointer = 415;
        break;
      }
      case 455: {
        F = parseInt(
          yield createNumericChoice('HOW MUCH DO YOU WANT TO SPEND ON FOOD'),
          10
        );
        if (F >= 0) {
          instructionPointer = 485;
          break;
        }
        yield createInfo('IMPOSSIBLE');
        instructionPointer = 455;
        break;
      }
      case 485: {
        B = parseInt(
          yield createNumericChoice(
            'HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION'
          ),
          10
        );
        if (B >= 0) {
          instructionPointer = 510;
          break;
        }
        yield createInfo('IMPOSSIBLE');
        instructionPointer = 485;
        break;
      }
      case 510: {
        C = parseInt(
          yield createNumericChoice(
            'HOW MUCH DO YOU WANT TO SPEND ON CLOTHING'
          ),
          10
        );
        if (C >= 0) {
          instructionPointer = 535;
          break;
        }
        yield createInfo('IMPOSSIBLE');
        instructionPointer = 510;
        break;
      }
      case 535: {
        M1 = parseInt(
          yield createNumericChoice(
            'HOW MUCH DO YOU WANT TO SPEND ON MISCELANEOUS SUPPLIES'
          ),
          10
        );
        if (M1 >= 0) {
          instructionPointer = 560;
          break;
        }
        yield createInfo('IMPOSSIBLE');
        instructionPointer = 535;
        break;
      }
      case 560: {
        T = 700 - A - F - B - C - M1;
        if (T >= 0) {
          instructionPointer = 580;
          break;
        }
        yield createInfo(
          'YOU OVERSPENT--YOU ONLY HAD $700 TO SPEND.  BUY AGAIN'
        );
        instructionPointer = 415;
        break;
      }
      case 580: {
        B = 50 * B;
        yield createInfo(
          `AFTER ALL YOUR PURCHASES, YOU NOW HAVE ${T} DOLLARS LEFT`
        );
        yield createInfo('MONDAY MARCH 29 1847');
        instructionPointer = 1000;
        break;
      }
      case 1000: {
        // ***BEGINNING EACH TURN***
        if (F >= 0) {
          instructionPointer = 1015;
          break;
        }
        F = 0;
      }
      case 1015: {
        if (B >= 0) {
          instructionPointer = 1025;
          break;
        }
        B = 0;
      }
      case 1025: {
        if (C >= 0) {
          instructionPointer = 1035;
          break;
        }
        C = 0;
      }
      case 1035: {
        if (M1 >= 0) {
          instructionPointer = 1045;
          break;
        }
        M1 = 0;
      }
      case 1045: {
        if (F >= 12) {
          instructionPointer = 1055;
          break;
        }
        yield createInfo(
          "YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!"
        );
      }
      case 1055: {
        F = Math.floor(F);
        B = Math.floor(B);
        C = Math.floor(C);
        M1 = Math.floor(M1);
        T = Math.floor(T);
        M = Math.floor(M);
        M2 = M;
        if (S4 === 1) {
          instructionPointer = 1105;
          break;
        }
        if (K8 === 1) {
          instructionPointer = 1105;
          break;
        }
        instructionPointer = 1130;
        break;
      }
      case 1105: {
        T = T - 20;
        if (T < 0) {
          instructionPointer = 3520;
          break;
        }
        yield createInfo("DOCTOR'S BILL IS $20");
        K8 = S4 = 0;
      }
      case 1130: {
        if (M9 === 1) {
          instructionPointer = 1145;
          break;
        }
        yield createInfo(`TOTAL MILEAGE IS ${M}`);
        instructionPointer = 1160;
        break;
      }
      case 1145: {
        yield createInfo('TOTAL MILEAGE IS 950');
        M9 = 0;
      }
      case 1160: {
        yield createInfo('FOOD, BULLETS, CLOTHING, MISC. SUPP., CASH');
        yield createInfo(`${F}, ${B}, ${C}, ${M1}, ${T}`);
        if (X1 === -1) {
          instructionPointer = 1350;
          break;
        }
        X1 = X1 * -1;
      }
      case 1310: {
        X = parseInt(
          yield createChoice(
            'DO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, OR (3) CONTINUE',
            ['1', '2', '3']
          ),
          10
        );
        if (X > 2) {
          instructionPointer = 1340;
          break;
        }
        if (X < 1) {
          instructionPointer = 1340;
          break;
        }
        X = Math.floor(X);
        instructionPointer = 1400;
        break;
      }
      case 1340: {
        X = 3;
        instructionPointer = 1400;
        break;
      }
      case 1350: {
        X = parseInt(
          yield createChoice('DO YOU WANT TO (1) HUNT, OR (2) CONTINUE', [
            '1',
            '2',
          ]),
          10
        );
        if (X === 1) {
          instructionPointer = 1370;
          break;
        }
        X = 2;
      }
      case 1370: {
        X = X + 1;
        if (X === 3) {
          instructionPointer = 1395;
          break;
        }
        if (B > 39) {
          instructionPointer = 1395;
          break;
        }
        yield createInfo('TOUGH---YOU NEED MORE BULLETS TO GO HUNTING');
        instructionPointer = 1350;
        break;
      }
      case 1395: {
        X1 = X1 * -1;
      }
      case 1400: {
        instructionPointer = [1500, 1700, 1800][X - 1];
        break;
      }
      case 1500: {
        yield createInfo('ENTER WHAT YOU WISH TO SPEND ON THE FOLLOWING');
        P = parseInt(yield createNumericChoice('FOOD'), 10);
        returnPointer = 1515;
        instructionPointer = 1520;
        break;
      }
      case 1515: {
        instructionPointer = 1555;
        break;
      }
      case 1520: {
        if (P < 0) {
          instructionPointer = 1550;
          break;
        }
        T = T - P;
        if (T >= 0) {
          instructionPointer = 1550;
          break;
        }
        yield createInfo("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN");
        T = T + P;
        P = 0;
      }
      case 1550: {
        instructionPointer = returnPointer;
        break;
      }
      case 1555: {
        F = F + (2 / 3) * P;
        P = parseInt(yield createNumericChoice('AMMUNITION'), 10);
        returnPointer = 1570;
        instructionPointer = 1520;
        break;
      }
      case 1570: {
        B = Math.floor(B + (2 / 3) * P * 50);
        P = parseInt(yield createNumericChoice('CLOTHING'), 10);
        returnPointer = 1585;
        instructionPointer = 1520;
        break;
      }
      case 1585: {
        C = C + (2 / 3) * P;
        P = parseInt(yield createNumericChoice('MISCELLANEOUS SUPPLIES'), 10);
        returnPointer = 1600;
        instructionPointer = 1520;
        break;
      }
      case 1600: {
        M1 = M1 + (2 / 3) * P;
        M = M - 45;
        instructionPointer = 1800;
        break;
      }
      case 1700: {
        // ***HUNTING***
        if (B > 39) {
          instructionPointer = 1715;
          break;
        }
        yield createInfo('TOUGH---YOU NEED MORE BULLETS TO GO HUNTING');
        instructionPointer = 1310;
        break;
      }
      case 1715: {
        M = M - 45;
        returnPointer = 1725;
        instructionPointer = 4500;
        break;
      }
      case 1725: {
        if (B1 <= 1) {
          instructionPointer = 1755;
          break;
        }
        if (100 * Math.random() < 13 * B1) {
          instructionPointer = 1780;
          break;
        }
        F = F + 48 - 2 * B1;
        yield createInfo('NICE SHOT--RIGHT THROUGH THE NECK--FEAST TONIGHT!!');
        B = B - 10 - 3 * B1;
        instructionPointer = 1800;
        break;
      }
      case 1755: {
        // **BELLS IN LINE 1755**
        yield createInfo('RIGHT BETWEEN THE EYES---YOU GOT A BIG ONE!!!!');
        F = F + 52 + Math.random() * 6;
        B = B - 10 - Math.random() * 4;
        instructionPointer = 1800;
        break;
      }
      case 1780: {
        yield createInfo('SORRY---NO LUCK TODAY');
        if (F >= 13) {
          instructionPointer = 1900;
          break;
        }
        instructionPointer = 3500;
        break;
      }
      case 1800: {
        if (F >= 13) {
          instructionPointer = 1900;
          break;
        }
        instructionPointer = 3500;
        break;
      }
      case 1900: {
        //***EATING***
        E = parseInt(
          yield createChoice(
            'DO YOU WANT TO EAT (1) POORLY  (2) MODERATELY OR (3) WELL',
            ['1', '2', '3']
          ),
          10
        );
        if (E > 3) {
          instructionPointer = 1900;
          break;
        }
        if (E < 1) {
          instructionPointer = 1900;
          break;
        }
        E = Math.floor(E);
        F = F - 8 - 5 * E;
        if (F >= 0) {
          instructionPointer = 2000;
          break;
        }
        F = F + 8 + 5 + E;
        yield createInfo("YOU CAN'T EAT THAT WELL");
        instructionPointer = 1900;
        break;
      }
      case 2000: {
        M = M + 200 + (A - 220) / 5 + 10 * Math.random();
        L1 = C1 = 0;
        //***RIDERS ATTACK***
        if (
          Math.random() * 10 >
          (Math.pow(M / 100 - 4, 2) + 72) / (Math.pow(M / 100 - 4, 2) + 12) - 1
        ) {
          instructionPointer = 2500;
          break;
        }
        info = 'RIDERS AHEAD.  THEY ';
        S5 = 0;
        if (Math.random() < 0.8) {
          instructionPointer = 2130;
          break;
        }
        info = `${info} DON'T `;
        S5 = 1;
      }
      case 2130: {
        info = `${info}LOOK HOSTILE`;
        info = '';
        yield createInfo(info);
        yield createInfo('TACTICS');
      }
      case 2140: {
        let T1 = parseInt(
          yield createChoice(
            `(1) RUN  (2) ATTACK  (3) CONTINUE  (4) CIRCLE WAGONS
IF YOU RUN YOU'LL GAIN TIME BUT WEAR DOWN YOUR OXEN
IF YOU CIRCLE YOU'LL LOSE TIME`,
            ['1', '2', '3', '4']
          ),
          10
        );
        if (T1 < 1) {
          instructionPointer = 2140;
          break;
        }
        if (T1 > 4) {
          instructionPointer = 2140;
          break;
        }
        T1 = Math.floor(T1);
        if (S5 === 1) {
          instructionPointer = 2330;
          break;
        }
        if (T1 > 1) {
          instructionPointer = 2220;
          break;
        }
        M = M + 20;
        M1 = M1 - 15;
        B = B - 150;
        A = A - 40;
        instructionPointer = 2395;
        break;
      }
      case 2220: {
        if (T1 > 2) {
          instructionPointer = 2285;
          break;
        }
        returnPointer = 2230;
        instructionPointer = 4500;
        break;
      }
      case 2230: {
        B = B - B1 * 40 - 80;
      }
      case 2235: {
        if (B1 > 1) {
          instructionPointer = 2250;
          break;
        }
        yield createInfo('NICE SHOOTING---YOU DROVE THEM OFF');
        instructionPointer = 2395;
        break;
      }
      case 2250: {
        if (B1 <= 4) {
          instructionPointer == 2275;
          break;
        }
        yield createInfo('LOUSY SHOT---YOU GOT KNIFED');
        K8 = 1;
        yield createInfo("YOU HAVE TO SEE OL' DOC BLANCHARD");
        instructionPointer = 2395;
        break;
      }
      case 2275: {
        yield createInfo('KINDA SLOW WITH YOUR COLT .45');
        instructionPointer = 2395;
        break;
      }
      case 2285: {
        if (T1 > 3) {
          instructionPointer = 2310;
          break;
        }
        if (Math.random() > 0.8) {
          instructionPointer = 2390;
          break;
        }
        B = B - 150;
        M1 = M1 - 15;
        instructionPointer = 2395;
        break;
      }
      case 2310: {
        returnPointer = 2315;
        instructionPointer = 4500;
        break;
      }
      case 2315: {
        B = B - B1 * 30 - 80;
        M = M - 25;
        instructionPointer = 2235;
        break;
      }
      case 2330: {
        if (T1 > 1) {
          instructionPointer = 2350;
          break;
        }
        M = M + 15;
        A = A - 10;
        instructionPointer = 2395;
        break;
      }
      case 2350: {
        if (T1 > 2) {
          instructionPointer = 2370;
          break;
        }
        M = M - 5;
        B = B - 100;
        instructionPointer = 2395;
        break;
      }
      case 2370: {
        if (T1 > 3) {
          instructionPointer = 2380;
          break;
        }
        instructionPointer = 2395;
        break;
      }
      case 2380: {
        M = M - 20;
        instructionPointer = 2395;
        break;
      }
      case 2390: {
        yield createInfo('THEY DID NOT ATTACK');
        instructionPointer = 2500;
        break;
      }
      case 2395: {
        if (S5 === 0) {
          instructionPointer = 2410;
          break;
        }
        yield createInfo('RIDERS WERE FRIENDLY, BUT CHECK FOR POSSIBLE LOSSES');
        instructionPointer = 2500;
        break;
      }
      case 2410: {
        yield createInfo('RIDERS WERE HOSTILE--CHECK FOR LOSSES');
        if (B >= 0) {
          instructionPointer = 2500;
          break;
        }
        yield createInfo(
          'YOU RAN OUT OF BULLETS AND GOT MASSACRED BY THE RIDERS'
        );
        instructionPointer = 3600;
        break;
      }
      case 2500: {
        //***SELECTION OF EVENTS***
        D1 = 0;
        let D1 = 0;
        R1 = 100 * Math.random();
      }
      case 2515: {
        D1 = D1 + 1;
        if (D1 === 16) {
          instructionPointer = 3020;
          break;
        }
        const DATA = [
          6,
          11,
          13,
          15,
          17,
          22,
          32,
          35,
          37,
          42,
          44,
          54,
          64,
          69,
          95,
        ];
        const D = DATA[DATA_INDEX];
        DATA_INDEX += 1;
        if (R1 > D) {
          instructionPointer = 2515;
          break;
        }
        if (D1 > 10) {
          instructionPointer = 2545;
          break;
        }
        instructionPointer = [
          2550,
          2570,
          2590,
          2615,
          2630,
          2645,
          2660,
          2690,
          2785,
          2810,
        ][D1 - 1];
        break;
      }
      case 2545: {
        instructionPointer = [2825, 2860, 2885, 2970, 2990, 3020][D1 - 10 - 1];
        break;
      }
      case 2550: {
        yield createInfo('WAGON BREAKS DOWN--LOSE TIME AND SUPPLIES FIXING IT');
        M = M - 15 - 5 * Math.random();
        M1 = M1 - 8;
        instructionPointer = 3100;
        break;
      }
      case 2570: {
        yield createInfo('OX INJURES LEG---SLOWS YOU DOWN REST OF TRIP');
        M = M - 25;
        A = A - 20;
        instructionPointer = 3100;
        break;
      }
      case 2590: {
        yield createInfo('BAD LUCK---YOUR DAUGHTER BROKE HER ARM');
        yield createInfo('YOU HAD TO STOP AND USE SUPPLIES TO MAKE A SLING');
        M = M - 5 - 4 * Math.random();
        M1 = M1 - 2 - 3 * Math.random();
        instructionPointer = 3100;
        break;
      }
      case 2615: {
        yield createInfo('OX WANDERS OFF---SPEND TIME LOOKING FOR IT');
        M = M - 17;
        instructionPointer = 3100;
        break;
      }
      case 2630: {
        yield createInfo(
          'YOUR SON GETS LOST---SPEND HALF THE DAY LOOKING FOR HIM'
        );
        M = M - 10;
        instructionPointer = 3100;
        break;
      }
      case 2645: {
        yield createInfo('UNSAFE WATER--LOSE TIME LOOKING FOR CLEAN SPRING');
        M = M - 10 * Math.random() - 2;
        instructionPointer = 3100;
        break;
      }
      case 2660: {
        if (M > 950) {
          instructionPointer = 2935;
          break;
        }
        yield createInfo('HEAVY RAINS---TIME AND SUPPLIES LOST');
        F = F - 10;
        B = B - 500;
        M1 = M1 - 15;
        M = M - 10 * Math.random() - 5;
        instructionPointer = 3100;
        break;
      }
      case 2690: {
        yield createInfo('BANDITS ATTACK');
        instructionPointer = 4500;
        returnPointer = 2705;
        break;
      }
      case 2705: {
        B = B - 20 * B1;
        if (B >= 0) {
          instructionPointer = 2735;
          break;
        }
        yield createInfo('YOU RAN OUT OF BULLETS---THEY GET LOTS OF CASH');
        T = T / 3;
        instructionPointer = 2740;
        break;
      }
      case 2735: {
        if (B1 <= 1) {
          instructionPointer = 2770;
          break;
        }
      }
      case 2740: {
        yield createInfo(
          'YOU GOT SHOT IN THE LEG AND THEY TOOK ONE OF YOUR OXEN'
        );
        K8 = 1;
        yield createInfo('BETTER HAVE A DOC LOOK AT YOUR WOUND');
        M1 = M1 - 5;
        A = A - 20;
        instructionPointer = 3100;
        break;
      }
      case 2770: {
        yield createInfo('QUICKEST DRAW OUTSIDE OF DODGE CITY!!!');
        yield createInfo("YOU GOT 'EM!");
        instructionPointer = 3100;
        break;
      }
      case 2785: {
        yield createInfo(
          'THERE WAS A FIRE IN YOUR WAGON--FOOD AND SUPPLIES DAMAGED'
        );
        F = F - 40;
        B = B - 400;
        M1 = M1 - Math.random() * 8 - 3;
        M = M - 15;
        instructionPointer = 3100;
        break;
      }
      case 2810: {
        yield createInfo('LOSE YOUR WAY IN HEAVY FOG---TIME IS LOST');
        M = M - 10 - 5 * Math.random();
        instructionPointer = 3100;
        break;
      }
      case 2825: {
        yield createInfo('YOU KILLED A POISONOUS SNAKE AFTER IT BIT YOU');
        B = B - 10;
        M1 = M1 - 5;
        if (M1 >= 0) {
          instructionPointer = 2855;
          break;
        }
        yield createInfo('YOU DIE OF SNAKEBITE SINCE YOU HAVE NO MEDICINE');
        instructionPointer = 3600;
        break;
      }
      case 2855: {
        instructionPointer = 3100;
        break;
      }
      case 2860: {
        yield createInfo(
          'WAGON GETS SWAMPED FORDING RIVER--LOSE FOOD AND CLOTHES'
        );
        F = F - 30;
        C = C - 20;
        M = M - 20 - 20 * Math.random();
        instructionPointer = 3100;
        break;
      }
      case 2885: {
        yield createInfo('WILD ANIMALS ATTACK!');
        instructionPointer = 4500;
        returnPointer = 2889;
        break;
      }
      case 2889: {
        if (B > 39) {
          instructionPointer = 2895;
          break;
        }
        yield createInfo('YOU WERE TOO LOW ON BULLETS--');
        yield createInfo('THE WOLVES OVERPOWERED YOU');
        K8 = 1;
        instructionPointer = 3555;
        break;
      }
      case 2895: {
        if (B1 > 2) {
          instructionPointer = 2910;
          break;
        }
        yield createInfo("NICE SHOOTIN' PARDNER---THEY DIDN'T GET MUCH");
        instructionPointer = 2915;
        break;
      }
      case 2910: {
        yield createInfo(
          'SLOW ON THE DRAW---THEY GOT AT YOUR FOOD AND CLOTHES'
        );
      }
      case 2915: {
        B = B - 20 * B1;
        C = C - B1 * 4;
        F = F - B1 * 8;
        instructionPointer = 3100;
        break;
      }
      case 2935: {
        info = 'COLD WEATHER---BRRRRRRR!---YOU ';
        if (C > 22 + 4 * Math.random()) {
          instructionPointer = 2955;
          break;
        }
        info = `${info}DON'T `;
        C1 = 1;
      }
      case 2955: {
        info = `${info}HAVE ENOUGH CLOTHING TO KEEP YOU WARM`;
        if ((C1 = 0)) {
          instructionPointer = 3100;
          break;
        }
        instructionPointer = 4700;
        break;
      }
      case 2970: {
        yield createInfo('HAIL STORM---SUPPLIES DAMAGED');
        M = M - 5 - Math.random() * 10;
        B = B - 200;
        M1 = M1 - 4 - Math.random() * 3;
        instructionPointer = 3100;
        break;
      }
      case 2990: {
        if (E === 1) {
          instructionPointer = 4700;
          break;
        }
        if (E === 3) {
          instructionPointer = 3010;
          break;
        }
        if (Math.random() > 0.25) {
          instructionPointer = 4700;
          break;
        }
        instructionPointer = 3100;
        break;
      }
      case 3010: {
        if (Math.random() < 0.5) {
          instructionPointer = 4700;
          break;
        }
        instructionPointer = 3100;
        break;
      }
      case 3020: {
        yield createInfo('HELPFUL INDIANS SHOW YOU WHERE TO FIND MORE FOOD');
        F = F + 14;
        instructionPointer = 3100;
        break;
      }
      case 3100: {
        return;
      }
      case 3500: {
        return;
      }
      case 3520: {
        return;
      }
      case 3555: {
        return;
      }
      case 3600: {
        return;
      }
      default:
      case 4500: {
        // ***SHOOTING SUB-ROUTINE***
        const startTime = new Date();
        const C$ = yield createStringChoice('TYPE BANG');
        const endTime = new Date();
        B2 = 7;
        if (C$.toUpperCase() === 'BANG') {
          B1 = Math.min((startTime - endTime) / 1000, B2);
          instructionPointer = 4535;
          break;
        }
        B1 = 7;
      }
      case 4535: {
        instructionPointer = returnPointer;
        break;
      }
      case 4700: {
        return;
      }
    }
  }
}

play.PROMPT_TYPE = {
  CHOICE: 'CHOICE',
  NUMERIC: 'NUMERIC',
  STRING: 'STRING',
  NONE: 'NONE',
};

if (typeof module === 'undefined') {
  module = {};
}

module.exports = {
  play,
};
