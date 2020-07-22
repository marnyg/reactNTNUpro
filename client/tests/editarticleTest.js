import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { Article } from '../src/services';
import { EditArticlePage, ListItem } from '../src/components/editArticle';

describe('edit page tests', () => {
  const wrapper = shallow(<EditArticlePage />);
  const mock = jest.fn();
  const listItmWrapper = shallow(<ListItem text="asd" id={1} callback={mock} />);

  it('Init state', () => {
    let instance: ?EditArticlePage = EditArticlePage.instance();
    expect(typeof instance).toEqual('object');
    expect(instance.page).toBe(0);
  });

  it('test change page logic', () => {
    let instance: ?EditArticlePage = EditArticlePage.instance();
    expect(typeof instance).toEqual('object');

    wrapper.find('button#nxt').simulate('click');
    expect(instance.page).toBe(1);

    wrapper.find('button#prv').simulate('click');
    expect(instance.page).toBe(0);
    wrapper.find('button#prv').simulate('click');
    expect(instance.page).toBe(0);
  });

  it('test delete button', () => {
    let instance: ?ListItem = ListItem.instance();
    expect(typeof instance).toEqual('object');

    listItmWrapper.find('button#delete').simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
