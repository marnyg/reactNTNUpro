import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { LiveFeed } from '../src/components/liveFeed';

describe('Alert tests', () => {
  it('init', () => {
    let instance: ?LiveFeed = LiveFeed.instance();
    expect(typeof instance).toEqual('object');
  });
});
