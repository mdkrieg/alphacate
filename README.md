# Alphacate

A Node.js toolkit with various indicators and oscillators for the technical stock analysis. This package contains only the mathematical calculations.

---

Big thanks to the originator of this project however I'm noticing some things that I'd like to tweak. As this doesn't look like it's being maintained I'm creating this fork to use in my projects.
### TODO
- [x] (0.4.1) MFI return object contains typo (negativMoneyFlow -> negativeMoneyFlow)
- [ ] MACD is returned in a strange format, integrate the following function to normalize

```
    function mergeMACD(data){
        let macdResult = [];
        for(var i in data[0].prices){ //strange but it puts the data in a 1-element array
            macdResult.push({
                slow_ema:   data[0].slow_ema[i],
                fast_ema:   data[0].fast_ema[i],
                signal_ema: data[0].signal_ema[i],
                macd:       data[0].macd[i],
                price:      data[0].prices[i]
            });
        }
        return macdResult;
    }
```
- [x] (0.4.1) OBV doesn't seem to work correctly, requires lazyEvaluation:true to return a series.
-  ^ error with if(!i) yielding result on i = 0 in the for loop
- [x] (0.4.1) RSI - Fixed rounding error raised in this issue: https://github.com/codeplayr/alphacate/issues
- [x] (0.4.1) RSI - Fixed error with initial average including the first bar (always gain, loss = 0). Additionally I confirmed in excel that this was dropping one bar after the initial period

#### Documentation
- [x] (0.4.1) ATR - Average True Range requires low, high, & close


## Installation

---

Below command will install this repository from github

    npm install mdkrieg/alphacate [--save]

## Example

---

```js      
//retrieve indicator module via accessor or alias
const LWMA = require('alphacate').LWMA;
const BB = require('alphacate').BollingerBands;

//do computation asynchronously
let run = async () => {
    try{
        //pass optional configuration object into the constructor
        let lwma = new LWMA( {periods: 4} );
        let bb = new BB( {periods: 4} );

        let data = [25.5, 26.75, 27.0, 26.5, 27.25];

        //set data series
        lwma.setValues( data );
        bb.setValues( data );

        //invoke calculate() to compute and retrieve result collection
        //an error will be throw if passed data serie or options are invalid
        let lwmaResultCollection = await lwma.calculate();
        let bbResultCollection = await bb.calculate();
        
        for(let i=0, len=lwmaCollection.length; i<len; i++){
            console.log(`Price: ${lwmaCollection[i].price}, LWMA: ${lwmaCollection[i].lwma}, BB Upper: ${bbCollection[i].upper}`);
        }

    }
    catch( err ){
        console.log(err.message);
    }
};

run();
```



### List of indicators

---

See the list below for all available indicators in the package. Retrieve the indicator module via the accessor property or with the alias.


Indicator                               |Module accessor               		|Alias              
----------------------------------------|-----------------------------------|-----------
Average True Range                      |AverageTrueRange                   |ATR                
Bollinger Bands                         |BollingerBands                     |BB                 
Exponential Moving Average              |ExponentialMovingAverage           |EMA                
Linearly Weighted Moving Average        |LinearlyWeightedMovingAverage      |LWMA               
Money Flow Index                        |MoneyFlowIndex                     |MFI
Moving Average Convergence Divergence   |MovingAverageConvergenceDivergence |MACD               
On Balance Volume                       |OnBalanceVolume                    |OBV                
Rate Of Change                          |RateOfChange                       |ROC
Relative Strength Index                 |RelativeStrengthIndex              |RSI                
Simple Moving Average                   |SimpleMovingAverage                |SMA   
Smoothed Moving Average                 |SmoothedMovingAverage              |SMMA             
Stochastic Oscillator                   |StochasticOscillator               |SO                 
Weighted Moving Average                 |WeightedMovingAverage              |WMA

### Data serie item

---

The type of the item in the data serie that will be passed into the `setValues` function

