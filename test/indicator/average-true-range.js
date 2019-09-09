'use strict';

const assert = require('chai').assert;
const _ = require('underscore');
const ATR = require('./../../lib/indicator/average-true-range');
const Fixture = require('./../fixtures/average-true-range');

describe('Average True Range', function(){

    const data = Fixture.data;
    const expectedResults = Fixture.dataResults;

    it('should calculate true range correctly and return result', () => {
        let atr = new ATR();
        function runTest( currentItem, prevItem, expectedResult ){
           let result =  atr._getTrueRange( currentItem, prevItem );

            assert.isNumber( result );
            assert.closeTo( result, expectedResult, 0.05 );
        };

        for(let i=0; i<5; i++ ){
            let currItem = data[ i ];
            currItem = { high: currItem[0], low: currItem[1], close: currItem[2] };

            let prevItem =  (i ) ? data[ i - 1 ] : null;
            if(prevItem){
                prevItem = { high: prevItem[0], low: prevItem[1], close: prevItem[2] };
            }
            let expectedResult = expectedResults[i][3];

            runTest( currItem, prevItem, expectedResult );
        };

    });


});
