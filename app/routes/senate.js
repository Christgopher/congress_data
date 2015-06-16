import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'senate'});
  },
  model: function() {

    var getDescription = function(upcomingBill) {
      var billId = upcomingBill.bill_id;
      var description;
      var billUrl = 'http://congress.api.sunlightfoundation.com/bills?apikey=0613f3c5dde44d699a1a8c7adb2e6ed7&bill_id=' + billId;
      $.ajax({
        dataType: "json",
        url: billUrl,
        async: false,
        success: function(responseJSON) {
          upcomingBill.description = responseJSON.results[0].official_title;
        }
      });
    };

    var url = 'http://congress.api.sunlightfoundation.com/upcoming_bills?chamber=senate&apikey=0613f3c5dde44d699a1a8c7adb2e6ed7';
    return Ember.$.getJSON(url).then(function(responseJSON) {
      var upcomingBills = [];
      responseJSON.results.forEach(function(upcomingBill) {

        getDescription(upcomingBill);
        upcomingBill.name = upcomingBill.bill_id.split('-')[0];
        upcomingBills.push(upcomingBill);
      });
      return upcomingBills;
    });
  }
});
