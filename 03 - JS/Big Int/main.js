// A list with the first 10 primes.
var listOfPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
// Length of ListOfPrimes.
var maxIndex = listOfPrimes.length;
// The last prime in the ListOfPrimes.
var maxPrimeInList = listOfPrimes[-1];

/* Returns the square root of a BigInt value.
   The Math.sqrt function won't work with BigInt values. */
function sqrt(value) {
    if (value < 0n)
        throw 'square root of negative numbers is not supported'
    if (value < 2n)
        return value;

    function newtonIteration(n, x0) {
        n = BigInt(n);
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}

/* Checks if a given BigInt number is prime.
   True if num is a prime, and false otherwise.
   Modified from the original for being easier to understand. */
function isPrime(num) {
    num = BigInt(num);
    let sqrtnum = sqrt(num);

    for(var i = 2n; i < sqrtnum + 1n; i++)
        if(num % i == 0) 
            return false;

    return true;
}

/* Factorizes a number into its prime factors.
   Returns a list with said factors. */
function factorize(num){
    num = BigInt(num);

    let primeFactors = [];
    let index = 0;
    let candidate = BigInt(listOfPrimes[index]);

    // If the number is small enough, it doesn't need to be of BigInt type.
    if(Number.isSafeInteger(num) === true)
        num = Number(num);

    var sqrtnum = sqrt(num);

    // If the number is prime, it is its only factor.
    if(isPrime(num)) {
        primeFactors.push(num);
        return primeFactors;
    }

    while(candidate < sqrtnum+1n) {
        if(BigInt(num) % BigInt(candidate) == 0){
            num /= BigInt(candidate);
            primeFactors.push(candidate);
            primeFactors = primeFactors.concat(factorize(num));
            break;
        }

        index += 1;
        if(index < maxIndex)
            candidate = listOfPrimes[index];
        else
            candidate += 2;
    }

    return primeFactors;
}

/* Condenses the list of prime factors of a number, so that each factor appears just once.
   Returns an array of arrays, where the element of index 0 of each array represents the prime factor,
   and the elemento of index 1 represents its number of occurences. An example: 
   primeFactors: [3, 3, 3, 5, 7, 7, 7, 7]
   returns:      [[3,3], [5,1], [7,4]] */
function condense(primeFactors){
    let primesArrays = []; 
    let occurencesCount = 0;
    let currentPrime = primeFactors[0];

    primeFactors.forEach(item => {
        if(item === currentPrime){
            occurencesCount++;
        }
        else{
            primesArrays.push([currentPrime, occurencesCount]); // as the factors are ordered, this number of occurences is final
            occurencesCount = 1; // resets number of occurences for the next factor
            currentPrime = item;
        }
    })

    // adds last prime to the final result
    primesArrays.push([currentPrime, occurencesCount]);

    return primesArrays;
}

/* Converts an array of prime factors and their respective number of occurences into string format.
   Example:
   factorArray: [3, 3, 3, 5, 7, 7, 7, 7]
   returns:     '3<sup>3</sup> &times; 5 &times; 7<sup>4</sup>' 
   Which is equivalent to: 3³ × 5 × 7⁴ */
function toString(factorArray){
    let st = [];
    let count = 0;
    let timesSymbol;
    let auxStr;

    factorArray.forEach(item => {
        if(count++ == factorArray.length-1) // the last factor won't be followed by a times symbol
            timesSymbol = "";
        else
            timesSymbol = "&times; ";

        if(item[1] != 1) // there's no need to include the superscript notation if the factor only occurs once
            auxStr = `${item[0]}<sup>${item[1]}</sup>`;
        else
            auxStr = `${item[0]}`;

        st[count] = `${auxStr} ${timesSymbol}`;
    })

    return st.join('');
}

function main(num){
    let factorizedNum = `<p">${toString(condense(factorize(num)))}</p>`;
    return factorizedNum;
}
