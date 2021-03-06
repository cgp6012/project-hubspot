const router = require("express").Router();
const server = require("../server");
const pool = server.getPool();

// Dashboard Routes

// Success rate of closed deals in percent
// (dealsClosed/(dealsClosed+dealsLost)) *100
router.get("/api/calc/successrate", (req, res) => {
  const sql = "CALL success_rate()";
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results[0]);
  });
});

// Sum of amount of all not closed deals.
router.get("/api/calc/dealsinprogress", (req, res) => {
  const sql = "SELECT COUNT(dealId) AS 'Deals In Progress' FROM deals WHERE stage NOT IN ('Closed Lost','Closed Won')";
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

// Average amount per deal 
// closedDealAmount/closedDealCount
router.get("/api/calc/avgrevperdeal", (req, res) => {
  const sql = "CALL avg_rev_per_deal()";
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results[0]);
  });
});

// Total amount from all closed won deals that were closed after 1/1/2019
router.get("/api/calc/totalrevytd", (req, res) => {
  const sql = `SELECT SUM(amount) AS 'Total Revenue YTD' from deals 
  WHERE stage = 'Closed Won' AND closeDate > 1546300800`;
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

// Average time to close deal
// sum close time/count of closed deals.
router.get("/api/calc/avgtimetoclose", (req, res) => {
  const sql = "CALL avg_time_to_close()";
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results[0]);
  });
});
// now going to return just top client 
router.get("/api/calc/topthreeclients", (req, res) => {
  const sql = `select sum(deals.amount) AS Total, companies.logoUrl, companies.companyName
  from deals
  INNER JOIN companies ON companies.companyId = deals.companyId
  GROUP BY dealId
  ORDER BY Total DESC
  LIMIT 1`;
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;