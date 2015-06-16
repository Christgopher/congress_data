import Ember from 'ember';

export default Ember.Controller.extend({

  showingId: undefined,
  actions: {
    showSubcommittees: function(showCommittee) {
      // this.set(showingId, committee.committee_id);
      var committees = this.get('model');
      for(var i = 0; i < committees.length; i++) {
        var committee = committees.objectAt(i);
        if (committee === showCommittee) {
          var url = 'http://congress.api.sunlightfoundation.com/committees?subcommittee=true&parent_committee_id=' + showCommittee.committee_id + '&apikey=0613f3c5dde44d699a1a8c7adb2e6ed7&per_page=all';

          Ember.$.getJSON(url).then(function(responseJSON) {
            var subcommittees = [];
            responseJSON.results.forEach(function(subcommittee) {
              subcommittees.push(subcommittee);
            });
            committee.set('subcommittees', subcommittees);
            
          });
        } else {
          committee.set('subcommittees', []);
        }
      }

    }
  }
});
