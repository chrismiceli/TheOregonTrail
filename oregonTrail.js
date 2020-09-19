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

  function* die() {
    yield createInfo('DO TO YOUR UNFORTUNATE SITUATION, THERE ARE A FEW');
    yield createInfo('FORMALITIES WE MUST GO THROUGH');
    createChoice('WOULD YOU LIKE A MINISTER?', ['YES', 'NO']);
    createChoice('WOULD YOU LIKE A FANCY FUNERAL?', ['YES', 'NO']);
    const C$ = yield createChoice('WOULD YOU LIKE US TO INFORM YOUR NEXT OF KIN?', [
      'YES',
      'NO',
    ]);
    if (C$ !== 'YES') {
      yield createInfo('YOUR AUNT NELLIE IN ST. LOUIS IS ANXIOUS TO HEAR');
    }
    yield createInfo('WE THANK YOU FOR THIS INFORMATION AND WE ARE SORRY YOU');
    yield createInfo("DIDN'T MAKE IT TO THE GREAT TERRITORY OF OREGON");
    yield createInfo('BETTER LUCK NEXT TIME');
    yield createInfo('SINCERELY');
    yield createInfo('THE OREGON CITY CHAMBER OF COMMERCE');
    return;
  }

  let C$ = yield createChoice('DO YOU NEED INSTRUCTIONS', ['YES', 'NO']);
  if (C$ !== 'NO') {
    // ***INSTRUCTIONS***
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

  // ***INITIAL PURCHASES***
  let X1 = -1;
  let K8 = 0;
  let S4 = 0;
  let F1 = 0;
  let F2 = 0;
  let M = 0;
  let M9 = 0;
  let D3 = 0;

  let A;
  let F;
  let B;
  let C;
  let M1;
  let T;
  let M2;

  function* medicalSuppliesDepleted() {
    const info = 'YOU DIED OF ';
    if (K8 !== 1) {
      yield createInfo(`${info}PNEUMONIA`);
    } else {
      yield createInfo(`${info}INJURIES`);
    }
    yield* die();
    return;
  }

  let B1;
  function* shoot() {
    const B2 = 7;
    const startTime = new Date();
    const C = yield createStringChoice('TYPE BANG');
    const endTime = new Date();
    if (C !== 'BANG') {
      B1 = 7;
    } else {
      B1 = Math.min((startTime - endTime) / 1000, B2);
    }
  }

  while (true) {
    while (true) {
      A = parseInt(
        yield createNumericChoice(
          'HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM'
        ),
        10
      );
      if (A < 200) {
        yield createInfo('NOT ENOUGH');
      } else if (A > 300) {
        yield createInfo('TOO MUCH');
      } else {
        break;
      }
    }

    while (true) {
      F = parseInt(
        yield createNumericChoice('HOW MUCH DO YOU WANT TO SPEND ON FOOD'),
        10
      );

      if (F < 0) {
        yield { text: 'IMPOSSIBLE' };
      } else {
        break;
      }
    }

    while (true) {
      B = parseInt(
        yield createNumericChoice(
          'HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION'
        ),
        10
      );

      if (B < 0) {
        yield { text: 'IMPOSSIBLE' };
      } else {
        break;
      }
    }

    while (true) {
      C = parseInt(
        yield createNumericChoice('HOW MUCH DO YOU WANT TO SPEND ON CLOTHING'),
        10
      );

      if (C < 0) {
        yield createInfo('IMPOSSIBLE');
      } else {
        break;
      }
    }

    while (true) {
      M1 = parseInt(
        yield createNumericChoice(
          'HOW MUCH DO YOU WANT TO SPEND ON MISCELANEOUS SUPPLIES'
        ),
        10
      );
      if (M1 < 0) {
        yield createInfo('IMPOSSIBLE');
      } else {
        break;
      }
    }

    T = 700 - A - F - B - C - M1;
    if (T < 0) {
      yield createInfo('YOU OVERSPENT--YOU ONLY HAD $700 TO SPEND.  BUY AGAIN');
    } else {
      break;
    }
  }

  B = 50 * B;
  yield createInfo(`AFTER ALL YOUR PURCHASES, YOU NOW HAVE ${T} DOLLARS LEFT`);
  yield createInfo('MONDAY MARCH 29 1847');
  while (true) {
    if (M < 2040 && D3 <= 17) {
      // ***BEGINNING EACH TURN***
      if (F < 0) {
        F = 0;
      }

      if (B < 0) {
        B = 0;
      }

      if (C < 0) {
        C = 0;
      }

      if (M1 < 0) {
        M1 = 0;
      }

      if (F < 12) {
        yield createInfo(
          "YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!"
        );
      }

      F = Math.floor(F);
      B = Math.floor(B);
      C = Math.floor(C);
      M1 = Math.floor(M1);
      T = Math.floor(T);
      M = Math.floor(M);
      M2 = M;
      if (S4 === 1 || K8 === 1) {
        T = T - 20;
        if (T >= 0) {
          yield createInfo("DOCTOR'S BILL IS $20");
          K8 = 0;
          S4 = 0;
        } else {
          T = 0;
          yield createInfo("YOU CAN'T AFFORD A DOCTOR");
          yield* medicalSuppliesDepleted();
          return;
        }
      }

      if (M9 === 1) {
        yield createInfo('TOTAL MILEAGE IS 950');
        M9 = 0;
      } else {
        yield createInfo(`TOTAL MILEAGE IS ${M}`);
      }

      yield createInfo('FOOD, BULLETS, CLOTHING, MISC. SUPP., CASH');
      yield createInfo(`${F}, ${B}, ${C}, ${M1}, ${T}`);

      let X;
      if (X1 !== -1) {
        X1 = X1 * -1;
        X = parseInt(
          yield createChoice(
            'DO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, OR (3) CONTINUE',
            ['1', '2', '3']
          ),
          10
        );

        if (X > 2 || X < 1) {
          X = 3;
        }
      } else {
        while (true) {
          X = parseInt(
            yield createChoice('DO YOU WANT TO (1) HUNT, OR (2) CONTINUE', [
              '1',
              '2',
            ]),
            10
          );
          if (X !== 1) {
            X = 2;
          }

          X = X + 1;
          if (X !== 3 && B <= 39) {
            yield createInfo('TOUGH---YOU NEED MORE BULLETS TO GO HUNTING');
          } else {
            X1 = X1 * -1;
            break;
          }
        }
      }

      if (X === 1) {
        // ***STOPPING AT FORT***
        // 1500
        yield createInfo('ENTER WHAT YOU WISH TO SPEND ON THE FOLLOWING');
        let P;
        function updateMoney() {
          if (P >= 0) {
            T = T - P;
            if (T < 0) {
              T = T + P;
              P = 0;
              return "YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN";
            }
          }
        }

        P = parseInt(yield createNumericChoice('FOOD'), 10);
        let warning = updateMoney();
        if (warning) {
          yield createInfo(warning);
        }
        F = F + (2 / 3) * P;

        P = parseInt(yield createNumericChoice('AMMUNITION'), 10);
        waring = updateMoney();
        if (warning) {
          yield createInfo(warning);
        }
        B = Math.floor(B + (2 / 3) * P * 50);

        P = parseInt(yield createNumericChoice('CLOTHING'), 10);
        waring = updateMoney(P);
        if (warning) {
          yield createInfo(warning);
        }
        C = C + (2 / 3) * P;

        P = parseInt(yield createNumericChoice('MISCELLANEOUS SUPPLIES'), 10);
        waring = updateMoney(P);
        if (warning) {
          yield createInfo(warning);
        }
        M1 = M1 + (2 / 3) * P;
        M = M - 45;
      } else if (X === 2) {
        // ***HUNTING***
        if (B <= 39) {
          yield createInfo('TOUGH---YOU NEED MORE BULLETS TO GO HUNTING');
          // todo 1310
        }
        M = M - 45;
        yield* shoot();
        if (B1 > 1) {
          if (100 * Math.random() < 13 * B1) {
            yield createInfo('SORRY---NO LUCK TODAY');
          } else {
            F = F + 48 - 2 * B1;
            yield createInfo('NICE SHOT--RIGHT THROUGH THE NECK--FEAST TONIGHT!!');
            B = B - 10 - 3 * B1;
          }
        } else {
          // REM **BELLS IN LINE 1755**
          yield createInfo('RIGHT BETWEEN THE EYES---YOU GOT A BIG ONE!!!!');
          F = F + 52 + Math.random() * 6;
          B = B - 10 - Math.random() * 4;
        }
      }

      // ***EATING***
      if (F >= 13) {
        while (true) {
          let E;
          while (true) {
            E = parseInt(
              yield createChoice(
                'DO YOU WANT TO EAT (1) POORLY  (2) MODERATELY OR (3) WELL',
                ['1', '2', '3']
              ),
              10
            );
            if (E <= 3 && E >= 1) {
              break;
            }

            F = F - 8 - 5 * E;
            if (F < 0) {
              F = F + 8 + 5 * E;
              yield createInfo("YOU CAN'T EAT THAT WELL");
            } else {
              break;
            }
          }

          M = M + 200 + (A - 220) / 5 + 10 * Math.random();
          let L1 = 0;
          let C1 = 0;
          // ***RIDERS ATTACK***
          if (
            Math.random() * 10 <=
            (Math.pow(M / 100 - 4, 2) + 72) / (Math.pow(M / 100 - 4, 2) + 12) -
              1
          ) {
            let info = 'RIDERS AHEAD.  THEY ';
            let S5 = 0;
            if (Math.random() >= 0.8) {
              info = `${info} DON'T`;
              S5 = 1;
            }

            info = `${info} LOOK HOSTILE`;
            yield createInfo(info);
            yield createInfo('TACTICS');
            let T1;
            while (true) {
              T1 = parseInt(
                yield createChoice(
                  `(1) RUN  (2) ATTACK  (3) CONTINUE  (4) CIRCLE WAGONS
  IF YOU RUN YOU'LL GAIN TIME BUT WEAR DOWN YOUR OXEN
  IF YOU CIRCLE YOU'LL LOSE TIME`,
                  ['1', '2', '3', '4']
                ),
                10
              );
              if (Math.random() <= 0.2) {
                S5 = 1 - S5;
              }
              if (T1 >= 1 && T1 <= 4) {
                break;
              }
            }
            if ((S5 = 1)) {
              if (T1 <= 1) {
                M = M + 15;
                A = A - 10;
                // GOTO 2395
              } else {
                if (T1 <= 2) {
                  M = M - 5;
                  B = B - 100;
                  // goto 2395
                } else {
                  if (T1 <= 3) {
                    // 2395
                  } else {
                    M = M - 20;
                    // goto 2395
                  }
                }
              }
            }
            if (T1 <= 1) {
              M = M + 20;
              M1 = M1 - 15;
              B = B - 150;
              A = A - 40;
              // goto 2395
            } else {
              if (T1 <= 2) {
                yield* shoot();
                if (B1 <= 1) {
                  yield createInfo('NICE SHOOTING---YOU DROVE THEM OFF');
                  //2395
                } else {
                  if (B1 > 4) {
                    yield createInfo('LOUSY SHOT---YOU GOT KNIFED');
                    K8 = 1;
                    yield createInfo("YOU HAVE TO SEE OL' DOC BLANCHARD");
                    // 2395
                  } else {
                    yield createInfo('KINDA SLOW WITH YOUR COLT .45');
                    // 2395
                  }
                }
              } else {
                if (T1 <= 3) {
                  if (Math.random() <= 0.8) {
                    B = B - 150;
                    M1 = M1 - 15;
                    // goto 2395
                  } else {
                    yield createInfo('THEY DID NOT ATTACK');
                    // goto 2500
                  }
                } else {
                  yield* shoot();
                  B = B - B1 * 30 - 80;
                  M = M - 25;
                  // goto 2350
                }
              }
            }
          } else {
            // ***SELECTION OF EVENTS***
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
            let D1 = 0;
            let DATA_INDEX = 0; // RESTORE
            R1 = 100 * Math.random();
            while (true) {
              D1 = D1 + 1;
              if (D1 !== 16) {
                const D = DATA[DATA_INDEX - 1];
                DATA_INDEX = DATA_INDEX + 1;
                if (R1 <= D) {
                  break;
                }
              } else {
                break;
              }
            }

            switch (D1) {
              case 1: {
                yield createInfo(
                  'WAGON BREAKS DOWN--LOSE TIME AND SUPPLIES FIXING IT'
                );
                M = M - 15 - 5 * Math.random();
                M1 = M1 - 8;
                break;
              }
              case 2: {
                yield createInfo(
                  'OX INJURES LEG---SLOWS YOU DOWN REST OF TRIP'
                );
                M = M - 25;
                A = A - 20;
                break;
              }
              case 3: {
                yield createInfo('BAD LUCK---YOUR DAUGHTER BROKE HER ARM');
                yield createInfo(
                  'YOU HAD TO STOP AND USE SUPPLIES TO MAKE A SLING'
                );
                M = M - 5 - 4 * Math.random();
                M1 = M1 - 2 - 3 * Math.random();
                break;
              }
              case 4: {
                yield createInfo('OX WANDERS OFF---SPEND TIME LOOKING FOR IT');
                M = M - 17;
                break;
              }
              case 5: {
                yield createInfo(
                  'YOUR SON GETS LOST---SPEND HALF THE DAY LOOKING FOR HIM'
                );
                M = M - 10;
                break;
              }
              case 6: {
                yield createInfo(
                  'UNSAFE WATER--LOSE TIME LOOKING FOR CLEAN SPRING'
                );
                M = M - 10 * Math.random() - 2;
                break;
              }
              case 7: {
                if (M <= 950) {
                  yield createInfo('HEAVY RAINS---TIME AND SUPPLIES LOST');
                  F = F - 10;
                  B = B - 500;
                  M1 = M1 - 15;
                  M = M - 10 * Math.random() - 5;
                } else {
                  // todo 2935
                }
                break;
              }
              case 8: {
                yield createInfo('BANDITS ATTACK');
                // todo 4500 goto sub
                break;
              }
              case 9: {
                yield createInfo(
                  'THERE WAS A FIRE IN YOUR WAGON--FOOD AND SUPPLIES DAMAGED'
                );
                F = F - 40;
                B = B - 400;
                M1 = M1 - Math.random() * 8 - 3;
                M = M - 15;
                break;
              }
              case 10: {
                yield createInfo('LOSE YOUR WAY IN HEAVY FOG---TIME IS LOST');
                M = M - 10 - 5 * Math.random();
                break;
              }
              case 11: {
                yield createInfo(
                  'YOU KILLED A POISONOUS SNAKE AFTER IT BIT YOU'
                );
                B = B - 10;
                M1 = M1 - 5;
                if (M1 < 0) {
                  yield createInfo(
                    'YOU DIE OF SNAKEBITE SINCE YOU HAVE NO MEDICINE'
                  );
                  yield* die();
                  return;
                }
                break;
              }
              case 12: {
                yield createInfo(
                  'WAGON GETS SWAMPED FORDING RIVER--LOSE FOOD AND CLOTHES'
                );
                F = F - 30;
                C = C - 20;
                M = M - 20 - 20 * Math.random();
                break;
              }
              case 13: {
                yield createInfo('WILD ANIMALS ATTACK!');
                // todo
                break;
              }
              case 14: {
                yield createInfo('HAIL STORM---SUPPLIES DAMAGED');
                M = M - 5 - Math.random() * 10;
                B = B - 200;
                M1 = M1 - 4 - Math.random() * 3;
                break;
              }
              case 15: {
                // todo 2990
              }
              default:
              case 16: {
                yield createInfo(
                  'HELPFUL INDIANS SHOW YOU WHERE TO FIND MORE FOOD'
                );
                F = F + 14;
                break;
              }
            }

            // ***MOUNTAINS***
            if (M > 950) {
              if (
                Math.random() * 10 <=
                9 -
                  (Math.pow(M / 100 - 15, 2) + 72) /
                    (Math.pow(M / 100 - 15, 2) + 12)
              ) {
                yield createInfo('RUGGED MOUNTAINS');
                if (Math.random() <= 0.1) {
                  yield createInfo(
                    'YOU GOT LOST---LOSE VALUABLE TIME TRYING TO FIND TRAIL!'
                  );
                  M = M - 60;
                  // goto 3175
                } else {
                  if (Math.random() <= 0.11) {
                    yield createInfo('WAGON DAMAGED!---LOSE TIME AND SUPPLIES');
                    M1 = M1 - 5;
                    B = B - 200;
                    M = M - 20 - 30 * Math.random();
                    //GOTO 3175
                  } else {
                    yield createInfo('THE GOING GETS SLOW');
                    M = M - 45 - Math.random() / 0.02;
                    if (F1 !== 1) {
                      F1 = 1;
                      if (Math.random() >= 0.8) {
                        yield createInfo(
                          'YOU MADE IT SAFELY THROUGH SOUTH PASS--NO SNOW'
                        );
                        if (M >= 1700) {
                          if (F2 !== 1) {
                            F2 = 1;
                            if (Math.random() >= 0.7) {
                              if (M <= 950) {
                                M9 = 1;
                                // goto 700
                              } else {
                                // 700
                              }
                            } else {
                              yield createInfo(
                                'BLIZZARD IN MOUNTAIN PASS--TIME AND SUPPLIES LOST'
                              );
                              L1 = 1;
                              F = F - 25;
                              M1 = M1 - 10;
                              B = B - 300;
                              M = M - 30 - 40 * Math.random();
                              if (C >= 18 + 2 * Math.random()) {
                                // goto 3215
                              } else {
                                // goto 4700
                              }
                            }
                          } else {
                            // 3215
                          }
                        } else {
                          // 3215
                        }
                      } else {
                        //3300
                      }
                    } else {
                      //3195?
                    }
                  }
                }
              } else {
                // goto 3175
              }
            }
            // ***SETTING DATE***
            D3 = D3 + 1;
            let date = 'MONDAY ';
            if (D3 === 1) {
              date = `${date}APRIL 12 `;
            } else if (D3 === 2) {
              date = `${date}APRIL 26 `;
            } else if (D3 === 3) {
              date = `${date}MAY 10 `;
            } else if (D3 === 4) {
              date = `${date}MAY 24 `;
            } else if (D3 === 5) {
              date = `${date}JUNE 7 `;
            } else if (D3 === 6) {
              date = `${date}JUNE 21 `;
            } else if (D3 === 7) {
              date = `${date}JULY 5 `;
            } else if (D3 === 8) {
              date = `${date}JULY 19 `;
            } else if (D3 === 9) {
              date = `${date}AUGUST 2 `;
            } else if (D3 === 10) {
              date = `${date}AUGUST 16 `;
            } else if (D3 === 11) {
              date = `${date}AUGUST 31 `;
            } else if (D3 === 12) {
              date = `${date}SEPTEMBER 13 `;
            } else if (D3 === 13) {
              date = `${date}SEPTEMBER 27 `;
            } else if (D3 === 14) {
              date = `${date}OCTOBER 11 `;
            } else if (D3 === 15) {
              date = `${date}OCTOBER 25 `;
            } else if (D3 === 16) {
              date = `${date}NOVEMBER 8 `;
            } else if (D3 === 17) {
              date = `${date}NOVEMBER 22 `;
            }
            yield createInfo(`${date}1847`);
          }
        }
      } else {
        // ***DYING***
        yield createInfo('YOU RAN OUT OF FOOD AND STARVED TO DEATH');
        yield* die();
        return;
      }
      // 1800
    } else {
      // ***FINAL TURN***
      F9 = (2040 - M2) / (M - M2);
      F = F + (1 - F9) * (8 + 5 * E);
      // *BELLS IN LINES 4015, 4020*
      yield createInfo('YOU FINALLY ARRIVED AT OREGON CITY');
      yield createInfo('AFTER 2040 LONG MILES---HOORAY!!!!!"');
      F9 = Math.floor(F9 * 14);
      D3 = D3 * 14 + F9;
      F9 = F9 + 1;
      if (F9 >= 8) {
        F9 = F9 - 7;
      }
      let date;
      if (F9 === 1) {
        date = 'MONDAY ';
      } else if (F9 === 2) {
        date = 'TUESDAY ';
      } else if (F9 === 3) {
        date = 'WEDNESDAY ';
      } else if (F9 === 4) {
        date = 'THURSDAY ';
      } else if (F9 === 5) {
        date = 'FRIDAY ';
      } else if (F9 === 6) {
        date = 'SATURDAY ';
      } else if (F9 === 7) {
        date = 'SUNDAY ';
      }

      if (D3 <= 124) {
        D3 = D3 - 93;
        yield createInfo(`JULY ${date} 1847`);
      } else if (D3 <= 155) {
        yield createInfo(`AUGUST ${date} 1847`);
      } else if (D3 <= 185) {
        yield createInfo(`SEPTEMBER ${date} 1847`);
      } else if (D3 <= 216) {
        yield createInfo(`OCTOBER ${date} 1847`);
      } else {
        D3 = D3 - 216;
        yield createInfo(`NOVEMBER ${date} 1847`);
      }

      yield createInfo('FOOD, BULLETS, CLOTHING, MISC. SUPP., CASH');
      if (B <= 0) {
        B = 0;
      }
      if (C <= 0) {
        C = 0;
      }
      if (M1 <= 0) {
        M1 = 0;
      }
      if (T <= 0) {
        T = 0;
      }
      if (F <= 0) {
        F = 0;
      }
      yield createInfo(
        `${Match.floor(F)}, ${Math.floor(B)}, ${Math.floor(C)}, ${Math.floor(
          M1
        )}, ${Mathf.floor(T)}`
      );
      yield createInfo('PRESIDENT JAMES K. POLK SENDS YOU HIS');
      yield createInfo('      HEARTIEST CONGRATULATIONS');
      yield createInfo('AND WISHES YOU A PROSPEROUS LIFE AHEAD');
      yield createInfo('AT YOUR NEW HOME');
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
  play
};
