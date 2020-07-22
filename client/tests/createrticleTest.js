import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { Article } from '../src/services';
import { CreateArticlePage } from '../src/components/creatArticle';

describe('create page tests', () => {
  const wrapper = shallow(<CreateArticlePage match={{ params: { id: undefined } }} />);

  it('Init state', () => {
    let instance: ?CreateArticlePage = CreateArticlePage.instance();
    expect(typeof instance).toEqual('object');
  });
});
