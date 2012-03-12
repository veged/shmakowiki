var tests = [
    {
        'in': '%%toc\n==test\n%%',
        'out': [
          ['extension', 'toc',
            [
              true,
              ['ulist',
                [
                  ['ulistItem', [['link','#test', ['test']]]]
                ]
              ],
              [
                ['header1',['test'],'test']
              ]
            ],
            ''
          ]
        ]
    },
    {
        'in': '%%toc\n==th1\n**bold**\n==th2\n%%',
        'out': [
            ['extension', 'toc',
              [
                true,
                ['ulist',
                  [
                    ['ulistItem', [['link','#th1', ['th1']]]],
                    ['ulistItem', [['link','#th2', ['th2']]]]
                  ]
                ],
                [
                  ['header1', ['th1'], 'th1'],
                  ['para', [['bold', ['bold']]]],
                  ['header1', ['th2'], 'th2']
                ]
              ],
              ''
            ]
        ]
    },
    {
        'in': '%%toc\n==th1\n===th2\n====th3\n%%',
        'out': [
          ['extension', 'toc',
            [
              true,
              ['ulist',
                [
                  ['ulistItem',
                    [
                      ['link', '#th1', ['th1']],
                      ['ulist',
                        [
                          ['ulistItem',
                            [
                              ['link', '#th2', ['th2']],
                              ['ulist',
                                [
                                  ['ulistItem',
                                    [
                                      ['link', '#th3', ['th3']]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ],
              [
                ['header1', ['th1'], 'th1'],
                ['header2', ['th2'], 'th2'],
                ['header3', ['th3'], 'th3']
              ]
            ],
            ''
          ]
        ]
    },
    {
        'in': '%%a%toc\n===th10\n%%b%toc nested\n===th20\n===th21\n%b%%\n===th11\n%a%%',
        'out': [
          ['extension', 'toc',
            [
              true,
              ['ulist',
                [
                  ['ulistItem',
                    [
                      ['link', '#th10', ['th10']]
                    ]
                  ],
                  ['ulistItem',
                    [
                      ['link', '#th20', ['th20']]
                    ]
                  ],
                  ['ulistItem',
                    [
                      ['link', '#th21', ['th21']]
                    ]
                  ],
                  ['ulistItem',
                    [
                      ['link', '#th11', ['th11']]
                    ]
                  ]
                ]
              ],
              [
                ['header2', ['th10'], 'th10'],
                ['extension', 'toc',
                  [
                    true,
                    ['ulist',
                      [
                        ['ulistItem',
                          [
                            ['link', '#th20', ['th20']]
                          ]
                        ],
                        ['ulistItem',
                          [
                            ['link', '#th21', ['th21']]
                          ]
                        ]
                      ]
                    ],
                    [
                      ['header2', ['th20'], 'th20'],
                      ['header2', ['th21'], 'th21']
                    ]
                  ],
                  'nested'
                ],
                ['header2', ['th11'], 'th11']
              ]
            ],
            ''
          ]
        ]
    }
];

var api = require('../../../shmakowiki.js'),
    totalFail = 0;

for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    test.res = api.shmakowikiToAst(test['in']);

    var res = JSON.stringify(test.res),
        out = JSON.stringify(test.out),
        isOk = res == out;

    console.log('Test in:\n' + test['in'] + '\n: ' + (isOk ? 'ok' : 'FAIL'));
    console.log('Test result:\n' + res);
    if (!isOk) {
        totalFail++;
        console.log('Test out:\n' + out);
    }

    test.html = api.astToHtml(test.res);
    console.log('Test html:\n' + test.html);

    test.bemjson = api.astToBemjson(test.res);
    console.log('Test bemjson:\n' + JSON.stringify(test.bemjson));

    console.log('-----------------------------------------------------');
}
console.log('\n' + (totalFail ? 'Total FAIL: ' + totalFail : 'All Ok'));
