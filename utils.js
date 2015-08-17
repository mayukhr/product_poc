/**
 * Created by Mayukhr on 13-08-2015.
 */
//psql -h [ec2-54-197-230-210.compute-1.amazonaws.com] -U [nmcmkrgpvcspgv] [d3nkr9l8drvvd1]
var pg = require('pg');
var connectionString = "postgres://nmcmkrgpvcspgv:KjnZsgVKwDMbaqR0O9ji4Xa0Fe@ec2-54-197-230-210.compute-1.amazonaws.com/d3nkr9l8drvvd1"

exports.connectionString = connectionString;
exports.pg =pg;