Indicator								|Type       |Usage
----------------------------------------|-----------|---------------------------------------
Average True Range                      |Number     |{high:\<Number\>, low:\<Number\>, close:\<Number\> };                        
Bollinger Bands                         |Number     |                             
Exponential Moving Average              |Number     |                             
Linearly Weighted Moving Average        |Number     | 
Money Flow Index                        |Object     |{high:\<Number\>, low:\<Number\>, close:\<Number\>, volume:\<Number\> };                            
Moving Average Convergence Divergence   |Number     |                             
On Balance Volume                       |Object     |{price:\<Number\>, volume:\<Number\>}  
Rate Of Change                          |Number     |                           
Relative Strength Index                 |Number     |                             
Simple Moving Average                   |Number     |
Smoothed Moving Average                 |Number     |                             
Stochastic Oscillator                   |Number     |                             
Weighted Moving Average                 |Number     |

### Result collection item

---

Each item in the result collection contains several object properties. See the list below which properties belongs to the particular indicator. All values are numbers except where noted.


Indicator								|Collection Item properties
----------------------------------------|--------------------------------------------------
Average True Range                      |{tr, atr}                              
Bollinger Bands                         |{upper:\<Array\>, middle:\<Array\>, lower:\<Array\>, price:\<Array\>}  
Exponential Moving Average              |{price, ema}                           
Linearly Weighted Moving Average        |{price, lmwa}	                       
Moving Average Convergence Divergence   |{slow_ema:\<Array\>, fast_ema:\<Array\>, signal_ema:\<Array\>, macd:\<Array\>, prices:\<Array\>}
On Balance Volume                       |{price, obv}                           
Rate Of Change                          |{price, roc}
Relative Strength Index                 |{price, gain, loss, avg_gain, avg_loss, rs, rsi}   
Simple Moving Average                   |{price, sma}  
Smoothed Moving Average                 |{price, smma}                         
Stochastic Oscillator                   |{k,v, price}                          
Weighted Moving Average                 |{price, wma} 

### Indicator options

---

To configure the indicator with different settings, you can pass an optional configuration object into the indicator constructor.

Indicator								|Option properties									
----------------------------------------|-------------------------------------------
Average True Range                      |periods, startIndex, endIndex, lazyEvaluation, maxTickDuration				
Bollinger Bands                         |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration				
Exponential Moving Average              |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration, emaResultsOnly, startWithFirst		
Linearly Weighted Moving Average        |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration		
Money Flow Index                        |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration		
Moving Average Convergence Divergence   |fastPeriods, slowPeriods, signalPeriods, sliceOffset, lazyEvaluation, maxTickDuration
On Balance Volume                       |startIndex, endIndex, lazyEvaluation, maxTickDuration						
Rate Of Change                          |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration
Relative Strength Index                 |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration					
Simple Moving Average                   |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration	
Smoothed Moving Average                 |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration			
Stochastic Oscillator                   |periods, startIndex, endIndex, smaPeriods, sliceOffset, lazyEvaluation, maxTickDuration 	
Weighted Moving Average                 |periods, startIndex, endIndex, sliceOffset, lazyEvaluation, maxTickDuration

See the table below for a description of the particular option property.

Option property     |Type       |Description
--------------------|-----------|------------------------
periods             |Number     |The time periods to calculate the indicator
startIndex          |Number     |The index for the passed data serie to start the calulation
endIndex            |Number     |The index for the passed data serie to end the calculation
sliceOffset         |Boolean    |Omit items in result collection used for inital period calculation
fastPeriods         |Number     |The time periods for the fast moving average
slowPeriods         |Number     |The time periods for the slow moving average
signalPeriods       |Number     |The time periods for the signal average
smaPeriods          |Number     |The time periods for the simple moving average
lazyEvaluation      |Boolean    |Do the computation of passed values in an asynchronous fashion
maxTickDuration     |Number     |The computation tick duration in milliseconds. If the computation is not completed, it will be continued in the tick of the next event loop.

## Run Tests

---

All tests are inside `test` folder

Run tests:

    $ npm test

Run code coverage report:

    $ npm run coverage    

## License

This project is under the MIT License. See the LICENSE file for the full license text.
