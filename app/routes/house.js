import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'house'});
  },
  model: function() {
    var url = 'http://congress.api.sunlightfoundation.com/upcoming_bills?chamber=house&apikey=0613f3c5dde44d699a1a8c7adb2e6ed7';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      var upcomingBills = [];
      responseJSON.results.forEach(function(upcomingBill) {
        upcomingBill.name = upcomingBill.bill_id.split('-')[0];
        upcomingBills.push(upcomingBill);
      });
      return upcomingBills;
    });
  }
});
