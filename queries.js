const promise       = require('bluebird'),
      options       = { promiseLib: promise },
      pgp           = require('pg-promise')(options),
      env           = process.env.NODE_ENV || 'development',
      connString    = process.env.DATABASE_URL || require('\./db/config.json')[env],
      db            = pgp(connString);

console.log('env', env, '\nqueries', connString);
// add query functions
module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  createAdUnit: createAdUnit
};

function createAdUnit(req, res, next) {
  const adUnit = new AdUnit(req.body);
  adUnit.save()
    .then((item) => {
      res.status(200).json({
        'adUnit': 'AdUnit added successfully'
      });
    })
    .catch((err) => {
      // res.status(400).send('unable to save to database');
      return next(err);
    });
}
function getAllAduUits(req, res, next) {
  AdUnit.find((err, adUnits) => {
    if(err){
      console.log('err in find all', err);
    }
    else {
      res.json(adUnits);
    }
  });
}

function getAllPuppies(req, res, next) {
  db.any('select * from pubs')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All puppies'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  const pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
      req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5', [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)
    ])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  const pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then((result) => {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch((err) => {
      return next(err);
    });
}
