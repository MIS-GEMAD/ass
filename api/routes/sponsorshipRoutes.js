'use strict'
module.exports = function (app) {

  const sponsorship = require('../controllers/sponshorshipController')

  app.route('/sponsorships')
    .get(sponsorship.list_all_sponsorships)
    .post(sponsorship.create_a_sponsorship)

  app.route('/sponsorships/:sponsorshipId')
    .get(sponsorship.read_a_sponsorship)
    .put(sponsorship.update_a_sponsorship)
    .delete(sponsorship.delete_a_sponsorship)

  app.route('/sponsorships/:sponsorshipId/pay')
    .put(sponsorship.pay_a_sponsorship)

  app.route('/sponsorships/:actorId')
    .get(actors.list_actor_sponsorships)

}
