import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', { path: '/' });
  this.resource('legislators', function() {
    this.resource('contact', {path: 'contact/:zip'});
  });
  this.resource('bills', function() {
    this.resource('house');
    this.resource('senate');
  });
  this.resource('committees', function() {
    this.resource('subcommittees', {path: ':committee_id'});
  });
});

export default Router;
